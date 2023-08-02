    const express = require('express')
    const app = express()
    const port = process.env.PORT || 3000

    
    const path = require ("path")
    const publicDirectory =  path.join(__dirname , '../public')
    app.use (express.static (publicDirectory))


    app.set('view engine', 'hbs');
    const viewsDirectory = path.join (__dirname , "../temp1/views" )
    app.set( "views" , viewsDirectory)

    var hbs = require ('hbs')
    const partialsPath = path.join (__dirname , "../temp1/partials")
    hbs.registerPartials(partialsPath)


    app.get('/' , (req , res) => {
        res.render('index' , {
            title: "HOME",
            desc : "Welcome to our website to check the weather"
        })
    })
    app.get('/weather' , (req , res) => {
        res.render('weather' , {
            title : "Weather",
            country : "Egypt",
            latitude: 26.4941838299718,
            longitude: 29.871903452398,
            weather: "Clear",
            temperature: 28
        })
    })
    app.get('/check' , (req , res) => {
        res.render('check' , {
            title: "check weather",
            desc : "Welcome to our website to check the weather"
        })
    })

    const geocode = require('./tools/geocode')
const forecast = require('./tools/forecast')

app.get('/checkweather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,dataForecast)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                condition:dataForecast.condition,
                location:req.query.address,
                latitude:data.latitude,
                longitude:data.longitude
            })
        })
    })
})


app.get('*' , (req , res)=> {
  res.send('404 Page Not Founded')
})

    app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
    
