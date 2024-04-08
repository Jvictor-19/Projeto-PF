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
