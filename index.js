const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const route = require('./route')
const commonFunction = require('./common/common_function')

const corsOptions = {
  origin: '*',
  Credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())
app.use('/api', commonFunction.JwtVerification, route)

commonFunction.connectDatabase()
app.request.mailer = commonFunction.connectMailService()

app.get("/api/hsel", (req, res) => {
  res.status(200).send("hsel ready to Start");
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log(`Server connection issue: ${err}`)
  else console.log('Server connected' + process.env.PORT)
})