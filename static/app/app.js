// gameBoard

(function gameBoard () {
  const Board = ['o', 'o', 'x', 'o', 'x', 'o', 'x', 'x', 'o']

  // Displaying Board

  const containerDiv = document.getElementById('container')
  const boxCells = document.querySelectorAll('[data-box]')
  
  
  
  // Function for displaying X and O in DOM
  function displayArray () {
    for (let i = 0; i < Board.length; i++) {
      
      
      
      // boxCells[i].dataset.box
      if(parseInt(boxCells[i].dataset.box) === i) {
        boxCells[i].textContent = Board[i]
        
      }
    }
  }
  displayArray()
}())

// Factory Func for players

function player (name, symbol) {
  return { name, symbol }
}
// eslint-disable-next-line no-unused-vars
const mosabbir = player('Mosabbir', 'X')
