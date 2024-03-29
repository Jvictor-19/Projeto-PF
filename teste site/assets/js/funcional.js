const fs = require("fs");
const csv = require("csv-parser");

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
// Função para processar as linhas do CSV
const processarLinhas = (linha) => {
  console.log(linha);
};
const QuantasAtletasfemininasparticiparam = (lista, cidade) =>
  lista
    .filter((x) => cidade.includes(x.City))
    .filter((x) => x.Sex == "F")
    .map((x) => x.Name)
    .reduce((nomeSemRepetir, nome) => {
      if (!nomeSemRepetir.includes(nome)) {
        nomeSemRepetir.push(nome);
      }
      return nomeSemRepetir;
    }, []).length;

const quaisJogadores = (lista, cidade) =>
  lista
    .filter((x) => cidade.includes(x.City))
    .map((x) => x.Name)
    .reduce((nomeSemRepetir, nome) => {
      if (!nomeSemRepetir.includes(nome)) {
        nomeSemRepetir.push(nome);
      }
      return nomeSemRepetir;
    }, []);

const quantasVezesForamSediadas = (lista, cidade) =>
  lista
    .filter((x) => cidade.includes(x.City))
    .map((x) => x.Games)
    .reduce((vezesSemRepetir, sediou) => {
      if (!vezesSemRepetir.includes(sediou)) {
        vezesSemRepetir.push(sediou);
      }
      return vezesSemRepetir;
    }, []).length;

const primeiroPaisAmericaLatina = (lista) =>
  lista.filter((x) => x.City == "Cidade do Mexico")
    ? "México"
    : "Não foi encontrada";

// Exemplo de uso das funções
lerCSV("arquivo.csv")
  .then((dados) => {
    const cidade = "Barcelona";
    const quantasMulheres = QuantasAtletasfemininasparticiparam(dados, cidade);
    console.log(`Em ${cidade} participaram ${quantasMulheres} mulheres.`);
    const cidadesediou = "London";
    const VezesQueaCidadeSediou = quantasVezesForamSediadas(
      dados,
      cidadesediou
    );
    console.log(`${cidadesediou} sediou ${VezesQueaCidadeSediou} vezes.`);
    const PaisAmericaLatina = primeiroPaisAmericaLatina(dados);
    console.log(
      `O primeiro pais Da America Latina a sediar o jogos de verão foi o ${PaisAmericaLatina} em 1968 com sua cidade sede a Cidade do México.`
    );
  })
  .catch((error) => {
    console.error("Erro ao ler o arquivo CSV:", error);
  });
