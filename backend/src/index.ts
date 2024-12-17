import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Healthy Server");
});

app.get("/api/me", (req, res) => {
  res.send("Me");
});

app.use("/api", apiRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
