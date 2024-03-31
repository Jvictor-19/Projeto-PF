const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const search = (event) => {
  if (event.key === "Enter") {
    const query = searchInput.value.toLowerCase();
    const filteredData = data.filter((item) =>
      item.toLowerCase().includes(query)
    );
    displayResults(filteredData);
  }
};

searchInput.addEventListener("keyup", search);

const displayResults = (results) => {
  searchResults.innerHTML = "";
  results.forEach((result) => {
    const li = document.createElement("li");
    li.textContent = result;
    searchResults.appendChild(li);
  });
};

// Dados de exemplo
const data = ["carolina", "alice", "vicente", "victor"];
