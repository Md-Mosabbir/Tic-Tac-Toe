// gameBoard

const gameBoard = (function () {
  const _Board = ['', '', '', '', '', '', '', '', '']
  const _winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const boxCells = document.querySelectorAll('[data-box]')
  // Function for displaying X and O in DOM
  function displayArray () {
    for (let i = 0; i < _Board.length; i++) {
      boxCells[i].textContent = _Board[i]
    }
  }
  displayArray()

  return {

    splicingBoard: function (data, x) {
      _Board.splice(parseInt(data), 1, x)
    },
    checkForWin: function (s) {
      return _winningCombination.some(combination => {
        return combination.every(index => {
          return _Board[index].includes(s)
        })
      })
    },

    checkForDraw: function () {
      return _Board.every(item => {
        return item !== ''
      })
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
      gameBoard.splicingBoard(e.target.dataset.box, mosabbir.symbol)
      endgame(mosabbir.symbol)
      _xMark = false
    } else if (e.target.textContent === '' && _xMark === false) {
      e.target.textContent = mosarrat.symbol
      gameBoard.splicingBoard(e.target.dataset.box, mosarrat.symbol)
      endgame(mosarrat.symbol)
      _xMark = true
    }
  }

  function endgame (p) {
    if (gameBoard.checkForWin(p)) {
      console.log('Winner winner Chicken Dinner')
    } else if (gameBoard.checkForDraw() === true) {
      console.log('slkjfhsdfhsdlj')
    }
  }
})()

// // Factory Func for players

function player (name, symbol) {
  return { name, symbol }
}
// eslint-disable-next-line no-unused-vars
const mosabbir = player('Mosabbir', 'x')
const mosarrat = player('Mosarrat', 'o')
