const pegarCSV = () => {
  const url = "../assets/js/atletas.csv";

  return fetch(url) //fetch responsável pela leitura do CSV
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao obter os dados do CSV");
      }
      return response.text();
    })
    .then((resultado) => {
      // Papa.parse() analisa o CSV em um array de objetos JavaScript
      return Papa.parse(resultado, { header: true }).data; //Remove o cabeçalho
    })
    .catch((error) => {
      throw new Error(`Erro ao buscar dados do CSV: ${error.message}`);
    });
};

function pesquisar1() {
  // Cidade e Pais escolhidos pelo usuário.
  var cidade = document
    .getElementById("searchInput1.1")
    .value.trim()
    .toLowerCase();
  var pais = document
    .getElementById("searchInput1.2")
    .value.trim()
    .toLowerCase();

  pegarCSV()
    .then((resultados) => {
      const filtrado4 = resultados
        .filter((x) => x.Team.toLowerCase() === pais)
        .filter((x) => x.City.toLowerCase() === cidade)
        .map((x) => (x.Medal != "NA" ? 1 : 0))
        .reduce((acc, x) => acc + x, 0);

      if (filtrado4 > 0) {
        document.getElementById(
          "resultadoPesquisa1"
        ).innerHTML = `O País ${pais} obteve ${filtrado4} medalhas nas Olimpiadas de ${cidade}`;
      } else {
        document.getElementById(
          "resultadoPesquisa1"
        ).innerHTML = `O País ${pais} não obteve medalhas nas Olimpiadas de ${cidade}.`;
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function pesquisar2() {
  var cidade = document
    .getElementById("searchInput2")
    .value.trim()
    .toLowerCase();

  pegarCSV()
    .then((resultados) => {
      // Filtra para linhas onde a coluna 'City' é igual à cidade pesquisada e 'Sex' igual ao genêro do atleta
      const filtrado1 = resultados
        .filter((x) => x.City.toLowerCase() === cidade && x.Sex === "F")
        .map((x) => x.Name)
        .filter((value, index, self) => self.indexOf(value) === index).length;

      if (filtrado1 > 0) {
        //Condicional caso a quantidade de mulheres seja maior que zero
        document.getElementById(
          "resultadoPesquisa2"
        ).innerHTML = `Participaram ${filtrado1} mulheres nas Olímpiadas de ${cidade}`;
      } else {
        document.getElementById(
          "resultadoPesquisa2"
        ).innerHTML = `Não há dados disponíveis em ${cidade}`;
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function pesquisar3() {
  var cidade = document
    .getElementById("searchInput3")
    .value.trim()
    .toLowerCase();

  pegarCSV()
    .then((resultados) => {
      // Filtra quando o "City" é igual a cidade buscada pelo usuário
      const filtrado2 = resultados
        .filter((x) => x.City.toLowerCase() === cidade)
        .map((x) => x.Name)
        .reduce((nomeSemRepetir, nome) => {
          return nomeSemRepetir.indexOf(nome) === -1
            ? nomeSemRepetir.concat(nome)
            : nomeSemRepetir;
        }, []).length;

      if (filtrado2 > 0) {
        //Usa a condicional para mostrar a quantidade de atletas
        document.getElementById(
          "resultadoPesquisa3"
        ).innerHTML = `Participaram ${filtrado2} atletas nas Olímpiadas de ${cidade}`;
      } else {
        document.getElementById(
          "resultadoPesquisa3"
        ).innerHTML = `Não há dados disponíveis em ${cidade}`;
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function pesquisar4() {
  var cidade = document
    .getElementById("searchInput4")
    .value.trim()
    .toLowerCase();

  pegarCSV()
    .then((resultados) => {
      // Filtra para linhas onde a coluna 'City' é igual à cidade pesquisada
      const filtrado3 = resultados
        .filter((x) => x.City.toLowerCase() === cidade)
        .map((x) => x.Year)
        .reduce((anos, ano) => {
          return anos.indexOf(ano) === -1 ? anos.concat(ano) : anos;
        }, []);

      if (filtrado3.length > 0) {
        //Usa a condicional para mostrar os anos em que uma cidade sediou o evento
        document.getElementById(
          "resultadoPesquisa4"
        ).innerHTML = `A cidade de ${cidade} sediou os Jogos Olímpicos em ${filtrado3}`;
      } else {
        document.getElementById(
          "resultadoPesquisa4"
        ).innerHTML = `Não foram encontradas informações para a cidade de ${cidade}.`;
      }
    })
    .catch((error) => console.error("Erro:", error));
}

function pesquisar5() {
  // Pegando o valor inserido no campo de pesquisa
  var cidade = document
    .getElementById("searchInput5")
    .value.trim()
    .toLowerCase();

  // Chama pegarCSV() para obter os dados do CSV
  pegarCSV()
    .then((resultados) => {
      // Filtra para linhas onde a coluna 'City' é igual à cidade pesquisada
      const filtrado = resultados
        .filter((x) => x.City.toLowerCase() === cidade)
        .map((x) => x.Year)
        .reduce((anos, ano) => {
          return anos.indexOf(ano) === -1 ? anos.concat(ano) : anos;
        }, []);

      // Se houver resultados, exibe na div "resultadoPesquisa5", senão exibe uma mensagem de erro
      if (filtrado.length > 0) {
        document.getElementById(
          "resultadoPesquisa5"
        ).innerHTML = `A cidade de ${cidade} sediou os Jogos Olímpicos ${filtrado.length} vez(es).`;
      } else {
        document.getElementById(
          "resultadoPesquisa5"
        ).innerHTML = `Não foram encontradas informações para a cidade de ${cidade}.`;
      }
    })
    .catch((error) => console.error("Erro:", error));
}
