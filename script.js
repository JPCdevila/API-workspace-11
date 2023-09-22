document.addEventListener("DOMContentLoaded", function () {
    
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
        .then(response => response.json())
        .then(data => {
            mostrarResultados(data);
        })
        .catch(error => {
            console.error("Error al obtener cócteles:", error);
        });

    const cocktailNameInput = document.getElementById("cocktailName");
    cocktailNameInput.addEventListener("input", function () {
        const searchTerm = cocktailNameInput.value.toLowerCase();
        const allCocktails = document.querySelectorAll(".cocktail");

        allCocktails.forEach(cocktail => {
            const cocktailTitle = cocktail.querySelector("h2").textContent.toLowerCase();
            if (cocktailTitle.includes(searchTerm)) {
                cocktail.style.display = "block";
            } else {
                cocktail.style.display = "none";
            }
        });
    });
});

function mostrarResultados(data) {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";

    if (data.drinks) {
        data.drinks.forEach(cocktail => {
            const cocktailName = cocktail.strDrink;
            const cocktailThumbnail = cocktail.strDrinkThumb;
            const cocktailInstructions = cocktail.strInstructions;

            const cocktailDiv = document.createElement("div");
            cocktailDiv.classList.add("cocktail");

            const cocktailImage = document.createElement("img");
            cocktailImage.src = cocktailThumbnail;
            cocktailImage.alt = cocktailName;

            const cocktailTitle = document.createElement("h2");
            cocktailTitle.textContent = cocktailName;

            const cocktailInstructionsP = document.createElement("p");
            cocktailInstructionsP.textContent = cocktailInstructions;

            cocktailDiv.appendChild(cocktailImage);
            cocktailDiv.appendChild(cocktailTitle);
            cocktailDiv.appendChild(cocktailInstructionsP);

            resultadosDiv.appendChild(cocktailDiv);
        });
    } else {
        resultadosDiv.textContent = "No se encontraron resultados.";
    }
}
