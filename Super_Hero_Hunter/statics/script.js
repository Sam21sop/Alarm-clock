document.addEventListener('DOMContentLoaded', function () {
    const publicKey = '4e0b18378a2cf305a4eba0a9a51a2683';
    const privateKey = 'c9662d771810a1471da586c7bf5a993800916144';
    const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    const limit = 10;

    const searchInput = document.getElementById('search-input');
    const superheroesList = document.getElementById('superheroes-list');
    const favoritesList = document.getElementById('favorites-list');

    // Function to fetch superheroes
    function fetchSuperheroes() {
        const query = searchInput.value.trim();
        const url = `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&nameStartsWith=${query}`;

        fetch(url)
        .then(response => response.json())
        .then(data => displaySuperheroes(data.data.results))
        .catch(error => console.error('Error fetching superheroes:', error));
    }

    // Function to display superheroes
    function displaySuperheroes(superheroes) {
        superheroesList.innerHTML = '';

        superheroes.forEach(superhero => {
        const superheroCard = document.createElement('div');
        superheroCard.className = 'superhero-card';
        superheroCard.innerHTML = `
            <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}">
            <h3>${superhero.name}</h3>
            <button onclick="addToFavorites('${superhero.id}', '${superhero.name}')">Add to Favorites</button>
            <a href="superhero.html?id=${superhero.id}" target="_blank">More Info</a>
        `;

        superheroesList.appendChild(superheroCard);
        });
    }

    // Function to add superhero to favorites
    function addToFavorites(id, name) {
        const favoriteSuperhero = { id, name };
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.push(favoriteSuperhero);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }

    // Function to display favorites
    function displayFavorites() {
        favoritesList.innerHTML = '';

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites.forEach(favorite => {
        const favoriteItem = document.createElement('div');
        favoriteItem.className = 'favorite-item';
        favoriteItem.innerHTML = `
            <p>${favorite.name}</p>
            <button onclick="removeFromFavorites('${favorite.id}')">Remove from Favorites</button>
        `;

        favoritesList.appendChild(favoriteItem);
        });
    }

    // Function to remove superhero from favorites
    function removeFromFavorites(id) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(favorite => favorite.id !== id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        displayFavorites();
    }

    // Event listeners
    searchInput.addEventListener('input', fetchSuperheroes);

    // Initial display
    displayFavorites();
    });