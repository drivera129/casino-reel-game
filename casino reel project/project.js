// 1. Deposit some money....balance () handles this
// 2. Determine number of lines to bet on...numberOfLines () handles this
// 3. Collect the bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. give the user their winnings.
// 7. Play again


// function deposit() {
//     return

// } // this function handles what is to heppen when players deposit their money to make a bet.

// deposit(); // this is the function call for the above function.
// *************The above code is one way to declare a function*****************.

const prompt = require("prompt-sync")(); // this creates the function that will handle the user input of what money theyd like to bet. We create this so that it can be used in the deposit function.

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    "A": 2, // ex. of key-value pair, A is the key and 2 is the value.
    "B": 4,
    "C": 6,
    "D": 8
};

const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
};






const deposit = () => {// this is how arrow functions are used to declare a function.
  while (true) {
    const depositAmount = prompt("Enter a deposit amount: "); // where we use the prompt function and enter in what we want to be seen by the user.
    const numberDepositAmount = parseFloat(depositAmount); // parseFloat takes a string and converts it to the value entered into the string "100" becomes 100.

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) { // this line handles when the amount entered either isnt a number or when the user is out of money. This function converts that to a message that appears on the webpage.
        console.log("Invalid deposit amount, try again.");
    } else {
        return numberDepositAmount;
    }
  }
};

const getNumberOfLines = () => {
    while (true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): "); // where we use the prompt function and enter in what we want to be seen by the user.
        const numberOfLines = parseFloat(lines); // parseFloat takes a string and converts it to the value entered into the string

        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) { // this line handles when the amount entered either isnt a number or when the user is out of money. This function converts that to a message that appears on the webpage.
            console.log("Invalid number of lines, try again.");
        } else {
            return numberOfLines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter the bet per line: "); // where we use the prompt function and enter in what we want to be seen by the user.
        const numberBet = parseFloat(bet); // parseFloat takes a string and converts it to the value entered into the string

        if (isNaN(numberBet) || numberBet <= 0 || numberBet > (balance / lines)) { // this line handles when the amount entered either isnt a number or when the user is out of money. This function converts that to a message that appears on the webpage.
            console.log("Invalid bet, try again.");
        } else {
            return numberBet;
        }
    }
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    const reels = [];
        for (let i = 0; i < COLS; i++) {
            reels.push([]);
            const reelSymbols = [...symbols];
          for (let j = 0; j < ROWS; j++) {
             const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.slice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for (let i = 0;i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i])
        }
    }
    return rows;
};

const printRows = (rows) => {
    for (const row of rows) {
        let rowString = "";
        for (const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += " | ";
            }

        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for (let row = 0; row < lines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance  = deposit();

    while (true) {
         console.log("You have a balance of $" + balance)
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if (balance <= 0) {
            console.log("You're out of money! Game over.");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)? ");

        if (playAgain != "y") break;

    }
}


game();
