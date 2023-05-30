/////////////// Labyrinthe //////////////


// Functions:


// Fonction principale de résolution du labyrinthe:

// 1.Numéroter les cases vides du labyrinthe en fct de leur distance par rapport à l'entré

function getDistanceNbr(maze, coorEnter){
    
    maze[coorEnter[0]][coorEnter[1]] = 1;
    while(!isMazeFull(maze)){
        for(i = 1; i < maze.length -1; i++){
            for(j = 1; j < maze[i].length -1; j++){
                
                let cell = maze[i][j];
                let down = [i+1, j];
                let left = [i, j-1];
                let right = [i, j+1];
                let up = [i-1, j];
                let moves = [down, left, right, up];
                
                if(cell != " " && cell != "*"){  
                    for(m = 0; m < moves.length; m++){
                        if(maze[moves[m][0]][moves[m][1]] === " "){
                            maze[moves[m][0]][moves[m][1]] = cell +1;
                        }
                    }
                }
            }    
        }
    }
    counter = maze[end[0]][end[1]];
    trace(maze, end);
    clearMaze(maze);
    return maze;
}


// 2.Tracer le parcourt du plus court chemin à partir de la sortie

function trace(mazeWithNbrs, currPos){
    let cell = mazeWithNbrs[currPos[0]][currPos[1]];
    while(cell !== '1'){
        let up = [currPos[0]-1, currPos[1]];
        let left = [currPos[0], currPos[1]-1];
        let right = [currPos[0], currPos[1]+1];
        let down = [currPos[0]+1, currPos[1]];    
        let moves = [up, left, right, down];
            
        for(r = 0; r < moves.length; r++){
            let nextCell = mazeWithNbrs[moves[r][0]][moves[r][1]];
          
            if(nextCell === cell -1 || nextCell === '1'){
                
                mazeWithNbrs[currPos[0]][currPos[1]] = "o"; 
                currPos = moves[r];
                cell = mazeWithNbrs[currPos[0]][currPos[1]];

            }
        }
    }
}

//3.Nettoyer le labyrinthe

function clearMaze(mazeWithNbrs){
    for(f = 1; f < mazeWithNbrs.length -1; f++){
        let row = mazeWithNbrs[f];
       
        for(g = 1; g < row.length-1; g++){
            
            if(row[g] !== "o" && row[g] !== "*"){
                mazeWithNbrs[f][g] = ' ';
            } 
        }
    }
}

// 1.5.Verification que toutes les cases soient remplies

function isMazeFull(laby){
    for(y = 1; y < laby.length -1; y++){
        if(laby[y].includes(' ')){
            return false;
        }
    }
    return true;
}

// Mise en forme du(des) labyrinthe(s):

function arrayToString(tab){
    for(z = 0; z < tab.length; z++){
        let row = '';
        tab[z].map(item =>{
            row += item;
        })
        console.log(row);        
    }
}
/////////////////////////////////////////////



// Errors:



// Parsing:

// Labyrinthe test://////////////////////////

const myLabyrinthe = [
    ['*', '*', '*', '1', '*', '*', '*', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', '*', '*', '*'],
    ['*', ' ', '*', '*', '*', '*', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', '*', '*', '*', '*', '*', '2', '*']
]

myLabyrinthe.map(it => {
    let temp = '';
    for(t = 0; t < it.length; t++){
        temp += it[t];
    }
    console.log(temp);
})
//////////////////////////////////////////////


// Coordonnées entrée/sortie Labyrinthe test:////////////////////////////////////////
const start = [1, myLabyrinthe[0].indexOf("1")]    
const end = [myLabyrinthe.length-2, myLabyrinthe[myLabyrinthe.length-1].indexOf("2")]
let counter = 0;
/////////////////////////////////////////////////////////////////////////////////////


// Tableau censé accueillir les différentes solutions du labyrinthe test:
let labyrinthe = getDistanceNbr(myLabyrinthe, start);

arrayToString(labyrinthe);
console.log(`Labyrinthe résolu en ${counter} coups!`);


// Resolve:





// Display:



