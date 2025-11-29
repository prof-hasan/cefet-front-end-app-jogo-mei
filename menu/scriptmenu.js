let palavrasFundoEl = document.querySelectorAll(".palavrafundo");
let botaoJogarEL = document.querySelector("#jogar");

function jogar(){
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