const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

const app = require("./src/app");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"));

const port = process.env.PORT;

const server = app.listen(port, () =>
  console.log(`Server listening on port ${port}...`)
);
