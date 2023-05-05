const pokeApi = {}

// Função para obter os detalhes de um Pokémon específico
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url).then((response) => response.json())
}

// Função para obter uma lista de pokémons com base nos parâmetros de offset e limit
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    // Realiza uma requisição fetch para a API da PokeAPI com a URL construída
    // e obtém a resposta em formato JSON
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results) // Obtém a lista de resultados dos pokémons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia os resultados para obter os detalhes de cada Pokémon
    .then((detailRequests) => Promise.all(detailRequests)) // Aguarda todas as requisições de detalhes serem concluídas
    .then((pokemonsDetails) => pokemonsDetails) // Retorna a lista de detalhes dos pokémons
    .catch((error) => console.error(error)) // Trata erros caso ocorram durante o processo
}

