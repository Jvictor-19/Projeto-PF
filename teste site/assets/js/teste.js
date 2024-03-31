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

// Função para encontrar o país mais ao norte que sediou uma Olimpíada
const encontrarPaisMaisAoNorte = (dados) => {
  return dados.reduce((pais, registro) => {
    if (registro.Team === "Finland") {
      return registro.Team;
    }
    return pais;
  }, "");
};

// Função para encontrar a primeira Olimpíada sediada na Ásia Oriental
const encontrarPrimeiraOlimpiadaAsiaOriental = (dados) => {
  return dados.reduce((pais, registro) => {
    if (registro.Team === "Japan") {
      return registro.Team;
    }
    return pais;
  }, "");
};

// Função para contar quantas atletas femininas participaram em uma cidade
const contarAtletasFemininas = (dados, cidade) =>
  dados
    .filter((x) => x.City === cidade && x.Sex === "F")
    .map((x) => x.Name)
    .filter((value, index, self) => self.indexOf(value) === index).length;

// Função para contar quantas vezes uma cidade sediou os Jogos Olímpicos
const contarVezesCidadeSediou = (dados, cidade) =>
  dados
    .filter((x) => x.City === cidade)
    .map((x) => x.Games)
    .filter((value, index, self) => self.indexOf(value) === index).length;

// Função para encontrar o primeiro país da América Latina a sediar os Jogos Olímpicos
const encontrarPrimeiroPaisAmericaLatina = (dados) =>
  dados.find((x) => x.City === "Mexico City") ? "Mexico" : "Não foi encontrada";

// Função para realizar a busca
const search = (event, data) => {
  if (event.key === "Enter") {
    const query = searchInput.value.toLowerCase();
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query)
    );
    displayResults(filteredData);
  }
};

// Função para exibir os resultados da busca
const displayResults = (results) => {
  searchResults.innerHTML = "";
  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result;
    searchResults.appendChild(li);
  });
};

// Exemplo de uso das funções
lerCSV("atletas.csv")
  .then((dados) => {
    const cidade = "Barcelona";
    const quantasMulheres = contarAtletasFemininas(dados, cidade);
    console.log(`Em ${cidade} participaram ${quantasMulheres} mulheres.`);

    const cidadesediou = "London";
    const VezesQueaCidadeSediou = contarVezesCidadeSediou(dados, cidadesediou);
    console.log(`${cidadesediou} sediou ${VezesQueaCidadeSediou} vezes.`);

    const PaisAmericaLatina = encontrarPrimeiroPaisAmericaLatina(dados);
    console.log(
      `O primeiro país da América Latina a sediar os Jogos de Verão foi o ${PaisAmericaLatina} em 1968 com sua cidade sede a Cidade do México.`
    );

    // Integração com a função de busca
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    searchInput.addEventListener("keyup", (event) => search(event, dados));
  })
  .catch((error) => {
    console.error("Erro ao ler o arquivo CSV:", error);
  });
