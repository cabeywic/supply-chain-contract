import Web3 from "web3";
import SupplyChainContract from "../../../blockchain/artifacts/contracts/SupplyChain.sol/SupplyChain.json";

const endpoint = process.env.ENDPOINT;
 
let web3;
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(endpoint);
  web3 = new Web3(provider);
}

const supplyChainContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const supplyChainContract = () => {
    return new web3.eth.Contract(SupplyChainContract.abi, supplyChainContractAddress);
};
 
export { web3, supplyChainContract };