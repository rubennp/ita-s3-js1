// exercici 1:
console.log("Hola, món!");

// exercici 2:
alert("Em dic Rubèn");

// exercici 3:
let nom = "Rubèn",
    cognom = "Nieto";
console.log(nom + " " + cognom);

// exercici 4:
let n1 = 38,
    n2 = 1098;
console.log("La suma entre " + n1 + " i " + n2 + " és " + (n1 + n2));

// exercici 5:
let nota = 4.6,
    frase = (nota < 5) ? "Ooh, has suspès " : "Molt bé! Has aprovat ";
frase += "l'examen amb un " + nota;
alert(frase);

// exercici 6:
let fraseColor = "Tinc un cotxe de color blau";
console.log(fraseColor.replace("blau", "verd"));
console.log(fraseColor.replaceAll("o", "u"));

// exercici 7:
let objectes = ["taula", "cadira", "ordinador", "llibreta"];
for (o in objectes) console.log("L'objecte " + objectes[o] + " està a la posició " + o);

// exercici 8:
function calculadora(op, v1, v2) {
    switch (op) {
        case 'suma':
            return v1 + v2;
        case 'resta':
            return v1 - v2;
        case 'multiplica':
            return v1 * v2;
    }
}
console.log(calculadora("suma", 2, 3));
console.log(calculadora("resta", 2, 3));
console.log(calculadora("multiplica", 2, 3));