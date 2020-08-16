require('dotenv').config()

let PORT = process.env.PORT || 5000
let API_KEY = process.env.API_KEY

module.exports = {
  PORT,
  API_KEY
}