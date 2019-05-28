import web3 from './web3';
import storageController from './storageController';

export const getAllHashes = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0]);
    const hashes = await storageController.methods.getAllHash(accounts[0]).call();

  }catch (e) {

  }
};

export const insertHashIntoContract = async (hash) => {
  try {
    const accounts = await web3.eth.getAccounts();
    await storageController.methods
      .add(accounts[0], hash)
      .send({
        from: accounts[0]
      }).on('transactionHash', (hash) => {
        console.log(hash);
        this.setState({transactionHash: 'https://rinkeby.etherscan.io/tx/' + hash})
      }).on('confirmation', function () {
        // this.setState = ({open : true})
      })
  } catch (e) {
    console.log(e);
  }
};

