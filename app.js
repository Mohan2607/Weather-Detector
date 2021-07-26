let loc=document.getElementById("location");
let tempicon=document.getElementById("temp-icon");
let tempval=document.getElementById("temp-value");
let climate=document.getElementById("climate");
let iconfile;
const searchinput=document.getElementById("search-input");
const sb=document.getElementById("search-button");

sb.addEventListener('click',(e)=>
    {
        e.preventDefault();
        if(searchinput.value.trim()=='')
           return alert("Enter The city name");
        if(/[0-9]/.test(searchinput.value))
            return alert("City name must not contain numbers");
        getWeather(searchinput.value);
        searchinput.value='';
    });
const getWeather= async (city)=>
{
    try
    {
        const response= await fetch(`https://api.openweathermap.org/data/2/weather?q=${city}&appid=eab578da391fa3a77a054947c7f6f`,
      
        {mode:'cors'}

        );

        const weatherdata= await response.json();   
        console.log(weatherdata);
        const{name}=weatherdata;
        const{temp}=weatherdata.main;
        const{feels_like}=weatherdata.main;
        const{id,main}=weatherdata.weather[0];
        loc.textContent=name;
        tempval.textContent=Math.round(feels_like-273);
        if(temp<=273 && temp>=279)
        {
        tempicon.src="./Images/thunderstrom.png"
        climate.textContent='Thunder & Rain';
        }
        else  if(temp>=291 && temp<=301)
        {
        tempicon.src="./Images/humidity.png"
        climate.textContent='Humidity';
        }
        else if(temp>=277 && temp<=285)
        {
        tempicon.src="./Images/rain.png"
        climate.textContent='Rainy';
        }
        else  if(temp<273)
        {
        tempicon.src="./Images/snow.png"
        climate.textContent='Cool';
        }
        else  if(temp>=286 && temp<=290)
        {
        tempicon.src="./Images/clouds.png"
        climate.textContent='Cloudy';
        }
        else if(temp>=302 && temp<=310)
        {
        tempicon.src="./Images/clouds-and-sun.png"
        climate.textContent='Sunny';
        }
        else if(temp>311)
        {
            tempicon.src="./Images/sun.png"
            climate.textContent='Hot';
        }
    }
    catch(error)
    {
        alert('city not found');
    }
};

window.addEventListener("load",()=>
{
    let lat;
    let long;
    if(navigator.geolocation)
    {
       navigator.geolocation.getCurrentPosition((position)=>
        {
            lat=position.coords.latitude;
            long=position.coords.longitude;
            //const proxy="https://cors-anywhere.herokuapp.com/";
             const api=`https://api.openweathermap.org/data/2/weather?lat=${lat}&lon=${long}&appid=eab578da391fa3a77a054947c7ff`
             
             fetch(api).then(response =>
                {
                    return response.json();
                })
            .then(data =>
                {
                    const{name}=data;
                    const{temp}=data.main;
                    const{feels_like}=data.main;
                    const{id,main}=data.weather[0];
                    loc.textContent=name;
                    climate.textContent=main;
                    tempval.textContent=Math.round(feels_like-273);
                    if(temp<=273 && temp>=279)
                    {
                    tempicon.src="./Images/thunderstrom.png"
                    climate.textContent='Thunder & Rain';
                    }
                    else  if(temp>=291 && temp<=301)
                    {
                    tempicon.src="./Images/humidity.png"
                    climate.textContent='Humidity';
                    }
                    else if(temp>=277 && temp<=285)
                    {
                    tempicon.src="./Images/rain.png"
                    climate.textContent='Rainy';
                    }
                    else  if(temp<273)
                    {
                    tempicon.src="./Images/snow.png"
                    climate.textContent='Cool';
                    }
                    else  if(temp>=286 && temp<=290)
                    {
                    tempicon.src="./Images/clouds.png"
                    climate.textContent='Cloudy';
                    }
                    else if(temp>=302 && temp<=310)
                    {
                    tempicon.src="./Images/clouds-and-sun.png"
                    climate.textContent='Sunny';
                    }
                    else if(temp>311)
                    {
                        tempicon.src="./Images/sun.png"
                        climate.textContent='Hot';
                    }
                    console.log(data,lat,long,data.name);

                })   

        })
    }
})
