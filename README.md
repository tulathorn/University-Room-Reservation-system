# University-Room-Reservation-system

Repository for University-Room-Reservation-system (API Keybox and Database)

## Description

This repository will contain API, Keybox and SQL source code which will seperate from the frontend repository. The information of deploying can be found in deploy document which is in the flashdrive.

#### Stack

- API: NodeJS
- Database: MariaDB (SQL)
- Keybox: python

## Running the local server

Requirement

- Your local computer should install NodeJS and the version should higger that 10.x.x
- (Optional) Already install yarn package management

#### Step

1. Going to `./API`
2. Copy `.env.dev` to `.env`
3. Run

```bash
  $ yarn
```

or if you not using yarn

```bash
  $ npm install
```

4. Then, start the local server by

```bash
  $ nodemon server.js
```

The result should be

```bash
Server listening on 4000
Sucessful connect to database
```

5. Happy hacking

## Contributor

- Tulathorn Sripongpankul
- Yosita Sitthiporn
- Arnan Hirunratanakorn

Make with ❤️ by all contributor

This repository is part ofProject Submitted in Partial Fulfillment of the Requirements for the Degree of Bachelor of Engineering.

Department of Computer Engineering, Faculty of Engineering,
King Mongkut’s University of Technology Thonburi, Academic Year 2018
