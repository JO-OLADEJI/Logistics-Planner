const mongoose = require('mongoose');
require('dotenv/config.js');


const dbConnect = () => {
  mongoose.connect(
    'mongodb+srv://developer_admin:access123@cluster0.w25j6.mongodb.net/logistics-planner?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    console.log('Connected to DB :)')
  );
}

// process.env.DB_CONNECTION_URI
module.exports = dbConnect;
