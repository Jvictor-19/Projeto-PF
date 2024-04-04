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
//Função para descobrir se um país ganhou uma medalha de ouro em uma edição
const paiscommedalhadeouro = (pais, cidade, dados) => {
    const medalha = dados
        .filter((x) => x.Team === pais && x.City === cidade) // Filtra os dados para o país e cidade especificados
        .reduce((acc, atual) => {
            if (atual.Medal === "Gold") {
                return true; // Se encontrar uma medalha de ouro, retorna true
            }
            return acc; // Caso contrário, mantém o valor anterior de acc
        }, false); // Inicializa o acumulador como false

    if (medalha) {
        return `O país ${pais} obteve medalha de ouro na edição de ${cidade}.`;
    } else {
        return `O país ${pais} não obteve medalha de ouro na edição de ${cidade}.`;
    }
};

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
lerCSV("atletas.csv")
  .then((dados) => {
    const cidade = "London";
    const quantasMulheres = contarAtletasFemininas(dados, cidade);
    console.log(
      `Na cidade ${cidade} participaram ${quantasMulheres} mulheres.`
    );

    const medalhadeouro = paiscommedalhadeouro("Brazil","London",dados)
    console.log(medalhadeouro)

    const a = quantidadeJogadores(dados, "Rio de Janeiro");
    console.log(`Na cidade ${cidade} participaram ${a} atletas.`);

    const ano = anosSediados(dados, "London");
    console.log(`${ano}`);

    const quantidadeMedalhas = quantasMedalhas("United States", "Rio de Janeiro", dados);
    console.log(quantidadeMedalhas);
  })
  .catch((error) => {
    console.error("Erro ao ler o arquivo CSV:", error);
  });

//-----------------------------------FUNÇÃO PARA PESQUISAR-------------------------

function pesquisar() {
  // Obtém o valor digitado na barra de pesquisa
  var input = document.getElementById("searchInput").value.toUpperCase();
}
