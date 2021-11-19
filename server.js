const express = require('express')
const morgan = require('morgan')
const cors = require("cors")
const { auth, requiresAuth } = require('express-openid-connect')
require('dotenv').config()

const app = express()

app.use(morgan("dev"))

let corsOptions = {
  origin: "http://localhost:8081",
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
}

app.use(auth(config))

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
})

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`api started on port ${PORT}`)
})
