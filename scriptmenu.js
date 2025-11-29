let palavrasFundoEl = document.querySelectorAll(".palavrafundo");
let botaoJogarEL = document.querySelector("#jogar");

async function jogar(){
    await playText('Iniciando partida...');
    window.location.href = "../index.html";
}

botaoJogarEL.addEventListener('click', () => {
    jogar();
})

let botaoComoJogarEl = document.querySelector("#howtoplay");
let botaoAvancarEl = document.querySelector("#prox");
let botaoVoltarEl = document.querySelector("#ant");
let botaoFecharEl = document.querySelector("#fechar");
let fecharFundoEscuro = document.querySelector("#fundoescuro");
let imagemAtualEl = document.querySelector("#imgmanual")

let imagemAtual = 0;

const diretorioImgManual = "imgmenu/manual/slide";

let escondidosEl = document.querySelectorAll(".hidden");

function atualizaImagem(){
    imagemAtualEl.setAttribute("src", `${diretorioImgManual}${imagemAtual}.png`); 
}

botaoComoJogarEl.addEventListener("click", () => {
    for (let i = 0; i < escondidosEl.length; i++){
        escondidosEl[i].classList.toggle("hidden");
    }
})

botaoFecharEl.addEventListener("click", () => {
    for (let i = 0; i < escondidosEl.length; i++){
        escondidosEl[i].classList.toggle("hidden");
    }
})

fecharFundoEscuro.addEventListener("click", () => {
    for (let i = 0; i < escondidosEl.length; i++){
        escondidosEl[i].classList.toggle("hidden");
    }
})

botaoAvancarEl.addEventListener("click", () => {
    imagemAtual = (4 + imagemAtual) % 3;

    atualizaImagem();
})

botaoVoltarEl.addEventListener("click", () => {
    imagemAtual = (5 + imagemAtual) % 3;

    atualizaImagem();
})

/*--- voz ---*/

function playText(texto) {
    fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "xi-api-key": "sk_08e7933c56ddfa17aee9e04ddafe61304910b50b1279b79f"
        },
        body: JSON.stringify({
            text: texto
        })
    })
    .then(respostaB => respostaB.blob())
    .then(resposta => {
        const audioUrl = URL.createObjectURL(resposta);
        const audio = new Audio(audioUrl);
        audio.play();
    })
    .catch(error => {
        console.error("Erro ao tentar tocar o áudio. Prosseguindo.", error);
        return Promise.resolve(); 
    });
}
