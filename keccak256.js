const { keccak256 } = require("js-sha3");

//Keccak-256 hash helper function 
const hash =(data) => keccak256(data);

function merkleRootDeterminant(values) {
    console.log("=====INPUT VALUES ======")
    values.forEach((value, index) => console.log(`${index}: ${value}`));
    console.log("");

    //Step 1: Hash leaves 

    let level = values.map(hash);

    console.log("======LEAF HASHES(Keccak-256) ======");
    level.forEach((h, i) => console.log(`${i}: ${h})`));
    console.log("");

    let levelIndex = 0;

    //Step 2: Build tree upward 

    while (level.length > 1) {
        console.log(`==== LEVEL ${levelIndex} -> LEVEL  ${levelIndex + 1} =====`);

        //If ood number of nodes, duplicate last value 
        if (level.length % 2 === 1) {
            console.log("Odd number of nodes -> duplicating last hash");
            level.push(`level[level.length - 1]`);
        }

        let nextLevel = [];

        for (let i = 0; i < level.length; i +=2) {
            console.log(`Pair ${i / 2}`);
            console.log(`Left: ${level[i]}`);
            console.log(`Right: ${level[i + 1]}`);

            const combined = level[i] + level[i + 1];
            const combinedHash = hash(combined);

            console.log(`Hash: ${combinedHash}\n`);

            nextLevel.push(combinedHash);
        }

        level = nextLevel;
        levelIndex++;
    }

    console.log("==== MERKLE ROOT (Keccak-256) =====");
    console.log(level[0]);

    return level[0];

}

const test1 = ["Oladeji", "Rust", "Test"];

merkleRootDeterminant(test1);