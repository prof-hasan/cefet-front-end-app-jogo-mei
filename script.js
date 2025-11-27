let botaoPassaEl = document.querySelector("#botao-passa");

let trocaAtNode = document.querySelectorAll(".troca-status");

let bodyEl = document.querySelector("body");

let barraNode = document.querySelectorAll(".barra-atributo");


//Banco de personagens do jogo
let personagens = [
    {
        nome: "Dandara",
        vida: 6,
        agua: 4,
        defesa: 2,
        dinheiro: 4,
        local: "Periferia",
        idade: "",
        condicao: ""
    },
    {
        nome: "Gabriel",
        vida: 4,
        agua: 8,
        defesa: 9,
        dinheiro: 7,
        local: "AreaPriv",
        idade: "",
        condicao: "Asma"
    },
    {
        nome: "Luanda",
        vida: 8,
        agua: 4,
        defesa: 3,
        dinheiro: 2,
        local: "Quilombo",
        idade: "",
        condicao: ""
    },
    {
        nome: "Kaike",
        vida: 9,
        agua: 6,
        defesa: 5,
        dinheiro: 2,
        local: "Aldeia",
        idade: "",
        condicao: ""
    },
    {
        nome: "Maria",
        vida: 7,
        agua: 2,
        defesa: 3,
        dinheiro: 2,
        local: "Periferia",
        idade: "",
        condicao: ""
    },
    {
        nome: "Adriana",
        vida: 5,
        agua: 4,
        defesa: 4,
        dinheiro: 4,
        local: "",
        idade: "",
        condicao: ""
    },
    {
        nome: "Tereza",
        vida: 7,
        agua: 7,
        defesa: 5,
        dinheiro: 3,
        local: "",
        idade: "",
        condicao: ""
    },
    {
        nome: "Roberto",
        vida: 2,
        agua: 10,
        defesa: 8,
        dinheiro: 10,
        local: "",
        idade: "Avançada",
        condicao: ""
    },
    {
        nome: "Hasan",
        vida: 10,
        agua: 10,
        defesa: 10,
        dinheiro: 10,
        local: "",
        idade: "",
        condicao: ""
    },
];

//Banco de cartas de evento (1 por turno, no começo)
let cartasEvt = [
    {
        nome: "calorE",
        id: 0,

    },
    {
        nome: "poluicaoDA",
        id: 1,

    },
    {
        nome: "queimadaEAN",
        id: 2,

    },
    {
        nome: "surtoDH",
        id: 3,

    },
    {
        nome: "tempestadeCA",
        id: 4,

    }
];

//Banco de cartas de sorte ou azar
let cartasSorte = [
    {
        num: 0,
        vida: 0,
        agua: 0,
        defesa: 0,
        id: 1
    },
    {
        id: 2
    }
];

let vez = 0;
let turno = 0;

let jogadores = [];


//Checa de qual atributo se trata dependendo do número informado
function checaAtributo(tipo) {
    switch (tipo) {
        case 0:
            return 'life';

        case 1:
            return 'water';

        case 2:
            return 'defense';
        
        case 3:
            return 'money';
    }
}

let modoDaltonicoAtivo = false;
let botaoModoDaltonicoEl = document.querySelector('#botao-daltonismo');

botaoModoDaltonicoEl.addEventListener('click', () => {
    if (modoDaltonicoAtivo) {
        modoDaltonicoAtivo = false;
    }
    else {
        modoDaltonicoAtivo = true;
    }

    atualizaHTMLJogador(jogadores[vez]);

    atNode = document.querySelectorAll(".fixo");

    for (let i = 0; i < atNode.length; i++) {
        atNode[i].addEventListener("mousedown", geraAt);
        atNode[i].style.cursor = "grab";
    }
})

//Troca os elementos dentro da barra de atributo
//vai anexando varios elementos pela concatenação de strings para colocar dentro do innerHTML da barra
function rotuloInnerAtributo(tipo, valorAtributo) {
    let rotulo = "";
    let atributoA = checaAtributo(tipo);
    
    for (let i = 0; i < valorAtributo; i++) {
        if (modoDaltonicoAtivo){
            rotulo = rotulo + `<img src="imgs/${atributoA}dotdaltonico.png" class="atributo-status fixo" data-tipo="${tipo}" draggable="false">`;
        }
        else {
            rotulo = rotulo + `<img src="imgs/${atributoA}dot.png" class="atributo-status fixo" data-tipo="${tipo}" draggable="false">`;
        }
    }

    return rotulo;
}


//Checa se já existe um jogador com um determinado personagem
function checaJogadores(person) {
    let vetorSize = jogadores.length;

    for (let i = 0; i < vetorSize; i++) {
        if (person.nome == jogadores[i].nome) {
            return 1;
        }
    }
    
    return 0;
}

//Escolhe e retorna um personagem a partir de um número aleatório
function escolhePersonagem() {
    let rNumber;
    let personagemAtual;

    while (1) {
        rNumber = Math.random();

        if (rNumber === 0 || rNumber < 1 / 7) {
            personagemAtual = personagens[0];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 1 / 8 && rNumber < 1 / 8 * 2) {
            personagemAtual = personagens[1];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 1 / 8 * 2 && rNumber < 1 / 8 * 3) {
            personagemAtual = personagens[2];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 1 / 8 * 3 && rNumber < 1 / 8 * 4) {
            personagemAtual = personagens[3];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 1 / 8 * 4 && rNumber < 1 / 8 * 5) {
            personagemAtual = personagens[4];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 1 / 8 * 5 && rNumber < 1 / 8 * 6) {
            personagemAtual = personagens[5];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 1 / 8 * 6 && rNumber < 1 / 8 * 7) {
            personagemAtual = personagens[6];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 1 / 8 * 7 && rNumber < 1) {
            personagemAtual = personagens[7];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
    }
}

function sorteiaCartaEvt() {
    let rNumber;

    rNumber = Math.random();

    if (rNumber === 0 || rNumber < 1 / 5) {
        return cartasEvt[0];
    }
    else if(rNumber >= 1 / 5 && rNumber < 1 / 5 * 2) {
        return cartasEvt[1];
    }
    else if(rNumber >= 1 / 5 * 2 && rNumber < 1 / 5 * 3) {
        return cartasEvt[2];
    }
    else if(rNumber >= 1 / 5 * 3 && rNumber < 1 / 5 * 4) {
        return cartasEvt[3];
    }
    else if(rNumber >= 1 / 5 * 4 && rNumber < 1) {
        return cartasEvt[4];
    }
}

//Cria e retorna o objeto do jogador
function criaJogador(nJogador) {
    let personagemA = escolhePersonagem();

    let jogador = {
        personagem: personagemA,

        num: nJogador,
        nome: personagemA.nome,
        vida: personagemA.vida,
        agua: personagemA.agua,
        defesa: personagemA.defesa,
        dinheiro: personagemA.dinheiro,
        local: personagemA.local,
        saldo: {sVida: 0, sAgua: 0, sDefesa: 0, sDinheiro: 0}
    }

    return jogador;
}

//Atualiza o innerHTML das barras de atributo do jogador no turno atual com o rotulo retornado pela função rotuloInnerHTML
function atualizaHTMLJogador(jogador) {
    let jogadorBarraLife = document.querySelector(`#p${jogador.num}-quantia-life`);
    let jogadorBarraWater = document.querySelector(`#p${jogador.num}-quantia-water`);
    let jogadorBarraDefense = document.querySelector(`#p${jogador.num}-quantia-defense`);
    let jogadorBarraMoney = document.querySelector(`#p${jogador.num}-quantia-money`);
    let jogadorName = document.querySelector(`#p${jogador.num}-nome`);
    let jogadorImg = document.querySelector(`#p${jogador.num}-img`);

    if (jogador.num === 1) {
        let labelAtNode = document.querySelectorAll(".atributo-label");

        labelAtNode[0].innerHTML = `Saúde: ${jogador.vida}/10`;
        labelAtNode[1].innerHTML = `Disp. hídrica: ${jogador.agua}/10`;
        labelAtNode[2].innerHTML = `Def. climática: ${jogador.defesa}/10`;
        labelAtNode[3].innerHTML = `Disp. monetária: ${jogador.dinheiro}/10`;

        jogadorBarraLife.innerHTML = rotuloInnerAtributo(0, jogador.vida);
        jogadorBarraWater.innerHTML = rotuloInnerAtributo(1, jogador.agua);
        jogadorBarraDefense.innerHTML = rotuloInnerAtributo(2, jogador.defesa);
        jogadorBarraMoney.innerHTML = rotuloInnerAtributo(3, jogador.dinheiro);

        let atualizaSaldo = function(saldo, i) {
            let saldoText = document.createElement("em");
            saldoText.classList.add("atributo-saldo");

            saldoText.innerHTML = saldo == 0 ? "" : saldo > 0 ? '+' + saldo : saldo;

            if (Number(saldoText.innerText) > 0)
                saldoText.style.color = "green";
            else
                saldoText.style.color = "red";

            labelAtNode[i].appendChild(saldoText);
        };

        atualizaSaldo(jogador.saldo.sVida, 0);
        atualizaSaldo(jogador.saldo.sAgua, 1);
        atualizaSaldo(jogador.saldo.sDefesa, 2);
        atualizaSaldo(jogador.saldo.sDinheiro, 3);
    }
    else {
        jogadorBarraLife.innerHTML = `Saúde: ${jogador.vida}/10`;
        jogadorBarraWater.innerHTML = `Disp. Hídrica: ${jogador.agua}/10`;
        jogadorBarraDefense.innerHTML = `Def. Climática: ${jogador.defesa}/10`;
        jogadorBarraMoney.innerHTML = `Disp. Monetária: ${jogador.dinheiro}/10`;
    }

    jogadorImg.src = `imgs/personagens/${jogador.nome}.png`;
    jogadorName.innerHTML = jogador.nome;
}

let cartaDisplay = 0;


//Ativa o efeito da carta de envento no jogador
function 
efeitoCartaEvt(carta, jogador) {
    if (carta.id == 0) {
        if (jogador.vida < 7) {
            jogador.saldo.sAgua--;
        }
        if (jogador.vida < 4) {
            jogador.saldo.sDinheiro--;
        }
        if (jogador.dinheiro > 7) {
            jogador.saldo.dinheiro -= 2;
        }
    }

    else if (carta.id == 1) {
        if (jogador.idade == "Avançada" || jogador.condicao == "Asma") {
            jogador.saldo.sVida--;
            jogador.saldo.sDinheiro -= 2;
        }
        if (jogador.vida < 5) {
            jogador.saldo.sDinheiro--;
        }
    }

    else if (carta.id == 2) {
        if (jogador.idade == "Avançada" || jogador.condicao == "Asma") {
            jogador.saldo.sVida--;
            jogador.saldo.sDinheiro -= 2;
        }
        if (jogador.agua < 5) {
            jogador.saldo.sVida--;
        }
        if (jogador.defesa < 6) {
            jogador.saldo.sAgua--;
        }
    }

    else if (carta.id == 3 && jogador.vida <= 7) {
        if (jogador.agua < 4 && jogador.defesa < 4) {
            jogador.saldo.sVida -= 2;
        }
        if (jogador.dinheiro > 6) {
            jogador.saldo.sDinheiro -= 2;
        }
    }

    else if (carta.id == 4) {
        if (jogador.defesa < 6) {
            jogador.saldo.sDefesa--;
        }
        if (jogador.agua < 5) {
            jogador.saldo.sAgua--;
        }
    }

    atualizaHTMLJogador(jogadores[vez]);
}

//Mostra a carta na tela e chama a função de efeito
function ativaCarta(carta, tipo) {
    cartaDisplay = 1;
    let containerCarta = document.createElement("div");

    if (tipo == 1)
        containerCarta.classList.add("cartaevt-container");
    else
        containerCarta.classList.add("cartasorte-container");

    bodyEl.appendChild(containerCarta);

    let cartaFrente = document.createElement("img");
    cartaFrente.classList.add("carta-frente");

    cartaFrente.src = `imgs/cartasEvts/SQPlogo.png`;

    let cartaTras = document.createElement("img");
    cartaTras.classList.add("carta-tras");

    if (tipo == 1) {
        cartaTras.src = `imgs/cartasEvts/${carta.nome}.png`;
        cartaTras.style.borderRadius = "20px";
        cartaFrente.style.borderRadius = "20px";
    }
    else {
        cartaTras.src = `imgs/cartasSA/SorteouAzar-${carta.id}.png`;
        cartaTras.style.borderRadius = "40px";
        cartaFrente.style.borderRadius = "40px";
    }

    containerCarta.appendChild(cartaFrente);
    containerCarta.appendChild(cartaTras);

    bodyEl.style.overflowY = "hidden";

    setTimeout(() => {
        containerCarta.style.top = "50%";
        containerCarta.style.transform = "translate(-50%, -50%)";
        containerCarta.style.transition = "all 0.5s ease-in-out";
    }, 300);

    setTimeout(() => {
        containerCarta.style.transform = "translate(-50%, -50%) rotateY(180deg)";
    }, 1000);

    let funcaoRemove = function() {
        if (cartaDisplay == 1) {
            
            containerCarta.style.transform = "translate(-50%, 0) rotateY(180deg)";
            containerCarta.style.top = "150%";

            clearTimeout(autoTimeOut);

            setTimeout(() => {
                bodyEl.removeChild(containerCarta);
                bodyEl.removeEventListener("dblclick", funcaoRemove);
                bodyEl.style.overflowY = "auto";
                cartaDisplay = 0;
            }, 500);

            
        }
    };

    setTimeout(() => {
        bodyEl.addEventListener("dblclick", funcaoRemove);
    }, 1500);

    let autoTimeOut = setTimeout(funcaoRemove, 20000);
}



//Passagem turnos

for (let i = 0; i < 5; i++) {
    jogadores.push(criaJogador(i + 1));
    atualizaHTMLJogador(jogadores[vez + i]);
}

let cartaEvtAtual = sorteiaCartaEvt();
ativaCarta(cartaEvtAtual, 1);

let turnosAjuste = -10;

function passaVez() {
    if (!cartaDisplay) {
        turnosAjuste++;

        vez++;
        if (vez === 5) {
            vez = 0;
            if (turnosAjuste == 0) {
                turnosAjuste = -10;
                cartaEvtAtual = sorteiaCartaEvt();
                ativaCarta(cartaEvtAtual, 1);
                for (let i = 0; i < jogadores.length; i++) {
                    efeitoCartaEvt(cartaEvtAtual, jogadores[i]);
                }
            }
        }

        if (turnosAjuste >= -5) {
            ativaCarta(cartasSorte[0], 0);
        }
        

        for (let i = 0; i < 5; i++) {
            jogadores[i].num--;
            if (jogadores[i].num === 0)
                jogadores[i].num = 5;
        
            atualizaHTMLJogador(jogadores[i]);
        }

        atNode = document.querySelectorAll(".fixo");

        for (let i = 0; i < atNode.length; i++) {
            atNode[i].addEventListener("mousedown", geraAt);
            atNode[i].style.cursor = "grab";
        }

        console.log("ajuste ->", turnosAjuste);
        console.log("vez ->", vez);
    }
}

botaoPassaEl.addEventListener("click", passaVez);

console.log(jogadores);


//Jogabilidade

let atNode = document.querySelectorAll(".fixo");
let elDragging = false;
let xInicial;
let yInicial;

let barraEmHover = null;

function retiraAtributo() {

}

//Geraçao da img dos atributos, retirada e reposicionamento

function geraAt(e) {
    if (!elDragging) {
        bodyEl.style.userSelect = "none";
        elDragging = true;
        let atualEl = e.currentTarget;

        let novaImg = document.createElement("img");
        novaImg.classList.add("atributo-status", "mov-img");

        let tipoAtributo = Number(atualEl.dataset.tipo);
        let atributoAtual = checaAtributo(tipoAtributo);

        xInicial = e.clientX - 15;
        yInicial = e.clientY - 15;

        if (modoDaltonicoAtivo) {
            rotulo = `imgs/${atributoAtual}dotdaltonico.png`;
        }
        else {
            rotulo = `imgs/${atributoAtual}dot.png`;
        }

        novaImg.src = rotulo;

        bodyEl.appendChild(novaImg);

        if (atualEl.classList.contains("atributo-status")) {
            if(atualEl.dataset.tipo == 0) {
                jogadores[vez].vida--;
                jogadores[vez].saldo.sVida++;
            }
            else if(atualEl.dataset.tipo == 1) {
                jogadores[vez].agua--;
                jogadores[vez].saldo.sAgua++;
            }
            else if(atualEl.dataset.tipo == 2) {
                jogadores[vez].defesa--;
                jogadores[vez].saldo.sDefesa++;
            }
            else if(atualEl.dataset.tipo == 3) {
                jogadores[vez].dinheiro--;
                jogadores[vez].saldo.sDinheiro++;
            }

            atualizaHTMLJogador(jogadores[vez]);

            novaImg.dataset.origem = "barra";

            atNode = document.querySelectorAll(".fixo");

            for (let i = 0; i < atNode.length; i++) {
                atNode[i].addEventListener("mousedown", geraAt);
            }
        }
        else {
            novaImg.dataset.origem = "campo";
            for (let i = 0; i < atNode.length; i++) {
                atNode[i].style.cursor = "";
            }

        }

        bodyEl.style.cursor = "grabbing";
        novaImg.style.position = "fixed";
        novaImg.draggable = false;
        novaImg.style.left = xInicial + 'px';
        novaImg.style.top = yInicial + 'px';
        novaImg.dataset.tipo = tipoAtributo;
        novaImg.style.pointerEvents = "none";

        document.addEventListener("mousemove", moveAt);
        document.addEventListener("mouseup", paraAt);

        for (let i = 0; i < trocaAtNode.length; i++) {
            trocaAtNode[i].style.cursor = "";
        }
    }
}

function moveAt(e) {
    let img = document.querySelector(".mov-img");

    xInicial = e.clientX - 15;
    yInicial = e.clientY - 15;

    img.style.left = xInicial + 'px';
    img.style.top = yInicial + 'px';
}

function checaBarra(e) {
    let elAtual = e.currentTarget;
    for (let i = 0; i < 4; i++) {
        let tipoAtual = checaAtributo(i);
        if (elAtual.id == `p1-quantia-${tipoAtual}`) {
            barraEmHover = i;
            console.log(barraEmHover);
            break;
        }
    }
}

function paraAt() {
    let img = document.querySelector(".mov-img");
    let tipoImgAtual = img.dataset.tipo;

    if (Number(tipoImgAtual) == barraEmHover) {
        if(tipoImgAtual == 0 && jogadores[vez].vida < 10) {
            jogadores[vez].vida++;
            jogadores[vez].saldo.sVida--;
        }
        else if(tipoImgAtual == 1 && jogadores[vez].agua < 10) {
            jogadores[vez].agua++;
            jogadores[vez].saldo.sAgua--;
        }
        else if(tipoImgAtual == 2 && jogadores[vez].defesa < 10) {
            jogadores[vez].defesa++;
            jogadores[vez].saldo.sDefesa--;
        }
        else if(tipoImgAtual == 3 && jogadores[vez].dinheiro < 10) {
            jogadores[vez].dinheiro++;
            jogadores[vez].saldo.sDinheiro--;
        }

        atualizaHTMLJogador(jogadores[vez]);

        atNode = document.querySelectorAll(".fixo");
    }

    bodyEl.removeChild(img);

    bodyEl.style.cursor = "auto";

    elDragging = false;

    document.removeEventListener("mousemove", moveAt);
    document.removeEventListener("mouseup", paraAt);

    for (let i = 0; i < trocaAtNode.length; i++) {
        trocaAtNode[i].style.cursor = "grab";
    }

    for (let i = 0; i < atNode.length; i++) {
            atNode[i].addEventListener("mousedown", geraAt);
            atNode[i].style.cursor = "grab";
        }
}

for (let i = 0; i < trocaAtNode.length; i++) {
    trocaAtNode[i].addEventListener("mousedown", geraAt);
}

for (let i = 0; i < barraNode.length; i++) {
    barraNode[i].addEventListener("mouseover", checaBarra);
    barraNode[i].addEventListener("mouseout", () => {
        barraEmHover = null;
        console.log(barraEmHover);
    });
}

for (let i = 0; i < trocaAtNode.length; i++) {
    trocaAtNode[i].style.cursor = "grab";
}

for (let i = 0; i < jogadores.length; i++) {        
    efeitoCartaEvt(cartaEvtAtual, jogadores[i]);
}

for (let i = 0; i < trocaAtNode.length; i++) {
    trocaAtNode[i].addEventListener("mousedown", geraAt);
}

for (let i = 0; i < atNode.length; i++) {
    atNode = document.querySelectorAll(".fixo");
    atNode[i].addEventListener("mousedown", geraAt);
    atNode[i].style.cursor = "grab";
}