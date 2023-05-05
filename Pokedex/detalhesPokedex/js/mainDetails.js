const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;



function convertPokemonAbilitiesToLi(pokemonAbilities) {
    return pokemonAbilities.map((abilitySlot) => ` ${abilitySlot.ability.name}`)
}

function convertPokemonTypesToLi(pokemonTypes) {
    return pokemonTypes.map((TypeSlot) => `<li >${TypeSlot.type.name}</li>`)
}

function convertPokemonTypesToLi2(pokemonTypes) {
    return pokemonTypes.map((TypeSlot) => `${TypeSlot.type.name}`)
}

function convertPokemonMovesToLi(pokemonTypes) {
    return pokemonTypes.map((MoveSlot) => `<li>${MoveSlot.move.name}</li>`)
}


function convertPokemonToLi(pokemon, pokemon2) {
    return `
        <div class = "pokemonMain">
            <section class="pokemon ${convertPokemonTypesToLi2(pokemon.types)[0]}">
                <div id="name">${pokemon.name}</div>
                <div id="number">#${pokemon.id}</div>
                <ol id="types">
                    ${pokemon.types.map((TypeSlot) => `<li id="type" class="${TypeSlot.type.name}">${TypeSlot.type.name}</li>`).join('')}
                </ol>
                <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
            </section>
            <section class="details">
                <div id="menu">

                    <div id = "botões">
                    <button class="escondeAbout"> About </button>
                    <button class="mostraBase"> Base data </button>
                    <button class="mostraMoves"> Moves </button>
                    </div>

                    <ul class="showAbout">
                        <li>
                            specie: <span class = "cont">${pokemon.name}</span>
                        </li>
                        <li>
                            height: <span class = "cont">${pokemon.height}</span>
                        </li>
                        <li>
                            weight: <span class = "cont">${pokemon.weight}</span>
                        </li>
                        <li>abilities: ${convertPokemonAbilitiesToLi(pokemon.abilities)}</li>
                        <br>
                    </ul>

                    <ul class="showBase" style="display:none">
                        
                        <li>HP: ${pokemon.stats[0].base_stat} </li>
                        <li>Attack: ${pokemon.stats[1].base_stat}</li>
                        <li>Defense: ${pokemon.stats[2].base_stat}</li>
                        <li>Sp.Attack: ${pokemon.stats[3].base_stat}</li>
                        <li>Sp.Defense: ${pokemon.stats[4].base_stat}</li>
                        <li>Speed: ${pokemon.stats[5].base_stat}</li>
                    </ul> 
                    
                    <ul class="showMoves" style="display:none">
                        <li>Moves: 
                        ${convertPokemonMovesToLi(pokemon.moves).join(' ')}
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    `
}

const about = document.getElementById('js')

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        about.innerHTML += pokemons.map(convertPokemonToLi).join('')

        
        //Botões
        var escondeAbout = document.getElementsByClassName("escondeAbout");
        var mostraBase = document.getElementsByClassName("mostraBase");
        var mostraMoves = document.getElementsByClassName("mostraMoves"); 
        
        //listas
         var showAbout = document.getElementsByClassName("showAbout");
         var showBase = document.getElementsByClassName("showBase");
         var showMoves = document.getElementsByClassName("showMoves");

        for (var i = 0; i < showAbout.length; i++) {

            escondeAbout[i].addEventListener("mouseover", function() {

                for (var z = 0; z < i; z++) {
                    showAbout[z].style.display = "block";
                    showBase[z].style.display = "none"; 
                    showMoves[z].style.display = "none";
                }

            })

            mostraBase[i].addEventListener("mouseover", function() {
                

                for (var z = 0; z < i; z++) {
                    showAbout[z].style.display = "none";
                    showBase[z].style.display = "block"; 
                    showMoves[z].style.display = "none";
                }

            })


            mostraMoves[i].addEventListener("mouseover", function() {
                

                for (var z = 0; z < i; z++) {
                    showAbout[z].style.display = "none";
                    showBase[z].style.display = "none"; 
                    showMoves[z].style.display = "grid";
                }

            })
        }
    })
}

loadPokemonItens(offset, limit)


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



