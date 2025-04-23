import web3 from "../web3";
import SchemeRegistry from "../../artifacts/contracts/SchemeRegistry.sol/SchemeRegistry.json";

export default (address) => {
  return new web3.eth.Contract(SchemeRegistry.abi, address);
};
