

const express = require("express");

const https = require("https");

const bodyParser = require("body-Parser");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const query = req.body.cityName
  const apikey = "b36b6311a61b66b8299fe0394f8f5a36"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weather = JSON.parse(data)

      const temp = weather.main.temp;
      const weather_description = weather.weather[0].description;
      const icon = weather.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1>Currently the temperaturein"+ query + "is : " + temp + "</h1>");
      res.write("<h3>The weather is " + weather_description + "</h3>");
      res.write("<img src="+ imageURL  +">");
      res.send()

    })
  })
})

app.listen(3000, function(){
  console.log("Server is running on 3000 port: ");
});
// console.log(weather);
