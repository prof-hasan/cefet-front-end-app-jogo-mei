let botaoPassaEl = document.querySelector("#botao-passa");

let trocaAtNode = document.querySelectorAll(".troca-status");

let bodyEl = document.querySelector("body");

let barraNode = document.querySelectorAll(".barra-atributo");

let nJogadores = 5;

let vez = 0;
let turno = 0;

let jogadores = [];
let vetorAtributos = ["Saúde", "Disp. hídrica", "Segurança", "Disp. monetária", "Total"];

function strAtUpper(str) {
    let c = str[0].toUpperCase();

    let restoStr = str.slice(1);

    return c + restoStr
}

function checaMenMaiAtributo(tipo, tipoAt, vJogadores) {
    if (tipo == "menor") {
        let menor = vJogadores[0];
        for (let i = 1; i < vJogadores.length; i++) {
            if (vJogadores[i][`${tipoAt}`] < menor[`${tipoAt}`])
                menor = vJogadores[i];
        }

        console.log(menor);
        return menor;
    }
    else if (tipo == "maior") {
        let maior = vJogadores[0];
        for (let i = 1; i < vJogadores.length; i++) {
            if (vJogadores[i][`${tipoAt}`] > maior[`${tipoAt}`])
                maior = vJogadores[i];
        }
        return maior;
    }
}

function checaMaiorMenor(tipo, vJogadores) {
    if (tipo == "menor") {
        let menor = vJogadores[0];
        for (let i = 1; i < vJogadores.length; i++) {
            if (vJogadores[i].total() < menor.total())
                menor = vJogadores[i];
        }
        return menor;
    }
    else if (tipo == "maior") {
        let maior = vJogadores[0];
        for (let i = 1; i < vJogadores.length; i++) {
            if (vJogadores[i].total() > maior.total())
                maior = vJogadores[i];
        }
        return maior;
    }
}

//Checa de qual atributo se trata dependendo do número informado
function checaAtributo(tipo) {
    switch (tipo) {
        case 0:
            return 'vida';

        case 1:
            return 'agua';

        case 2:
            return 'defesa';
        
        case 3:
            return 'dinheiro';
    }
}

let modoDaltonicoAtivo = localStorage.getItem("modoDaltonico");
let botaoModoDaltonicoEl = document.querySelector('#botao-daltonismo');

if (modoDaltonicoAtivo === "true")
    Boolean(modoDaltonicoAtivo);
else
    modoDaltonicoAtivo = false;

botaoModoDaltonicoEl.checked = modoDaltonicoAtivo;


botaoModoDaltonicoEl.addEventListener('click', () => {
    if (modoDaltonicoAtivo) {
        modoDaltonicoAtivo = false;
        localStorage.setItem("modoDaltonico", modoDaltonicoAtivo);
    }
    else {
        modoDaltonicoAtivo = true;
        localStorage.setItem("modoDaltonico", modoDaltonicoAtivo);
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
function checaJogadores(personNome) {
    let vetorSize = jogadores.length;

    for (let i = 0; i < vetorSize; i++) {
        if (personNome == jogadores[i].nome) {
            return jogadores[i];
        }
    }
    
    return 0;
}

//Escolhe e retorna um personagem a partir de um número aleatório
function escolhePersonagem() {
    let personagemAtual;
    let rNumber;

    let piso, teto, size = personagens.length - 1;

    while (1) {
        rNumber = Math.random();

        for (let i = 0; i < size; i++) {
            if ((i === 0 && rNumber === 0) || rNumber < 1 / size) {
                personagemAtual = personagens[i];
                if (!checaJogadores(personagemAtual.nome)) {
                    return personagemAtual;
                }
            }

            else if (rNumber >= piso && rNumber < teto) {
                personagemAtual = personagens[i];
                if (!checaJogadores(personagemAtual.nome)) {
                    return personagemAtual;
                }
            }

            piso = (1 / size) * (i + 1);
            teto = (1 / size) * (i + 2);
        }
    }
}

function sorteiaCarta(cartas) {
    let rNumber;

    rNumber = Math.random();
    let piso, teto, size = cartas.length;

    for (let i = 0; i < size; i++) {
        if ((i === 0 && rNumber === 0) || rNumber < 1 / size)
            return cartas[i];

        else if (rNumber >= piso && rNumber < teto)
            return cartas[i];

        piso = (1 / size) * (i + 1);
        teto = (1 / size) * (i + 2);
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
        saldo: {sVida: 0, sAgua: 0, sDefesa: 0, sDinheiro: 0},
        total: function() {
            return this.vida + this.agua + this.defesa + this.dinheiro;
        },
        status: "emJogo"
    }

    return jogador;
}

//Atualiza o innerHTML das barras de atributo do jogador no turno atual com o rotulo retornado pela função rotuloInnerHTML
function atualizaHTMLJogador(jogador) {
    let jogadorBarraLife = document.querySelector(`#p${jogador.num}-quantia-vida`);
    let jogadorBarraWater = document.querySelector(`#p${jogador.num}-quantia-agua`);
    let jogadorBarraDefense = document.querySelector(`#p${jogador.num}-quantia-defesa`);
    let jogadorBarraMoney = document.querySelector(`#p${jogador.num}-quantia-dinheiro`);
    let jogadorName = document.querySelector(`#p${jogador.num}-nome`);
    let jogadorImg = document.querySelector(`#p${jogador.num}-img`);

    if (jogador.num === 1) {
        let labelAtNode = document.querySelectorAll(".atributo-label");

        labelAtNode[0].innerHTML = `Saúde: ${jogador.vida}/10`;
        labelAtNode[1].innerHTML = `Disp. hídrica: ${jogador.agua}/10`;
        labelAtNode[2].innerHTML = `Segurança: ${jogador.defesa}/10`;
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
                saldoText.style.color = "#5CE65C";
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
        jogadorBarraDefense.innerHTML = `Segurança: ${jogador.defesa}/10`;
        jogadorBarraMoney.innerHTML = `Disp. Monetária: ${jogador.dinheiro}/10`;
    }

    jogadorImg.src = `imgs/personagens/${jogador.nome}.png`;
    jogadorName.innerHTML = jogador.nome;

    if (!verificaStatus(jogador)) {
        jogador.status = "fora de jogo";
    }

    if (jogador.status != "emJogo") {
        jogadorImg.src = `imgs/personagens/foraDeJogo.png`;
    }
}

function verificaStatus(jogador) {
    for (let i = 0; i < 4; i++) {
        console.log("atJog -> ", jogador[checaAtributo(i)]);
        if (jogador[checaAtributo(i)] == 0)
            return 0;
    }
    
    return 1;
}

let cartaDisplay = 0;


//Ativa o efeito da carta de envento no jogador
function efeitoCartaEvt(carta, jogador) {
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

let respostaPlayer, respostaAtributo;

function perguntaSorte(tipo, vJog) {
    let caixaPerguntaEl = document.createElement("div");
    caixaPerguntaEl.classList.add("caixa-pergunta");
    bodyEl.appendChild(caixaPerguntaEl);

    let caixaTituloEl = document.createElement("h1");
    caixaTituloEl.innerHTML = "Escolha um ";
    caixaPerguntaEl.appendChild(caixaTituloEl);

    let containerOptionsEl = document.createElement("div");
    caixaPerguntaEl.appendChild(containerOptionsEl);

    if (tipo == "player" || tipo == "troca") {
        let nPlayerOpcao;
        caixaTituloEl.innerHTML += "jogador";
        console.log("length -> ", vJog.length);
        for (let i = 0; i < vJog.length; i++) {
            let opcaoEl = document.createElement("p");

            if (vJog[i] != jogadores[vez]) {
                opcaoEl.innerHTML = vJog[i].nome;
                containerOptionsEl.appendChild(opcaoEl);
            }

        }

        $(".caixa-pergunta p").click((e) => respondePergunta(e, tipo, caixaPerguntaEl));
    }
    else if (tipo == "atributo") {
        caixaTituloEl.innerHTML += "atributo";

        for (let i = 0; i < 4; i++) {
            let opcaoEl = document.createElement("p");
            opcaoEl.innerHTML = vetorAtributos[i];
            opcaoEl.dataset.tipoAt = checaAtributo(i);

            containerOptionsEl.appendChild(opcaoEl);
        }

        $(".caixa-pergunta p").click((e) => {respondePergunta(e, tipo, caixaPerguntaEl)});
    }

    $(".caixa-pergunta").fadeToggle();
}

function respondePergunta(e, tipo, caixaEl, vJog) {
    let resposta = null;
    let opcaoEscolhida = e.currentTarget;

    $(".caixa-pergunta p").off("click");

    if (tipo == "player") {
        resposta = opcaoEscolhida.innerHTML;
        respostaPlayer = checaJogadores(resposta);
        setTimeout(() => {
            bodyEl.removeChild(caixaEl);
            perguntaSorte("atributo", vJog);
        }, 500);
    }
    else if (tipo == "troca") {
        resposta = opcaoEscolhida.innerHTML;
        respostaPlayer = checaJogadores(resposta);

        console.log("resp ->", respostaPlayer);
        cartaSorteAtual.efeito();

        setTimeout(() => {
            bodyEl.removeChild(caixaEl);
        }, 500);

        atNode = document.querySelectorAll(".fixo");

        for (let i = 0; i < atNode.length; i++) {
            atNode[i].addEventListener("mousedown", geraAt);
            atNode[i].style.cursor = "grab";
        }
    }
    else if (tipo == "atributo") {
        let resposta = opcaoEscolhida.dataset.tipoAt;
        respostaAtributo = resposta;

        console.log(respostaPlayer, respostaAtributo);
        cartaSorteAtual.efeito();

        console.log(caixaEl);

        setTimeout(() => {
            bodyEl.removeChild(caixaEl);
        }, 500);

        atNode = document.querySelectorAll(".fixo");

        for (let i = 0; i < atNode.length; i++) {
            atNode[i].addEventListener("mousedown", geraAt);
            atNode[i].style.cursor = "grab";
        }
    }

    $(".caixa-pergunta").fadeToggle();

    console.log(resposta);
};

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
        playText(carta.descricao);
    }
    else {
        cartaTras.src = `imgs/cartasSA/SorteouAzar-${carta.id}.png`;
        cartaTras.style.borderRadius = "40px";
        cartaFrente.style.borderRadius = "40px";
    }

    containerCarta.appendChild(cartaFrente);
    containerCarta.appendChild(cartaTras);

    let avisoEl = document.createElement("p");
    avisoEl.classList.add("aviso");
    avisoEl.innerHTML = "Clique duas vezes na tela para abaixar a carta";
    avisoEl.style.display = "none";
    bodyEl.appendChild(avisoEl);

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

            $(".aviso").fadeOut(200);

            setTimeout(() => {
                bodyEl.removeChild(containerCarta);
                bodyEl.removeEventListener("dblclick", funcaoRemove);
                bodyEl.style.overflowY = "auto";
                cartaDisplay = 0;
                if (tipo == 0) {
                    cartaSorteAtual.evento();
                }
                bodyEl.removeChild(avisoEl);
            }, 500);
        }
    };

    setTimeout(() => {
        if (cartaDisplay == 1)
            $(".aviso").fadeToggle();
    }, 2500);

    let funcaoMove = function() {
        containerCarta.transformOrigin = "20%";
    };

    let autoTimeOut = setTimeout(funcaoRemove, 20000);

    setTimeout(() => {
        bodyEl.addEventListener("dblclick", funcaoRemove);
    }, 1500);

    console.log(tipo);

    if (tipo == 0) {
        console.log("Entrou");
        console.log(bodyEl.removeEventListener("dblclick", funcaoRemove));
        clearTimeout(autoTimeOut);
        bodyEl.removeEventListener("dblclick", funcaoRemove);

        setTimeout(() => {
            bodyEl.addEventListener("dblclick", funcaoMove);
        });
    }
}



//Passagem turnos
for (let i = 0; i < 5; i++) {
    jogadores.push(criaJogador(i + 1));
    atualizaHTMLJogador(jogadores[vez + i]);
}

let cartaEvtAtual = sorteiaCarta(cartasEvt), cartaSorteAtual;
ativaCarta(cartaEvtAtual, 1);

let turnosAjuste = -10;

let jogadoresEmJogo = [];
for (let i = 0; i < jogadores.length; i++) {
    if (jogadores[i].status == "emJogo")
        jogadoresEmJogo.push(jogadores[i]);
}

let ultimoPlayer = jogadores[jogadores.length - 1];


function passaVez() {
    console.log("length -> ", jogadores.length);

    jogadoresEmJogo = [];
    for (let i = 0; i < jogadores.length; i++) {
        if (jogadores[i].status == "emJogo")
            jogadoresEmJogo.push(jogadores[i]);
    }

    if (!cartaDisplay) {
        console.log("passada a vez");
        playText("Passada a vez.");

        turnosAjuste++;
        vez++;

        if (vez >= 5) {
            vez = 0;

            for (let i = 0; i < 5; i++) {
                jogadores[i].num--;
                if (jogadores[i].num === 0)
                    jogadores[i].num = 5;
            
                atualizaHTMLJogador(jogadores[i]);
            }
            
            if (!verificaStatus(jogadores[vez])) {
                passaVez();
                return;
            }

            if (turnosAjuste >= 0) {
                turnosAjuste -= 10;
                cartaEvtAtual = sorteiaCarta(cartasEvt);

                console.log("carta -> ", cartaEvtAtual);

                ativaCarta(cartaEvtAtual, 1);
                for (let i = 0; i < jogadores.length; i++) {
                    efeitoCartaEvt(cartaEvtAtual, jogadores[i]);
                }
            }
        }
        else {
            for (let i = 0; i < 5; i++) {
                jogadores[i].num--;
                if (jogadores[i].num === 0)
                    jogadores[i].num = 5;
            
                atualizaHTMLJogador(jogadores[i]);
            }

            if (!verificaStatus(jogadores[vez])) {
                passaVez();
                return;
            }
        }

        console.log("flag -> ", jogadores);

        if (turnosAjuste >= -5) {
            cartaSorteAtual = sorteiaCarta(cartasSorte);
            ativaCarta(cartaSorteAtual, 0);
        }

        console.log("ajuste ->", turnosAjuste);
        console.log("vez -> ", vez);

        
        let ultimoIndex = vez - 1;

        if (ultimoIndex < 0)
            ultimoIndex += jogadores.length;

        verificaSaldo(jogadores[ultimoIndex]);

        if (!verificaStatus(jogadores[ultimoIndex])) {
            jogadores[i].status = "fora de jogo";
        }

        for (let i = 0; i < jogadores.length; i++) {
            atualizaHTMLJogador(jogadores[i]);
        }

        atNode = document.querySelectorAll(".fixo");

        for (let i = 0; i < atNode.length; i++) {
            atNode[i].addEventListener("mousedown", geraAt);
            atNode[i].style.cursor = "grab";
        }


        verificaVitoria();
    }
}

function verificaVitoria() {
    if (jogadoresEmJogo.length == 1) {
        bodyEl.removeChild(document.querySelector("#container"));
        
        let containerTelaVitoriaEl = document.createElement("div");
        containerTelaVitoriaEl.classList.add("container-vitoria");
        
        let titleEl =  document.createElement("h1");
        titleEl.innerHTML = "VITÓRIA";

        let imgPlayerEl = document.createElement("img");
        imgPlayerEl.classList.add("carta-img");
        imgPlayerEl.src = `imgs/personagens/${jogadoresEmJogo[0].nome}.png`;

        let nomeJogador = document.createElement("h2");
        nomeJogador.innerHTML = jogadoresEmJogo[0].nome;

        let botaoMenuEl = document.createElement("button");
        botaoMenuEl.classList.add("btn");
        botaoMenuEl.innerHTML = "Voltar ao menu";
        
        botaoMenuEl.addEventListener("click", () => {
            window.location.href = "../../menu.html";
        });

        containerTelaVitoriaEl.appendChild(titleEl);
        containerTelaVitoriaEl.appendChild(imgPlayerEl);
        containerTelaVitoriaEl.appendChild(nomeJogador);
        containerTelaVitoriaEl.appendChild(botaoMenuEl);

        bodyEl.appendChild(containerTelaVitoriaEl);
    }
}

function calculaUltimoPlayerVivo(jogador) {
    let ultimoPlayerIndex = jogadoresEmJogo.indexOf(jogador) - 1;

    if (ultimoPlayerIndex < 0)
        ultimoPlayerIndex += jogadoresEmJogo.length;

    return jogadoresEmJogo[ultimoPlayerIndex];
}

function verificaSaldo(jogador) {
    for (let i = 0; i < 4; i++) {
        let tipoAtributo = strAtUpper(checaAtributo(i));
        if (jogador.saldo[`s${tipoAtributo}`] != 0) {
            jogador[checaAtributo(i)] -= (Math.abs(jogador.saldo[`s${tipoAtributo}`]) + 1);
            jogador.saldo[`s${tipoAtributo}`] = 0;
        }
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

//Geraçao da img dos atributos, retirada e reposicionamento

function geraAt(e) {
    if (!elDragging) {
        bodyEl.style.userSelect = "none";
        elDragging = true;
        let atualEl = e.currentTarget;

        playText('segurando');

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

    playText('parou');

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

    if (barraEmHover == null) {
        $('.mov-img').fadeOut();

        setTimeout(() => {
            bodyEl.removeChild(img);
        }, 300);
    }
    else {
        bodyEl.removeChild(img);
    }

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

// Infos dos personagens, hover nas imagens

let portraitNode = document.querySelectorAll(".info");

let tipoVerificacao = "";

function mostraInfosPersonagem(e) {
    tipoVerificacao = "entrada";
    let imgEl = e.currentTarget;
    let jogadorNum = Number(imgEl.dataset.num) + 1;

    console.log("number -> ", jogadorNum);

    let jogadorAtual = null;

    for (let i = 0; i < jogadores.length; i++) {
        if (jogadorNum == jogadores[i].num)
            jogadorAtual = jogadores[i];
    }

    console.log("pers -> ", jogadorAtual);

    let caixaInfoEl = document.createElement("div");
    caixaInfoEl.classList.add("caixa-info");

    let nomeEl = document.createElement("h1");
    nomeEl.innerHTML = jogadorAtual.nome;
    caixaInfoEl.appendChild(nomeEl);

    let descricaoEl = document.createElement("p");
    descricaoEl.innerHTML = jogadorAtual.personagem.descricao;
    caixaInfoEl.appendChild(descricaoEl);

    caixaInfoEl.appendChild(document.createElement("br"));

    let listaAtEl = document.createElement("ul");
    caixaInfoEl.appendChild(listaAtEl);

    for (let i = 0; i < 5; i++) {
        let liEl = document.createElement("li");
        
        if (i < 4) {
            liEl.innerHTML = `${vetorAtributos[i]}: ${jogadorAtual[checaAtributo(i)]}`;
        }
        else {
            liEl.innerHTML = `${vetorAtributos[i]}: ${jogadorAtual.total()}`;
        }

        listaAtEl.appendChild(liEl);
    }

    bodyEl.appendChild(caixaInfoEl);
    bodyEl.style.overflowX = "hidden";

    xInicial = e.clientX - 15;
    yInicial = e.clientY - 15;

    caixaInfoEl.style.position = "fixed";
    caixaInfoEl.draggable = false;
    caixaInfoEl.style.left = xInicial + 'px';
    caixaInfoEl.style.top = yInicial + 'px';
    caixaInfoEl.style.pointerEvents = "none";

    document.addEventListener("mousemove", moveInfo);
    imgEl.addEventListener("mouseout", paraInfo);
}

for (let i = 0; i < portraitNode.length; i++) {
    portraitNode[i].addEventListener("mouseover", mostraInfosPersonagem);
}

function moveInfo(e) {
    let caixaInfoEl = document.querySelector(".caixa-info");

    if (!caixaInfoEl) {
        document.removeEventListener("mousemove", moveInfo);
        return; 
    }

    if (verificaUltr(caixaInfoEl, tipoVerificacao)) {
        tipoVerificacao = "hover";
        xInicial = e.clientX - 300;
    }
    else {
        xInicial = e.clientX - 15;
    }

    yInicial = e.clientY - 15;

    caixaInfoEl.style.left = xInicial + 'px';
    caixaInfoEl.style.top = yInicial + 'px';
}

function verificaUltr(element, tipo) {
    let posEl = element.getBoundingClientRect();

    console.log(posEl.right, " - ", window.innerWidth)

    if (tipo == "entrada") {
        return posEl.right > window.innerWidth;
    }

    else if (tipo == "hover")
        return posEl.right + window.innerWidth / 4 > window.innerWidth;
}

function paraInfo() {
    let caixaInfoEl = document.querySelector(".caixa-info");

    bodyEl.removeChild(caixaInfoEl);

    document.removeEventListener("mousemove", moveInfo);
    bodyEl.style.overflowX = "auto";
}

//Easter egg Hasan

cheet('h a s a n', () => {
    let personagemHasan = personagens[personagens.length - 1];

    let jogador = {
        personagem: personagemHasan,

        num: vez + 1,
        nome: personagemHasan.nome,
        vida: personagemHasan.vida,
        agua: personagemHasan.agua,
        defesa: personagemHasan.defesa,
        dinheiro: personagemHasan.dinheiro,
        local: personagemHasan.local,
        saldo: {sVida: 0, sAgua: 0, sDefesa: 0, sDinheiro: 0},
        total: function() {
            return this.vida + this.agua + this.defesa + this.dinheiro;
        },
        status: "emJogo"
    }

    jogadores[vez] = jogador;

    for (let i = 0; i < jogadores.length; i++) {
        atualizaHTMLJogador(jogadores[i]);
    }

    atNode = document.querySelectorAll(".fixo");

    for (let i = 0; i < atNode.length; i++) {
            atNode[i].addEventListener("mousedown", geraAt);
            atNode[i].style.cursor = "grab";
    }
})


/*--- voz ---*/

//AUDIO DA HATSUNE MIKU!!!!!

function playText(texto) {
    if (!speechSynthesis) return;

    speechSynthesis.cancel();

    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    
    let voices = speechSynthesis.getVoices();
    let ptBrVoice = voices.find(voice => voice.lang === 'pt-BR');
    utterance.voice = ptBrVoice;

    utterance.rate = 0.9;
    utterance.pitch = 4;

    speechSynthesis.speak(utterance);
}

// AUDIO DE VOZ NORMAL!!!!!
/*
const cacheDeAudio = {};
let currentAudio = null;
let usuarioInteragiu = false;

document.addEventListener('click', () => {
   usuarioInteragiu = true;
},
{ 
   once: true 
})

document.addEventListener('keydown', () => {
    usuarioInteragiu = true;
}, 
{ 
   once: true 
})

async function hashString(texto) {
    const encoder = new TextEncoder(); 
    const data = encoder.encode(texto); // pega os bytes do que vai ser falado
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);  // codifica os dados 
    const hashArray = Array.from(new Uint8Array(hashBuffer));  // pega esses dados, transforma numa string e poe em hexadecimal
    const hashHex = hashArray
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");

    return hashHex;
}

function playAudio(audioURL) {
    if (currentAudio) {
        currentAudio.pause();   // se ja tem um tocando, ele para
    }

    if (!usuarioInteragiu) {
       return;   // caso o usuário ainda nao clicou no jogo, o áudio nao toca por uma proteção do navegador
    }

    currentAudio = new Audio(audioURL);
    currentAudio.play();
}

async function playText(texto) {

    try {
        const hashTexto = await hashString(texto);

        if (cacheDeAudio[hashTexto]) {
            return playAudio(cacheDeAudio[hashTexto]);
        } 

        const resposta = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
            method: "POST",  // envia os dados pro elevenlabs transformar em audio
            headers: {
                "Content-Type": "application/json",  // significa q eu to enviando dados json
                "xi-api-key": "sk_08e7933c56ddfa17aee9e04ddafe61304910b50b1279b79f"
            },
            body: JSON.stringify({
                text: texto
            })
        })

        if (!resposta.ok) {
                const erro = await resposta.json();
                console.error("Erro ElevenLabs:", erro);
                return;
            }

        const contentType = resposta.headers.get("Content-Type");

        if (!contentType || !contentType.startsWith("audio")) {
            const erro = await resposta.text();
            console.error("Resposta não é áudio:", erro);
            return;
        }

        const audioBlob = await resposta.blob();
        const audioURL = URL.createObjectURL(audioBlob);

        cacheDeAudio[hashTexto] = audioURL;
        playAudio(audioURL);

    } catch (err) {
        console.error("Erro geral no playText:", err);
    }

}
*/