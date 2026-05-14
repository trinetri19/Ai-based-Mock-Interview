import  dotenv from"dotenv"
dotenv.config()
import express from"express";
import  cors from "cors";
import { WebSocketServer } from "ws";
import { generateQuestion, evaluateAnswer } from "./Services/aiservices.js";
const app = express();

const  corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json());



import  interviewRoutes from"./routes/interviewRoutes.js";
app.use("/api", interviewRoutes);


app.listen(8080, () => {
  console.log("Server running on port 8080");
});



