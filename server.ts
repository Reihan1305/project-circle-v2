import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./src/lib/db";
import indexRouter from "./src/routers";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(indexRouter);

app.get("/", (req, res) => {
   res.send("CIRCLE APP - API");
});

app.listen(+PORT, async () => {
   await db.$connect();
   console.log("Server is running at port " + PORT);
});
