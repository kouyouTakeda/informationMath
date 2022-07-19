"use strict";
$("#find").on("click", function(){
    //入力を受け取る
    const a = Number($("#aInput").val());
    const b = Number($("#bInput").val());

    let gcd = extGCD(a, b, x, y);
    let lcm = a * b / gcd;

    //出力
    const resultText = `<p>結果</p>
                        <p>最大公約数:${gcd}</p>
                        <p>最小公倍数:${lcm}</p>`;
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