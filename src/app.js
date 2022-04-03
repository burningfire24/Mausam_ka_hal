const express=require("express")
const path = require("path")
const hbs = require("hbs")
const geocode=require("./utils/geocode")
const forcast=require("./utils/weather_forcast")
const { request } = require("http")

const app = express()

const port = process.env.PORT || 3000

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
            error:"Please provide an address not provided!"
        })
    }else{
            const address = req.query.address
            geocode(address,(error,data)=>{
                if(!error){
                    forcast(data,(error,Rdata)=>{
                        if(!error){
                            res.send({
                                location:address,
                                country:Rdata.country,
                                weather_report:Rdata.condition,

                            })
                        
                        }else{
                            return res.send(error)
                        }
                        
                    })
                }else{
                    return res.send({
                        error:error,
                        data:data
                    })
                }
                
                    
            })
        
    }
   
})


app.get('*',(req,res)=>{
    res.render("404",{
        error:404
    })
})
app.listen(port,()=>{
    console.log("server is running on port ",port)
})