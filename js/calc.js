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
        if (nd[1] !== undefined) {
            // si existeix una part decimal, calcula la seva llargada
            let dec = nd[1].length;
            // si és major que la que ja està guardada, actualitza
            if (dec > maxDec) maxDec = dec;
        }
    }

    return maxDec;
}

// proves
console.log(calc("6.25+6.75"));
console.log(calc("3.6-2"));
console.log(calc("4*1.25"));
console.log(calc("3.6/2.7"));
console.log(calc("3/0"));
console.log(calc("-34/2"));