const fs = require("fs");
const csv = require("csv-parser");

// Função para ler o arquivo CSV e retornar os dados como uma Promise
const lerCSV = (caminhoArquivo) => {
  return new Promise((resolve, reject) => {
    const resultados = [];
    fs.createReadStream(caminhoArquivo)
      .pipe(csv())
      .on("data", (linha) => {
        resultados.push(linha);
      })
      .on("end", () => {
        resolve(resultados);
      })
      .on("error", (error) => {
        console.error("Erro ao ler o arquivo CSV:", error);
        reject(error);
      });
  });
};

// Função para contar quantas vezes uma cidade sediou os Jogos Olímpicos
const contarVezesCidadeSediou = (dados, cidade) =>
  dados
    .filter((x) => x.City === cidade)
    .map((x) => x.Games)
    .filter((value, index, self) => self.indexOf(value) === index).length;

// Função para contar quantas atletas femininas participaram em uma cidade
const contarAtletasFemininas = (dados, cidade) =>
  dados
    .filter((x) => x.City === cidade && x.Sex === "F")
    .map((x) => x.Name)
    .filter((value, index, self) => self.indexOf(value) === index).length;

// Função para contar a quantidade de jogadores em uma cidade
const quantidadeJogadores = (dados, cidade) =>
  dados
    .filter((x) => x.City == cidade)
    .map((x) => x.Name)
    .reduce((nomeSemRepetir, nome) => {
      if (!nomeSemRepetir.includes(nome)) {
        nomeSemRepetir.push(nome);
      }
      return nomeSemRepetir;
    }, []).length;

// Função para obter os anos em que uma cidade sediou os Jogos Olímpicos
const anosSediados = (dados, cidade) =>
  dados
    .filter((x) => x.City == cidade)
    .map((x) => x.Year)
    .reduce((anos, ano) => {
      if (!anos.includes(ano)) {
        anos.push(ano);
      }
      return anos;
    }, []);

// Função para contar quantas medalhas um país ganhou em uma cidade
const quantasMedalhas = (pais, cidade, dados) =>
  dados
    .filter((x) => x.Team == pais)
    .filter((x) => x.City == cidade)
    .map((x) => (x.Medal != "NA" ? 1 : 0))
    .reduce((acc, x) => acc + x, 0);

// Lê o arquivo CSV e executa as operações desejadas
lerCSV("./banco/atletas.csv")
  .then((dados) => {
    const cidade = "London";
    const quantasMulheres = contarAtletasFemininas(dados, cidade);
    console.log(
      `Na cidade ${cidade} participaram ${quantasMulheres} mulheres.`
    );

    const cidadesediou = "London";
    const VezesQueaCidadeSediou = contarVezesCidadeSediou(dados, cidadesediou);
    console.log(`${cidadesediou} sediou ${VezesQueaCidadeSediou} vezes.`);

    const a = quantidadeJogadores(dados, "Rio de Janeiro");
    console.log(`Na cidade ${cidade} participaram ${a} atletas.`);

    const ano = anosSediados(dados, "London");
    console.log(`${ano}`);

    const b = quantasMedalhas("United States", "Rio de Janeiro", dados);
    console.log(b);
    document.getElementById("resultado1").innerHTML = b;
  })
  .catch((error) => {
    console.error("Erro ao ler o arquivo CSV:", error);
  });
