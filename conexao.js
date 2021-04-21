let xInicial = [];
let yInicial = [];
let xFinal = [];
let yFinal = [];

let canvasx = document.getElementById("mycanvas").offsetLeft;
let canvasy = document.getElementById("mycanvas").offsetTop;

let retangulos=[];
let x = [];
let y = [];
let i = 0;

let cores = ['black', 'red', 'blue', 'green', 'orange']
function CooredenadasIniciais(event) {
  xInicial.push(event.clientX);
  yInicial.push(event.clientY);
}
function CooredenadasFinais(event) {
  xFinal.push(event.clientX);
  yFinal.push(event.clientY);

  x.push(xFinal[i] - xInicial[i]);
  y.push(yFinal[i] - yInicial[i]);
  retangulos.push(new Retangulo(xInicial[i],yInicial[i], xFinal[i], yFinal[i], x[i], y[i]))

  desenharRetangulo();
}
function desenharRetangulo() {
  var c = document.getElementById("mycanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.rect(xInicial[i] - canvasx, yInicial[i] - canvasy, x[i], y[i]);
  ctx.strokeStyle = cores[i];
  ctx.lineWidth = 1;
  ctx.stroke();
  i++;
  CalculaArea()
}
function CalculaArea() {
  let respostas = $("#respostas").children();
  console.log(respostas.length);
  for (let i = 0; i < respostas.length; i++) {
    respostas[i].remove();
  }
  $.ajax({
    method: "POST",
    url: "http://localhost:8080/",
    data: { retangulos: retangulos },
    dataType: "json", //change the datatype to 'jsonp' works in most cases
    success: (res) => {
      let tag = $("#respostas");
      for (let i = 0; i < res.length; i++) {
        tag.append(
          "<p> o Retangulo " + (i + 1) + " tem " + res[i] + " pixels² de area"
        );
      }
    },
  });
}
