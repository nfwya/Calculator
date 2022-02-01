const allButtons = document.querySelectorAll("button");
let bufferNumber;
let newDisplay = false;
const reduceNumber = function(str){
    return str.replace(/^0*/,'');
};
const evaluate = function(ope, buffer, curr){
   switch(ope){
        case '+':
            return (+buffer + +curr).toFixed(2);
        case '-':
            return (+buffer - +curr).toFixed(2);
        case 'x':
            return (+buffer * +curr).toFixed(2);
        case '/':
            if(curr == 0){
                alert("Can not divide by 0!");
                return 'ERROR';
            }
            else return (+buffer / +curr).toFixed(2);

   } 
}
const reset = function(){
    bufferNumber = undefined;
    document.querySelector('.current-operator').textContent = '';
    document.querySelector('.current-number').textContent = '';
    document.querySelector('.current-number').classList.remove('has-decimal');
    newDisplay = false;
}

const backspace = function(){
    const display = document.querySelector('.current-number');
    const currentNumber = display.textContent;
    let newNumber;
    if(currentNumber !== ''){
        if(currentNumber.slice(-2,-1) === '.'){
            newNumber = currentNumber.slice(0,-2);
            document.querySelector('.current-number').classList.remove('has-decimal');
        }
        else{
            newNumber = currentNumber.slice(0,-1);
        }
        console.log(newNumber);
        display.textContent = newNumber;
    }
}

const clickHandler = function(){
    const currentNumber = document.querySelector('.current-number').textContent;
    const operator = document.querySelector('.current-operator');
    const display = document.querySelector('.current-number');
    if(this.classList.contains('number')){
        const newDigit = this.textContent;
        if(newDisplay === false){
            const newNumber = currentNumber + newDigit;
            display.textContent = reduceNumber(newNumber);
        }
        else{
           newDisplay = false;
           display.textContent = newDigit;
           document.querySelector('.current-number').classList.remove('has-decimal');
        }
        
    }
    else if(this.classList.contains('decimal')){
        if(!display.classList.contains('has-decimal')){
           display.classList.toggle('has-decimal');
           display.textContent = currentNumber + '.'; 
        }
    }
    else if(this.classList.contains('operator')){
       if(bufferNumber === undefined){
           bufferNumber = currentNumber;
           newDisplay = true;
       }
       else if(newDisplay === false){
           bufferNumber = evaluate(operator.textContent , bufferNumber, currentNumber)
           newDisplay = true;
       }
       operator.textContent = this.textContent;
    }
    else if(this.classList.contains('equal')){
        const newNumber = evaluate(operator.textContent, bufferNumber, currentNumber);
        display.textContent = newNumber;
        bufferNumber = undefined;
        operator.textContent = '';
    }
    else if(this.classList.contains('back')){
        backspace();
    }
    else if(this.classList.contains('ac')){
        reset();
    }
};
allButtons.forEach( button => button.addEventListener('click', clickHandler) )
