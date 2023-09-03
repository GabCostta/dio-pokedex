// Obtém referências aos elementos HTML pelo seu ID
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

// Define o número máximo de registros e o limite de registros por carregamento
const maxRecords = 151
const limit = 20

// Inicializa o deslocamento (offset) como zero
let offset = 0;

// Função para converter informações de um Pokémon em um elemento de lista (li)
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}"> 
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

// Função para carregar itens de Pokémon com base no deslocamento e limite
function loadPokemonItems(offset, limit) {
    // Chama o método 'getPokemons' do objeto 'pokeApi' para obter uma lista de Pokémon
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        // Converte os dados de Pokémon em elementos de lista (li) usando a função 'convertPokemonToLi'
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        
        // Adiciona os elementos de lista ao elemento 'pokemonList' no DOM
        pokemonList.innerHTML += newHtml
    })
}

// Inicialmente, carrega os primeiros Pokémon
loadPokemonItems(offset, limit)

// Adiciona um ouvinte de eventos para o botão 'loadMoreButton'
loadMoreButton.addEventListener('click', () => {
    // Incrementa o deslocamento (offset) pelo valor do limite
    offset += limit

    // Calcula a quantidade de registros com a próxima página
    const qtdRecordsWithNextPage = offset + limit

    // Verifica se não há mais registros a serem carregados
    if (qtdRecordsWithNextPage >= maxRecords) {
        // Se não houver mais registros, define um novo limite para carregar os últimos Pokémon
        const newLimit = maxRecords - offset

        // Chama a função para carregar os Pokémon restantes
        loadPokemonItems(offset, newLimit)

        // Remove o botão 'loadMoreButton', pois todos os Pokémon foram carregados
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        // Se ainda houver mais Pokémon a serem carregados, continua carregando com o limite padrão
        loadPokemonItems(offset, limit)
    }
})
