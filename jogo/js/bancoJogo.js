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
        condicao: "",
        descricao: "Mulher negra, moradora da periferia, trabalha como diarista, enfrenta enchentes, poluição e serviços precários na periferia."
    },
    {
        nome: "Gabriel",
        vida: 4,
        agua: 8,
        defesa: 9,
        dinheiro: 7,
        local: "AreaPriv",
        idade: "",
        condicao: "Asma",
        descricao: "Jovem branco de classe média, mora em área privilegiada e tem acesso a muitos recursos, mas sofre com crises de <strong>asma</strong>."
    },
    {
        nome: "Luanda",
        vida: 8,
        agua: 4,
        defesa: 3,
        dinheiro: 2,
        local: "Quilombo",
        idade: "",
        condicao: "",
        descricao: "Jovem quilombola em <strong>área ameaçada</strong>, líder de um quilombo sob risco de desapropriação por grandes empresas."
    },
    {
        nome: "Kaike",
        vida: 9,
        agua: 6,
        defesa: 5,
        dinheiro: 2,
        local: "Aldeia",
        idade: "",
        condicao: "",
        descricao: "Indígena afetado que vive em área tradicional afetada por queimadas, luta por direitos ambientais."
    },
    {
        nome: "Maria",
        vida: 7,
        agua: 2,
        defesa: 3,
        dinheiro: 2,
        local: "Periferia",
        idade: "",
        condicao: "",
        descricao: "Criança que vive em área de <strong>alta vulnerabilidade social</strong>, afetado por poluição e exclusão."
    },
    {
        nome: "Adriana",
        vida: 5,
        agua: 4,
        defesa: 4,
        dinheiro: 4,
        local: "",
        idade: "",
        condicao: "",
        descricao: "Mãe solo, trabalha como catadora, mora próximo à um lixão e recebe auxílio do governo."
    },
    {
        nome: "Tereza",
        vida: 7,
        agua: 7,
        defesa: 5,
        dinheiro: 3,
        local: "",
        idade: "",
        descricao: "Moradora ribeirinha que vive em comunidade às margens do rio e depende diretamente da natureza para sobreviver."
    },
    {
        nome: "Roberto",
        vida: 2,
        agua: 10,
        defesa: 8,
        dinheiro: 10,
        local: "",
        idade: "Avançada",
        condicao: "",
        descricao: "Empresário, dono de indústria poluente, idoso influente e rico, que mora em local seguro, mas sua idade traz fragilidades de saúde."
    },
    {
        nome: "Hasan",
        vida: 10,
        agua: 10,
        defesa: 10,
        dinheiro: 10,
        local: "",
        idade: "",
        condicao: "",
        descricao: "Melhor professor de web do <strong>mundo</strong>."
    },
];

//Banco de cartas de evento (1 por turno, no começo)
let cartasEvt = [
    {
        nome: "calorE",
        id: 0,
        descricao: "Uma onda de calor atinge o território. O acesso desigual à água e à infraestrutura agrava os efeitos do clima."
    },
    {
        nome: "poluicaoDA",
        id: 1,
        descricao: "A poluição do ar, causada por atividades industriais, agrava condições dos moradores em regiões densamente povoadas."
    },
    {
        nome: "queimadaEAN",
        id: 2,
        descricao: "Um incêndio florestal descontrolado impacta a qualidade do ar e da água."
    },
    {
        nome: "surtoDH",
        id: 3,
        descricao: "A contaminação das águas provoca um surto de doenças."
    },
    {
        nome: "tempestadeCA",
        id: 4,
        descricao: "Chuvas intensas provocam alagamentos e deslizamentos. Áreas com pouca infraestrutura sofrem mais."
    }
];

//Banco de cartas de sorte ou azar
let vJogPergunta = [];
let cartasSorte = [
    {
        id: 1,
        evento: function() {
            perguntaSorte("atributo", jogadoresEmJogo);
        },
        efeito: function() {
            let jogMaior = checaMaiorMenor("maior", jogadoresEmJogo);
            let jogMenor = checaMaiorMenor("menor", jogadoresEmJogo);

            let tipoAtributo = strAtUpper(respostaAtributo);

            console.log(jogMaior, jogMenor, tipoAtributo);

            jogMaior.saldo[`s${tipoAtributo}`] -= 2;
            jogMenor.saldo[`s${tipoAtributo}`] += 2;

            for (let i = 0; i < jogadores.length; i++)
                atualizaHTMLJogador(jogadores[i]);
        }
    },
    {
        id: 2,
        evento: function() {
            perguntaSorte("atributo", jogadoresEmJogo);
        },
        efeito: function() {
            let tipoAtributo = strAtUpper(respostaAtributo);

            let ultimoJogador = calculaUltimoPlayerVivo(jogadores[vez]);

            jogadores[vez].saldo[`s${tipoAtributo}`] += 1;
            ultimoJogador.saldo[`s${tipoAtributo}`] -= 1;

            for (let i = 0; i < jogadores.length; i++)
                atualizaHTMLJogador(jogadores[i]);
        }
    },
    {
        id: 3,
        evento: function() {
            perguntaSorte("atributo", jogadoresEmJogo);
        },
        efeito: function() {
            let tipoAtributo = strAtUpper(respostaAtributo);

            let jogMenor = checaMenMaiAtributo("menor", "vida", jogadoresEmJogo);


            jogadores[vez].saldo[`s${tipoAtributo}`] -= 1;
            jogMenor.saldo[`s${tipoAtributo}`] += 1;

            for (let i = 0; i < jogadores.length; i++)
                atualizaHTMLJogador(jogadores[i]);
        }
    },
    {
        id: 4,
        evento: function() {
            vJogPergunta = jogadoresEmJogo;

            let jogM12 = [];

            for (let i = 0; i < vJogPergunta.length; i++) {
                if (vJogPergunta[i].total() > 12 && vJogPergunta[i] != jogadores[vez])
                    jogM12.push(jogadores[i]);
            }

            if (jogM12.length != 0)
                perguntaSorte("player", jogM12);
            else
                console.log("NAO ROLOU");
        },
        efeito: function() {
            let tipoAtributo = strAtUpper(respostaAtributo);
            let jogadorEscolha = respostaPlayer;

            jogadores[vez].saldo[`s${tipoAtributo}`] += 2;
            jogadorEscolha.saldo[`s${tipoAtributo}`] -= 2;

            for (let i = 0; i < jogadores.length; i++)
                atualizaHTMLJogador(jogadores[i]);
        }
    },
    {
        id: 5,
        evento: function() {
            perguntaSorte("troca", jogadoresEmJogo);
        },
        efeito: function() {
            let tipoAtributo = "Vida";

            console.log(jogadores[vez].saldo[`s${tipoAtributo}`]);

            jogadores[vez].saldo[`s${tipoAtributo}`] += 1;
            respostaPlayer.saldo[`s${tipoAtributo}`] += 1;

            for (let i = 0; i < jogadores.length; i++)
                atualizaHTMLJogador(jogadores[i]);
        }
    },
    {
        id: 8,
        evento: function() {
            cartaSorteAtual.efeito();
        },
        efeito: function() {
            let tipoAtributo = "Dinheiro";

            console.log("banco -> ", jogadores[vez].personagem.dinheiro);

            if (jogadores[vez].dinheiro < 4)
                jogadores[vez].saldo[`s${tipoAtributo}`] += jogadores[vez].personagem.dinheiro;
            
            for (let i = 0; i < jogadores.length; i++)
                atualizaHTMLJogador(jogadores[i]);

            atNode = document.querySelectorAll(".fixo");

            for (let i = 0; i < atNode.length; i++) {
                atNode[i].addEventListener("mousedown", geraAt);
                atNode[i].style.cursor = "grab";
            }
        }
    },
    {
        id: 9,
        evento: function() {
            vJogPergunta = jogadoresEmJogo;

            let jogM8seg = [];

            for (let i = 0; i < vJogPergunta.length; i++) {
                if (vJogPergunta[i].defesa > 8 && vJogPergunta[i] != jogadores[vez])
                    jogM8seg.push(jogadores[i]);
            }

            console.log(jogM8seg);

            if (jogM8seg.length != 0)
                perguntaSorte("troca", jogM8seg);
            else
                console.log("NAO ROLOU");
        },
        efeito: function() {
            let tipoAtributo = "Defesa";


            jogadores[vez].saldo[`s${tipoAtributo}`] += 1;
            respostaPlayer.saldo[`s${tipoAtributo}`] -= 1;
            
            for (let i = 0; i < jogadores.length; i++)
                atualizaHTMLJogador(jogadores[i]);
        }
    },
];