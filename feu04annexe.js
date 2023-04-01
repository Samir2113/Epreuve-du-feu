fs = require('fs');


function createBoard(xAxis, yAxis, dens){
    console.log(`${y}.xo`);
    let board = [];
    for(i = 0; i < yAxis; i++){
        let test = "";
        for(j = 0; j < xAxis; j++){
            test += ((Math.ceil(Math.random() * (yAxis))) * 2 < dens) ? 'x' : '.';
            
        }
        board.push(test);
    }
    console.log(board);
    return board;
}



function createBoardTxt(boardArray){
    for(t = 0; t < boardArray.length; t++){
        
        let line = (t === boardArray.length -1) ? `${boardArray[t]}` : `${boardArray[t]}\n`;
        
        fs.appendFile('plateau', line, (err) => {
            if (err) throw err;
        });
    }
}
    




const path = process.argv;
let x = Number(path[2]);
let y = Number(path[3]); 
let density = Number(path[4]); 
createBoardTxt(createBoard(x, y, density));


// let boardTab = (createBoard(x, y, density)); 

// createBoardTxt(boardTab);