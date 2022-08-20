const server = require('./src/routes/index');
const dotenv = require('dotenv').config


const port = process.env.PORT || 4000;


require('dotenv').config();
const db = require('./src/config/db');

db()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log(`Database connection failed ${err}`);
  });

server.listen(port, () => {
  console.log(`Web Service Running on: ${port}`)
});