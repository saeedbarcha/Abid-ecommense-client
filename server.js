import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server due to uncought exception`);
  process.exit(1);
});

//config
dotenv.config();

//connected to database
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running http://localhost:${process.env.PORT}`);
});

// Unhandled promise Regection
// to handel the the error related to database connectivity
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message} `);
  console.log(`shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
