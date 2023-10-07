const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/userRoute");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log(PORT);

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", routes);
mongoose.connect(process.env.MONGOOSEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Mongoose Connection

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
