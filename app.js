const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'));

app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html")
})
//api key = 8dc6404f4ef74e56c1072390fb46cdc3-us12
//unique id =  04b7b7a83a
app.post("/",function(req,res){
   var fname = req.body.fname;
   var lname  = req.body.lname;
   var email = req.body.email;
   data = {
    members: [
        {
         email_address: email,
         status: "subscribed",
         merge_fields :{
            FNAME :fname,
            LNAME :lname
         }
        }
    ]  
   };
   var jsonData = JSON.stringify(data);
   const url = "https://us12.api.mailchimp.com/3.0/lists/04b7b7a83a";
  
   const options ={
   
      method :"POST",
      auth:"CodeByte:8dc6404f4ef74e56c1072390fb46cdc3-us12"

   }    
    const request =  https.request(url,options,function(response){
     response.on("data",function(data){
        console.log(JSON.parse(data));
        if (response.statusCode==200){
            res.sendFile(__dirname+"/success.html")
            
            }
        else{
            res.sendFile(__dirname+"/failure.html")
        }    
        
     })
   }) 
   request.write(jsonData);
   request.end();
})
app.post("/failure",function(req,res){
 res.redirect("/"); 
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running at port 3000")
})