import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.routes.js"
import userRoute from "./routes/user.route.js"
import likeRoute from "./routes/like.route.js"
import passport from "passport";
import "./config/passport.js"

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(passport.initialize());      

app.use("/auth", authRoute);
app.use("/user" , userRoute)
app.use('/like' , likeRoute);


app.get("/", (req, res) => {
  res.send("API live 🚀");
});

export default app;
