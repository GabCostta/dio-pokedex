// Definindo um objeto chamado 'pokeApi'
const pokeApi = {}

// Função para converter detalhes da PokeAPI em objetos Pokémon
function convertPokeApiDetailToPokemon(pokeDetail) {
    // Cria um novo objeto Pokémon
    const pokemon = new Pokemon()
    
    // Atribui o número e nome do Pokémon com base nos detalhes da PokeAPI
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    // Extrai os tipos do Pokémon a partir dos detalhes e define-os no objeto Pokémon
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    // Define a foto do Pokémon com base nos detalhes da PokeAPI
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    // Retorna o objeto Pokémon
    return pokemon
}

// Método 'getPokemonDetail' no objeto 'pokeApi' para obter detalhes de um Pokémon
pokeApi.getPokemonDetail = (pokemon) => {
    // Faz uma requisição à PokeAPI com a URL do Pokémon
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon) // Converte os detalhes em um objeto Pokémon
}

// Método 'getPokemons' no objeto 'pokeApi' para obter uma lista de Pokémon
pokeApi.getPokemons = (offset = 0, limit = 5) => {
    // Cria a URL para buscar Pokémon com base no deslocamento (offset) e limite (limit)
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    // Faz uma requisição à PokeAPI com a URL criada
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results) // Obtém a lista de resultados
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Mapeia cada Pokémon para obter seus detalhes
        .then((detailRequests) => Promise.all(detailRequests)) // Aguarda todas as solicitações detalhadas
        .then((pokemonsDetails) => pokemonsDetails) // Retorna os detalhes dos Pokémon
}
