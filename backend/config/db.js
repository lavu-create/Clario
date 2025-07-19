const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Remove useCreateIndex as it's no longer needed in Mongoose 6+
      // useFindAndModify: false, // Also no longer needed in Mongoose 6+
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
