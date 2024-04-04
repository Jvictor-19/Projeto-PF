document.addEventListener("DOMContentLoaded", () => {
  const filePath = "./atletas.csv";

  const processarCSV = (CSVlinha) => {
    const linhas = CSVlinha.split(/\r?\n/);
    const cabecalho = linhas[0]
      .split(",")
      .map((elemento) => elemento.replace(/["]/g, ""));

    const dados = linhas.slice(1).map((linha) => {
      const valores = linha
        .split(",")
        .map((elemento) => elemento.replace(/["]/g, ""));
      return cabecalho.reduce((obj, key, index) => {
        obj[key] = valores[index];
        return obj;
      }, {});
    });

    return dados;
  };

  const lerCSV = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Erro ao ler o arquivo CSV: ${response.status}`);
      }
      const CSVlinha = await response.text();
      return processarCSV(CSVlinha);
    } catch (error) {
      console.error("Erro ao ler o arquivo CSV:", error);
      return [];
    }
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

  let dadosCSV;

  lerCSV(filePath)
    .then((dados) => {
      dadosCSV = dados;
      const cidade = "London";
      const quantasMulheres = contarAtletasFemininas(dados, cidade);
      console.log(
        `Na cidade ${cidade} participaram ${quantasMulheres} mulheres.`
      );

      const cidadesediou = "London";
      const VezesQueaCidadeSediou = contarVezesCidadeSediou(
        dados,
        cidadesediou
      );
      console.log(`${cidadesediou} sediou ${VezesQueaCidadeSediou} vezes.`);

      const a = quantidadeJogadores(dados, "Rio de Janeiro");
      console.log(`Na cidade ${cidade} participaram ${a} atletas.`);

      const ano = anosSediados(dados, "London");
      console.log(`${ano}`);

      const b = quantasMedalhas("United States", "Rio de Janeiro", dados);
      console.log(b);
    })
    .catch((error) => {
      console.error("Erro ao ler o arquivo CSV:", error);
    });

  // Função para pesquisar e exibir o resultado
  function pesquisar() {
    const input = document.getElementById("searchInput").value.toUpperCase();
    const quantasMulheres = contarAtletasFemininas(dadosCSV, input);
    const resultadoLabel = document.getElementById("resultado2");
    resultadoLabel.innerHTML = `Na cidade ${input} participaram ${quantasMulheres} mulheres.`;
  }

  // Função para exibir resultado
  function exibirResultado() {
    // Obtém o elemento onde o resultado será exibido
    const resultadoLabel = document.getElementById("resultado2");
    resultadoLabel.innerHTML = quantasMulheres;
  }
});
