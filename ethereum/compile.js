const path = require('path');
const solc= require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname,'build');  // here current working directory is ethereum itself, as compile.js is itself inside ethereum
fs.removeSync(buildPath); // this removeSync looks at this file or folder and delete it and everything inside of it-- remember fs-extra has this which is a community made module not fs

const contractPath = path.resolve(__dirname,'contracts','Campaign.sol');

const source = fs.readFileSync(contractPath, 'utf8');

const output = solc.compile(source,1).contracts;  //we will only take contracts property

fs.ensureDir(buildPath); // this ensureDir function ensures if this folder exists, and if it doesnt it will create one for us

for(let contract in output) {  // a for..in loop is used to iterate over the keys of an object
    fs.outputJSONSync(  // it is going to write the data in the specified folder in JSON format
        path.resolve(buildPath, contract.replace(':',' ') +'.json'),   //path
        output[contract]   // actual data that we want to write inside the folder
    )
}