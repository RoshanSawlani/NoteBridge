const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/inotebook?readPreference=primary&ssl=false&appname=MongoDB+Compass&directConnection=true";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB: " + error);
  }
};

module.exports = connectToMongo;
