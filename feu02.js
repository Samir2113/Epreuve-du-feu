/////////////// Trouver une forme //////////////
const fs = require('fs');




// Functions: 

function searchShape(boardArray, shapeArray, yAxis){

    let gapRight = (boardArray[0].length - maxLineLength(shapeArray));
    let firstShapeChar = shapeArray[0].trim().charAt(0);
    let result = null;
    let axis = {
        x: 0,
        y: yAxis
    }

    // Ici on compare horizontalement les différentes lignes (gauche à droite)
    for(g = 0; g <= gapRight; g++){
        let toStart = false;
        
        // Ici on compare verticalement les éléments des lignes de shape & board du même niveau (haut en bas)
        for(s = 0; s < shapeArray.length; s++){
            let lineS = shapeArray[s];
            let lineB = boardArray[s].substring(g, g + lineS.length);

            // Ici on compare 1 élément d'une ligne S avec celui de la ligne B correspondante
            for(c = 0; c < lineS.length; c++){
                let charS = lineS.charAt(c);
                let charB = lineB.charAt(c);
                let verif = (charS === charB || charS === " ");                

                // Les éléments ne correspondent pas:
                if(!verif){

                    // Si décalage horizontal max -> on descend d'un niveau 
                    if(g == gapRight && boardArray.length > shapeArray.length){
                        boardArray.shift();
                        boardArray;
                        axis.y--;
                        return searchShape(boardArray, shapeArray, axis.y);
                    
                    // Si tout à été verif mais pas de correspondance    
                    }else if(g == gapRight && boardArray.length === shapeArray.length){
                        return "Not found!";

                    // Si décalge possible -> on décale    
                    }else if(g < gapRight){
                        toStart = true;
                        break;
                    }
                
                // les éléments correpondent:    
                }else if(verif){
                    
                    // coordonnée x de l'élément le plus haut de la forme
                    if(s === 0 && charS === charB){     
                        axis.x = g + lineS.indexOf(firstShapeChar); 
                    }

                    // Si toute la forme à été comparée
                    if(c == lineS.length -1 && s == shapeArray.length -1){
                        result = `Found! \nCoordinates: ${Object.values(axis)}`;
                    }
                }   
            }
            if(toStart){
                break;
            }    
        }
        if(result !== null){
            return result;
        }
    }
}




function maxLineLength(model){

    let maxLenth = 0;

    for(j = 0; j < model.length; j++){
        if(model[j].length >= maxLenth){
            maxLenth = model[j].length;
        }
    }
    return maxLenth;
}




// Errors:

function isShapeLowerToBoard(board, shape){

    if(board.length >= shape.length){
        let maxBoardLineLen = maxLineLength(board);
        let maxShapeLineLen = maxLineLength(shape);
        
        if(maxBoardLineLen >= maxShapeLineLen){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    } 
}




// Parsing:

const path = process.argv;
let inputBoard = (fs.existsSync(path[2]) ? fs.readFileSync(`./${path[2]}`, 'utf8').split('\n') : false);
let inputShape = (fs.existsSync(path[3]) ? fs.readFileSync(`./${path[3]}`, 'utf8').split('\n') : false);
let yAxisInput = inputBoard.length -1;




// Resolve:

let coordinates = (inputBoard && inputShape && isShapeLowerToBoard(inputBoard, inputShape) ? searchShape(inputBoard, inputShape, yAxisInput) : "Error!")




// Display:

console.log(coordinates);




