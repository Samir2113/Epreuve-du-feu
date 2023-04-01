/////////////// Mélanger 2 tableaux triés //////////////
fs = require('fs');


// Functions: 

function stringToArray(inputBoard){

    for(i = 0; i < inputBoard.length; i++){
        inputBoard[i] = inputBoard[i].split('');
    }
}



function resolvePlateau(board){
    // console.log(board);
    let square = {
        x:0,
        y:0,
        sideLength: 0
    };

    for(i = 0; i < board.length; i++){  
        for(j = 0; j < board[i].length; j++){
            maxLength = maxLengthSquare(board, i, j);
          
            if(maxLength > square.sideLength){
                square.x = j;
                square.y = i;
                square.sideLength = maxLength;
            }
        }
    }

    for(a = square.y; a < square.y + square.sideLength; a++){
        for(b = square.x; b < square.x + square.sideLength; b++){
            board[a][b] = 'o'; 
        }
    }

    for(z = 0; z < board.length; z++){
        board[z] = board[z].join('');
        console.log(board[z]);
    } 

    fs.unlink('./plateau', (err) => {
        if (err) throw err;
        console.log('Le fichier a été supprimé');
      });
}




function maxLengthSquare(inputBoard, startY, startX){
    let smallestBoardLength = null;
    let test = inputBoard[0].length - inputBoard.length;
    smallestBoardLength = (test < 0) ? inputBoard[0].length : inputBoard.length;
    
    for(l = 2; l < smallestBoardLength; l++){
        for(m = startY; m < l+startY; m++){
            let line = inputBoard[m];
            for(n = startX; n < l+startX; n++){
                let spot = line[n];

                if(spot == 'x' || n == line.length-1 || m == inputBoard.length-1){

                    return l-1;
                }
            }
        }
    }
    return l-1;
}




// Errors:



// Parsing:

const path = process.argv;
let plateau = fs.readFileSync(path[2], 'utf8').split('\n');
stringToArray(plateau);




// Resolve:
resolvePlateau(plateau);


// Display:










