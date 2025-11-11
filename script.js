let personagens = [
    ["Roberta", [7, 4, 6, 3]],
    ["Hasan", [10, 10, 10, 10]],
    ["João", [2, 7, 7, 10]],
    ["Janaína", [6, 9, 5, 2]],
    ["Nicolas", [4, 5, 2, 6]]
]

let jogadores = [];

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


function rotuloInnerAtributo(tipo, valorAtributo) {
    let rotulo = "";
    let atributoA = checaAtributo(tipo);
    
    for (let i = 0; i < valorAtributo; i++) {
        rotulo = rotulo + `<img src="imgs/${atributoA}dot.png" class="atributo-status">`;
    }

    return rotulo;
}

function checaJogadores(person) {
    let vetorSize = jogadores.length;

    for (let i = 0; i < vetorSize; i++) {
        if (person[0] == jogadores[i].nome) {
            return 1;
        }
    }
    
    return 0;
}

function escolhePersonagem() {
    let rNumber;
    let personagemAtual;

    while (1) {
        rNumber = Math.random();

        if (rNumber === 0 || rNumber < 0.2) {
            personagemAtual = personagens[0];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 0.2 && rNumber < 0.4) {
            personagemAtual = personagens[1];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 0.4 && rNumber < 0.6) {
            personagemAtual = personagens[2];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 0.6 && rNumber < 0.8) {
            personagemAtual = personagens[3];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
        else if(rNumber >= 0.8 && rNumber < 1) {
            personagemAtual = personagens[4];
            if (!checaJogadores(personagemAtual)) {
                return personagemAtual;
            }
        }
    }
}

function criaJogador(nJogador) {
    let personagemA = escolhePersonagem();

    let jogador = {
        personagem: personagemA,

        num: nJogador,
        nome: personagemA[0],
        vida: personagemA[1][0],
        agua: personagemA[1][1],
        defesa: personagemA[1][2],
        dinheiro: personagemA[1][3],
    }

    return jogador;
}

function atualizaHTMLJogador(jogador) {
    let jogadorBarraLife = document.querySelector(`#p${jogador.num}-quantia-vida`);
    let jogadorBarraWater = document.querySelector(`#p${jogador.num}-quantia-agua`);
    let jogadorBarraDefense = document.querySelector(`#p${jogador.num}-quantia-defesa`);
    let jogadorBarraMoney = document.querySelector(`#p${jogador.num}-quantia-dinheiro`);
    let jogadorName = document.querySelector(`#p${jogador.num}-nome`);

    jogadorBarraLife.innerHTML = rotuloInnerAtributo(0, jogador.vida);
    jogadorBarraWater.innerHTML = rotuloInnerAtributo(1, jogador.agua);
    jogadorBarraDefense.innerHTML = rotuloInnerAtributo(2, jogador.defesa);
    jogadorBarraMoney.innerHTML = rotuloInnerAtributo(3, jogador.dinheiro);
    jogadorName.innerHTML = jogador.nome;
}

for (let i = 0; i < 5; i++) {
    jogadores.push(criaJogador(i + 1));
}

atualizaHTMLJogador(jogadores[0]);

console.log(jogadores);