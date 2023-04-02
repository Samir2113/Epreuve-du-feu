/////////////// Mélanger 2 tableaux triés //////////////
fs = require('fs');


// Functions: 

function stringToArray(inputBoard){

    for(i = 0; i < inputBoard.length; i++){
        inputBoard[i] = inputBoard[i].split('');
    }
}



function resolvePlateau(board){

    let square = {
        x:0,
        y:0,
        sideLength: 0
    };

    // Recherche du carré max pour chaque point
    for(i = 0; i < board.length; i++){  
        for(j = 0; j < board[i].length; j++){
            maxLength = maxLengthSquare(board, i, j);
            
            // On compare avec l'ancien point
            if(maxLength > square.sideLength){
                square.x = j;
                square.y = i;
                square.sideLength = maxLength;
            }
        }
    }
    drawSqare(board, square);
}




function maxLengthSquare(inputBoard, startY, startX){

    // on prend comme limite le côté le plus petit du plateau
    let widthOrHeight = null; 
    let test = inputBoard[0].length - inputBoard.length;
    widthOrHeight = (test < 0) ? inputBoard[0].length : inputBoard.length;
    
    // On cherche le plus grand carré pour 1 point donné
    for(l = 2; l <= widthOrHeight; l++){
        for(m = startY; m < l+startY; m++){
            let line = inputBoard[m];

            for(n = startX; n < l+startX; n++){

                // Si on rencontre 'x' on return l-1 ( = le côté max possible)
                if(n < inputBoard[0].length && m < inputBoard.length){
                    let spot = line[n];

                    if(spot == 'x'){
                        return l-1;
                    }
                }
                // Si on arrive au bout de la largeur/longueur du plateau -> return l-1
                else{
                    return l-1;
                }
            }
        }
    }
    return l-1;
}



function drawSqare(inputBoard, squareInfo){

    //On remplace les point par des ronds aux coordonnées de notre plus gand carré 
    for(a = squareInfo.y; a < squareInfo.y + squareInfo.sideLength; a++){
        for(b = squareInfo.x; b < squareInfo.x + squareInfo.sideLength; b++){
            inputBoard[a][b] = 'o'; 
        }
    }

    // Ensuite on affiche notre nouvelle planche avec le carré 
    for(z = 0; z < inputBoard.length; z++){
        inputBoard[z] = inputBoard[z].join('');
        console.log(inputBoard[z]);
    }
}




// Errors:
function isError(inputPath){
    if(inputPath.length == 3){
        return false;
    }else{
        return true;
    }
}


// Parsing:

const path = process.argv;
let plateau = (isError(path) || !fs.existsSync(path[2])) ? false : fs.readFileSync(path[2], 'utf8').split('\n');
stringToArray(plateau);




// Resolve:
(!plateau) ? console.log('Error!') : resolvePlateau(plateau);


// Display:










