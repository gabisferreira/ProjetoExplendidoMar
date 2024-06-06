var express = require("express");
var router = express.Router();

var pontuacaoController = require("../controllers/pontuacaoController");

router.get("/ultimas/:idAquario", function (req, res) {
    pontuacaoController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idAquario", function (req, res) {
    pontuacaoController.buscarMedidasEmTempoReal(req, res);
})

router.get("/pontuacao-quiz", function (req, res){
    pontuacaoController.buscarPontuacao(req, res);
});

router.get("/pontuacoes-quiz", function (req, res){
    pontuacaoController.buscarPontuacoes(req, res);
});

router.post("/cadastrar-pontuacao", function (req, res) {
    pontuacaoController.cadastrarPontuacao(req, res);
})
module.exports = router;