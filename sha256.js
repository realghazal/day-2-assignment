const crypto = require("crypto");

//SHA-256 hash helper function 
const hash = (data) => crypto.createHash("sha256").update(data).digest("hex");

function merkleRootDeterminant(values){
    console.log(`======== INPUT VALUES ============`);
    values.forEach((value, index) => console.log(`${index}: ${value}`));
    console.log("");


    //Step 1: Hash 
let level = values.map(hash);

console.log("====LEAF HASHES =====");
level.forEach((h, i) => console.log(`${i}: ${h}`));
console.log("")

let levelIndex = 0;

//Step 2: Build tree upward 

while (level.length > 1) {
    console.log(`====LEVEL ${levelIndex} -> LEVEL ${levelIndex + 1} ======`);

    //If odd, duplicate last hash 
    if (level.length % 2 === 1) {
        console.log("Odd number of nodes -> duplicating last hash");
        level.push(level[level.length - 1]);
    }

    let nextLevel = [];

    for (let i = 0; i < level.length; i += 2 ){
        console.log(`Pair ${i / 2} : `);
        console.log(`Left: ${level[i]}`)
        console.log(`Right: ${level[i + 1]}`);

        const combinedHash = hash(level[i] + level[i + 1])
        console.log(`Hash: ${combinedHash}\n`);

        nextLevel.push(combinedHash);
    }

    level = nextLevel;
    levelIndex++;
}

//Step 3: Result visualization

console.log("=====MERKLE ROOT =====");
console.log(level[0]);
return level[0];

}


const test1 = ["Oladeji", "Rust", "Test"];

merkleRootDeterminant(test1);

