let form = document.getElementById('form1')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    weatherFunction()
    form.reset()
})
const errorF = document.getElementById('error')
const locationF = document.getElementById('location')
const conditionF = document.getElementById('condition')
const longandlatF =document.getElementById('longandlat')
let weatherFunction = async() =>{
    try{
        const address = document.getElementById('address').value
        const res = await fetch('http://localhost:3000/checkweather?address='+address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText =""
            longandlatF.innerText=""
            conditionF.innerText =""
        }
        else {
            locationF.innerText = "Location is : " +data.location
            setTimeout(function(){
                longandlatF.innerText= "Latitude is : " +data.latitude + " And  Longitude is : " +data.longitude
            },500)
            setTimeout(function(){
                conditionF.innerText = "The condition is : " +data.condition 
            },1000)
            errorF.innerText =""
        }
    }
    catch(e){
        console.log(e)
    }
}