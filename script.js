let checkIfExists = [];
for (let i = 0; i < 671; i++) {
    checkIfExists[i] = 0;
}

async function apiRequest(value) {
    let URL = `https://rickandmortyapi.com/api/character/${value}`;
    let response = await fetch(URL, {
        method: 'GET',
    });

    let resultCharacter = await response.json();
    checkIfExists[(value-1)] = 1;
    document.getElementById("generator-name").innerHTML = `<strong>Name: </strong>${resultCharacter.name}`;
    document.getElementById("generator-species").innerHTML = `<strong>Species: </strong>${resultCharacter.species}`;
    document.getElementById("generator-status").innerHTML = `<strong>Status: </strong>${resultCharacter.status}`;
    document.getElementById("generator-image").src = resultCharacter.image;

    console.log(resultCharacter);
}

function createRandom() {
    let id = Math.floor(Math.random() * 671) + 1;
    if (checkIfExists[(id-1)] == 0) {
        apiRequest(id);
    } else {
        if (checkIfExists.indexOf(0) == -1) {
            window.alert("You analyzed all characters in the API!");
        } else {
            createRandom();
        }
    }
}