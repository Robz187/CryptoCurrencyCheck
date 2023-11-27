import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;
const apiURL = 'https://api.coincap.io/v2';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/",(req,res)=>{

    res.render("index.ejs");
});
app.get("/currency",(req,res)=>{

    res.redirect("/");
})
app.post("/",(req,res)=>{

    res.render("index.ejs");

});

app.post("/currency",async(req,res)=>{
    const currency = req.body.currency;
    try
    {   
        const result = await axios.get(apiURL+"/assets/"+currency);
        const jsonData = JSON.stringify(result.data);
        const data = JSON.parse(jsonData);
        res.render("currency.ejs",data);
    }
    catch (error)
    {
        console.error(error.message);
        console.log(error);
    }
});

app.post("/graph",async(req,res)=>{
    const currency = req.body.currency;
    try
    {
       const history =await axios.get(apiURL+"/assets/"+currency+"/history?interval=d1");
       const historyData = JSON.stringify(history.data);
       const graphdata = JSON.parse(historyData);
       console.log(graphdata);
        res.render("graphdata.ejs",graphdata)
       
    } catch(error)
    {
       console.error(error.message);
       console.log(error); 
    } 

})
app.get("/graph",(req,res)=>{

    res.redirect("/");
})

app.listen(port,()=>{

    console.log("Server started...");
});