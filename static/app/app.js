
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
      // boxCells[i].textContent = _Board[i]
      if (_Board[i] === 'x' && !boxCells[i].classList.contains('O')) {
        boxCells[i].classList.add('X')
      } else if (_Board[i] === 'o' && !boxCells[i].classList.contains('X')) {
        boxCells[i].classList.add('O')
      }
    }
  }

  return {

    splicingBoard: function (data, x) {
      _Board.splice(parseInt(data), 1, x)
      displayArray()
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
    },
    resetBoard: function () {
      _Board.forEach((item) => {
        if (item === 'x' || item === 'o') {
          _Board.splice(parseInt(_Board.indexOf(item)), 1, '')
          boxCells.forEach(item => {
            item.classList.remove('X')
            item.classList.remove('O')
          })
          displayArray()
        }
      })
    }

  }
})()

// eslint-disable-next-line no-unused-vars
const displayController = (function () {
  let _xMark = true
  const boxCells = document.querySelectorAll('[data-box]')
  const winnerDiv = document.querySelector('.winner')
  winnerDiv.style.display = 'none'
  const headerTag = document.createElement('h1')
  const nameP = document.createElement('p')
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('button-container')
  const buttonRestart = document.createElement('button')
  buttonRestart.textContent = 'Restart'
  const buttonNewGame = document.createElement('button')
  buttonNewGame.textContent = 'New Game'

  buttonRestart.addEventListener('click', restart)
  buttonNewGame.addEventListener('click', newGame)

  winnerDiv.appendChild(headerTag)
  winnerDiv.appendChild(nameP)
  buttonContainer.appendChild(buttonRestart)
  buttonContainer.appendChild(buttonNewGame)
  winnerDiv.appendChild(buttonContainer)
  // --------------------------------------------------------------------//
  boxCells.forEach((item) => item.addEventListener('click', handleGame))

  const mosabbir = player('', '')
  const mosarrat = player('', '')

  const startButton = document.querySelector('#start')
  const changingSymbolsOne = document.getElementById('player1-symbol')
  const changingSymbolsTwo = document.getElementById('player2-symbol')

  changingSymbolsOne.addEventListener('click', (e) => {
    if (e.target.textContent === 'x') {
      e.target.textContent = 'o'
      changingSymbolsTwo.textContent = 'x'
      _xMark = false
    } else if (e.target.textContent === 'o') {
      e.target.textContent = 'x'
      changingSymbolsTwo.textContent = 'o'
      _xMark = true
    }
  })

  changingSymbolsTwo.addEventListener('click', (e) => {
    if (e.target.textContent === 'x') {
      e.target.textContent = 'o'
      changingSymbolsOne.textContent = 'x'
      _xMark = true
    } else if (e.target.textContent === 'o') {
      e.target.textContent = 'x'
      changingSymbolsOne.textContent = 'o'
      _xMark = true
    }
  })

  startButton.addEventListener('click', handleInput)

  function handleInput () {
    const playerOneName = document.getElementById('player1-input').value
    const playerTwoName = document.getElementById('player2-input').value

    const playerOneSymbol = document.getElementById('player1-symbol').textContent
    const playerTwoSymbol = document.getElementById('player2-symbol').textContent

    document.querySelector('.input-form-container').style.display = 'none'

    mosabbir.name = playerOneName
    mosarrat.name = playerTwoName
    mosabbir.symbol = playerOneSymbol
    mosarrat.symbol = playerTwoSymbol
    displayDetails()
  }
  function displayDetails () {
    const playerOneDisplayName = document.querySelector('.name1')
    playerOneDisplayName.textContent = mosabbir.name

    const playerTwoDisplayName = document.querySelector('.name2')
    playerTwoDisplayName.textContent = mosarrat.name

    const playerOneDisplaySymbol = document.querySelector('.symbol1')
    playerOneDisplaySymbol.textContent = mosabbir.symbol

    const playerTwoDisplaySymbol = document.querySelector('.symbol2')
    playerTwoDisplaySymbol.textContent = mosarrat.symbol
  }
  function handleGame (e) {
    if (!e.target.classList.contains('X') && !e.target.classList.contains('O') && _xMark === true) {
      gameBoard.splicingBoard(e.target.dataset.box, mosabbir.symbol)
      endgame(mosabbir.symbol)
      _xMark = false
    } else if (!e.target.classList.contains('O') && !e.target.classList.contains('X') && _xMark === false) {
      gameBoard.splicingBoard(e.target.dataset.box, mosarrat.symbol)
      endgame(mosarrat.symbol)
      _xMark = true
    }
  }

  function endgame (p) {
    if (gameBoard.checkForWin(p)) {
      winner(p)
    } else if (gameBoard.checkForDraw() === true) {
      draw()
    }
  }

  function draw () {
    headerTag.textContent = 'The Game is a'
    nameP.textContent = 'DRAW'
    winnerDiv.style.display = ''
  }

  function winner (sign) {
    if (sign === mosabbir.symbol) {
      headerTag.textContent = 'Winner is'
      nameP.textContent = `${mosabbir.name}`
      winnerDiv.style.display = ''
    } else if (sign === mosarrat.symbol) {
      headerTag.textContent = 'Winner is'
      nameP.textContent = `${mosarrat.name}`
      winnerDiv.style.display = ''
    }
  }

  function restart () {
    winnerDiv.style.display = 'none'
    _xMark = true

    gameBoard.resetBoard()
  }

  function newGame () {
    winnerDiv.style.display = 'none'
    _xMark = true
    nameP.textContent = ''
    const playerOneDisplayName = document.querySelector('.name1')
    playerOneDisplayName.textContent = ''
    const playerTwoDisplayName = document.querySelector('.name2')
    playerTwoDisplayName.textContent = ''
    const playerOneDisplaySymbol = document.querySelector('.symbol1')
    playerOneDisplaySymbol.textContent = ''
    const playerTwoDisplaySymbol = document.querySelector('.symbol2')
    playerTwoDisplaySymbol.textContent = ''
    const playerOneName = document.getElementById('player1-input')
    playerOneName.value = ''
    const playerTwoName = document.getElementById('player2-input')
    playerTwoName.value = ''
    changingSymbolsOne.textContent = 'x'
    changingSymbolsTwo.textContent = 'o'
    document.querySelector('.input-form-container').style.display = 'flex'

    gameBoard.resetBoard()
  }
})()

// // Factory Func for players

function player (name, symbol) {
  return { name, symbol }
}
