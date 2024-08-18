
function limparVisor() {

    document.querySelector('#visor').value = '';
}

function apagarNum() {

    const visor = document.querySelector('#visor');
    visor.value = visor.value.slice(0, -1);

}

function inserirValor(num) {

    let display = document.querySelector("#visor");
    // verifica se o primeiro caractere é um ponto 
    if (display.value === "" && num === ".") {
        return
    }

    const regexSinais = new RegExp(/[\+\-\*\.\/]$/);
    const ultimoCaractereSinal = regexSinais.test(display.value);
    const valorDigitadoSinal = regexSinais.test(num);

    if (!ultimoCaractereSinal || !valorDigitadoSinal) {
        if (display.value == '+') {
            display.value = '';
        }  // Validar a quantidade de numeros
        else if (display.value.length === 12) return;
        display.value += num;
    }

    if (!ultimoCaractereSinal || !valorDigitadoSinal) {
        if (display.value == '*') {
            display.value = '';
        }
    }

    if (!ultimoCaractereSinal || !valorDigitadoSinal) {
        if (display.value == '/') {
            display.value = '';
        }
    }

    if (!ultimoCaractereSinal || !valorDigitadoSinal) {
        if (display.value == '-') {
            display.value = '';
        }
    }

    if (!ultimoCaractereSinal || !valorDigitadoSinal) {
        if (display.value == '+') {
            display.value = '';
        }
    }

}

function calcular() {

    const resultado = document.querySelector('#visor').value.trim();

    if (resultado === "") {
        alert("Por favor, preencha a expressão antes de calcular.");
        return;
    }

    const operadores = ['+', '-', '*', '/'];
    const contemOperacao = operadores.some(op => resultado.includes(op));

    // apagar linha na tabela de expressão incompleta 
    if (!contemOperacao) {
        alert("A expressão deve conter uma operação válida.")
        apagarLinha('linha_a_remover');
        return;
    }

    if (Math.sign(resultado) === -1) {
        alert("Por favor, preencha a expressão antes de calcular.")
        return;
    }

    const ultimoCaractere = resultado.charAt(resultado.length - 1);


    if (!isNaN(ultimoCaractere)) {

        let dataHr = new Date();
        let dataFormatada = dataHr.toLocaleDateString();
        let horaFormatada = dataHr.toLocaleTimeString();

        let atualizarHistorico = document.querySelector('#linha-tabela');

        let listItem = document.createElement('tr');
        let linhaID = 'linha_' + Date.now();

        listItem.id = linhaID;
        atualizarHistorico.appendChild(listItem);

        let expressaoResultado = `${dataFormatada}  - ${horaFormatada} -  ${resultado} = ${eval(resultado)}`;
        listItem.textContent = expressaoResultado;
        atualizarHistorico.appendChild(listItem);

        document.querySelector('#visor').value = eval(resultado);
    } else {
        alert("Por favor, complete a expressão antes de calcular!.");
    }


    function apagarLinha(linhaID) {
        const linha = document.getElementById(linhaID);
        if (linha) {
            linha.remove();
        } else {
            console.log('ID da linha não encontrado:', linhaID);
        }

    }
}

document.addEventListener("DOMContentLoaded", function () {

    const table = document.querySelector("#linha-tabela");
    const telaTabela = document.querySelector("#visor");
    const Regex = /=(.*)/;


    table.addEventListener("click", function (event) {
        if (event.target.tagName === "TR") {
            let textoLinha = event.target.textContent;

            let expressaoAlterada = Regex.exec(textoLinha);
            let valorDpsDoIgual = expressaoAlterada[1].trim();

            telaTabela.value = valorDpsDoIgual;

        }
    });

});
