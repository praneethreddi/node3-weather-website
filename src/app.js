
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//const { readdirSync } = require('fs')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup directory to serve
app.use(express.static(publicDirectoryPath))

// app.get('',(req,res)=> {

//     res.send('<h1>Hello Folks</h1>')

// })
app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        name : 'Praneeth '

    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name : 'Praneeth'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This to help who are in need',
        title:'Help',
        name: 'Praneeth'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:'You must provide a address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={} )=>{
        if(error) {
            return res.send({error})
        }


        forecast(latitude,longitude,(error,forecastData)=>{
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
    // res.send({
    //     forecast:"mist outside",
    //     location:'Hyderabad',
    //     address:req.query.address
    // })


app.get('/products',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Praneeth ',
        errorMessage:'help article not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Praneeth ',
        errorMessage:'Page not found.'
    })
})


//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})