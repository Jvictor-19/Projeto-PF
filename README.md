const fs = require("fs")
const conteudo = fs.readFileSync("athlete_events.csv", 'utf8');
const dados = conteudo.split(',');
console.log(dados)
