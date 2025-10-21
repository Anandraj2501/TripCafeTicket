import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import booking from "./routes/booking.routes.js";
import payment from "./routes/payment.routes.js";
import user from  "./routes/user.routes.js";
import webhook from "./routes/webhooks.routes.js";
import cookieParser from "cookie-parser";

// import cookieParser from "cookie-parser";
dotenv.config({
    path: "./.env"
})

const app = express();

// app.use(
//     cors({
//         origin:process.env.CORS_ORIGIN,
//         credentials: true
//     })
// );
const allowedOrigins = process.env.CORS_ORIGIN.split(",").map(origin => origin.trim());

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);




// it does not need express.json();
app.use("/api/v1/webhooks",webhook);

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cookieParser());
// app.use(cookieParser());

//Routes
app.use("/api/v1/booking",booking);
app.use("/api/v1/initiatePayment",payment);
app.use("/api/v1/user",user);

export default app;
