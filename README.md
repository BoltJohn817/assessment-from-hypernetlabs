# Basic TheButton project

This project demonstrates a TheButton projects .

>"The Button" is a smart contract with a timer that counts down from 5 minutes. To press the button, one must pay 1 eth. If the timer expires, the last person to have pressed it wins the eth in the contract, and the next person to press the button (if the eth is not yet claimed from the previous round) should automatically cause the eth to be sent to the person who won.

Try running some of the following tasks:

```shell
npm run deploy:dev
npm test

npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
