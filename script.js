let input = document.getElementById("input-box");
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let listContainer = document.querySelector(".list");
let favoritesList = document.getElementById("favorites-list");

let date = new Date();
console.log(date.getTime());
let timestamp = "1681802982683";
let apiKey = "338845203dbb25cba5deb1c863c639c2";
let hashValue ="97ed055edf3286d9cf48601cc8adf6fd";

let favoriteSuperheroes = [];

function displayWords(value) {
  input.value = value;
  removeElements();
}

function removeElements() {
  listContainer.innerHTML = "";
}

function addToFavorites(superhero) {
  if (!favoriteSuperheroes.includes(superhero)) {
    favoriteSuperheroes.push(superhero);
    updateFavoritesList();
  }
}

function removeFromFavorites(superhero) {
  const index = favoriteSuperheroes.indexOf(superhero);
  if (index !== -1) {
    favoriteSuperheroes.splice(index, 1);
    updateFavoritesList();
  }
}

function updateFavoritesList() {
  favoritesList.innerHTML = "";
  favoriteSuperheroes.forEach((superhero) => {
    let li = document.createElement("li");
    li.innerHTML = `${superhero} <button class="remove-favorite" onclick="removeFromFavorites('${superhero}')">Remove</button>`;
    favoritesList.appendChild(li);
  });
}

input.addEventListener("keyup", async () => {
  removeElements();
  if (input.value.length < 4) {
    return false;
  }

  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  const response = await fetch(url);
  const jsonData = await response.json();

  jsonData.data["results"].forEach((result) => {
    let name = result.name;
    let div = document.createElement("div");
    div.style.cursor = "pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class="item">${word} <button onclick="addToFavorites('${name}')">Add to Favorites</button></p>`;
    listContainer.appendChild(div);
  });
});

button.addEventListener(
  "click",
  (getResult = async () => {
    if (input.value.trim().length < 1) {
      alert("Input cannot be blank");
    }
    showContainer.innerHTML = "";
    const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${apiKey}&hash=${hashValue}&name=${input.value}`;

    const response = await fetch(url);
    const jsonData = await response.json();
    jsonData.data["results"].forEach((element) => {
      showContainer.innerHTML = `<div class="card-container">
        <div class="container-character-image">
        <img src="${
          element.thumbnail["path"] + "." + element.thumbnail["extension"]
        }"/></div>
        <div class="character-name">${element.name}</div>
        <div class="character-description">${element.description}</div>
        </div>`;
    });
  })
);

window.onload = () => {
  getResult();
};
