// 1.deposit some money
//2.determine number of lines to bet on
//3.collect a bet amount
// 4.spin the slot machine
//5. check if the user won
//6.give the user their winnings
//7.play again 

const prompt = require("prompt-sync")();

const ROWS =3;
const COLS =3;


const SYMBOLS_COUNT ={
    'A':2,
    'B':4,
    'C':6,
    'D':8
}

const SYMBOLS_VALUES={
    'A':5,
    'B':4,
    'C':3,
    'D':2

}


const deposit= ()=>{
    while(true){
        const depositAmount=prompt("enter a deposit amount:");
        const numDepositAmount= parseFloat(depositAmount);

        if (isNaN(numDepositAmount) || numDepositAmount<=0){
            console.log("Not a valid amount,try again");
        }
        else{
            return numDepositAmount;
        }
    }
}

const getNumoflines =() =>{
    while(true){
        const lines =prompt("enter the number of lines 0-3:");
        const numLines= parseInt(lines);

        if(isNaN(numLines) || numLines <=0  || numLines > 3){
                console.log('not valid ,try again')
        }
        else{
            return numLines;
        }
    }
}

const getBet =(balance,lines) => {
    while(true){
        const bet=prompt('enter the bet per line: ');
        const numBet=parseFloat(bet);

        if(isNaN(numBet) || numBet<=0 || numBet > (balance / lines)){
            console.log('invalid value, try another: ');
        }
        else{
            return numBet;
        }
    }
}

const spin = () =>{
    const symbols =[];
    for ( const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
            for (let i=0 ; i<count; i++){
                symbols.push(symbol);
            }
    }
    const reels = [];
    for (let i=0;i<COLS;i++){
        reels.push([]);             //these array contains columns: [[],[],[]],each [] represents a column
        const reelSymbols=[...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbols = reelSymbols[randomIndex];
            reels[i].push(selectedSymbols);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
}

const transpose = (reels)=>{
    const rows=[];
    for (let i=0;i< ROWS;i++){
        rows.push([]);
        for (let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
}

const printRows =(rows)=>{
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString +=symbol
            if (i!= row.length-1){
                rowString+=" | "
            }

        }
        console.log(rowString)
    }
}

const getWinnings=(rows,bet,lines)=>{
    let winnings = 0;

    for (let row=0;row<lines;row++){
        const symbols = rows[row];
        let allSame = true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame= false;
                break;
            }
        }
        if (allSame){
            winnings +=bet*SYMBOLS_VALUES[symbols[0]]
        }
    }
    return winnings;
}

const game =()=>{
    let balance = deposit();
    while(true){
        console.log("you have a balance of $" + balance);
        const numLines = getNumoflines();
        const bet =getBet(balance,numLines)
        balance-=bet* numLines;
        const reels=spin();
        const rows =transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet ,numLines)
        balance +=winnings;
        console.log("you won,$" + winnings.toString());
        if (balance <=0 ){
            console.log("You ran out of money");
            break;
        }

        const playAgain = prompt("do you want to play again(y/n)?")

        if (playAgain!= "y"){
            break;
        }
        
    }
}

game();