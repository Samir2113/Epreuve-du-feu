/////////////// Sudoku //////////////
const fs = require('fs');


// Functions: 

function myBoard(inputB){
    let result = [];

    for(i = 0; i < inputB.length; i++){
        let line = [];
        for(j = 0; j < inputB[i].length; j++){
            let item = inputB[i].charAt(j);
            if(item == '.'){
                line.push(null)
            }else{
                line.push(Number(item));
            }  
        }
        result.push(line);
    }
    return result;
} 


function solveSudoku(board){
    if(solved(board)){
        return board;
    }else{
        let nextEmptyCase = searchFirstEmptyCase(board);
        let validNbrs = searchValidNbrs(board, nextEmptyCase);
        let newBoard = [...board];
        let x = nextEmptyCase[1];
        let y = nextEmptyCase[0];
        let validBoards = searchValidBoards(newBoard, validNbrs, x, y);
        
        if(validBoards.length > 0){
            for(let vn = 0; vn < validBoards.length; vn++){
                if(solved(validBoards[vn])){
                    return validBoards[vn];
                }
                let test = solveSudoku(validBoards[vn]);
                if(test != undefined){
                    return test;
                }
            }       
        }
    }
}


function solved(board){
    let res = true;

    board.map(row => {
        if(row.includes(null)){
            res = false;
        }
    });
    return res;
}


function searchFirstEmptyCase(board){
    for(let i = 0; i < board.length; i++){
        for(j = 0; j < board[i].length; j++){
            if(board[i][j] === null){
                return [i, j];
            }
        }
    }
}


function searchValidNbrs(board, emptyCell){
    let validNbrsArray = [];
    let col = createColl(board, emptyCell[1]);
    let box = createBoxes(board, emptyCell);

    for(n = 1; n <= 9; n++){
        if(!board[emptyCell[0]].includes(n) && !col.includes(n) && !box.includes(n)){      
            validNbrsArray.push(n);
        }
    }
    return validNbrsArray;
}


function createColl(board, colCoor){
    let tempCol = [];

    for(c = 0; c < board.length; c++){
        tempCol.push(board[c][colCoor]);
    }
    return tempCol;
}


function createBoxes(board, coordinates){
    let currBox = [];
    let coorX = coordinates[1];
    let coorY = coordinates[0];
    
    if(coorY < 3){
        for(Y = 0; Y < 3; Y++){
            xBox(coorX, board, currBox)
        }        
    }else if(coorY > 2 && coorY < 6){
        for(Y = 3; Y < 6; Y++){
            xBox(coorX, board, currBox)
        }        
    }else{
        for(Y = 6; Y < 9; Y++){
            xBox(coorX, board, currBox)
        }    
    }
    return currBox;
}


function xBox(cx, bd, box){
    if(cx < 3){
        for(X = 0; X < 3; X++){
            if(bd[Y][X] != null){
                box.push(bd[Y][X]);
            }
            
        }
    }else if(cx > 2 && cx < 6){
        for(X = 3; X < 6; X++){
            if(bd[Y][X] != null){
                box.push(bd[Y][X]);
            }
        }
    }else{
        for(X = 6; X < 9; X++){
            if(bd[Y][X] != null){
                box.push(bd[Y][X]);
            }
        }
    }
}


function searchValidBoards(board, validNbr, cX, cY){
    let newValidBoards = [];

    for(v = 0; v < validNbr.length; v++){
        let inputBoard = [...board];
        let row = [...inputBoard[cY]];
        row[cX] = validNbr[v];
        inputBoard[cY] = row;
        newValidBoards.push(inputBoard);
    }
    return newValidBoards;
}


function arrayToString(board){
    let tab = [];

    board.map(row => {
        let currRow = "";
        row.map(cell => {
            if(cell === null){
                currRow += '.';
            }else{
                currRow += cell;
            }            
        });
        tab.push(currRow);
    });
    tab.map(item => {
        console.log(item);
    });
}


// Errors:




// Parsing:

const path = process.argv;
let inputBoard = (fs.existsSync(path[2]) ? fs.readFileSync(`./${path[2]}`, 'utf8').split('\n') : false);
let bd1 = myBoard(inputBoard);




// Resolve:

let resolvedSudoku = solveSudoku(bd1);




// Display:

arrayToString(resolvedSudoku);
