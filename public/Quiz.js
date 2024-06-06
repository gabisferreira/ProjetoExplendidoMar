// Dados do Quiz (Perguntas, Opções e Respostas)
var dadosQuiz = [
    {
        pergunta: "1 -Por que a água em um copo não é azul quando você está sentado ao ar livre?",
        opcoes: ["Nenhuma das alternativas", "Composição química", "A luz não é suficiente", "Não tem moléculas suficientes para absorver a luz"],
        resposta: "Não tem moléculas suficientes para absorver a luz"
    },
    {
        pergunta: "2 - Quantos cabos submarinos tem serviço em todo o mundo?",
        opcoes: ["320", "448", "678", "1.009"],
        resposta: "448"
    },

    {
        pergunta: "3 - Pode existir lagos e rios abaixo do oceano?",
        opcoes: ["Não, não faz sentido", "Não pode existir massa de água embaixo da água", "Sim, através da depressão", "Sim, mas a água é salgada"],
        resposta: "Sim, através da depressão"
    },
    {
        pergunta: "4 - Quais sons da para escutar no fundo do oceano?",
        opcoes: ["Ondas", "Passaros", "Nenhum", "Terremotos"],
        resposta: "Terremotos"
    },
    {
        pergunta: "5 - Quantos metros tem a parte mais profunda do oceano?",
        opcoes: ["10.994", "15.987", "8.563", "31.987"],
        resposta: "10.994"
    },
    {
        pergunta: "6 - É possível recuperar as toneladas de ouro que estão no fundo do oceano?",
        opcoes: ["Sim, é possível", "Não tem tecnologia suficiente", "Não, ainda não foi encontrado", "Não, pois é diluído"],
        resposta: "Não, pois é diluído"
    },
    {
        pergunta: "7 - Qual a distância do lugar mais remoto da terra?",
        opcoes: ["1.609 km", "2.132 km", "10.986 km", "7.371 km"],
        resposta: "1.609 km"
    },
    {
        pergunta: "8 - Onde esta a cachoeira com maior volume de água na terra?",
        opcoes: ["Cataratas do Niágara", "Dinamarca", "Venezuela", "Brasil"],
        resposta: "Dinamarca"
    },
    {
        pergunta: "9 - Um fitoplâncton é responsável por quantas respirações de um ser humano?",
        opcoes: ["Nenhuma", "2", "7", "5"],
        resposta: "5"
    },
    {
        pergunta: "10 - Para qual lugar do mar os satélites são enviados ao fim da sua vida útil?",
        opcoes: ["Área 51", "Continua no espaço", "Ponto nemo", "China"],
        resposta: "Ponto nemo"
    },
];

var perguntaAtual = 0; // Índice da pergunta atual
var pontuacao = 0; // Pontuação inicial do quiz

function carregarPergunta() {
    var elementoTextoPergunta = document.getElementById('texto-pergunta');
    var containerOpcoes = document.getElementById('container-opcoes');
    var dadosPerguntaAtual = dadosQuiz[perguntaAtual];

    // Exibe a pergunta atual
    elementoTextoPergunta.textContent = dadosPerguntaAtual.pergunta;
    containerOpcoes.innerHTML = ''; // Limpa as opções

    // Adiciona botões para cada opção de resposta
    dadosPerguntaAtual.opcoes.forEach(opcao => {
        var botao = document.createElement('button');
        botao.textContent = opcao;
        botao.classList.add('opcao-btn');
        botao.addEventListener('click', () => verificarResposta(opcao));
        containerOpcoes.appendChild(botao);
    });

    // Desabilita o botão "Próxima Pergunta" até que uma resposta seja selecionada
    document.getElementById('btn-proxima').disabled = true;
}

// Função para verificar a resposta selecionada pelo usuário
function verificarResposta(respostaUsuario) {
    var dadosPerguntaAtual = dadosQuiz[perguntaAtual];
    var elementoTextoFeedback = document.getElementById('texto-feedback');

    // Verifica se a resposta selecionada está correta
    if (respostaUsuario === dadosPerguntaAtual.resposta) {
        pontuacao++; // Incrementa a pontuação se a resposta estiver correta
        elementoTextoFeedback.textContent = "Resposta correta!";
        elementoTextoFeedback.style.color = "green";
        console.log('pontuação atual: ' + pontuacao);
    } else {
        elementoTextoFeedback.textContent = "Resposta incorreta.";
        elementoTextoFeedback.style.color = "red";
    }

    // Habilita o botão "Próxima Pergunta" após responder
    document.getElementById('btn-proxima').disabled = false;

    // Desabilita todos os botões de opção após responder
    var botoesOpcao = document.querySelectorAll('.opcao-btn');
    botoesOpcao.forEach(botao => {
        botao.disabled = true;
    });
}

    document.getElementById('btn-cadastro').style.display = 'none';

// Função para avançar para a próxima pergunta
function proximaPergunta() {
    
    perguntaAtual++; // Avança para a próxima pergunta

    // Verifica se há mais perguntas restantes
    if (perguntaAtual < dadosQuiz.length) {
        carregarPergunta(); // Carrega a próxima pergunta
    } else {
        // Exibe a pontuação final quando todas as perguntas forem respondidas
        var elementoTextoPergunta = document.getElementById('texto-pergunta');
        // elementoTextoPergunta.textContent = `Você acertou ${pontuacao} de ${dadosQuiz.length} perguntas.`;

        fetch("/cadastrar-pontuacao/pontuacao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pontuacaoServer: pontuacao,
                idUser: sessionStorage.ID_USUARIO,
                fkQuiz: 1
            })
        })
        // document.getElementById('btn-cadastro').style.display = 'block';
        if (pontuacao <= 3) {
            elementoTextoPergunta.textContent = `Você acertou ${pontuacao} de ${dadosQuiz.length} perguntas.
        Infelizmente não ganhou nenhum cupom, tente novamente e ganhe mais pontos para o seu cupom!`;
        } else if (pontuacao > 3 && pontuacao <= 5) {
            elementoTextoPergunta.textContent = `Você acertou ${pontuacao} de ${dadosQuiz.length} perguntas.
        Você ganhou um cupom de 10% desconto`
            cupons.innerHTML = `<img style='width: 200px;' src = "./Assets/imagens/Cupom10.png" > </img>`;
        } else if (pontuacao > 5 && pontuacao <= 9) {
            elementoTextoPergunta.textContent = `Você acertou ${pontuacao} de ${dadosQuiz.length} perguntas.
        Você ganhou um cupom de 20% desconto`
            cupons.innerHTML = `<img style='width: 200px;' src = "./Assets/imagens/Cupom20.png" > </img>`
        } else if (pontuacao > 9) {
            elementoTextoPergunta.textContent = `Você acertou ${pontuacao} de ${dadosQuiz.length} perguntas.
        Você ganhou um cupom de 30% desconto`
            cupons.innerHTML = `<img style='width: 200px;' src = "./Assets/imagens/Cupom30.png" > </img>`
        }
        // Limpa as opções e o feedback
        document.getElementById('container-opcoes').innerHTML = '';
        document.getElementById('texto-feedback').textContent = '';

        // Esconde o botão "Próxima Pergunta" no final do quiz
        document.getElementById('btn-proxima').style.display = 'none';
        document.getElementById('btn-cadastro').style.display = 'block';

    }
}

function CadastrarPontuacao() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var fkquiz = 1;

    fetch("/pontuacaoQuiz/cadastrar-pontuacao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            idUsuarioServer: idUsuario,
            PontuacaoServer: pontuacao,
            fkQuizServer: fkquiz
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro realizado com sucesso!";

                setTimeout(() => {
                    window.location = "dashboard.html";
                }, "2000");

                // limparFormulario();
                // finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            //   finalizarAguardar();
        });
    return false;

}

// Carrega a primeira pergunta ao carregar a página
carregarPergunta();

function limparSessao() {
    sessionStorage.clear();
    window.location = "./index.html";
}