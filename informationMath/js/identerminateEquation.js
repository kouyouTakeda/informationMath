"use strict";
$("#find").on("click", function(){
    //入力を受け取る
    const a = Number($("#aInput").val());
    const b = Number($("#bInput").val());

    extGCD(a, b, x, y);

    const resultText = `<p>結果</p>
                        <p>x = ${x.value} + ${b}t</p>
                        <p>y = ${y.value} - ${a}t (tは任意の整数)</p>`;
    $("#result").html(resultText);
});

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