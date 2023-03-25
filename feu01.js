/////////////// Evaluer une expression //////////////


// Functions: 

function showResultExp(exp){
    let testBracket = exp.includes('(');
    let finalResult = null;

    // Si il y a des parenthèses:
    if(testBracket){
        // On resout tous les calculs entre parenthèses:
        let resultBracketExp = isBracket(exp);

        // Puis on résout le ce qui reste de l'expression:
        finalResult = resolveCalcul(resultBracketExp);
        
        return finalResult;

    // Sinon, on résout tous les calculs:
    }else{
        finalResult = resolveCalcul(exp);
        
        return finalResult;
    }
}




function isBracket(inputExp){
    
    // 1) On isole une expression entre parenthèse de l'expression d'entrée: 
    let startBracket = inputExp.lastIndexOf('(');
    let endBracket = inputExp.indexOf(')', startBracket);
    let bracketExp = '';

    for(i = startBracket; i <= endBracket; i++){
        let charBracketExp = inputExp.charAt(i);
        bracketExp += charBracketExp;
    }
    
    // 2) On remplace, dans l'expression de base, l'expression résolue sans ses parenthèses:
    let expUpdated = inputExp.replace(bracketExp, removBracket(resolveCalcul(bracketExp)));

    // 3) On recommence avec l'expression maj si il y a encore des parenthèse (sinon on retourne l'expresion sans parenthèse):
    return (expUpdated.includes('(') ? isBracket(expUpdated) : expUpdated);

}




function resolveCalcul(inputBracketExp){

    let tests = [
        inputBracketExp.includes('*'),
        inputBracketExp.includes('/'),
        inputBracketExp.includes('%'),
        inputBracketExp.includes('+'),
        inputBracketExp.includes(' - ')
    ]

    let signs = ['*', '/', '%', '+', '- '];
    
    for(j = 0; j < signs.length; j++){
        if(tests[j]){
            inputBracketExp = calcul(inputBracketExp, signs[j]);
        }
    }     
    return inputBracketExp;
}




function calcul(exp, sign){
    let signIndex = exp.lastIndexOf(sign);
    let nbr1 = null;
    let nbr2 = null;
    let calc = null;
    let oldExp = null;
    let newExp = null;
    let nbrDetected = false;
    
    // Nbr1:
    for(i = signIndex-1; i >= 0; i--){
        let char = exp.charAt(i);
      
        if(nbrDetected === false && char.search(/[0-9\-]/i) === 0){
            nbrDetected = true;
        }
        if(nbrDetected === true &&  char.search(/[0-9\-]/i) === -1){
            nbr1 = exp.substring(i+1, signIndex).trim();
            nbrDetected = false;
            break;
        }
        if(i === 0 && char.search(/[0-9\-]/) === 0){
            nbr1 = exp.substring(i, signIndex).trim();
            nbrDetected = false;
            break;
        }
    }

    // Nbr2:
    for(i = signIndex+1; i < exp.length; i++){
        let char = exp.charAt(i);

        if(nbrDetected === false && char.search(/[0-9\-]/) === 0){
            nbrDetected = true;
        }

        if(nbrDetected === true &&  char.search(/[0-9\-]/) === -1){
            
            nbr2 = exp.substring(signIndex+1, i).trim(); 
            nbrDetected = false;
            break;
        }
        
        if(i === exp.length-1 && char.search(/[0-9\-]/) === 0){
            nbr2 = exp.substring(signIndex+1).trim();
            nbrDetected = false;
            break;
        }
    }

  
    // Calcul:
    switch (sign) {
        case '*':
            calc = parseInt(nbr1) * parseInt(nbr2);
            break;
        case '/':
            calc = parseInt(nbr1) / parseInt(nbr2);
            break;
        case '+':
            calc = parseInt(nbr1) + parseInt(nbr2);
            break;
        case '- ':
            calc = parseInt(nbr1) - parseInt(nbr2);
            break;
        case '%':
            calc = parseInt(nbr1) % parseInt(nbr2);
            break;
    }

    // On remplace l'ancienne expression par le resutat du calcul:
    oldExp = `${nbr1} ${sign.trim()} ${nbr2}`;
    newExp = exp.replace(oldExp, `${calc}`);

    // On recommence avec l'expression maj s'il y a encore des opérateurs (sinon on renvoie la nouvelle expression obtenue):
    return (newExp.includes(sign) ? newExp = calcul(newExp, sign) : newExp);
    
    
    // if(newExp.includes(sign)){
    //     newExp = calcul(newExp, sign);
    // }
   
    // return newExp; 
}




function removBracket(exp){
    return exp.slice(1, exp.length-1);
}




// Errors:






// Parsing:

const path = process.argv;
let userExp = path[2];






// Resolve:

let result = showResultExp(userExp);






// Display:

console.log(result);



