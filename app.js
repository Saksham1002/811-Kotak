var express=require("express");
var bodyParser=require("body-parser");
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/811kotak');
var db=mongoose.connection;
db.on('error',console.log.bind(console,"connection error"));
db.once('open',function(callback)
{
    console.log("connection succeeded");
})

var app=express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended:true
}));

app.post('/sign_up',function(req,res){
    var name=req.body.name;
    var email=req.body.email;
    var number=req.body.number;
    var term1=req.body.term1;
    var term2=req.body.term2;
    //write the fields of the form field like name,email,password,number ie the input type
   var data={
    "name":name,//id:(var name=req.body.name;)other field is taken from the above statement like var name ka name
    "email":email,
    "number":number,
    "term1":term1,
    "term2":term2
   
    
   }

db.collection('kotakformdetails').insertOne(data,function(err,collection){
    if(err) throw err;
    console.log("record inserted successfully");
});

return res.redirect('success.html');
})

app.get('/',function(req,res){
    res.set({
        'Access-control-Allow-Origin':'*'

    });
    return res.redirect('index.html');
}).listen(4200)

console.log("server listening at port 2200");