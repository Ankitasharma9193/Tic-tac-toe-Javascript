const restartButton = document.querySelector('button');
const cells = document.querySelectorAll('.cell');
const currentStatus = document.querySelector('.status');

const winningPositions = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],  
    [3,4,5],
    [6,7,8]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    running = true;
    cells.forEach(cell => 
        cell.addEventListener("click", (e) => cellClicked(e) )
    );
    restartButton.addEventListener("click", restartGame);
    currentStatus.textContent = `${currentPlayer}'s trun now`;
};

function cellClicked(e){
    let cellId = e.target.getAttribute('cellIndex');
    console.log(cellId)

    if(options[cellId] !== "" || !running){
        return;
    }

    updateCell(e, cellId);
    checkWinner();
}

function updateCell(e, cellId){
    // changePlayer();
    options[cellId] = currentPlayer;
    e.target.textContent = currentPlayer;
    console.log(options);
}

function changePlayer(){
    console.log('~ before',currentPlayer)
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    console.log('~~~ after',currentPlayer)
    currentStatus.textContent = `${currentPlayer}'s trun now`;
}

function restartGame(){
    currentPlayer = 'X';
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => cell.textContent = "");
    currentStatus.textContent = `${currentPlayer}'s trun now`;
    running = true;
}

function checkWinner(){
    let roundWon = false
    for(let i =0; i < winningPositions.length; i++ ){
        let position = winningPositions[i];
        let cellA = options[position[0]];
        let cellB = options[position[1]];
        let cellC = options[position[2]];

        if(cellA === "" || cellB === "" || cellC === "") continue

        if(cellA === cellB && cellB  === cellC){
            roundWon = true
            break;
        }
    }
    if(roundWon){
        currentStatus.textContent = `${currentPlayer}'s Winner`;
        running = false;
    } else if ( !options.includes("")) {
        currentStatus.textContent = `DRAW!`;
        running = false;
    } 
    else {
        console.log('hey')
        changePlayer();
    }
   
    console.log('check');
}