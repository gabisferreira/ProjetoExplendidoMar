Create database ExplendidoMar;

Use ExplendidoMar;

Create table Usuario (
idUsuario int primary key auto_increment,
nome varchar(45),
email varchar(45) unique,
senha varchar(45),
constraint checkEmail check (email like ('%@%'))) ;

INSERT INTO Usuario (nome, email, senha) VALUES
('ana', 'ana@gmail', '123'),
('rafa', 'rafa@gmail', '765'),
('kaio', 'kaio@gmail', '987'),
('samuel', 'samuel@gmail', '341'),
('lucas', 'lucas@gmail', '456'),
('felipe', 'felipe@gmail', '784'),
('bruno', 'bruno@gmail', '018'),
('marcos', 'marcos@gmail', '253');

Select *from Usuario;

Create table Quiz (
idQuiz int primary key auto_increment,
Nome varchar (45),
Descrição varchar (45));

Insert into Quiz (Nome, Descrição) values
('Curioso', 'Quiz sobre o oceano');

Select *from Quiz;

Create table PontuacaoQuiz (
idPontuacao int,
fkUsuario int,
fkQuiz int,
Pontuacao int,
primary key (fkUsuario, fkQuiz, idPontuacao),
constraint fkUsuarioQuiz foreign key (fkUsuario) references Usuario (idUsuario),
constraint fkQuizUsuario foreign key (fkQuiz) references Quiz (idQuiz));

select * from PontuacaoQuiz;

select Pontuacao from PontuacaoQuiz;

Insert into PontuacaoQuiz values
(1, 1, 1, 8);

Select idPontuacao from PontuacaoQuiz where fkusuario = 1 and fkquiz = 1 order by idpontuacao desc limit 1;

describe PontuacaoQuiz;

Select *from PontuacaoQuiz where fkUsuario = 1;

Select 	Usuario.nome as NomeUsuario, 
		PontuacaoQuiz.Pontuacao as Pontuacao
		from Usuario join PontuacaoQuiz
		on idUsuario = PontuacaoQuiz.fkUsuario;
        
SELECT idUsuario,
		nome,
		email, 
		PontuacaoQuiz.Pontuacao as 'PontuacaoQuiz' 
        FROM Usuario join PontuacaoQuiz where idUsuario = 1;
        