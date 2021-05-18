/*
 * [Number | String] calc(String)
 *
 * Donada una cadena amb una operació matemàtica, calcula el seu resultat i en retorna
 * el seu valor o cadena d'error.
 */
function calc(oper) {
    let op = oper.match(/\b([\+\-\/\*])/);

    // troba el tipus d'operació
    // for (let d in oper) {
    //     if (/[\+\/\-\*]/.test(oper[d]) && d !== 0) {
    //         op = oper[d];
    //         break;
    //     }
    // }

    // troba el tipus d'operació obviant 1r caràcter
    // op = oper.match(/\b([\+\-\/\*])/);

    // divideix per tipus d'operació
    let arrOper = oper.split(op[0]);

    // assigna valors de la operació
    let v1 = parseFloat(arrOper[0]),
        v2 = parseFloat(arrOper[1]);

    // número de decimals
    let nDec = decimals(arrOper);

    // variable on anirà resultat
    let r = 0.0;

    // fa la operació segons tipus vigilant número de decimals pq resultat sigui més "humà"
    switch (op[0]) {
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
            if (v2 === 0) return "No dividir per 0!";
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
let memoria = "0";

// let manual = NO;             // entrada manual de dades -> TODO <-
let punt = NO;                  // controla si s'ha activat el .
let num1 = SI;                  // si estem al 1r número o al segon
let novaOp = SI;

window.onload = function() {
    document.getElementById("pantalla").value = "0";
    document.getElementById("memoria").innerHTML = "0";
}; 

/*
 *  add(): afegeix a pantalla entrada usuari
 */
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
        if (memoria !== "0") btnsOnOff("memOut", ON);
    } 
    // si entrada és un dígit
    else {                               
        if (num1) { 
            btnsOnOff("func", ON);
            if (memoria === "0") {
                btnsOnOff("memOut", OFF);
                btnsOnOff("memNeteja", OFF);
            }
            if (pantalla === "0" && novaOp) pantalla = "";
        }
        else {
            btnsOnOff("igual", ON);
            if (!punt) btnsOnOff("punt", ON);
        }
    }

    // si estem al principi i l'entrada no és un punt esborra pantalla
    if (pantalla === "0" && !toPantalla.esPunt()) pantalla = "";

    pantalla += toPantalla;

    document.getElementById("pantalla").value = pantalla;
}

// memIn(): posa pantalla en memòria
function memIn() {
    memoria = pantalla;

    btnsOnOff("memOut", ON);
    btnsOnOff("memNeteja", ON);
    btnsOnOff("operador", ON);

    document.getElementById("memoria").innerHTML = memoria;
}

// memOut(): posa memoria en pantalla
function memOut() {
    if (pantalla === "0" || pantalla === "No dividir per 0!") {
        num1 = SI;
        pantalla = "";
        btnsOnOff("nums");
        btnsOnOff("func");
    }

    pantalla += memoria;

    if (!num1) btnsOnOff("igual", ON);

    document.getElementById("pantalla").value = pantalla;
}

// memNeteja(): esborra memòria
function memNeteja() {
    memoria = "0";
    
    btnsOnOff("memoria", OFF);
    if (pantalla !== "0") btnsOnOff("memIn", ON);

    document.getElementById("memoria").innerHTML = memoria;
}

/*
 * neteja(): esborra pantalla i reset
 */
function neteja() {
    pantalla = "0";             

    punt = NO;
    num1 = SI;                  
    novaOp = SI;
    
    btnsOnOff("func", OFF);
    btnsOnOff("nums", ON);
    
    if (memoria === "0") btnsOnOff("memoria", OFF);
    else {
        btnsOnOff("memoria", ON);
        btnsOnOff("memIn", OFF);
    }

    btnsOnOff("punt", ON);

    document.getElementById("pantalla").value = pantalla;
}

/*
 * resultat(): calcula resultat i mostra en pantalla.
 */
function resultat() {
    let resultat = calc(pantalla);

    if (resultat !== "No dividir per 0!") {
        novaOp = SI;
        num1 = SI;

        btnsOnOff("igual", OFF);
        btnsOnOff("func", ON);
        if (memoria === "0") {
            btnsOnOff("memoria", OFF);
            btnsOnOff("memIn", ON);
        } else btnsOnOff("memoria", ON);
        
        if (/[\.]/.test(pantalla)) {
            punt = SI;
            btnsOnOff("punt", OFF);
        } else {
            punt = NO;
            btnsOnOff("punt", ON);
        }
    } else {
        btnsOnOff("nums", OFF);
        btnsOnOff("punt", OFF);
        btnsOnOff("igual", OFF);
    }
    
    pantalla = resultat;

    document.getElementById("pantalla").value = pantalla;
}

/*
 * btnsOnOff(): activa o desactiva botons
*/
function btnsOnOff(el, val) {
    let btnsOp = document.getElementsByClassName(el);
    for (let o in btnsOp) btnsOp[o].disabled = val;
}

// true si és un dígit
String.prototype.esDigit = function() {
    return (this >= '0' && this <= '9');
};

// true si és un punt
String.prototype.esPunt = function() {
    return (this == ".");
};

// true si és una operació matemàtica
String.prototype.esOp = function() {
    return (this == "+" || this == "-" || this == "*" || this == "/");
};

// proves calc():
console.log(calc("6.25+6.75"));
console.log(calc("3.6-2"));
console.log(calc("4*1.25"));
console.log(calc("3.6/2.7"));
console.log(calc("3/0"));
console.log(calc("-34*2"));