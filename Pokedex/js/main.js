
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;
let global;

function convertPokemonToLi(pokemon) {
    return `
        <button class="newpage">
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
        </button> 
    `   
}


//<button class="pokemon ${pokemon.type}">

//</button>
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        // Capturando os botões pelo nome da classe
        var meuBotao = document.getElementsByClassName("newpage");

        for (var i = 0; i < meuBotao.length; i++) {
            meuBotao[i].addEventListener("click", function() {
                window.location.href = "http://127.0.0.1:5500/detalhesPokedex/detailPokedex.html";
            });
        }

        });
        

    }



loadPokemonItens(offset, limit)



getNumber = () => {
    pokeApi.getPokemons().then((pokemons = []))
    .then((result) => {return result[3].number})
    .then( (number) => {
        global = number;
        console.log(global)
        return global;
    } )
}


  




loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})




