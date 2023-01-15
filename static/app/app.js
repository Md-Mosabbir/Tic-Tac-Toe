// gameBoard

(function gameBoard () {
  const Board = ['', '', '', '', '', '', '', '', '']
  let xMark = true

  // Displaying Board

  const boxCells = document.querySelectorAll('[data-box]')
  // Function for displaying X and O in DOM
  function displayArray () {
    for (let i = 0; i < Board.length; i++) {
      boxCells[i].textContent = Board[i]
    }
  }
  displayArray()

  boxCells.forEach((item) => item.addEventListener('click', handleGame))

  function handleGame (e) {
    if (e.target.textContent === '' && xMark === true) {
      e.target.textContent = mosabbir.symbol
      Board.splice(parseInt(e.target.dataset.box), 1, mosabbir.symbol)
      xMark = false
    } else if (e.target.textContent === '' && xMark === false) {
      e.target.textContent = mosarrat.symbol
      Board.splice(parseInt(e.target.dataset.box), 1, mosarrat.symbol)
      xMark = true
    }
  }
}())

// Factory Func for players

function player (name, symbol) {
  return { name, symbol }
}
// eslint-disable-next-line no-unused-vars
const mosabbir = player('Mosabbir', 'x')
const mosarrat = player('Mosarrat', 'o')
