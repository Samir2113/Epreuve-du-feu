// Labyrinthe - Generator //
const fs = require('fs');


if(process.argv < 5 || process.argv[4].length < 5 ){
    console.log('Error arg!');
}else{
    let h = process.argv[2];
    let w = process.argv[3]
    let chars = process.argv[4]; 
    let gate = process.argv[5];

    let entry = Math.round((Math.random())*(w-4))+2;
    let entry2 = Math.round((Math.random())*(w-4))+2;
    
    console.log(`${h}x${w}${process.argv[4]}`);
    let supArray = [];
    for(y = 0; y < h; y++){
        let array = [];
        for(x = 0; x <= w; x++){
            if(y == 0 && x == entry){
                array.push(chars.charAt(3));
            }else if(y == h-1 && x == entry2){
                array.push(chars.charAt(4));
            }else if((y >= 1 && y <= h-2) && (x >= 1 && x <= w-2) && (Math.random()*100 > 20)){
                array.push(chars.charAt(1));
            }else{
                array.push(chars.charAt(0));
            }
            
        }
        
        supArray.push(array);
        // console.log(array);
    }
    let indexOf1 = supArray[0].indexOf('1');
    supArray[1][indexOf1] = ' ';
    let indexOf2 = supArray[supArray.length-1].indexOf('2');
    supArray[supArray.length -2][indexOf2] = ' ';
    
    for(z = 0; z < supArray.length; z++){
        console.log(supArray[z].join(''));
    }
    createBoardTxt(supArray);

    // console.log(supArray);
}


function createBoardTxt(boardArray){

    // Suppression de l'ancien plateau:
    if(fs.existsSync('./labyrinthe')){
        fs.unlink('./labyrinthe', (err) => {
            if (err) throw err;
            console.log('L\'ancien labyrinthe a été supprimé');
          });
    }
    
    // Création d'un nouveau plateau:
    for(t = 0; t < boardArray.length; t++){
        let line = (t === boardArray.length -1) ? `${boardArray[t].join('')}` : `${boardArray[t].join('')}\n`;
        
        fs.appendFile('labyrinthe', line, (err) => {
            if (err) throw err;
        });
    }
    console.log('Le labyrinthe a été créé!');
}