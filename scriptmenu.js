let palavrasFundoEl = document.querySelectorAll(".palavrafundo");
let botaoJogarEL = document.querySelector("#jogar");


//Botões El
let botaoComoJogarEl = document.querySelector("#howtoplay");
let botaoAvancarEl = document.querySelector("#prox");
let botaoVoltarEl = document.querySelector("#ant");
let botaoFecharEl = document.querySelector("#fechar");
let fecharFundoEscuro = document.querySelector("#fundoescuro");
let imagemAtualEl = document.querySelector("#imgmanual");

function jogar(){
    window.location.href = "jogo/index.html";
}

botaoJogarEL.addEventListener('click', () => {
    jogar();
})

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
});

botaoFecharEl.addEventListener("click", () => {
    for (let i = 0; i < escondidosEl.length; i++){
        escondidosEl[i].classList.toggle("hidden");
    }
});

fecharFundoEscuro.addEventListener("click", () => {
    for (let i = 0; i < escondidosEl.length; i++){
        escondidosEl[i].classList.toggle("hidden");
    }
});

botaoAvancarEl.addEventListener("click", () => {
    imagemAtual++;

     if (imagemAtual > 2)
        imagemAtual = 0;

    atualizaImagem();
});

botaoVoltarEl.addEventListener("click", () => {
     imagemAtual--;

     if (imagemAtual < 0)
        imagemAtual = 2;

    atualizaImagem();
});

