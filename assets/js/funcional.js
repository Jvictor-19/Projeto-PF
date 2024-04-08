const pegarCSV = () => {
  const url = '../assets/js/atletas.csv';

  return fetch(url) //fetch responsável pela leitura do CSV
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao obter os dados do CSV');
      }
      return response.text();
    })
    .then(resultado => {
      // Papa.parse() analisa o CSV em um array de objetos JavaScript
      return Papa.parse(resultado, { header: true }).data; //Remove o cabeçalho
    })
    .catch(error => {
      throw new Error(`Erro ao buscar dados do CSV: ${error.message}`);
    });
};


function pesquisar1(){
   // Cidade e Pais escolhidos pelo usuário.
  var cidade = document.getElementById("searchInput1.1").value.trim().toLowerCase()
  var pais = document.getElementById("searchInput1.2").value.trim().toLowerCase()

  pegarCSV()
    .then(resultados => {
      const filtrado4 = resultados.filter((x) => x.Team.toLowerCase() === pais)
      .filter((x) => x.City.toLowerCase() === cidade)
      .map((x) => (x.Medal != "NA" ? 1 : 0))
      .reduce((acc, x) => acc + x, 0)

      if (filtrado4 > 0) { 
        document.getElementById("resultadoPesquisa1").innerHTML = `O País ${pais} obteve ${filtrado4} medalhas nas Olimpiadas de ${cidade}`
      } else {
        document.getElementById("resultadoPesquisa1").innerHTML = `O País ${pais} não obteve medalhas nas Olimpiadas de ${cidade}.`;
      }
  })
    .catch(error => console.error('Erro:', error));
}

