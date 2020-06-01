const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const app = require("./app");

process.on("uncaughtException", (err) => {
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});

const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((e) => {
    console.log(e);
  });

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`server up on port ${port}`));

process.on("unhandledRejection", (err) => {
  console.log(err);
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down");
  server.close(() => {
    process.exit(1);
  });
});
