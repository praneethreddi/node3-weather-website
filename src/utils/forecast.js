const request = require('request')
const forecast = (latitude,longitude,callback) => {
      const url= 'http://api.weatherapi.com/v1/forecast.json?key=4c114c5b5f714b489b4151158201110&q=/'+ latitude + ',' + longitude


      request({url : url,json:true},(error,response) =>{

        if(error)
          callback('unable to connect weather service',undefined)
        else if(response.body.error)
            callback('unable to find given location')
        else {
         callback(undefined,'it is currently  '+ response.body.current.temp_c + '  degrees  ' + 'and present situation is  ' + response.body.current.condition.text + '  outside' )

        }


      })



}

module.exports = forecast