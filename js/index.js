// LIMPAR VISOR 
function limparVisor() {

    document.querySelector('#visor').value = '';
}

// APAGAR NUMERO DIGITADO  
function apagarNum() {

    const visor = document.querySelector('#visor');
    visor.value = visor.value.slice(0, -1);

}

// FUNÇAO PARA INSERIR VALOR 
function inserirValor(num) {

    let display = document.querySelector("#visor");
    // verifica se o primeiro caractere é um ponto 
    if (display.value === "" && num === ".") {
        return
    }
    // Regex para validar entrada 
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
    // Validar as operações 
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

// FUNÇAO PARA CALCULAR 
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

    const ultimoCaractere = resultado.charAt(resultado.length - 1);

    // Verifica se a expressão termina com um número
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
        alert("Por favor, complete a expressão antes de calcular.");
    }

}
// Apagar expressão incompleta da tabela
function apagarLinha(linhaID) {
    const linha = document.getElementById(linhaID);
    if (linha) {
        linha.remove();
    } else {
        console.log('ID da linha não encontrado:', linhaID);
    }
        
}
// EVENT LISTENER PARA BUSCAR A EXPRESSAO 
document.addEventListener("DOMContentLoaded", function () {

    const table = document.querySelector("#linha-tabela");
    const telaTabela = document.querySelector("#visor");
    
    // Event listener para separar a data e hora da expressão e devolver para o input 
    table.addEventListener("click", function (event) {
        if (event.target.tagName === "TR") {
            let textoLinha = event.target.textContent;
            let expressao = textoLinha.split("=")[2];

            let expressaoSeparada = expressao.indexOf("-");
            expressao.substring(0, expressaoSeparada);
            let expressaoNova = expressao.substring(expressaoSeparada, expressao.length);

            //let expressaoResult = expressaoNova.trim();
            //let expressaoFinal = expressaoResult.split("=")[1];
            
            telaTabela.value = expressaoNova;
            
        }
        
    });
});
 

