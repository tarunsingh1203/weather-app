BASE_API = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/mullana,ambala,haryana%2CUK?unitGroup=us&key=WFSLG7UEN7CKU8MPC4ZU9DJYY"


let btn = document.querySelector(".btn")
let search = document.querySelector(".search input")
let temprature = document.querySelector(".temprature")
let wind = document.querySelector(".wind-speed")
let humidity = document.querySelector(".humidity")
let preci = document.querySelector(".preci")
let address = document.querySelector(".address")
let todayDate = document.querySelector(".today-date")
let cloud = document.querySelector(".cloud")
let todayImg = document.querySelector(".today img")





window.addEventListener("load", ()=>{
   let searchValue = search.value
   weather(searchValue)
})

btn.addEventListener("click", (evt)=>{
   evt.preventDefault()
   let searchValue = search.value
   weather(searchValue)
   
})


async function weather(searchValue){

   let API = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchValue}%2CUK?unitGroup=us&key=WFSLG7UEN7CKU8MPC4ZU9DJYY`

   if(searchValue === ""){
      let promise = await fetch(BASE_API)
      let data = await promise.json()
      working(data)
      

   }
   else{
      try{
         let promise = await fetch(API)
         let data = await promise.json()
         working(data)

      }
      catch(el){
         alert("Enter a valid city or state")
         search.value = ""
         
      }
      
   }

}



const working = (data)=>{

   let condition = data.currentConditions
   let tempInC = Math.floor((condition.temp - 32) * 5/9)
   let windSpeed = Math.floor(condition.windspeed)
   let humidityValue = Math.floor(condition.humidity)
   let preciValue = Math.floor(condition.windgust)

   address.innerText = data.resolvedAddress
   wind.innerText = `Wind : ${windSpeed}Km/h`
   humidity.innerText = `Humidity : ${humidityValue}%`
   preci.innerText = `precipitation : ${preciValue}`
   temprature.innerText = tempInC


   days(data);
}




function days(data){

   let findData = data.days

   todayDate.innerText = findData[0].datetime

   let day0 = todayDate
   let date0 = findData[0].datetime

   getDays(day0, date0)



   
   for(let i = 1; i<=7; i++){
      let maxTemp = Math.floor((findData[i].tempmax - 32) * 5/9)
      let minTemp = Math.floor((findData[i].tempmin - 32) * 5/9)

      let tempMax = document.querySelector(`#mmtemp${i} .max`)
      let tempMin = document.querySelector(`#mmtemp${i} .min`)
      let day = document.querySelector(`.d${i}`)


      tempMax.innerHTML = `${maxTemp}<sup>o</sup>`
      tempMin.innerHTML = `${minTemp}<sup>o</sup>`

      let date = findData[i].datetime

      getDays(day, date)

   }  
   search.value = ""
}

const getDays = (day, date) => {
   const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

   
   const d = new Date(date)
   let dayValue = days[d.getDay()]

   if(day === todayDate){
      day.innerText = `${dayValue}, ${date}`
   }

   else{
      day.innerText = dayValue
   }

}

// (°F - 32) x 5/9 =°C