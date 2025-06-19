const chalk = require("chalk");
const mongoose = require("mongoose");
require("dotenv").config();



const connectToDB = async()=>{
    mongoose.connect(process.env.DB_URI,{dbName:process.env.DB_Name}).then(()=>{
        console.log(chalk.green("Connected to DB"));
    }).catch((err)=>{
        console.log(chalk.red("Error in DB Connection"));
        console.log(err);
    });
}


module.exports = connectToDB 