const url = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0';

const cards = document.querySelector(".cards");

function createCard(title, imageUrl, types) {
    const card = document.createElement("div");
    card.classList.add("card");
    cards.appendChild(card);
    
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    card.appendChild(cardHeader);
    
    const cardImg = document.createElement("div");
    cardImg.style.backgroundImage = `url(${imageUrl})`;
    cardImg.classList.add("card-img");
    cardHeader.appendChild(cardImg);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = title;
    cardBody.appendChild(cardTitle);

    const typeDiv = document.createElement("div");
    typeDiv.classList.add("card-body");
    typeDiv.textContent = types;
    cardBody.appendChild(typeDiv);

    const cardButton = document.createElement("button");
    cardButton.classList.add("card-button");
    cardButton.textContent = "Catch It Now";
    cardBody.appendChild(cardButton);

    cardButton.addEventListener('click', function() {
        cardButton.classList.toggle("colored");
    });
}

fetch(url)
    .then((response) => response.json())
    .then((data) => {
    const pokemons = data.results;
    Promise.all(pokemons.map((pokemon) => fetch(pokemon.url).then(response => response.json())))
        .then((pokemonsData) => {
        const sortedPokemonsData = pokemonsData.sort((pokemonA, pokemonB) => pokemonA.id - pokemonB.id);

            sortedPokemonsData.forEach((pokemon) => {
                console.log(pokemon);
                const typesArray = pokemon.types.map(type => type.type.name);
                createCard(pokemon.name, pokemon.sprites.front_default, typesArray);
            });
        });
    })
    .catch((error) => {
    alert(error);
});

