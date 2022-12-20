const { Pokemon, Type } = require("../db.js");
const axios = require("axios");

const url = "https://pokeapi.co/api/v2/pokemon";
const url2 = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20";
let arrayPokemons = [];
let getInfoPokemons = async () => {
  try {
    let pokemonsFromApi1 = await axios.get(url);
    let pokemonsFromApi2 = await axios.get(url2);
    let pokemonArray = [
      ...pokemonsFromApi1.data.results,
      ...pokemonsFromApi2.data.results,
    ];

    arrayPokemons = await Promise.all(
      pokemonArray.map(async (pokemon) => {
        let infoDePokemon = await axios.get(pokemon.url);
        function Types() {
          let array = [];
          infoDePokemon.data.types.forEach((t) =>
            array.push({ name: t.type.name })
          );
          return array;
        }

        return {
          id: infoDePokemon.data.id,
          name: infoDePokemon.data.name,
          hp: infoDePokemon.data.stats[0].base_stat,
          attack: infoDePokemon.data.stats[1].base_stat,
          defense: infoDePokemon.data.stats[2].base_stat,
          speed: infoDePokemon.data.stats[5].base_stat,
          height: infoDePokemon.data.height,
          weight: infoDePokemon.data.weight,
          image: infoDePokemon.data.sprites.other.dream_world.front_default,
          types: Types(),
        };
      })
    );
    let pokemonDb = await Pokemon.findAll({
      include: Type,
    });
    arrayPokemons.push(...pokemonDb);
    return arrayPokemons;
  } catch (error) {
    error.message;
  }
};
let getPokemonTypes = async () => {
  let arrayOfTypes = [];
  try {
    await Type.sync({ force: true });
    let pokemonTypes = await axios.get("https://pokeapi.co/api/v2/type");
    let pokemonTypesData = [...pokemonTypes.data.results];
    pokemonTypesData.map((type) => {
      Type.create(type);
      arrayOfTypes.push(type.name);
    });
    return arrayOfTypes;
  } catch (error) {
    return "No se a podido cargar los types";
  }
};
let getPokemonDetail = async (name) => {
  await getInfoPokemons();
  let pokemon = [];
  if (name) {
    name = name.toLowerCase();
    pokemon = arrayPokemons.filter((poke) => poke.name === name);
    if (pokemon.length > 0) {
      return pokemon;
    } else {
      throw new Error("No se encontro el pokemon solicitado");
    }
  } else {
    throw new Error("Se requiere un nombre para buscar un pokemon");
  }
};
let getPokemonDetailById = async (id) => {
  await getInfoPokemons();
  let pokemon = [];
  if (id.length <= 4) {
    id = parseInt(id);
  }
  if (id) {
    pokemon = arrayPokemons.filter((poke) => poke.id === id);
    if (pokemon.length > 0) {
      return pokemon;
    } else {
      throw new Error("No se encontro el pokemon solicitado");
    }
  } else {
    throw new Error("Se requiere un id para buscar un pokemon");
  }
};

let createPokemon = async (parametros) => {
  await getPokemonTypes();
  const { name, types } = parametros;
  if (parametros.image === "") {
    parametros.image =
      "https://vader.news/__export/1588965166057/sites/gadgets/img/2020/05/08/2-25193_pokemon-ball-transparent-background-transparent-background-pokeball-png.png_423682103.png";
  }
  if (!name) {
    throw new Error("Faltan datos necesarios para crear el pokemon");
  } else {
    parametros.name = parametros.name.toLowerCase();
    const newPokemon = await Pokemon.create(parametros);
    if (types) {
      types.forEach(async (type) => {
        let responseFromDB = await Type.findAll();
        responseFromDB.find((element) =>
          element.name == type ? newPokemon.addTypes(element.id) : false
        );
      });
    }
    return `El pokemon ${name} ha sido creado`;
  }
};
let editPokemon = async (id, parametros) => {
  const { name, types } = parametros;
  if (parametros.image === "") {
    parametros.image =
      "https://vader.news/__export/1588965166057/sites/gadgets/img/2020/05/08/2-25193_pokemon-ball-transparent-background-transparent-background-pokeball-png.png_423682103.png";
  }
  if (!name) {
    throw new Error("Faltan datos necesarios para editar el pokemon");
  } else {
    parametros.name = parametros.name.toLowerCase();
    const editPokemon = await Pokemon.findByPk(id);
    await editPokemon.update(parametros, {
      where: {
        id: id,
      },
    });
    const typesDb = await Type.findAll({
      where: {
        name: types,
      },
    });
    await editPokemon.setTypes(typesDb);
    return `El pokemon ${name} ha sido editado`;
  }
};

module.exports = {
  getInfoPokemons,
  getPokemonDetail,
  getPokemonDetailById,
  createPokemon,
  getPokemonTypes,
  editPokemon,
};
