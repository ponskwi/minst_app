const array = ['alice', 'mike', 'nancy']
console.log(array)

for(let i = 0; i < array.length; i++) {
  console.log(array[i])
}

const cond = true;

if (cond){
    console.log('true')
}
else{
    console.log('false')
}

if(null){
    console.log('null is true')
} else {
    console.log('null is false')
}

function add1(v1, v2){
    return v1 + v2;
}

const result1 = add1(1, 2);
console.log(`result1 = ${result1}`);

const add2 = function(v1, v2){
    return v1 + v2;
}
console.log(`result2 = ${add2}`);
console.log(`result2 = ${add2(1, 2)}`);

const add3 = (v1, v2) => {
    return v1 + v2;
}

const result3 = add3(1, 2);
console.log(`result3 = ${result3}`);

//dom

const predictButtonElement = document.getElementById('predict-button');
console.log(predictButtonElement);

predictButtonElement.addEventListener('click', () => {
    const textInputElement = document.getElementById('text-input');
    const input = textInputElement.value;
    console.log(input);

    const messageElement = document.getElementById('message');
    messageElement.innerText = `入力内容は「${input}」です。`;
});
