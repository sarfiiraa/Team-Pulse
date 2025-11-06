import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";
import insightRoutes from "./routes/insightRoutes.js";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);
app.use("/insights", insightRoutes);



app.use(express.static(path.join(__dirname,"./teamPulse-frontend/dist")));

// app.get('*',function(_, res){
//     res.sendFile(path.join(__dirname, "./teamPulse-frontend/dist/index.html"), function(err){
//         res.status(500).send(err);
//     })
// })

// app.get('/*', function(_, res) {
//   res.sendFile(path.join(__dirname, "./teamPulse-frontend/dist/index.html"), function(err) {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// });

app.get(/.*/, (_, res) => {
  res.sendFile(path.join(__dirname, "./teamPulse-frontend/dist/index.html"), (err) => {
    if (err) res.status(500).send(err);
  });
});


app.listen(process.env.PORT, () =>
  console.log(`✅ Server running on port ${process.env.PORT}`)
);
