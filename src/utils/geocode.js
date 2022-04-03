const request=require("request")

const geocode=(address,callback)=>{
    const geocodingurl="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYnJpc2gyNCIsImEiOiJja3l6d3RrMnIxMGozMnZxdjl0aWY0a3dsIn0.rol6XFXi1mtDiNWukkOh0Q&limit=1"
    request({url:geocodingurl ,json:true},(error,response)=>{
        if(error){
            callback("out of network",undefined);
        }else if(response.body.features.length===0){
            callback("location not found",undefined);
        }else{
            const data={
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            }
            callback(undefined,data)
        }
       
    })
}

module.exports= geocode