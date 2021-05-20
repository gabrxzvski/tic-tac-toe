const Player = sign => {

    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign };
};

const DOM = (() => {
    const cellElements = document.querySelectorAll('[data-cell]');
    const resultsText = document.querySelector('.turns-results');
    const restartBtn = document.getElementById('restart-btn');

    return { cellElements, resultsText, restartBtn };
})();

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const restartBoard = () => {
        DOM.restartBtn.addEventListener('click', () => {
            for(let i = 0; i < board.length; i++) {
                board[i] = "";
            }
        });
    }
    return { board, restartBoard };
})();


const displayController = (() => {
    const renderSign = player => {
        DOM.cellElements.forEach(cell => {
            cell.addEventListener('click', (e) => {
                if(e.target.textContent !== "") return;
                e.target.textContent = player.getSign();
                let index = e.target.dataset.cell;
                gameBoard.board[index] = player.getSign();
            });
        });
    };
    
    const restartDisplay = () => {
        DOM.restartBtn.addEventListener('click', () => {
            DOM.cellElements.forEach(cell => {
                cell.textContent = "";
            });
        });
    };
    
    const renderMessage = message => {
        DOM.resultsText.textContent = message;  
    };

    return { renderSign, restartDisplay, renderMessage }
})();

const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    let round = 1;
    let isOver = false;

    
})();