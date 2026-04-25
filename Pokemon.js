const contenedor = document.getElementById("listaPokemon");
const buscador = document.getElementById("buscador");

let listaPokemones = [];

// 🚀 Carga rápida con Promise.all
async function cargarPokemones() {
    const requests = [];

    for (let i = 1; i <= 1025; i++) {
        requests.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
    }

    const data = await Promise.all(requests);
    listaPokemones = data;

    mostrarPokemones(data);
}

// 🎨 Mostrar Pokémon
function mostrarPokemones(pokemones) {
    contenedor.innerHTML = "";

    pokemones.forEach(p => {
        const tipo = p.types.map(t => t.type.name);
        const tipoPrincipal = tipo[0];

        const card = document.createElement("div");
        card.classList.add("pokemon-card", `tipo-${tipoPrincipal}`);
        card.setAttribute("data-nombre", p.name);

        card.innerHTML = `
            <div class="left">
                <h2>${p.name.toUpperCase()}</h2>
                <img src="${p.sprites.front_default}">
                <p>${tipo.join(", ")}</p>
            </div>

            <div class="right">
                <p><strong>Altura:</strong> ${p.height / 10} m</p>
                <p><strong>Peso:</strong> ${p.weight / 10} kg</p>
                <p><strong>Habilidad:</strong> ${p.abilities[0].ability.name}</p>

                <p><strong>HP:</strong> ${p.stats[0].base_stat}</p>
                <div class="barra"><div class="relleno vida" style="width:${p.stats[0].base_stat}%"></div></div>

                <p><strong>ATK:</strong> ${p.stats[1].base_stat}</p>
                <div class="barra"><div class="relleno ataque" style="width:${p.stats[1].base_stat}%"></div></div>

                <p><strong>DEF:</strong> ${p.stats[2].base_stat}</p>
                <div class="barra"><div class="relleno defensa" style="width:${p.stats[2].base_stat}%"></div></div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

// 🔍 Buscador en tiempo real
buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();

    const filtrados = listaPokemones.filter(p =>
        p.name.includes(filtro)
    );

    mostrarPokemones(filtrados);
});

// 🚀 Iniciar
cargarPokemones();