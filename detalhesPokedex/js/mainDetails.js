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

function convertPokemonToLi(pokemon) {
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
                    <button id="escondeAbout"> About </button>
                    <button id="mostraBase"> Base data </button>
                    <button id="mostraEvolution"> Evolution </button>
                    <button id="mostraMoves"> Moves </button>
                    </div>

                    <ul id="showAbout">
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

                    <ul id="showBase" style="display:none">
                        
                        <li>HP: ${pokemon.stats[0].base_stat} </li>
                        <li>Attack: ${pokemon.stats[1].base_stat}</li>
                        <li>Defense: ${pokemon.stats[2].base_stat}</li>
                        <li>Sp.Attack: ${pokemon.stats[3].base_stat}</li>
                        <li>Sp.Defense: ${pokemon.stats[4].base_stat}</li>
                        <li>Speed: ${pokemon.stats[5].base_stat}</li>
                    </ul> 

                    <ul id="showEvolution" style="display:none">
                        <li>Evolution: Bulbasaur </li>
                    </ul>
                        
                    <ul id="showMoves" style="display:none">
                        <li>Moves: ${convertPokemonMovesToLi(pokemon.moves).join(' ')}</li>
                    </ul>
                </div>
            </section>
        </div>
    `
}

const about = document.getElementById('js')

pokeApi.getPokemons().then((pokemons = " ") => {
    about.innerHTML += pokemons.map(convertPokemonToLi).join('')
    
    // Adicione o evento de clique ao botão com id "escondeAbout"
    document.getElementById("escondeAbout").addEventListener("mouseover", toggleAboutSection);
    document.getElementById("mostraBase").addEventListener("mouseover", toggleBaseSection);
    document.getElementById("mostraEvolution").addEventListener("mouseover", toggleEvolutionSection);
    document.getElementById("mostraMoves").addEventListener("mouseover", toggleMovesSection);

})

// Função para alternar a exibição da <ul> com id "showAbout"
function toggleAboutSection() {
    var showAbout = document.getElementById("showAbout");
    var showBase = document.getElementById("showBase");
    var showEvolution = document.getElementById("showEvolution");
    var showMoves = document.getElementById("showMoves");
    showBase.style.display = "none"; // Oculta o conteúdo do botão "Base data"
    showEvolution.style.display = "none"; // Oculta o conteúdo do botão "about"
    showMoves.style.display = "none";
    showAbout.style.display = showAbout.style.display === "none" ? "block" : "none";
}

// Função para alternar a exibição da <ul> com id "showBase"
function toggleBaseSection() {
    var showAbout = document.getElementById("showAbout");
    var showBase = document.getElementById("showBase");
    var showEvolution = document.getElementById("showEvolution");
    var showMoves = document.getElementById("showMoves");
    showAbout.style.display = "none"; // Oculta o conteúdo do botão "about"
    showEvolution.style.display = "none"; // Oculta o conteúdo do botão "about"
    showMoves.style.display = "none";
    showBase.style.display = showEvolution.style.display === "none" ? "block" : "none";
}

function toggleEvolutionSection() {
    var showAbout = document.getElementById("showAbout");
    var showBase = document.getElementById("showBase");
    var showEvolution = document.getElementById("showEvolution");
    var showMoves = document.getElementById("showMoves");
    showAbout.style.display = "none"; // Oculta o conteúdo do botão "about"
    showBase.style.display = "none"; // Oculta o conteúdo do botão "about"
    showMoves.style.display = "none";
    showEvolution.style.display = showEvolution.style.display === "none" ? "block" : "none";
}

function toggleMovesSection() {
    var showAbout = document.getElementById("showAbout");
    var showBase = document.getElementById("showBase");
    var showEvolution = document.getElementById("showEvolution");
    var showMoves = document.getElementById("showMoves");
    showAbout.style.display = "none"; // Oculta o conteúdo do botão "about"
    showBase.style.display = "none"; // Oculta o conteúdo do botão "about"
    showEvolution.style.display = "none";
    showMoves.style.display = showMoves.style.display === "none" ? "block" : "none";
}


