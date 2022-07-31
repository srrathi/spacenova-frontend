# How to run the project

This project uses hardhat to create and work with a test network

If you make any changes to the smart contracts, run `npx hardhat compile` to update the ABIs

Run `npx hardhat node` to start a test network. Use the private keyss from any of the available accounts on the network to get some test ether

To deploy the warranty cotnract, run 
```shell
npx hardhat run scripts/sample-script.js --network localhost
```