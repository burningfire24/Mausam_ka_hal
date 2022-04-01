console.log("client side javascript is running!")


const weatherform = document.querySelector("form");
const search = document.querySelector("input")
const output1 = document.querySelector("#msg-1");
const output2 = document.querySelector("#msg-2");

weatherform.addEventListener("submit",(e)=>{
    e.preventDefault();

    const location = search.value;

    output1.textContent = "Loading...";
    output2.textContent ="";


    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
           
            if(data.error){
                output1.textContent = data.error;
            }
            else{
                output1.textContent = data.location;
                output2.textContent = data.weather_report;

            }
        })
    })

}) 