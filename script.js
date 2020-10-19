let checkIfExists = [];
for (let i = 0; i < 671; i++) {
    checkIfExists[i] = 0;
}

let localDB = [];

async function apiRequest(value) {
    let URL = `https://rickandmortyapi.com/api/character/${value}`;
    let response = await fetch(URL, {
        method: 'GET',
    });

    let resultCharacter = await response.json();
    checkIfExists[(value - 1)] = 1;

    /*
    let tempSpan = document.createElement('span');
    tempSpan.classList.add("glyphicon");
    tempSpan.classList.add("glyphicon-envelope");
    tempSpan.style.color = "green";
 
    if (resultCharacter.status == "Alive") {
        tempSpan = `<span class="glyphicon glyphicon-ok-sign" style="background-color: green;"></span>`;
    } else if (resultCharacter.status == "Dead") {
        tempSpan = `<span class="glyphicon glyphicon-remove-sign" style="background-color: red;></span>`;
    } else {
        tempSpan = `<span class="glyphicon glyphicon-question-sign" style="background-color: yellow;></span>`;
    } 
    */

    document.getElementById("generator-name").innerHTML = `<strong>Name: </strong>${resultCharacter.name}`;
    document.getElementById("generator-species").innerHTML = `<strong>Species: </strong>${resultCharacter.species}`;
    document.getElementById("generator-status").innerHTML = `<strong>Status: </strong>${resultCharacter.status}`;
    //document.getElementById("generator-status").appendChild(tempSpan);
    document.getElementById("generator-image").src = resultCharacter.image;

    let character = {
        fullname: resultCharacter.name,
        species: resultCharacter.species,
        imgURL: resultCharacter.image,
        status: resultCharacter.status,
        //statusSpan: tempSpan,
    };

    addDB(character);

    console.log(resultCharacter);
}

function addDB(character) {
    let localList = document.getElementById("local-DB-list");
    let charTemp = document.createElement('div');
    charTemp.classList.add('listGallery');
    charTemp.innerHTML = `<img src="${character.imgURL}" alt="Character" width="600" height="400"><div class="desc"><p><strong>Name: </strong>${character.fullname}</p><p><strong>Species: </strong>${character.species}</p><p><strong>Status: </strong>${character.status}</p></div>`;
    localList.appendChild(charTemp);
}

function createRandom() {
    let id = Math.floor(Math.random() * 671) + 1;
    if (checkIfExists[(id - 1)] == 0) {
        apiRequest(id);
    } else {
        if (checkIfExists.indexOf(0) == -1) {
            window.alert("You analyzed all characters in the API!");
        } else {
            createRandom();
        }
    }
}