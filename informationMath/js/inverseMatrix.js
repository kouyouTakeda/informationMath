"use strict";
$("#find").on("click", function(){
    //入力を受け取る
    let matrix = [];
    const n = Number($("#nInput").val());
    matrix.push(Number($("#aInput").val()));
    matrix.push(Number($("#bInput").val()));
    matrix.push(Number($("#cInput").val()));
    matrix.push(Number($("#dInput").val()));

    const determinant           = findDeterminat(matrix, n);
    extGCD(determinant, n, x, y);
    const inverseDeterminant    = x.value;
    let inverseMatrix           = findInverseMatrix(matrix, inverseDeterminant, n);
    
    const resultText = `<p>結果</p>
                        <p>逆行列:[[${inverseMatrix[0]},${inverseMatrix[1]}],[${inverseMatrix[2]},${inverseMatrix[3]}]] (mod ${n})</p>`;
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

function findDeterminat(matrix, n = 1) {
    return ((matrix[0] * matrix[3] - matrix[1] * matrix[2]) % n + n) % n;
}

function findInverseMatrix(matrix, inverseDeterminant, n) {
    let ansMatrix = [];

    ansMatrix.push((matrix[3]  * inverseDeterminant % n + n )% n);
    ansMatrix.push((-matrix[1] * inverseDeterminant % n + n) % n);
    ansMatrix.push((-matrix[2] * inverseDeterminant % n + n) % n);
    ansMatrix.push((matrix[0]  * inverseDeterminant % n + n) % n);

    return ansMatrix;
}