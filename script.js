// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');




const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymble
};

const form = document.getElementById('passwordGeneratorForm')

form.addEventListener('submit', e =>{
    e.preventDefault()
})

generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
   const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;
   


 resultEl.innerText = generatePassword(
     hasLower, 
     hasUpper, 
     hasNumber, 
     hasSymbol,
     length
     );
});
// Copy to clip board button
clipboardEl.addEventListener('click', ()=> {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Your password is now copied to the clipboard')
})
// Generate password function
function generatePassword(lower, upper, number, symbol, length){
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
    (
        item => Object.values(item)[0]
    );

    if(typesCount === 0){
       alert('Please Select an input.');
       return '';
        
    }
    

    for(let i = 0; i < length; i+= typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
             generatedPassword += randomFunc[funcName]();
        });

    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
    console.log(finalPassword);
}
   

// Generator functions
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymble(){
    const symbols = '!@#$%^&*()_+={}[]<>?,./';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

