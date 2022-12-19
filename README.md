
# Supply Chain Management Contract

This project is a proof of concept application, to demonstrate the use of smart contracts to improve supply chain management. 
This applications allows producers to create a product, and consumers to track the transfer of ownership of the product.


## Environment Variables

To run this project, you will need to add the following environment variables to each of the .env files. 

Inside the folder **blockchain/.env** add: 

`API_KEY` - [Alchemy API key](https://www.alchemy.com/) for Goerli testnet

`PRIVATE_KEY` - Wallet private key 

Inside the folder **app/.env** add: 

`PORT` - Port to run Next application

`ENV` - Run environment `development` or `production`

`NEXT_PUBLIC_CONTRACT_ADDRESS` - Address of deployed supply chain contract


## Installation

You may run the webapp locally by following the steps below:

1. Make sure you have node and npm installed
2. Install dependencies
```bash
  cd blockchain && npm install
  cd ..
  cd app && npm install
  cd ..
```
3. Compile the contract using Hardhat
```bash
  cd blockchain
  npx hardhat compile
```
4. Deploy the contract using Hardhat on Goerli, Note: make sure you have updated the env variables and have a sufficient balance to deploy the contract
```bash
  npx hardhat run --network goerli scripts/deploy.js 
```
5. Update the app/.env file with the deployed contract address (`NEXT_PUBLIC_CONTRACT_ADDRESS`)
6. Run the application on localhost
```bash
  cd ../app
  npm run dev
```
    
## Deployed Contract Example

You may use the below details to test the web application without deploying the contract:

Contract Address: `0x26403E15Eb1163CE1b9dE1780f93dF6A91637938`

Product ID: `53476517055088001444385683770436884189707525546485772291257958554861350593232`