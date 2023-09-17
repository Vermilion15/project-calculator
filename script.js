// mini project
// make calculator using javascript
const displayHistory = document.querySelector('.display-history');
const display = document.querySelector('.display-input');
const temporary = document.querySelector('.temporary-result');
const numbers = document.querySelectorAll('.btn-number');
const operations = document.querySelectorAll('.operator');
const equal = document.querySelector('.btn-equal');
const clearAll = document.querySelector('.btn-clear-all');
const clearEntity = document.querySelector('.btn-clear-entity');

var dis1 = '';
var dis2 = '';
var result = null;
var lastOperation = '';
var hasDot = false; //make sure the number does not has dot

// add event in numbers
numbers.forEach(number => {
    number.addEventListener("click",(e)=>{
        if(e.target.innerText === '.' && !hasDot) {
            console.log(e.target.innerText)
            hasDot = true //mengubah hasdot menjadi true jika belum ins dot
        } else if(e.target.innerText === '.' && hasDot){
            return;
        }
        // mengubah display menjadi apa yang kita masukan
        dis2 += e.target.innerText
        display.innerText =dis2
    })
});

operations.forEach((operation) => {
    operation.addEventListener("click",(e) => {
        if(!dis2) return;
        hasDot = false;
        const operationName = e.target.innerText;
        if(dis1 && dis2 && lastOperation) {
            mathOperation()
        }else{
            result = parseFloat(dis2)
        }
        clearVar(operationName)
        lastOperation = operationName
    })
})

function clearVar(name = " ") {
    dis1 += dis2 + " " + name + " ";
    displayHistory.innerText = dis1;
    display.innerText = ""
    dis2 = ""
    temporary.innerText = result;
}

function mathOperation() {
    if(lastOperation === 'x') {
        result = parseFloat(result) * parseFloat(dis2)
    }else if(lastOperation === '+'){
        result = parseFloat(result) + parseFloat(dis2)
    }else if(lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2)
    }else if(lastOperation === '%'){
        result = parseFloat(result) % parseFloat(dis2)
    }
}

// equal button
equal.addEventListener('click',()=>{
    if(!dis1 || !dis2) return; // if there is no dis1 and dis 2and then return;
    hasDot = false;
    mathOperation();
    clearVar();
    display.innerText = result;
    temporary.innerText = "";
    dis2 = result;
    dis1 = ""
})

clearAll.addEventListener('click',()  => {
    dis1 = "";
    dis2 = "";
    temporary.innerText = "";
    display.innerText = "";
    displayHistory.innerText = "";
    result = null;
    lastOperation = "";
})

clearEntity.addEventListener('click' ,()=>{
    display.innerText = "";
    dis2 = "";
})

window.addEventListener("keydown",(e)=>{
    if(
        e.key ==='0' ||
        e.key ==='1' ||
        e.key ==='2' ||
        e.key ==='3' ||
        e.key ==='4' ||
        e.key ==='5' ||
        e.key ==='6' ||
        e.key ==='7' ||
        e.key ==='8' ||
        e.key ==='9'
    ){
        clickButton(e.key)
    }else if(e.key === "+"|| e.key === "-"||e.key === "/"||e.key === "%"){
        clickOperation(e.key);
    }else if(e.key === "*"){
        clickOperation('x')
    }else if(e.key === "Enter"|| e.key === "="){
        clickEqual();
    }else if(e.key === "Backspace"){
        clickClear()
    }
})

function clickButton(key) {
    numbers.forEach((button)=>{
        if(button.innerText === key) {
            button.click();
        }
    })
}

function clickOperation(key) {
    operations.forEach((operation) =>{
        if(operation.innerText === key)
        operation.click()
    })
}

function clickEqual(){
    equal.click()
}

function clickClear(){
    clearAll.click()
}