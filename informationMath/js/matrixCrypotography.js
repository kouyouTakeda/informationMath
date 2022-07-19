"use strict";
/*//フォームの追加
let formSize = 1;
$(".formAdd").on("click", function(){
    changeForm(1);
});
//フォームの全削除
$(".formRemove").on("click", function(){
    changeForm(-1);
});
//フォーム数変化関数
function changeForm(num) {
    formSize += num;
    const pForm = `<input type="text" class="pInput">`;
    const cForm = `<input type="text" class="cInput">`;
    $(".pInput").remove();
    $(".cInput").remove();
    for (let i = 0; i < formSize * formSize; i++) {
        $("#plain").append(pForm);
        $("#crypt").append(cForm);
    }
};*/

//フォームの追加
let formSize = 1;
$("#formAdd").on("click", function(){
    changeForm(1);
});
$("#formRemove").on("click", function(){
    changeForm(-1);
});
function changeForm(num){
    formSize += num;
    if (formSize < 0) {
        formSize = 0;
    }
    console.log(formSize);
    const uForm = `<input type="text" class="uInput">`;
    $(".uInput").remove();
    for (let i = 0; i < formSize * 2; i++) {
        $("#userCrypt").append(uForm);
    }
}

//計算
$("#calc").on("click", function(event){
    let n = 26;
    let data = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    let userText = [];
    let ansText = [];
    //平文配列宣言
    let plainText = [];
    let plainTextInverse = [];
    let plainKey = [];
    //暗号文配列宣言
    let cryptText = [];
    let cryptKey = [];
    
    //平文取得
    $(".pInput").each(function(index, element){
        plainText.push(Number(element.value));
    });
    //暗号文取得
    $(".cInput").each(function(index, element){
        cryptText.push(Number(element.value));
    });
    //入力文取得
    $(".uInput").each(function(index, element){
        userText.push(Number(element.value));
    });
    console.log(plainText);
    console.log(cryptText);
    console.log(userText);

    findCryptKey();
    findPlainKey();
    ansText = findMultiplyMatrix(plainKey, userText);
    console.log(cryptKey);
    console.log(plainKey);
    console.log(ansText);

    let string = `<p>暗号化鍵:${cryptKey}<br>復号化鍵:${plainKey}<br>解読結果:`;
    for (let item of ansText) {
        string += `${data[item]}`;
    }
    string += `</p>`;
    $("#result").html(string);

    //暗号化鍵
    function findCryptKey(){
        let determinantInverse = findDeterminantInverse(plainText);
        plainTextInverse = findMatrixInverse(plainText, determinantInverse, n);
        cryptKey = findMultiplyMatrix(cryptText, plainTextInverse);
    }
    //復号鍵
    function findPlainKey(){
        let determinantInverse = findDeterminantInverse(cryptKey);
        plainKey = findMatrixInverse(cryptKey, determinantInverse, n);
    }
    
    //逆行列式関数
    function findDeterminantInverse(matrix){
        let determinant = ((matrix[0] * matrix[3] - matrix[1] * matrix[2]) % n + n ) % n;
        for (let i = 0; i < n; i++) {
            if ((determinant * i) % n === 1) {
                return i;
            }
        }
    }

    //逆行列関数
    function findMatrixInverse(matrix, determinantInverse, n){
        let resultMatrix = [];
        resultMatrix[0] = matrix[3] * determinantInverse % n;
        resultMatrix[1] = (-matrix[1] * determinantInverse % n + n) % n;
        resultMatrix[2] = (-matrix[2] * determinantInverse % n + n) % n;
        resultMatrix[3] = matrix[0] * determinantInverse % n;
        return resultMatrix;
    }

    //行列掛け算関数
    function findMultiplyMatrix(matrix1, matrix2){
        //2x2の行列、偶数が１行目、奇数が２行目
        let resultMatrix = [];
        for (let i = 0; i < matrix2.length; i = i + 2) {
            resultMatrix.push(((matrix1[0] * matrix2[i] + matrix1[2] * matrix2[i + 1]) % n + n) % n);
            resultMatrix.push(((matrix1[1] * matrix2[i] + matrix1[3] * matrix2[i + 1]) % n + n) % n);
        }
        return resultMatrix;
    }
});