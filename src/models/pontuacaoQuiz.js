var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    var instrucaoSql = `SELECT 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        momento,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
                    FROM medida
                    WHERE fk_aquario = ${idAquario}
                    ORDER BY id DESC LIMIT ${limite_linhas}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarPontuacao(idPontuacao, idUsuario, fkQuiz, Pontuacao) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var cadastraPontuacao = `
    Insert into PontuacaoQuiz VALUES ('${idPontuacao}','${idUsuario}', '${fkQuiz}', '${Pontuacao}');
    `;
    console.log("Executando a instrução SQL: \n" + cadastraPontuacao);
    return database.executar(cadastraPontuacao);
}

function consultarPontuacao(idusuario, fkquiz){
    var selectPontuacao = `Select idPontuacao from PontuacaoQuiz where fkUsuario = ${idusuario} and fkQuiz = ${fkquiz} 
    order by idPontuacao desc limit 1;`

    return database.executar(selectPontuacao);
}


function consultarPontuacoes(){
    var selectPontuacao = `Select Pontuacao from PontuacaoQuiz;`

    return database.executar(selectPontuacao);
}

function buscarPontuacao (/* ex:id usuario, é um parâmetro */) {
    var insertPontuacao = `Select 	Usuario.nome as NomeUsuario, 
    PontuacaoQuiz.Pontuacao as Pontuacao
    from Usuario join PontuacaoQuiz
    on idUsuario = PontuacaoQuiz.fkUsuario;`

    return database.executar(insertPontuacao);
} 

module.exports = {
    buscarUltimasMedidas,
    buscarPontuacao,
    cadastrarPontuacao,
    consultarPontuacao,
    consultarPontuacoes

}
