import web3 from './web3';

let abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "address"
      }
    ],
    "name": "getAllHash",
    "outputs": [
      {
        "name": "",
        "type": "string[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "address"
      },
      {
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "add",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "id",
        "type": "address"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
];

const contractAddress = '0xae20b0ce723c1e1fbc644fbd6efce209f1542026';

export default new web3.eth.Contract(abi, contractAddress);
