/*const pegarCSV = () => {
  const url = '../assets/js/atletas.csv';

  fetch(url)
      .then(response => response.text())
      .then(resultado => {
      // Papa.parse() analisa o CSV em um array de objetos JavaScript
      const resultados = Papa.parse(resultado, {header: true}).data;

      // Filtra para linhas onde a coluna 'Nome' é 'Exemplo'
      const filtrado = resultados.filter(linha => linha.Nome === 'Exemplo');

      console.log(resultados)
      console.log(filtrado);
      })
      .catch(error => console.error('Erro:', error));
};

pegarCSV();

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
  .reduce((acc, x) => acc + x, 0);*/


  const pegarCSV = async () => {
    const url = '../assets/js/atletas.csv';
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Falha ao carregar o arquivo CSV');
      }
      
      const resultado = await response.text();
      return Papa.parse(resultado, { header: true }).data;
    } catch (error) {
      console.error('Erro:', error);
      throw error; // Rejeitar a promessa se ocorrer um erro
    }
  };
  
  
  // Função para contar quantas medalhas um país ganhou em uma cidade
  const quantasMedalhas = (pais, cidade, dados) =>
  dados.filter((x) => x.Team == pais)
    .filter((x) => x.City == cidade)
    .map((x) => (x.Medal != "NA" ? 1 : 0))
    .reduce((acc, x) => acc + x, 0);
  
  const contarAtletasFemininas = (dados, cidade) => {
    // Convertendo a cidade para letras minúsculas para garantir consistência
    cidade = cidade.toLowerCase();
    
    // Filtrando os dados para a cidade especificada
    const atletasNaCidade = dados.filter((x) => x.City.toLowerCase() === cidade);
  
    // Filtrando os atletas femininas na cidade e removendo duplicatas
    const atletasFemininas = atletasNaCidade
      .filter((x) => x.Sex === "F")
      .map((x) => x.Name)
      .filter((value, index, self) => self.indexOf(value) === index);
  
    // Retornando o número de atletas femininas na cidade
    return atletasFemininas.length;
  };
  
  
  
  
  async function pesquisar() {
    try {
      const dados = await pegarCSV()
      const input = document.getElementById("searchInput").value.toUpperCase();
      const input1 = document.getElementById("searchInput1").value.toUpperCase()
      const input2 = document.getElementById("searchInput2").value.toUpperCase()
      const quantasMulheres = contarAtletasFemininas(dados, input)
      const quantasmedalhasPais = quantasMedalhas(input2, input1)
      const resultadoLabel1 = document.getElementById("resultado1")
      resultadoLabel1.innerHTML = `O pais ${input2} ganhou ${quantasmedalhasPais} medalhas na edição de ${input1}`
      const resultadoLabel = document.getElementById("resultado2")
      resultadoLabel.innerHTML = `Na cidade ${input} participaram ${quantasMulheres} mulheres.`
    } catch (error) {
      console.error('Erro ao buscar dados do CSV:', error)
    }
  }