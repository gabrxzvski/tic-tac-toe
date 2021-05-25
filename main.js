const Player = (sign, turn) => {

    this.sign = sign;
    this.turn = turn;

    return { sign, turn };
};

const DOM = (() => {
    const cellElements = document.querySelectorAll('[data-cell]');
    const resultsText = document.querySelector('.turns-results p');
    const restartBtn = document.getElementById('restart-btn');

    return { cellElements, resultsText, restartBtn };
})();

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setSign = (cell, playerSign) => {
        let index = cell.dataset.cell;
        board[index] = playerSign;
        displayController.renderSign();
};

    const restartBoard = () => {
        for(let i = 0; i < 9; i++) {
            board[i] = "";
        };
    };

    return { board, restartBoard, setSign };

})();


const displayController = (() => {

    const renderSign = () => {
        DOM.cellElements.forEach(cell => {
            cell.textContent = gameBoard.board[cell.dataset.cell];
        });
    };
    
    const restartDisplay = () => {
        DOM.restartBtn.addEventListener('click', () => {
            DOM.cellElements.forEach(cell => {
                cell.textContent = "";
                cell.style.pointerEvents="auto";
                gameBoard.restartBoard();
                displayController.renderMessage("Player X's turn");
            });
        });
    };
    
    const renderMessage = message => {
        DOM.resultsText.textContent = message;  
    };

    restartDisplay();

    return { renderSign, renderMessage }

})();

const gameController = (() => {
    const playerX = Player("X", true);
    const playerO = Player("O", false);
    let rounds = 0;

    const playGame = (player1, player2) => {
        DOM.cellElements.forEach(cell => {
            cell.addEventListener('click', () => {
            if (cell.textContent !== "") return;
            if (player1.turn === true) {
                rounds++;
                gameBoard.setSign(cell, player1.sign);
                player1.turn = false;
                player2.turn = true;
                displayController.renderMessage("Player O's turn")
                cell.style.pointerEvents="none";
                checkWin();
                checkDraw();
            }
            else {
                rounds++;
                gameBoard.setSign(cell, player2.sign);
                player2.turn = false;
                player1.turn = true;
                displayController.renderMessage("Player X's turn")
                cell.style.pointerEvents="none";
                checkWin();
                checkDraw();
            };
        });

        });
    }

    const checkWin = () => {
        const winCombinations = [
            [0,1,2],
            [0,3,6],
            [3,4,5],
            [6,7,8],
            [1,4,7],
            [2,4,6],
            [2,5,8],
            [0,4,8]
        ]

        for(let i = 0; i < winCombinations.length; i++) {
            const [a, b, c] = winCombinations[i];
            if(gameBoard.board[a] && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[b] === gameBoard.board[c]) {
                rounds = 0
                DOM.cellElements.forEach(cell => {
                    cell.style.pointerEvents="none";
                });
                return displayController.renderMessage(`Player ${gameBoard.board[a]} WON ! Click on the restart button to play again !`);
            }
        }

        return null;

    };

    const checkDraw = () => {
        if(rounds === 9 && checkWin() === null) {
            rounds = 0;
            return displayController.renderMessage("DRAW ! Click on the restart button to play again !");
        }
    };

    const resetAttributes = () => {
        rounds = 0;
        playerX.turn = true;
        playerO.turn = false;
    }

    playGame(playerX, playerO);

    return { resetAttributes };

})();