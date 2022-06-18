"use strict";

//fromからの入力を受け取る
$("#pInput").on("input", function(){
    let pFormValue = Number($("#pInput").val());

    if (isPrime(pFormValue) === false) {
        $("#pqForm").children("#pCheck").text("素数ではありません");
    }else {
        $("#pqForm").children("#pCheck").text("");
    }
});
$("#qInput").on("input", function(){
    let qFromValue = Number($("#qInput").val());

    if (isPrime(qFromValue) === false) {
        $("#pqForm").children("#qCheck").text("素数ではありません");
    }else {
        $("#pqForm").children("#qCheck").text("");
    }
});

//暗号化
$("#findCrypt").on("click", function(){
    let textTemplete = $("#cryptTempleteInput").val();
    let userText     = $("#cryptPlainInput").val();
    let n            = $("#cryptNInput").val();
    let e            = $("#cryptEInput").val();

    let plainText   = decimalConversion(userText, textTemplete);
    let cryptNumber = BigInt(plainText) ** BigInt(e) % BigInt(n);
    let cryptText   = baseConversion(cryptNumber, textTemplete);
    const resultstring = `暗号文:${cryptText}`
    $("#resultCrypt").text(resultstring);
});

//復号化
$("#findPlain").on("click", function(){
    let textTemplete = $("#plainTempleteInput").val();
    let userText     = $("#plainCryptInput").val();
    let n            = $("#plainNInput").val();
    let e            = $("#plainEInput").val();
    let l            = $("#plainLInput").val();

    extGCD(e, l, x, y);
    let d               = x.value
    let cryptText       = decimalConversion(userText, textTemplete);
    let plainNumber     = BigInt(cryptText) ** BigInt(d) % BigInt(n);
    let plainText       = baseConversion(plainNumber, textTemplete);
    const resultstring  = `平文:${plainText}`
    console.log(resultstring);
    $("#resultPlain").text(resultstring);
});

//素数判定
function isPrime(number){
    if (number < 2) {
        return false;
    }
    for (let i = 2; i * i <= number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

//進数変換(textをbase.length進数から10進数に変換)
function decimalConversion(text, base) {
    let ans = 0;
    for (let i = 0; i < text.length; i++) {
        for (let j = 0; j < base.length; j++) {
            if (text[i] === base[j]) {
                ans += j * (base.length ** (text.length - 1 - i))
            }
        }
    }
    return ans;
}

//進数変換(textを10進数からbase.length進数に変換)
function baseConversion(text, base) {
    let ans = "";
    let baseNumber = text.toString(base.length);
    for (let i = 0; i < baseNumber.length; i++) {
        ans += base[parseInt(baseNumber[i], base.length)];
    }
    return ans;
}

//参照渡しするにはオブジェクトを使うしかない
//let x = new Number(123);
let x = {value: 0};
let y = {value: 0};
function extGCD(a, b, x, y) {
    if (b == 0) {
        //(x, y) = (1, 0)になるとき
        x.value = 1;
        y.value = 0;
        return a;
    }
    let d = extGCD(b, a%b, y, x);
    //整数型がないらしい
    y.value -= Math.floor(a/b) * x.value;
    return d;
}