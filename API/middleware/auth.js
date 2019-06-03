const fastify = require('fastify')()
const LdapAuth = require('ldapauth-fork')

const UserController = require('../controller/UserController.js')

// async function verifySystemUser(ldapUser) {
//   let user = await UserController.find({ UsernameID: ldapUser.studentsID })

//   console.log('verifySystemUser =>', user)
//   return user
// }

function verifyJWTandLevel(request, reply, done) {
  const jwt = this.jwt
  const level = this.level

  if (request.body && request.body.failureWithReply) {
    reply.code(401).send({ error: 'Unauthorized' })
    return done(new Error())
  }

  if (!request.req.headers['auth']) {
    return done(new Error('Missing token header'))
  }

  jwt.verify(request.req.headers['auth'], onVerify)

  function onVerify(err, decoded) {
    if (err || !decoded.user || !decoded.password) {
      return done(new Error('Token not valid'))
    }

    level.get(decoded.user, onUser)

    function onUser(err, password) {
      if (err) {
        if (err.notFound) {
          return done(new Error('Token not valid'))
        }
        return done(err)
      }

      if (!password || password !== decoded.password) {
        return done(new Error('Token not valid'))
      }

      console.log('decoded : ', decoded)

      done()
    }
  }
}

function authenticate(username, password) {
  const options = {
    url: 'ldap://10.1.130.12',
    searchBase: 'ou=people,ou=st,dc=kmutt,dc=ac,dc=th',
    searchFilter: '(uid={{username}})'
  }

  const auth = new LdapAuth(options)

  return new Promise((resolve, reject) => {
    auth.on('error', function(err) {
      console.error('LDAP Auth: ', err)

      if (err) reject(err)
    })

    auth.authenticate(username, password, function(err, user) {
      console.error('> LDAP Auth:', err, user)

      if (err) return reject(err)

      if (user) resolve(user)
    })

    auth.close(function(err) {
      console.error('> LDAP Auth:', err)

      if (err) return reject(err)
    })
  })
}

async function verifyUser(request, reply, done) {
  const { username, password } = request.body

  try {
    const user = await authenticate(username, password)

    // Put user information into request for other purpose
    request.user = user
    done(null, user)
  } catch (err) {
    done(err)
  }
}

const AuthMeddleware = (fastify, opt, next) => {
  fastify
    .decorate('verifyJWTandLevel', verifyJWTandLevel)
    .decorate('verifyUserAndPassword', verifyUser)
    .register(require('fastify-auth'))
    .register(require('fastify-leveldb'), { name: 'authdb' })
    .after(() => {
      fastify.addHook('preHandler', fastify.auth([fastify.verifyUserAndPassword]))
      fastify.route({
        method: 'POST',
        url: '/auth',
        handler: async (req, reply) => {
          async function verifySystemUser(ldapUser) {
            let user = await UserController.find({ UsernameID: ldapUser.studentsID })

            console.log('Check user =>', user)

            if (user.length === 0) {
              console.log('Not found user')
              let IntUserID = parseInt(ldapUser.uidNumber, 10)
              const newUserInfo = {
                UserID: IntUserID,
                UsernameID: ldapUser.studentsID,
                FirstName: ldapUser.displayName,
                LastName: ldapUser.givenName,
                EmailAddress: ldapUser.mail,
                IsAdmin: false,
                IsBan: false
              }
              let newUser = await UserController.create(newUserInfo)
              console.log('New User return: ', newUser)
              return newUser
            }

            // console.log('verifySystemUser =>', user)
            return user[0]
          }

          req.log.info('Login to system')
          console.log(fastify.level)
          let data = await verifySystemUser(req.user)
          fastify.level.put(req.body.username, req.body.password, onPut)
          // console.log('View Ldap user =>', req.user)

          function onPut(err) {
            if (err) return reply.send(err)
            fastify.jwt.sign({ username: req.body.username }, onToken)
          }

          function onToken(err, token) {
            if (err) return reply.send(err)
            req.log.info('User created')
            reply.send({ token, ...data })
          }
        }
      })
    })
  next()
}

module.exports = AuthMeddleware
exports.verifyUser = verifyUser
exports.authenticate = authenticate
