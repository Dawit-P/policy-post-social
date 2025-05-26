import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

export const connectToBlockchain = async () => {
    try {
        await web3.eth.net.isListening();
        console.log('Connected to the blockchain');
    } catch (error) {
        console.error('Failed to connect to the blockchain:', error);
        throw new Error('Blockchain connection error');
    }
};

export const sendTransaction = async (fromAddress, toAddress, amount) => {
    try {
        const transaction = {
            from: fromAddress,
            to: toAddress,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: 2000000,
        };
        const receipt = await web3.eth.sendTransaction(transaction);
        return receipt;
    } catch (error) {
        console.error('Transaction failed:', error);
        throw new Error('Transaction error');
    }
};

export const getBlockNumber = async () => {
    try {
        const blockNumber = await web3.eth.getBlockNumber();
        return blockNumber;
    } catch (error) {
        console.error('Failed to retrieve block number:', error);
        throw new Error('Block retrieval error');
    }
};