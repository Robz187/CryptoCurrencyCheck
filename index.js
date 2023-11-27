import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const apiURL = "https://api.blockchain.com/v3/exchange";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{

    res.render("index.ejs");
});

app.post("/",(req,res)=>{

    res.render("index.ejs");

});

app.post("/currency",async(req,res)=>{
    const currency = req.body.currency;
    try
    {   
        const result = await axios.get(apiURL+"/tickers/"+currency);
        res.render("currency.ejs",{data:result.data});
    }catch (error)
    {
        console.error(error.message);
        console.log(error);
    }
    
});


app.listen(port,()=>{

    console.log("Server started...");
});