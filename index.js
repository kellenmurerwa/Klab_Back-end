import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mainRouter from './routes/indexRouting.js';
import bodyParser from 'body-parser';
dotenv.config();
const port =process.env.PORT||3000
const db_user =process.env.DB_USER;
const db_name =process.env.DB_NAME;
const db_pass =process.env.DB_PASS;



const app=express();
// app.use(express.json())
app.use('/', mainRouter);
app.use(bodyParser.json());


const dbUri = `mongodb+srv://${db_user}:${db_pass}@cluster0.laopr.mongodb.net/${db_name}?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Node API is running on port http://localhost:${port}`);
     
    });
  })
  .catch((error) => {
    console.log(error);
  });