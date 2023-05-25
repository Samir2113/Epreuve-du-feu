/////////////// Labyrinthe //////////////


// Functions:


// Fonction principale de résolution du labyrinthe:

function resolvedLabyrinthe(labyrinthe, currentPos){
    if(solved(labyrinthe, currentPos)){
        labyrinthes.push(labyrinthe);
    }else{
        let possibleWays = searchValidWays(labyrinthe, currentPos); 
        console.log(possibleWays);
        
        searchForSolutions(possibleWays);
    }
}
///////////////////////////////////////////////////////////////////


// Fonction de vérification de labyrinthe résolus:

function solved(lab, curPos){
    if(lab[curPos[1]][curPos[0]] === "2"){
        return true;
    }else{
        return false;
    }
}
///////////////////////////////////////////////////


// Fonction de validation des mouvements (avant, arrière, droite, gauche) et des différents chemins plausibles:

function searchValidWays(laby, position){
    let result = [];
    let up = laby[position[1]-1][position[0]];
    let down = laby[position[1]+1][position[0]];
    let right = laby[position[1]][position[0]+1];
    let left = laby[position[1]][position[0]-1];

    let moves = [up, down, right, left];
    // console.log(`up: ${up}`);
    // console.log(`down: ${down}`);
    // console.log(`right: ${right}`);
    // console.log(`left: ${left}`);
     
    for(i = 0; i < moves.length; i++){
        let newLab = [...laby];
        let coor = [...position];
        let newPos = null;
        let item = [...moves];

        if(item[i] === " " || item[i] === '2'){
            
            switch(i){
                case 0: 
                    newPos = [position[0], position[1]-1];
                break;
                case 1: 
                    newPos = [position[0], position[1]+1];
                break;
                case 2: 
                    newPos = [position[0]+1, position[1]];
                break;
                case 3: 
                    newPos = [position[0]-1, position[1]];
                break;

            }
            newLab[position[1]][position[0]] = 'o';
            result.push([newLab, newPos]);
        }   
    }
    
return result;
}
/////////////////////////////////////////////////////////////


// Fonction de recherche récursive (test):

function searchForSolutions(labs){
    if(labs.length > 0){
      
        for(z = 0; z < labs.length; z++){
            console.log(`z: ${z}`);
            resolvedLabyrinthe(labs[z][0], labs[z][1]);
            // console.log(labs[z][0]);
            // console.log(labs[z][1]);
        }
    }
}
//////////////////////////////////////////////////////


// Mise en forme du(des) labyrinthe(s):

function arrayToString(tab){
    let counter = 1;
    for(z = 0; z < tab.length; z++){
        let arrayLab = tab[z];
        console.log(`Solution ${counter}:`)
        arrayLab.map(function(line){

            let row = '';
            for(c = 0; c < line.length; c++){
                row += line[c];
            }
            console.log(row);
            ;
        });
        counter++
    }
}
/////////////////////////////////////////////



// Errors:



// Parsing:

// Labyrinthe test://////////////////////////

const myLabyrinthe = [
    ['*', '*', '*', '1', '*', '*', '*', '*'],
    ['*', ' ', ' ', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', '*', ' ', ' ', '*'],
    ['*', ' ', '*', ' ', ' ', ' ', ' ', '*'],
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
const start = [myLabyrinthe[0].indexOf("1"), 1]
    
const end = [myLabyrinthe[myLabyrinthe.length-1].indexOf("2"), myLabyrinthe.length-1]
/////////////////////////////////////////////////////////////////////////////////////


// Tableau censé accueillir les différentes solutions du labyrinthe test:
let labyrinthes = [];



// Resolve:

resolvedLabyrinthe([...myLabyrinthe], [...start]);



// Display:

arrayToString(labyrinthes);

