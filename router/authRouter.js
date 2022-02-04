const bcrypt = require('bcrypt')

class AuthRouter {
  constructor(express, axios, jwt, knex, config, server) {
    this.express = express
    this.axios = axios
    this.jwt = jwt
    this.knex = knex
    this.config = config
    this.server = server
  }
  router() {
    let router = this.express.Router()

    router.post('/api/login', this.postLogin.bind(this))
    router.post('/api/signup', this.postSignup.bind(this))
    router.post('/api/update', this.postUpdate.bind(this))
    // router.post('/api/login/facebook', this.postFacebook.bind(this))
    return router
  }

  async postLogin(req, res) {
    console.log('standard login attempt')
    if (req.body.email && req.body.password && req.body.type) {
      let email = req.body.email;
      let password = req.body.password;
      let table = req.body.type;

      let user = await this.knex
        .select('*')
        .from(table)
        .where({ email: email })
        .then(data => data[0])

      let doctors = await this.knex('doctors')
        .select('business_id', 'id', 'f_name', 'l_name')

      let business = await this.knex('business_users')
        .select('id', 'name')

      if (await bcrypt.compare(password, user.password)) {
        let payload = {
          id: user.id,
          table: table
        }

        let config = user;
        delete config.password;

        let businessConfig = {
          doctors: doctors,
          business: business
        };

        let token = this.jwt.sign(payload, this.config.jwtSecret)
        // console.log({ token, config, businessConfig })
        res.json({ token, config, businessConfig })
        // res.json({ token})
      }
    } else {
      res.sendStatus(401)
    }
  }

  async postSignup(req, res) {
    // we have no logic to handle if the email is taken.
    console.log('Sign up')
    console.log(req.body)
    if (req.body.email && req.body.password) {
      let hashedPassword = await bcrypt.hash(req.body.password, 10)

      //Re-orgnaise the data so it matches the database names.
      let patient = {
        f_name: req.body.firstName,
        l_name: req.body.lastName,
        hkid: req.body.hkid,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        dob: req.body.dob,
        phone: req.body.phone,
        drug_allergy: req.body.drugAllergies
      }

      let userId = await this.knex('patients')
        .insert(patient)
        .returning('id')

      console.log(userId)

      let payload = {
        id: userId[0].id
      }
      let token = this.jwt.sign(payload, this.config.jwtSecret)
      console.log(token)
      res.json({ token })
    } else {
      res.sendStatus(402)
    }
  }

  async postUpdate(req, res) {
    let secret = req.body.secret;
    let password = req.body.password;
    let table = req.body.type;
    console.log('Change password initiated.')
    if (req.body.secret && req.body.password) {
      let hashedPassword = await bcrypt.hash(password, 10)
      console.log(hashedPassword)
      let bUser = await this.knex(table).where({secret_token: secret}).update({password: hashedPassword})
      console.log(bUser)
    }
    else {
      console.log("failed to update password")
      res.sendStatus(401)
    }
  }

  //   async postFacebook (req, res) {
  //     // add in condition to check for user
  //     if (req.body.info) {
  //       var accessToken = req.body.info.accessToken
  //       this.axios
  //         .get(`https://graph.facebook.com/me?access_token=${accessToken}`)
  //         .then(async data => {
  //           if (!data.data.error) {
  //             let oldUser = await this.knex('users')
  //               .select('id')
  //               .where('facebookid', req.body.info.id)
  //             if (oldUser.length >= 1) {
  //               console.log('user is there')
  //               console.log(oldUser)
  //               let payload = {
  //                 id: oldUser[0].id
  //               }
  //               var token = this.jwt.sign(payload, this.config.jwtSecret)
  //               res.json({
  //                 token: token
  //               })
  //             } else {
  //               let FBUSER = {
  //                 name: req.body.info.name, // better to use data or profile to check the facebook user name
  //                 email: req.body.info.email, // better to use data or profile to check the email
  //                 password: 'Get them to insert pw',
  //                 facebookaccesstoken: req.body.info.accessToken,
  //                 facebookid: req.body.info.id
  //               }
  //               let userId = await this.knex('users').insert(FBUSER)
  //               let user = await this.knex('users')
  //                 .select('id')
  //                 .where('facebookid', req.body.info.id)
  //               console.log(user, 'from authRouter')
  //               let payload = {
  //                 id: user[0]
  //               }
  //               console.log(payload)
  //               var token = this.jwt.sign(payload, this.config.jwtSecret)
  //               res.json({
  //                 token: token
  //               })
  //             }
  //           } else {
  //             res.sendStatus(401)
  //           }
  //         })
  //     }
  //   }
}

module.exports = AuthRouter
