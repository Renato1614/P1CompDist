var express = require("express");
var cors = require("cors");
var app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post("/", (req, res) => {
  let retangulos = req.body.retangulos; //recupera os retangulos vindo do client
  let areas = [];
  for (let i = 0; i < retangulos.length; i++) {
    areas.push(retangulos[i].altura * retangulos[i].largura);
  }
  res.json(areas); //retorna o array
});
app.listen(8080, function () {
  console.log("O servidor subiu sem erro");
});

