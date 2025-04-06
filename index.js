const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'purple', 'grey', 'orange',];//Tots els colors que s'utilitzen dins l'array
let sequencia = [];//aquesta es la seqüència dels colors
let resposta = [];//La resposta quan pitjes un color
let ronda = 0;//La ronda del joc
let eresposta = false;//Si el jugador pot pitjar o no
let modeautomatic = false;//Si el mode automàtic està activat o no

// Els renous que utilitzo
const renous= {
    victoria: new Audio("renous/victoria.mp3"),//Victoria
    error: new Audio("renous/error.mp3"),//Error
    rendir: new Audio("renous/sad.mp3"),//Rendir
};

//Quan pitjes comença s'executa aquesta funció
function comenca() {
    sequencia = [];//Se reinicia la seqüència
    ronda = 0;//Se reinicia la ronda
    document.getElementById("botomerindo").disabled = false;//Botó per rendir-se desctivat
    document.getElementById("botoautomatic").disabled = false;//Botó del mode autimàtic desactivat
    novaronda();//Crida a novaronda per començar
}

//Funció per començar una nova ronda
function novaronda() {
    ronda++;//El nombre de rondes augmenta
    resposta = [];//Se reinicia la resposta del jugador
    for (let i = 0; i < 1; i++) {
        sequencia.push(colors[Math.floor(Math.random() * colors.length)]);
    }//S'afegeix un color random de l'array a la seqüència

    document.getElementById("ronda").innerText = '' + ronda;//Mostra el nombre de ronda a la pantalla
    mostrarcolors();//Crida a mostracolors per mostrar els colors a la partida
}

//Funció que mostra els colors de la seqüència
async function mostrarcolors() {
    eresposta = false;//No se pot pitjar fins mostrar els colors
    for (let i = 0; i < sequencia.length; i++) {
        const color = sequencia[i];
        const quadrat = document.getElementById(color);//Obté el color corresponent per cada color
        quadrat.style.opacity = '0.5';//Redueix la opacitat a la meitat
        await esperar(500);//Espera 500 milisegons
        quadrat.style.opacity = '1';//Torna a posar la opacitat al 100%
        await esperar(300);//Espera 300 miliesgons
    }//Recorr tots els nombtres de la seqüència mostrant-los un per un
    eresposta = true;//El jugador ja pot respondre
}

//Atura el codi durant un període de temps
function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));//Per no bloquetzar el codi utilitza promise i espera un temps fns que es resolgui
}

//Funció que s'executa cuan el jugador pitja
function clicar(color) {
    if (eresposta) {
        resposta.push(color);//fa que la resposta del jugador s'afegeixi a la llista resposta
    }
    if (resposta.join() == sequencia.join()) {
        renous.victoria.play();//Si la resposta és correscte inicia aquest so
        setTimeout(novaronda, 500);//espera 500ms
    } else if (!sequencia.join().startsWith(resposta.join())) {
        renous.error.play();//Se comprova si la resposta del jugador no és correcte amb startswith fa sonar el so error amb un alert
        alert("Has perdut");
        comenca();//Torna a començar el joc
    }
}

//Funció que activa el mode automàtic
function automatic() {
    modeautomatic = true;//Activació
    document.getElementById("botoautomatic").disabled = true;//Fa que el botó s'activi i el dashabilita
    alert("Mode automàtic activat");//Envia un alert
    jugarautomaticament();//Crida a la funció per jugar automàticament
}

//Funció que s'activa quan el mode automàtic se pren
async function jugarautomaticament() {
    while (modeautomatic) {
        //Un bucle on mostra els colors de la seqüència a la funció un per un per pitjar-los automàticament
        await mostrarcolors();//Atura el codi fins que s'haguin mostrat tots els colors
        for (let i = 0; i < sequencia.length; i++) {
            let color = sequencia[i];
            let quadrat = document.getElementById(color);//Obté el color corresponent per cada color
            quadrat.style.filter = "brightness(200%)";//Redueix la opacitat a la meitat
            await esperar(500);//Espera 500 milisegon
            quadrat.style.filter = "brightness(100%)";//Torna a posar la opacitat al 100%
            resposta.push(color);//S'agrega el valor a la llista resposta
            await esperar(300);//Espera 300 milisegon
        }//Recorr tots els nombtres de la seqüència mostrant-los un per un

        //comprova se la sqüència del jugador és la mateixa que a la de la partida
        if (resposta.join() == sequencia.join()) {
            renous.victoria.currentTime = 0;
            renous.victoria.play();
            await esperar(1000);//Si ho és espera 1 segón i crida a novaronda per afegir més colors
            novaronda();
        } else {
            //Si la resposta és falsa desactiva el mode automàtic i ho habilita per poder activar-ho una altre vegada
            modeautomatic = false;
            document.getElementById("botoautomatic").disabled = false;
            break;//Surt del bucle
        }
    }
}

//Funcó per rendir-se
function merindo() {
    renous.rendir.play();//sona el so de derrota
    modeautomatic = false;//Atura el mode automàtic
    resposta = [];//Reinicia la llista de respostes
    sequencia = [];//Reinicia la seqüència
    ronda = 0;//La ronda torna a ser 0
    document.getElementById("ronda").innerText = "0";//Ho mostra al joc
    document.getElementById("botoautomatic").disabled = false;//Habilita el botó automàtic per podern tornar a utilitzar-ho
    alert("T'has rendit");//T'alerta de que has perdut
    return;
}
