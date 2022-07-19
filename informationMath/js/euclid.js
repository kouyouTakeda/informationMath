"use strict";
$("#find").on("click", function(){
    //途中計算を保存
    let a = [];
    let b = [];
    let q = [];
    let r = [];

    //入力を受け取る
    a.push(Number($("#aInput").val()));
    b.push(Number($("#bInput").val()));
    q.push(Math.floor(a / b));
    r.push(Math.floor(a % b));

    const resultText = euclid(a, b, q, r);

    $("#result").html(resultText);
});

function euclid(a, b, q, r) {
    let i = 0;
    let resultText = `<p>結果</p>
                      <p>${a[i]} = ${b[i]} * ${q[i]} + ${r[i]}</p>`;
    while (r[i] !== 0) {
        a.push(b[i]);
        b.push(r[i]);
        i++;
        q.push(Math.floor(a[i] / b[i]));
        r.push(Math.floor(a[i] % b[i]));
        resultText += `<p>${a[i]} = ${b[i]} * ${q[i]} + ${r[i]}</p>`;
    }

    return resultText;
}