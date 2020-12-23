const mongoose = require('mongoose')

module.exports = async () => {
  await mongoose.connect(process.env.DBC, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("MongoDB Connected"))
  return mongoose
}