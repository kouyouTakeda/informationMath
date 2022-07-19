"use strict";
let primeTable = [];
$("#find").on("click", function(){
    const START = Date.now();
    const n = Number($("#nInput").val());
    eratosutenesu(n);
    const p = primeFactarization(n, primeTable)
    const q = n / p;
    const END = Date.now();

    const resultText = `<p>結果</p>
                        <p>a = ${p}, b = ${q}</p>
                        <p>実行時間${END - START}ms</p>`;
    $("#result").html(resultText);
});

function eratosutenesu (size) {
    //要素数size,初期値trueの配列の宣言
    let isPrime = [];
    isPrime.length = size;
    isPrime.fill(true);
    isPrime[0] = isPrime[1] = false;

    //素因数分解のときn/2以上の素因数はでてこない
    for (let i = 2; i * 2 <= size; i++) {
        if (!isPrime) {
            continue;
        }
        primeTable.push(i);

        for (let j = i * 2; j <= size; j += i) {
            isPrime[j] = false;
        }
    }
}

function primeFactarization (n, primeTable) {
    for (let i = 0; i < primeTable.length; i++) {
        if (n % primeTable[i] === 0) {
            return primeTable[i];
        }
    }
}