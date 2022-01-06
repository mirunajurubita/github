class Calculator{
    constructor(previouOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previouOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    //constructorul ia toate imput-urile si functiile calculatorului
    clear(){ 
        this.currentOperand = ' '; //daca stergem pe calculator vrem un string gol
        this.previousOperand = ' ';
        this.operation = undefined; //daca stergem nu avem nevoie sa avem un tip de operatie selectata
    }

    delete() { 
        this.currentOperand = this.currentOperand.toString().slice(0,-1); //slice(0,-1) ia toate cifrele , mai putin pe ultima

    }

    appendNumber(number){ //functie care face posibila adaugarea numerelor
        if (number === '.' && this.currentOperand.includes('.'))
            return //opreste functia din executie si se opreste din a mai adauga la acel numar
        this.currentOperand = this.currentOperand.toString() + number.toString(); //ca sa avem 1+1=11 de exemplu
    }

    chooseOperation(operation){ //functie pentru datile cand apasam pe butoanele de operatii
        if (this.currentOperation === '') return
        if (this.previousOperand !== ''){
            this.compute()//ca sa ia ultima valoarea si sa ii faca operatia pe care o alegem cu valoarea pe care o vom adauga, daca mai vrem sa facem operatii peste ultima operatie
        }
        this.operation = operation; //calculatorul stie ce operatie sa foloseasca cand calculeaza valoarea
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''; //stergem valoarea
    }

    compute(){//ia valorile si da rezultatul final intr-un singur rezultat
        let computation //rezultatul functiei compute
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand) //parseFloat converteste un argument la string mai intai daca e nevoie si returneaza numarul cu virgula
        if(isNaN(prev) || isNaN(current)) return //daca avem  vreun prev sau vreun current da cancel la functie
        switch(this.operation){
            case '+': computation = prev + current
            break;
            case '-': computation = prev - current
            break;
            case '*': computation = prev * current
            break;
            case '÷': computation = prev / current
            break;
            default: return //daca nu avem niciun simbol
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ' '
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        // const floatNumber = parseFloat(number)
        // if(isNaN(floatNumber) ) return
        // return floatnumber.toLocalString('en');
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''}
        else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0 })
        }    
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }  
        else{
            return integerDisplay;
        }

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText =  `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
        else{
            this.previousOperandTextElement.innerText = ' '
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')// document.querySelectorAll selecteaza toate elementele din document care se potrivesc cu ce este in paranteza
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach( button =>{ //forEach executa o functie o data pentru fiecare element din array
    button.addEventListener('click', () => { //cand apasam pe buton vrem sa si faca ceva
        calculator.appendNumber(button.innerText); //adaugam numarul
        calculator.updateDisplay(); //innerText la un element HTML reprezinta continutul tip text al unui nod.
    })
})

operationButtons.forEach( button =>{ 
    button.addEventListener('click', () => { 
        calculator.chooseOperation(button.innerText); 
        calculator.updateDisplay();
    })
})

//addEventListener seteaza o functie care va fi apelata ori de cate ori evenimentul acela este trimis.
equalsButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button =>{
    calculator.delete();
    calculator.updateDisplay();
})