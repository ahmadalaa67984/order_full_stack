const express = require("express");
const app = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const orderRoute = require("./routes/order");
const payRoute = require("./routes/strip");

const listRoute = require("./routes/list");

app.use(express.json());

app.use(
  cors({
    origin: true, // Allow requests from any origin
    credentials: true, // If your frontend sends cookies, set credentials to true
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  headers: true, // Send `X-RateLimit-*` headers in the response
});

// Apply the rate limiter to all requests

mongoose
  .connect(
    "mongodb+srv://nahmadalaa67984:ahmad@cluster0.ysc4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("dataBase is connected...");
  })
  .catch((err) => console.log(err));

app.use(limiter);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", movieRoute);
app.use("/api/orders", orderRoute);
app.use("/api/pay", payRoute);

app.use("/api/lists", listRoute);

app.listen(process.env.port || 8800, () => {
  console.log("backend server is running...");
});
