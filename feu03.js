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


function solve(board){
    if(solved(board)){
        return board;
    }else{
        const possibilities = nextBoards(board);
        const validBoards = keepOnlyValid(possibilities);

        return searchForSolution(validBoards);
    }
}


function searchForSolution(boards){
    if(boards.length < 1){
        return false;
    }else{
        let first = boards.shift();
        const tryPath = solve(first);
        if(tryPath != false){
            return tryPath;
        }else{
            return searchForSolution(boards)
        }
    }
}


function solved(board){
    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            if(board[i][j] === null){
                return false;
            }
        }
    }
    return true;
}


function nextBoards(board){
    let res = [];
    const firstEmpty = findEmptySquare(board);
    if(firstEmpty != undefined){
        const y = firstEmpty[0];
        const x = firstEmpty[1];
        for(i = 1; i <= 9; i++){
            let newBoard = [...board];
            let row = [...newBoard[y]];
            row[x] = i;
            newBoard[y] = row;
            res.push(newBoard);
        }
    }
    return res;
}


function findEmptySquare(board){
    for(i = 0; i < 9; i++){
        for(j = 0; j < 9; j++){
            if(board[i][j] == null){
                return [i, j];
            }
        }
    }
}


function keepOnlyValid(boards){
    return boards.filter(b => validBoard(b));
}


function validBoard(board){
    return rowGood(board) && columnGood(board) && boxesGood(board);
}


function rowGood(board){
    for(i = 0; i < 9; i++){
        let cur = [];
        for(j = 0; j < 9; j++){
            if(cur.includes(board[i][j])){
                return false;
            }else if(board[i][j] != null){
                cur.push(board[i][j]);
            }
        }
    }
    return true;
}


function columnGood(board){
    for(i = 0; i < 9; i++){
        let cur = [];
        for(j = 0; j < 9; j++){
            if(cur.includes(board[j][i])){
                return false;
            }else if(board[j][i] != null){
                cur.push(board[j][i]);
            }
        }
    }
    return true;
}


function boxesGood(board){
    const boxCoordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2] 
    ];
    for(y = 0; y < 9; y += 3){
        for(x = 0; x < 9; x += 3){
            let cur = [];
            for(i = 0; i < 9; i++){
                let coordinates = [...boxCoordinates[i]];
                coordinates[0] += y;
                coordinates[1] += x;
                if(cur.includes(board[coordinates[0]][coordinates[1]])){
                    return false;
                }
                else if(board[coordinates[0]][coordinates[1]] != null){
                    cur.push(board[coordinates[0]][coordinates[1]]);
                }
            }
        }
    }
    return true;
}


function arrayToString(board){
    let tab = [];
    board.map(row => {
        let currRow = "";
        row.map(cell => {
            currRow += cell;
        });
        tab.push(currRow);
    });
    return tab;
}


// Errors:




// Parsing:

const path = process.argv;
let inputBoard = (fs.existsSync(path[2]) ? fs.readFileSync(`./${path[2]}`, 'utf8').split('\n') : false);

// console.log(inputBoard);

let bd1 = myBoard(inputBoard);
// console.log(bd1);
// console.log(solve(bd1));

// Resolve:

let resolvedSudoku = arrayToString(solve(bd1));




// Display:

console.log(resolvedSudoku);
