import dotenv from "dotenv";
dotenv.config({
  path: `../../${process.env.NODE_ENV == "production" ? ".env" : ".env.local"}`,
});
import express from "express";
import cors from "cors";
import routes from "./routes";
import connect from "./db";
const app = express();

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} in ${duration}ms`,
    );
  });

  next();
});


app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(process.env.API_PORT, async () => {
  console.log(`Server is running on port ${process.env.API_PORT}`);
  await connect();
});
