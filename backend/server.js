import  dotenv from"dotenv"
dotenv.config()
import express from"express";
import  cors from "cors";
const app = express();

const  corsOptions = {
  origin: 'https://ai-based-mock-interview-full.onrender.com',
  credentials: true,
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));
app.use(express.json());



import  interviewRoutes from"./routes/interviewRoutes.js";
app.use("/api", interviewRoutes);


app.listen(process.env.PORT, () => {
  console.log("Server running on port 8080");
});



