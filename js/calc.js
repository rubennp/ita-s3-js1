/*
 * [Number | String] calc(String)
 *
 * Donada una cadena amb una operació matemàtica, calcula el seu resultat i en retorna
 * el seu valor o cadena d'error.
 */
function calc(oper) {
    let op = '';

    // troba el tipus d'operació
    for (let d in oper) {
        if (oper[d] === '+' || oper[d] === '-' || oper[d] === '/' || oper[d] === '*') {
            op = oper[d];
            break;
        }
    }

    // divideix per tipus d'operació
    let arrOper = oper.split(op);
    // assigna valors de la operació
    let v1 = parseFloat(arrOper[0]),
        v2 = parseFloat(arrOper[1]);
    // número de decimals
    let nDec = decimals(arrOper);

    // variable on anirà resultat
    let r = 0.0;

    // fa la operació segons tipus vigilant número de decimals pq resultat sigui més "humà"
    switch (op) {
        case '+':
            r = (v1 + v2).toFixed(nDec);
            break;
        case '-':
            r = (v1 - v2).toFixed(nDec);
            break;
        case '*':
            r = (v1 * v2).toFixed(nDec);
            break;
        case '/':
            // si es divideix per 0: error
            if (v2 === 0) return "No es pot dividir per 0!";
            // si no hi ha decimals en els dígits entrats, es divideix sense .toFixed,
            // pq resultat sigui més real (ex. 3/2 => normal: 1.5 | amb .toFixed: 2)
            r = (nDec === 0) ? (v1 / v2) : (v1 / v2).toFixed(nDec);
            break;
    }

    // retorna resultat: si és número enter, sense decimals
    return (r % 1 === 0) ? parseFloat(r).toFixed(0) : r;
}

/* [Integer] decimals(String Array)
 * 
 * Donat un Array amb cadenes que representen els números d'una operació matemàtica,
 * retorna el màxim de decimals que contenen aquests números
 */
function decimals(arr) {
    let maxDec = 0;

    for (let n in arr) {
        // divideix "número" per '.'
        let nd = arr[n].split('.');
         // si existeix una part decimal, calcula la seva llargada
        if (nd[1] !== undefined) {
            let dec = nd[1].length;
            // si és major que la que ja està guardada, actualitza
            if (dec > maxDec) maxDec = dec;
        }
    }

    return maxDec;
}

/*
 * Nivell 3
 */
const SI = true, NO = false;
const ON = false, OFF = true;   // butons activats o no

let pantalla = "0";             // sortida per pantalla
let memoria = 0;

// let manual = NO;             // entrada manual de dades -> TODO <-
let punt = NO;                  // controla si s'ha activat el .
let num1 = SI;                  // si estem al 1r número o al segon
let novaOp = SI;

window.onload = function() {
    document.getElementById("pantalla").value = "0";
}; 

function add(toPantalla) {

    // si entrada és un punt o una operació
    if (toPantalla.esPunt() || toPantalla.esOp()) {
        // desactiva punt i funcions
        btnsOnOff("punt", OFF);         
        btnsOnOff("func", OFF);
        btnsOnOff("igual", OFF);
    }

    // si entrada és un punt
    if (toPantalla.esPunt()) punt = SI;

    // si entrada és una operació
    else if (toPantalla.esOp()) {         
        num1 = NO;
        punt = NO;
    } 
    // si entrada és un dígit
    else {                                
        if (num1) btnsOnOff("func", ON);
        else {
            btnsOnOff("igual", ON);
            if (!punt) btnsOnOff("punt", ON);
        }
    }

    // si estem al principi i l'entrada no és un punt esborra pantalla
    if (pantalla === "0" && !toPantalla.esPunt() || novaOp) {
        pantalla = "";
    }

    // si és nova operació
    if (novaOp) {
        novaOp = NO;
        btnsOnOff("punt", ON);
    }

    pantalla += toPantalla;

    document.getElementById("pantalla").value = pantalla;
}

function resultat() {
    let resultat = calc(pantalla);

    novaOp = SI;
    punt = NO;
    num1 = SI;

    btnsOnOff("igual", OFF);
    btnsOnOff("punt", OFF);

    document.getElementById("pantalla").value = resultat;
}

function btnsOnOff(el, val) {
    let btnsOp = document.getElementsByClassName(el);
    for (let o in btnsOp) btnsOp[o].disabled = val;
}

String.prototype.esDigit = function() {
    return (this >= '0' && this <= '9');
};

String.prototype.esPunt = function() {
    return (this == ".");
};

String.prototype.esOp = function() {
    return (this == "+" || this == "-" || this == "*" || this == "/");
};

// proves calc():
console.log(calc("6.25+6.75"));
console.log(calc("3.6-2"));
console.log(calc("4*1.25"));
console.log(calc("3.6/2.7"));
console.log(calc("3/0"));