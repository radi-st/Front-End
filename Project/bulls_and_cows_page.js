"use strict";

function different4Digits(number) {
    let arr = Array.from(String(number), Number);
    let filtered_arr = arr.filter((v, i, a) => a.indexOf(v) === i);
    return arr.length === filtered_arr.length;

}

var numberToGuess;
do {
    numberToGuess = Math.floor(1000 + Math.random() * 9000);
} while (!different4Digits(numberToGuess));

