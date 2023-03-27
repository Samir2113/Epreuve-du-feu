/////////////// Trouver une forme //////////////
const fs = require('fs');
const colors = require('colors');




// Functions: 

function longestShapeLine(shapeLines){

    let maxLength = null;
    
    for(z = 0; z < shapeLines.length -1; z++){
        let lineLength = shapeLines[z].length;
        let nextLineLength = shapeLines[z+1].length;

        if(lineLength >= nextLineLength){
            maxLength = lineLength;
        }else{
            maxLength = nextLineLength;
        }
    }
    return maxLength;
}




function searchShape(boardArray, shapeArray, yAxe){

    let gapRight = (boardArray[0].length - longestShapeLine(shapeArray));
    let firstShapeChar = shapeArray[0].trim().charAt(0);
    let result = null;
    let axes = {
        x: 0,
        y: yAxe
    }

    for(g = 0; g <= gapRight; g++){
        let toStart = false;

        for(s = 0; s < shapeArray.length; s++){
            let lineS = shapeArray[s];
            let lineB = boardArray[s].substring(g, g + lineS.length);

            for(c = 0; c < lineS.length; c++){
                let charS = lineS.charAt(c);
                let charB = lineB.charAt(c);
                let verif = (charS === charB || charS === " ");                

                if(!verif){
                    if(g == gapRight && boardArray.length > shapeArray.length){
                        boardArray.shift();
                        boardArray;
                        axes.y--;
                        return searchShape(boardArray, shapeArray, axes.y);
                       
                    }else if(g == gapRight && boardArray.length === shapeArray.length){
                        return "Not found!";

                    }else if(g < gapRight){
                        toStart = true;
                        break;
                    }
                }else if(verif){
                    if(s === 0 && charS === charB){
                        axes.x = g + lineS.indexOf(firstShapeChar);
                    }
                    if(c == lineS.length -1 && s == shapeArray.length -1){
                        // console.log(axes);
                        result = `Found! \nCoordinates: ${Object.values(axes)}`;
                        // return "Found!"
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




// Errors:




// Parsing:

const path = process.argv;
let inputBoard = (fs.existsSync(path[2]) ? fs.readFileSync(`./${path[2]}`, 'utf8').split('\n') : false);
let inputShape = (fs.existsSync(path[3]) ? fs.readFileSync(`./${path[3]}`, 'utf8').split('\n') : false);
let yAxeInput = inputBoard.length -1;



// Resolve:

let coordinates = (inputBoard && inputShape ? searchShape(inputBoard, inputShape, yAxeInput) : "Error!")




// Display:

console.log(coordinates);




