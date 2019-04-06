const fastify = require('fastify')()
const LdapAuth = require('ldapauth-fork')

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

    console.log('> User =', user)

    done(null, user)
  } catch (err) {
    done(err)
  }
}

const AuthMeddleware = (fastify, opt, next) => {
  fastify
    .decorate('verifyJWTandLevel', function(request, reply, done) {
      // your validation logic
      done() // pass an error if the authentication fails
    })
    .decorate('verifyUserAndPassword', verifyUser)
    .register(require('fastify-auth'))
    .after(() => {
      fastify.addHook('preHandler', fastify.auth([fastify.verifyUserAndPassword]))

      fastify.route({
        method: 'POST',
        url: '/auth',
        handler: async (req, reply) => {
          req.log.info('Auth route')
          reply.send({ hello: 'world' })
        }
      })
    })
  next()
}

module.exports = AuthMeddleware
exports.verifyUser = verifyUser
exports.authenticate = authenticate
