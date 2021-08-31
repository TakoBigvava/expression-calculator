function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // console.log(expr.trim().split(/\s/))
    
    
    
      let stack = []
      //storage of numbers and high priority operators
      let output = []
      //storage of operators
    
    
    
      const isOperator = (op) => {
        return operator.hasOwnProperty(op)
      }
    
      //values define priorities
      let operator = {
        ["+"]: 0,
        ["-"]: 0,
        ["*"]: 1,
        ["/"]: 1,
        // ["("]: 2,
      }
    
      //perfoming distribution to stack and output arrays
     let e = expr.trim().split(/\s/)
     
     if(e.length ===1){
       expr.trim().split('').forEach(item => {
        distributeElements(item)
     
      })
    
     } else if (e.length >2) {
     
       e.forEach(item => {
        distributeElements(item)
      })
     }
     
    
    
      function performOperation(leftOperand, operation, rightOperand) {
         if(operation === "/" && rightOperand ===0){
          throw "TypeError: Division by zero"
        }
        switch (operation) {
          case "*":
            return leftOperand * rightOperand;
          case "/":
            return leftOperand / rightOperand;
          case "+":
            return leftOperand + rightOperand;
          case "-":
            return leftOperand - rightOperand;
          default:
            return;
    
        }
    
       
      }
    
    
      function distributeElements(el) {
        let currentElement = el;
        let stackLastElement = stack[stack.length - 1]
        let outputLastElement = output[output.length - 1]
        let leftOperand = output[output.length - 2]
    
    
        //check current element if is operator or number       
        if (isOperator(currentElement) || currentElement === "(") {
          if (currentElement === "(") {
            output.push(currentElement)
          }
    
          //operator has more or equals priority than last top goes to output and there is no opening bracket
          else if (stack.length === 0) {
            stack.push(currentElement)
            //operator has less priority than last top goes goes to output, current operator goes to stack
          } else if (operator[currentElement] > operator[stackLastElement]) {
            output.push(currentElement)
          }
    
          //checking for opening bracket   
    
    
          else if (operator[currentElement] < operator[stackLastElement]) {
            if (output.includes("(")) {
              output.push(currentElement)
            } else {
              output.push(stackLastElement)
              stack.pop()
              stack.push(currentElement)
            }
          } else if (operator[currentElement] === operator[stackLastElement]) {
            if (output.includes("(")) {
              output.push(currentElement)
            } else {
              stack.push(currentElement)
            }
          }
    
          // check elements if they are empty
        } 
        //end for operators
            //start closing
        else if(currentElement === ")") {
    
          
          while(output[output.length - 2]!=="("){
    
            let tempResult = performOperation(Number(output[output.length - 3]), output[output.length - 2], Number(output[output.length - 1]))
    
    
        
            output.pop()
            output.pop()
            output.pop()
            output.push(tempResult)
          }
          //removed ')'
     
          output.splice(-2, 1)
        }
        //end closing
    
    
    
        //start for numbers
        else if (currentElement !== ' ') {
          if (output.includes("(")) {
            //checks for operator
            if (operator[outputLastElement] === 1) {
              let tempResult = performOperation(Number(output[output.length - 2]), output[output.length - 1], Number(currentElement))
              output.pop()
              output.pop()
              output.push(tempResult)
    
            } else {
              output.push(currentElement)
            }
          } else if (isOperator(outputLastElement)) {
            let tempResult = performOperation(Number(output[output.length - 2]), output[output.length - 1], Number(currentElement))
            output.pop()
            output.pop()
            output.push(tempResult)
    
          }
          //// here goes all numbers
          else {
            output.push(currentElement)
          }
        }
        //end for numbers
    
    
    
      }
    
    //last operation
    console.log(stack)
    console.log(output)
    
    if(output.length > 0){
      while(output.length>1){
     
      let tempResult = performOperation(Number(output[0]), stack[0], Number(output[1]))
      output.splice(0,2)
      stack.splice(0,1)
    
    output.splice(0, 0, tempResult)
    
     
    
    
      
    } 
    }
    
     return output.join('')
    }

module.exports = {
    expressionCalculator
}
