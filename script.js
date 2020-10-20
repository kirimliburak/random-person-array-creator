let checkIfExists = [];
for (let i = 0; i < 671; i++) {
    checkIfExists[i] = 0;
}

let localDB = [];

let charName = document.getElementById("generator-name");
let charSpecies = document.getElementById("generator-species");
let charStatus = document.getElementById("generator-status");
let charImage = document.getElementById("generator-image");
let body = document.getElementById("index-body");
let spanStatus = document.getElementById("status-span");

async function apiRequest(value) {
    let URL = `https://rickandmortyapi.com/api/character/${value}`;
    let response = await fetch(URL, {
        method: 'GET',
    });

    let resultCharacter = await response.json();
    checkIfExists[(value - 1)] = 1;

    if (resultCharacter.status.valueOf() === "Alive") {
        spanStatus.style.backgroundColor = "green";
    } else if (resultCharacter.status.valueOf() === "Dead") {
        spanStatus.style.backgroundColor = "red";
    } else {
        spanStatus.style.backgroundColor = "rgb(235, 235, 2)";
    } 

    charName.innerHTML = `<strong>Name: </strong>${resultCharacter.name}`;
    charSpecies.innerHTML = `<strong>Species: </strong>${resultCharacter.species}`;
    charStatus.innerHTML = `<strong>Status: </strong>${resultCharacter.status}`;
    charImage.src = resultCharacter.image;

}

function createCharacter() {
    let character = {
        fullname: charName.innerText,
        species: charSpecies.innerText,
        imgURL: charImage.src,
        status: charStatus.innerText,
        spanColor: spanStatus.style.backgroundColor,
    };

    return character;
}

function createCharacterCard(charObject) {
    let localList = document.getElementById("local-DB-list");
    let charTemp = document.createElement('div');
    charTemp.classList.add('listGallery');
    charTemp.innerHTML = `<img src=${charObject.imgURL} alt="Character" width="600" height="400">
                            <div class="desc">
                                <p><strong>Name: </strong>${charObject.fullname.replace("Name: ","")}</p>
                                <p><strong>Species: </strong>${charObject.species.replace("Species: ","")}</p>
                                <div class="char-card">
                                <p><strong>Status: </strong>${charObject.status.replace("Status: ","")}</p>
                                <span class="glyphicon glyphicon-ok-sign" style="background-color: ${charObject.spanColor};" id="status-span"></span>
                                </div>
                            </div>`;
    localList.appendChild(charTemp);
}

function addDB() {
    let character = createCharacter();
    if (localDB.indexOf(character) == -1) {
        localDB.push(character);
    } else {
        window.alert("You have this character in your list!");
    }
    createCharacterCard(character);
    createRandom();
    body.style.height = "max-content";
}

function createRandom() {
    let id = Math.floor(Math.random() * 671) + 1;
    if (checkIfExists[(id - 1)] === 0) {
        apiRequest(id);
    } else {
        if (checkIfExists.indexOf(0) == -1) {
            window.alert("You analyzed all characters in the API!");
        } else {
            createRandom();
        }
    }
}