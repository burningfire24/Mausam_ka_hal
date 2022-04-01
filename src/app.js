const express=require("express")
const path = require("path")
const hbs = require("hbs")
const geocode=require("./utils/geocode")
const forcast=require("./utils/weather_forcast")
const { request } = require("http")

const app = express()



// Define paths for Express config
const pathdirectory= path.join(__dirname,"../public");
const viewspath=path.join(__dirname,"../tamplates/views")
const partialpath=path.join(__dirname,"../tamplates/partials")





// Setup static directory to serve
app.use(express.static(pathdirectory))





// Setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewspath)
hbs.registerPartials(partialpath)

app.get("",(req,res)=>{
    res.render("index",{
        name:"Brish",
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"contact us",
        name:"Brish",
    })
})


app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About us",
        name:"Brish",
    })
})


app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Error address not provided"
        })
    }else{
            const address = req.query.address
            geocode(address,(error,data)=>{
                if(error){
                    return res.send(error)
                }
                forcast(data,(error,about_weather)=>{
                    if(error){
                        return res.send(error)
                    }
                    res.send({
                        location:address,
                        weather_report:about_weather
                    })
                })
                    
            })
        
    }
   
})


app.get('*',(req,res)=>{
    res.render("404",{
        error:404
    })
})
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})