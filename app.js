let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
}

function mensagemInicial() {
  exibirTextoNaTela('h1', 'Jogo do número secreto');
  exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

responsiveVoice.OnVoiceReady = function () {
  mensagemInicial();
};

function verificarChute() {
  let chute = parseInt(document.querySelector('input').value);
  document.querySelector('input').value = '';
  console.log("Tentativa número:", tentativas);

  if (chute === numeroSecreto) {
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.querySelector('button').disabled = true;
  } else {
    if (chute > numeroSecreto) {
      exibirTextoNaTela('p', 'O número secreto é menor');
    } else {
      exibirTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas++;
  }
}

function gerarNumeroAleatorio() {
  if (listaDeNumerosSorteados.length === numeroLimite) {
    listaDeNumerosSorteados = [];
  }

  let numeroEscolhido;
  do {
    numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
  } while (listaDeNumerosSorteados.includes(numeroEscolhido));

  listaDeNumerosSorteados.push(numeroEscolhido);
  console.log(listaDeNumerosSorteados);
  return numeroEscolhido;
}

function reiniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativas = 1;
  document.querySelector('input').value = '';
  mensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
  document.querySelector('button').disabled = false;
}




