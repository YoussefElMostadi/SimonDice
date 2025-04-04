const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'purple', 'grey', 'orange',];
let sequencia = [];
let resposta = [];
let ronda = 0;
let modeautomatic = false;

const renous = {
    red: new Audio("sounds/red.mp3"),
    yellow: new Audio("sounds/yellow.mp3"),
    blue: new Audio("sounds/blue.mp3"),
    green: new Audio("sounds/green.mp3"),
    pink: new Audio("sounds/pink.mp3"),
    purple: new Audio("sounds/purple.mp3"),
    grey: new Audio("sounds/grey.mp3"),
    orange: new Audio("sounds/orange.mp3")
};


function comenca() {
    sequencia = [];
    ronda = 0;
    novaronda();
}

function novaronda() {
    ronda++;
    resposta = [];
    for (let i = 0; i < 1; i++) {
        sequencia.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    document.getElementById("ronda").innerText = '' + ronda;
    mostrarcolors();
}
async function mostrarcolors() {
    for (let i = 0; i < sequencia.length; i++) {
        const color = sequencia[i];
        const quadrat = document.getElementById(color);
        renous[color].play();
        quadrat.style.opacity = '0.5';
        await esperar(500);
        quadrat.style.opacity = '1';
        await esperar(300);
    }
}

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function clicar(color) {
    let noclick =
    resposta.push(color);
    renous[color].play();
    if (resposta.join() == sequencia.join()) {
        setTimeout(novaronda, 500);
    } else if (!sequencia.join().startsWith(resposta.join())) {
        alert("Has perdut");
        comenca();
    }
}

function automatic() {
    modeautomatic = true;
    document.getElementById("botoautomatic").disabled = true;
    alert("Mode automàtic activat");
    jugarAutomaticament();
}

async function jugarAutomaticament() {
    while (modeautomatic) {
        await mostrarcolors();
        for (let i = 0; i < sequencia.length; i++) {
            let color = sequencia[i];
            let quadrat = document.getElementById(color);
            quadrat.style.filter = "brightness(200%)";
            await esperar(500);
            quadrat.style.filter = "brightness(100%)";
            resposta.push(color);
            await esperar(300);
        }

        if (resposta.join() == sequencia.join()) {
            await esperar(1000);
            novaronda();
        } else {
            modoAutomatico = false;
            document.getElementById("botoautomatic").disabled = false;
            break;
        }
    }
}

function merindo() {
    modeautomatic = false;
    resposta = [];
    sequencia = [];
    document.getElementById("botomerindo").disabled = true;
    document.getElementById("botoautomatic").disabled = false;
    alert("T'has rendit");
    return;
}
