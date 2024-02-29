// poke render
const elResultPoke = document.querySelector(".js-poke-render");
const elTemplate = document.querySelector(".js-template").content;
const elWeaknesses = document.querySelector(".js-poke-weaknesses");
const pokeShort = pokemons.slice(0, 20);

// poke render
const pokemonsRender = (array, node) => {
  node.innerHTML = "";
  const docFrg = document.createDocumentFragment();

  array.forEach((item) => {
    const pokeClone = elTemplate.cloneNode(true);

    pokeClone.querySelector(".js-poke-img").src = item.img;
    pokeClone.querySelector(".js-poke-img").alt = item.name;
    pokeClone.querySelector(".js-poke-name").textContent = item.name;
    pokeClone.querySelector(".js-poke-candy").textContent = item.weaknesses
      .toString()
      .replaceAll(",", " ");
    pokeClone.querySelector(".js-poke-height").textContent = item.height;
    pokeClone.querySelector(
      ".js-poke-weight"
    ).textContent = `${item.weight} weight`;
    pokeClone.querySelector(".js-poke-span").textContent = item.num;
    pokeClone.querySelector(".js-poke-spawns").textContent = item.avg_spawns;

    docFrg.appendChild(pokeClone);
  });
  node.appendChild(docFrg);
};
pokemonsRender(pokeShort, elResultPoke);

// Search
const elForm = document.querySelector(".js-poke-form");
const elSearchInp = document.querySelector(".js-search-input");
const elNotFound = document.querySelector(".js-not-found");
const elPokeSort = document.querySelector(".js-poke-sort");

elForm.addEventListener("click", (evt) => {
  evt.preventDefault();
  const searchInpValue = elSearchInp.value.trim();
  const weaknessesValue = elWeaknesses.value;
  const pokeSortValue = elPokeSort.value;
  const regExp = new RegExp(searchInpValue, "gi");

  const pokeSearch = pokemons.filter((item) => {
    return (
      (item.name.match(regExp) && weaknessesValue === "all") ||
      item.weaknesses.includes(weaknessesValue)
    );
  });

  if (pokeSearch.length > 0) {
    pokeSort(pokeSortValue, pokemons);
    pokemonsRender(pokeSearch, elResultPoke);
    elNotFound.classList.add("hidden");
  } else {
    elResultPoke.innerHTML = "";
    elSearchInp.value = "";
    elNotFound.classList.remove("hidden");
  }
});

// weaknesses
const weaknessesUnicPoke = (arr) => {
  let weaknessesArr = [];
  arr.forEach((item) => {
    const pokeName = item.weaknesses;
    pokeName.forEach((element) => {
      if (!weaknessesArr.includes(element)) {
        weaknessesArr.push(element);
      }
    });
  });
  return weaknessesArr;
};

// weaknesses rednder
const weaknessesRender = () => {
  let result = weaknessesUnicPoke(pokemons);
  const weakDocFrg = document.createDocumentFragment();
  result.forEach((item) => {
    const newOption = document.createElement("option");
    newOption.textContent = item;
    newOption.value = item;
    weakDocFrg.appendChild(newOption);
  });
  elWeaknesses.appendChild(weakDocFrg);
};
weaknessesRender();

// Sort
const pokeSort = (poke, pokemonsSort) => {
  if (poke === "a-z") {
    pokemonsSort.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );
  }
  if (poke === "z-a") {
    pokemonsSort.sort((a, b) =>
      b.name.toLowerCase().localeCompare(a.name.toLowerCase())
    );
  }
  if (poke === "big-weight") {
    pokemonsSort.sort((a, b) => b.weight - a.weight);
  }
  if (poke === "small-weight") {
    pokemonsSort.sort((a, b) => a.weight - b.weight);
  }
};
