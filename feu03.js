/////////////// Sudoku //////////////
const fs = require('fs');


// Functions: 

function stringToArray(inBoard){

    for(i = 0; i < inBoard.length; i++){
        inBoard[i] = inBoard[i].split('');
    }
}




function resolveSudoku(inBoard){
    
    while(isBlank(inBoard)){
        
        for(v = 0; v < 9; v++){
            let line = inBoard[v];
            
            for(h = 0; h < 9; h++){
                
                if(line[h] === '.'){
                
                    if(isOneHBlank(line)){
                        line.splice(h, 1, lastHListNbr(line));                        
                        
                    }else if(isOneVBlank(inBoard, h)){
                        line.splice(h, 1, lastVListNbr(inBoard, h));
                        
                    }else if(!isOneHBlank(line) && !isOneVBlank(inBoard, h)){
                        continue;
                    }   
                }
            }
        }
    }

    return inBoard;    
}




function isBlank(board){

    // Recherche si il y a des chiffres manquants dans la planche
    for(b = 0; b < board.length; b++){
        if(board[b].includes('.')){
            return true;
        } 
    }
    return false;
}




function isOneHBlank(hLine){
   
    // Recherche si il y a des chiffres manquants horizontalement
    let hCounter = 0;

    hLine.map(function(item){
        if(item === '.'){
            hCounter++;
        }
    });
    return (hCounter > 1) ? false : true;
}




function lastHListNbr(list){

    // Recherche le chiffre manquant horizontalement
    return searchNbr(list);
}




function isOneVBlank(array, index){
    
    // Recherche si il y a des chiffres manquants verticalement
    let vCounter = 0;
    let vLine = createVerticalList(array, index);
   
    vLine.map(function(item){
        if(item === '.'){
            vCounter++;
        }
    });

    return (vCounter > 1) ? false : true;
}




function lastVListNbr(array, index){

    // Recherche le chiffre manquant verticalement
    let vArray = createVerticalList(array, index);
    return searchNbr(vArray);
}




function createVerticalList(inputArray, inputIndex){
    
    // crée la liste des chiffres à la verticale
    let newVLine = [];
    
    for(vb = 0; vb < inputArray.length; vb++){
        newVLine.push(inputArray[vb][inputIndex]);
    }
    return newVLine;
}




function searchNbr(tab){

    for(n = 1; n < 10; n++){
        let nbrStr = n.toString();
        if(!tab.includes(nbrStr)){
            return nbrStr;
        }
    }
}




function arrayTotring(board){

    for(i = 0; i < board.length; i++){
        board[i] = board[i].join('');
    }
}




// Errors:




// Parsing:

const path = process.argv;
let inputBoard = (fs.existsSync(path[2]) ? fs.readFileSync(`./${path[2]}`, 'utf8').split('\n') : false);




// Resolve:

stringToArray(inputBoard);
resolveSudoku(inputBoard);
arrayTotring(inputBoard)
let newSudokuBoard = fs.existsSync(path[2]) ? inputBoard.join('\n') : 'Error!';



// Display:

console.log(newSudokuBoard);


