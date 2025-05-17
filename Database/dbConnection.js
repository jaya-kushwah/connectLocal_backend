// const mongoose = require("mongoose");

// const dbUrl = mongoose.createConnection('mongodb+srv://jaya:jaya@14@sow.arekqtp.mongodb.net/?retryWrites=true&w=majority&appName=sow');
// // const dbUrl = "mongodb://127.0.0.1:27017/SOW";



// const dbConnection = () => {
//     try {
//         mongoose.connect(dbUrl);
//         console.log("database Connection  succeed");

//     } catch (error) {
//         console.log(error);


//     }
// }

// module.exports = dbConnection;

const mongoose = require("mongoose");

const dbUrl = 'mongodb+srv://jaya:jaya14@sow.awbhdhq.mongodb.net/?retryWrites=true&w=majority&appName=SOW';

const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed", error);
  }
};

module.exports = dbConnection;
