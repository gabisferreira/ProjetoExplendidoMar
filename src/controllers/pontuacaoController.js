var medidaModel = require("../models/pontuacaoQuiz");

function buscarUltimasMedidas(req, res) {

    var limite_linhas = 7;

    var idAquario = req.params.idAquario;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idAquario, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarPontuacao(req, res) {

    var idPontuacao = req.params.idPontuacao;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarPontuacao(idPontuacao).then(function (resultado) {
    // medidaModel.buscarMedidasEmTempoReal(idAquario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarPontuacoes(req, res){
    var teste = req.body.testeserver;

    medidaModel.consultarPontuacoes().then(function (resultado) {
   
            res.status(200).json(resultado);
    })
}

async function cadastrarPontuacao(req, res) {
    // Async espera algo acontecer para funcionar
     // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
     var idusuario = req.body.idUsuarioServer;
     var fkquiz = req.body.fkQuizServer;
     var pontuacao = req.body.PontuacaoServer;
 
     // Faça as validações dos valores
     if (idusuario == undefined) {
         res.status(400).send("Seu idusuario está undefined!");
     } else if (fkquiz == undefined) {
         res.status(400).send("Seu fkquiz está undefined!");
     } else if (pontuacao == undefined) {
         res.status(400).send("Sua pontuacao está undefined!");
     } else {
      
      // await é o que o async esta esperando
      var idpontuacao =  await medidaModel.consultarPontuacao(idusuario, fkquiz).then(
           function (data){
            if (data[0] == undefined){
                var idPontuacao = 1

                return idPontuacao
             
            
            }else {
                return data[0].idPontuacao + 1
             }
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );

        
 
         // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
         medidaModel.cadastrarPontuacao(idpontuacao,idusuario, fkquiz, pontuacao)
             .then(
                 function (resultado) {
                     res.json(resultado);
                 }
             ).catch(
                 function (erro) {
                     console.log(erro);
                     console.log(
                         "\nHouve um erro ao realizar o cadastro! Erro: ",
                         erro.sqlMessage
                     );
                     res.status(500).json(erro.sqlMessage);
                 }
             );
     }
    }
module.exports = {
    buscarUltimasMedidas,
    buscarPontuacao,
    buscarPontuacoes,
    cadastrarPontuacao
}