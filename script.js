JavaScript
const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");

const numeroPergunta = document.querySelector("#numero-pergunta");
const barraProgresso = document.querySelector("#barra-progresso");

const feedback = document.querySelector(".feedback");

const pontuacao = document.querySelector(".pontuacao");
const mensagemResultado = document.querySelector(".mensagem-resultado");

const botaoReiniciar = document.querySelector("#botao-reiniciar");

/*
    BANCO DE PERGUNTAS
*/
const perguntas = [
    {
        enunciado: "Em que ano começou a Segunda Guerra Mundial?",
        alternativas: [
            { texto: "1935", correta: false },
            { texto: "1939", correta: true },
            { texto: "1941", correta: false },
            { texto: "1945", correta: false }
        ]
    },
    {
        enunciado: "Qual acontecimento é considerado o início da Segunda Guerra Mundial na Europa?",
        alternativas: [
            { texto: "O ataque a Pearl Harbor", correta: false },
            { texto: "A invasão da Polônia pela Alemanha", correta: true },
            { texto: "O Dia D", correta: false },
            { texto: "A invasão da União Soviética", correta: false }
        ]
    },
    {
        enunciado: "Quem era o líder da Alemanha Nazista durante a Segunda Guerra Mundial?",
        alternativas: [
            { texto: "Benito Mussolini", correta: false },
            { texto: "Joseph Stalin", correta: false },
            { texto: "Adolf Hitler", correta: true },
            { texto: "Winston Churchill", correta: false }
        ]
    },
    {
        enunciado: "Qual acontecimento levou os Estados Unidos a entrarem oficialmente na Segunda Guerra Mundial?",
        alternativas: [
            { texto: "A invasão da Polônia", correta: false },
            { texto: "A Batalha de Stalingrado", correta: false },
            { texto: "O ataque japonês a Pearl Harbor", correta: true },
            { texto: "A invasão da França", correta: false }
        ]
    },
    {
        enunciado: "Qual país fazia parte das Potências do Eixo?",
        alternativas: [
            { texto: "França", correta: false },
            { texto: "Reino Unido", correta: false },
            { texto: "Estados Unidos", correta: false },
            { texto: "Itália", correta: true }
        ]
    },
    {
        enunciado: "O que foi o Dia D?",
        alternativas: [
            { texto: "O ataque japonês a Pearl Harbor", correta: false },
            { texto: "O desembarque dos Aliados na Normandia", correta: true },
            { texto: "A rendição da Alemanha", correta: false },
            { texto: "A invasão alemã da União Soviética", correta: false }
        ]
    },
    {
        enunciado: "Qual foi uma das principais batalhas que marcou a derrota alemã na Frente Oriental?",
        alternativas: [
            { texto: "Batalha de Stalingrado", correta: true },
            { texto: "Batalha de Waterloo", correta: false },
            { texto: "Batalha de Hastings", correta: false },
            { texto: "Batalha de Trafalgar", correta: false }
        ]
    },
    {
        enunciado: "Qual país foi governado por Benito Mussolini durante grande parte da Segunda Guerra Mundial?",
        alternativas: [
            { texto: "Espanha", correta: false },
            { texto: "Itália", correta: true },
            { texto: "Alemanha", correta: false },
            { texto: "Japão", correta: false }
        ]
    },
    {
        enunciado: "Quais cidades japonesas foram atingidas por bombas atômicas em agosto de 1945?",
        alternativas: [
            { texto: "Tóquio e Osaka", correta: false },
            { texto: "Kyoto e Tóquio", correta: false },
            { texto: "Hiroshima e Nagasaki", correta: true },
            { texto: "Osaka e Nagasaki", correta: false }
        ]
    },
    {
        enunciado: "Em que ano terminou a Segunda Guerra Mundial?",
        alternativas: [
            { texto: "1943", correta: false },
            { texto: "1944", correta: false },
            { texto: "1945", correta: true },
            { texto: "1946", correta: false }
        ]
    }
];

let atual = 0;
let pontos = 0;
let respondeu = false;

/*
    INICIALIZA E REINICIA O QUIZ
*/
function iniciarQuiz() {
    atual = 0;
    pontos = 0;
    respondeu = false;

    document.querySelector(".quiz").style.display = "block";
    document.querySelector(".progresso").style.display = "block";
    caixaResultado.style.display = "none";

    mostraPergunta();
}

/*
    MOSTRA A PERGUNTA ATUAL
*/
function mostraPergunta() {
    respondeu = false;

    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    const perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    feedback.textContent = "";
    feedback.className = "feedback";

    // Atualiza o número da pergunta
    numeroPergunta.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;

    // Atualiza a barra de progresso
    const progresso = ((atual + 1) / perguntas.length) * 100;
    barraProgresso.style.width = `${progresso}%`;

    mostraAlternativas(perguntaAtual);
}

/*
    CRIA OS BOTÕES DAS ALTERNATIVAS
*/
function mostraAlternativas(perguntaAtual) {
    perguntaAtual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.classList.add("alternativa");
        botao.textContent = `${String.fromCharCode(65 + indice)}) ${alternativa.texto}`;

        botao.addEventListener("click", () => {
            respostaSelecionada(alternativa, botao);
        });

        caixaAlternativas.appendChild(botao);
    });
}

/*
    VERIFICA A RESPOSTA
*/
function respostaSelecionada(opcaoSelecionada, botaoSelecionado) {
    if (respondeu) {
        return;
    }

    respondeu = true;
    const botoes = caixaAlternativas.querySelectorAll("button");

    // Desativa todos os botões
    botoes.forEach(botao => {
        botao.disabled = true;
    });

    // Verifica se acertou
    if (opcaoSelecionada.correta) {
        pontos++;
        botaoSelecionado.classList.add("correta");
        feedback.textContent = "✓ Resposta correta!";
        feedback.classList.add("acerto");
    } else {
        botaoSelecionado.classList.add("errada");
        feedback.textContent = "✗ Resposta incorreta!";
        feedback.classList.add("erro");

        // Mostra qual era a resposta correta
        const perguntaAtual = perguntas[atual];
        botoes.forEach((botao, indice) => {
            if (perguntaAtual.alternativas[indice].correta) {
                botao.classList.add("correta");
            }
        });
    }

    // Espera 1.2s antes de passar para a próxima pergunta
    setTimeout(() => {
        atual++;
        mostraPergunta();
    }, 1200);
}

/*
    MOSTRA O RESULTADO FINAL
*/
function mostraResultado() {
    document.querySelector(".quiz").style.display = "none";
    document.querySelector(".progresso").style.display = "none";
    caixaResultado.style.display = "block";

    pontuacao.textContent = `Você acertou ${pontos} de ${perguntas.length} perguntas.`;

    const porcentagem = (pontos / perguntas.length) * 100;

    if (porcentagem === 100) {
        mensagemResultado.textContent = "🏆 Perfeito! Você é um verdadeiro especialista em Segunda Guerra Mundial!";
    } else if (porcentagem >= 80) {
        mensagemResultado.textContent = "👏 Excelente! Você conhece muito bem a história da Segunda Guerra Mundial.";
    } else if (porcentagem >= 60) {
        mensagemResultado.textContent = "👍 Muito bom! Você tem bons conhecimentos sobre o assunto.";
    } else if (porcentagem >= 40) {
        mensagemResultado.textContent = "📚 Não foi mal! Mas ainda dá para estudar um pouco mais.";
    } else {
        mensagemResultado.textContent = "📖 Que tal estudar um pouco mais sobre a Segunda Guerra Mundial e tentar novamente?";
    }
}

/*
    EVENTOS DE INICIALIZAÇÃO
*/
botaoReiniciar.addEventListener("click", iniciarQuiz);

// Inicia o quiz ao carregar a página
iniciarQuiz();
