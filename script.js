const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator  = null;
let waitingforSecondValue = false;

updateDisplay();

function updateDisplay()
{
 display.value = displayValue;

}
keys.addEventListener('click',function(e)
{
    const element = e.target;
    const value = element.value;
    if (!element.matches('button')) return;

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);  
            break;
            
         case '.':
            InputDecimal(); 
            break;  

        case 'clear':
            clear();
            break;
            
            default:

            InputNumber(value);
    }
    
    updateDisplay();
});
function handleOperator(nextOperator)
{
 const value = parseFloat(displayValue);
 if(operator && waitingforSecondValue){
    operator = nextOperator;
    return;
 }

 if (firstValue === null)
 {
    firstValue = value;
 }else 
 
 if(operator)
 {
    const result = calculate(firstValue,value,operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
 }
 waitingforSecondValue = true;
 operator = nextOperator;

 console.log(displayValue,firstValue,operator,waitingforSecondValue);

}
function calculate(first,second,operator)
{
    if(operator === '+'){
        return first +second;

    }else if(operator === '-'){
        return first - second;
    }else if(operator === '*'){
        return first * second;
    }else if(operator === '/'){
        return first/second;
    }

    return second;
}

function InputNumber(num)
{
    if (waitingforSecondValue){
        displayValue = num;
        waitingforSecondValue = false;
    } else {
    displayValue = displayValue === '0'? num: displayValue + num;
}
console.log(displayValue,firstValue,operator,waitingforSecondValue);
}
function InputDecimal(){
    if (!displayValue.includes('.')){
    displayValue += '.';}
}

function clear()
{
displayValue = '0';
}