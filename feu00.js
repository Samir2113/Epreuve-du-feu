/////////////// Echauffement //////////////


// Functions: 

function rectangle(width, height){

    if(enoughArg(path)){ // Check enough arguments

        if(isPositiveNumber(width) && isPositiveNumber(height)){ // Check arguments are positive numbers
            
            // Here the different components of the rectangle sides:
            const cornerChar = 'o';
            const widthChar = '-';
            const heightChar = '|';
            
            // We gonna split the rectangle in lines:
            for(i = 0; i < height; i++){
                
                let line = "";

                for(j = 0; j < width; j++){
                    if(i == 0 || i == height -1){     //
                        if(j == 0 || j == width -1){  // Here we manage the rectangle's corners
                            line += cornerChar;       //

                        }else{                        //
                            line += widthChar;        // Here we manage the top/bottom sides
                        }                             //

                    }else{                            //
                        if(j == 0 || j == width -1){  // Here we manage the left/right sides
                            line += heightChar;       //

                        }else{                        //
                            line += " ";              // Here we manage inside the rectangle
                        }                             // 
                    }
                }
                console.log(line); // print the line
    }
        }else{
            console.log("Error!");
        }
    }else{
        console.log("Error!");
    }


}


// Errors:

function enoughArg(inputPath){

    if(inputPath.length === 4){
        return true;
    }else{
        return false;
    }
}






function isPositiveNumber(arg){
    
    if(typeof(arg) !== "number" || isNaN(arg)){
    
        return false;
    
    }else{
        if(arg < 1){
            return false;
        }
        return true;
    }
} 


// Parsing:

const path = process.argv;
const inputWidth = parseInt(path[2]);
const inputHeight = parseInt(path[3]);




// Display:

rectangle(inputWidth, inputHeight);

