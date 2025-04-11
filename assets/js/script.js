var timerID = null
function iniciaJogo() {
    var nivelJogo = document.getElementById('nivel').value
    window.location.href = "jogo.html?" + nivelJogo
}

function iniciaGame() {
    var url = window.location.search;
    var nivel_jogo = url.replace("?", "")
    var tempo_segundos = 0

    if (nivel_jogo == 1) {
        tempo_segundos = 35
    } else if (nivel_jogo == 2) {
        tempo_segundos = 30
    } else if (nivel_jogo == 3) {
        tempo_segundos = 20
    } if (nivel_jogo == 4) {
        tempo_segundos = 10
    }

    document.getElementById('cronometro').innerHTML = tempo_segundos

    var qtde_baloes = 30
    cria_baloes(qtde_baloes)

    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes
    document.getElementById('baloes_estourados').innerHTML = 0

    contagem_tempo(tempo_segundos + 1)

}

function contagem_tempo(segundos) {
    segundos -= 1

    if (segundos == -1) {
        clearTimeout(timerID)
        game_over()
        return false
    }
    document.getElementById("cronometro").innerHTML = segundos
    timerID = setTimeout("contagem_tempo(" + segundos + ")", 1000)
}
function game_over() {
    alert("Fim de jogo, você não estourou todos os balões")
    setTimeout(() => {
        window.location.href = "index.html";
    }, 100);
}

function cria_baloes(qtde_baloes) {
    for (var i = 1; i <= qtde_baloes; i++) {
        var balao = document.createElement("img")
        balao.src = "assets/css/img/balao_azul_pequeno.png"
        balao.id = "balao" + i
        balao.style.margin = "10px"
        balao.onclick = function () {
            estourar(this)
        }
        document.getElementById('cenario').appendChild(balao)
    }
}

function estourar(e) {
    var id_balao = e.id
    document.getElementById(id_balao).setAttribute("onclick","")
    document.getElementById(id_balao).src = "assets/css/img/balao_azul_pequeno_estourado.png"
    pontuacao(-1)
}

function pontuacao(acao) {
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML

    baloes_inteiros = parseInt(baloes_inteiros)
    baloes_estourados = parseInt(baloes_estourados)

    baloes_inteiros += acao
    baloes_estourados -= acao

    baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros
    baloes_estourados = document.getElementById('baloes_estourados').innerHTML = baloes_estourados

    situacao_jogo(baloes_inteiros, baloes_estourados)
}

function situacao_jogo(baloes_inteiros) {
    if (baloes_inteiros == 0) {
        alert("Parabéns!!! Você cosneguiu concluir o jogo.")
        parar_jogo()
        setTimeout(() => {
            window.location.href = "index.html";
        }, 100);
    }
}

function parar_jogo() {
    clearTimeout(timerID)
}