// gameBoard

const gameBoard = (function () {
  let _Board = ['', '', '', '', '', '', '', '', '']
  

  const boxCells = document.querySelectorAll('[data-box]')
  // Function for displaying X and O in DOM
  function displayArray () {
    for (let i = 0; i < _Board.length; i++) {
      boxCells[i].textContent = _Board[i]
    }
  }
  displayArray()


  return { 
    displayArray,
    
    splicingBoard: function (data ,x){
      _Board.splice(parseInt(data), 1, x)

    }
  }


})()

const displayController = (function () {
  let _xMark = true
  const boxCells = document.querySelectorAll('[data-box]')

  boxCells.forEach((item) => item.addEventListener('click', handleGame))

  function handleGame (e) {
    if (e.target.textContent === '' && _xMark === true) {
      e.target.textContent = mosabbir.symbol
      gameBoard.splicingBoard(e.target.dataset.box ,mosabbir.symbol)
      
      _xMark = false
    } else if (e.target.textContent === '' && _xMark === false) {
      e.target.textContent = mosarrat.symbol
      gameBoard.splicingBoard(e.target.dataset.box ,mosarrat.symbol)
      _xMark = true
    }
  }

})()

// (function gameBoard () {
//   // Displaying Board


// }())

// // Factory Func for players

function player (name, symbol) {
  return { name, symbol }
}
// eslint-disable-next-line no-unused-vars
const mosabbir = player('Mosabbir', 'x')
const mosarrat = player('Mosarrat', 'o')
