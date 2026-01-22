//Ethereum gas fee calculator
//A simple function to calculator gas fee

const gasCalculator = (gasLimit, gasPrice) => {
    let result = gasLimit * gasPrice;
    return result
}

console.log(gasCalculator(21000,0.001) + ' Gwei');
