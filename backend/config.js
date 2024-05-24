require('dotenv').config();
const EXPIRES = process.env.EXPIRES
const PORT = process.env.PORT;
const  SECRET = process.env.SECRET;

module.exports = {PORT,SECRET,EXPIRES};