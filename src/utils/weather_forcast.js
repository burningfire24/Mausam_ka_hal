const request=require("request");

const weather_forcast=(data,callback)=>{

    const url ="http://api.weatherstack.com/current?access_key=5e6f3684fe46817c9417c78d3574ee3b&query="+data.latitude+","+data.longitude;
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect",undefined)
        }else if(response.body.error){
            callback(response.body.error.message,undefined)
        }else{
            returndata = {
                location:response.body.location.region,
                country:response.body.location.country,
                condition:response.body.current.weather_descriptions[0]
            }
            callback(undefined,returndata) 
        }
        // console.log(response.body);

})}




module.exports = weather_forcast