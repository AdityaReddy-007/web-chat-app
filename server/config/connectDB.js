// const mongoose = require('mongoose')

// async function connectDB(){
//     try {
//         await mongoose.connect(process.env.MONGODB_URI)

//         const connection = mongoose.connection

//         connection.on('connected',()=>{
//             console.log("Connect to DB")
//         })

//         connection.on('error',(error)=>{
//             console.log("Something is wrong in mongodb ",error)
//         })
//     } catch (error) {
//         console.log("Something is wrong ",error)
//     }
// }

// module.exports = connectDB

// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;