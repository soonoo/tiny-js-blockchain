const sha256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return sha256(this.index + this.prevHash
      + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }
   
  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log('Block mined: ' + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [Blockchain.createGenesisBlock()];
    this.difficulty = 3;
  }

  static createGenesisBlock() {
    return new Block(0, new Date(), 'Initial block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  isChainValid() {
    for(let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if(currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if(currentBlock.prevHash !== prevBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const soonooCoin = new Blockchain();

console.log('Mining block 1...');
soonooCoin.addBlock(new Block(1, new Date(), { amount: 5 }));
console.log('Mining block 2...');
soonooCoin.addBlock(new Block(2, new Date(), { amount: 10 }));
console.log('Mining block 3...');
soonooCoin.addBlock(new Block(3, new Date(), { amount: 2 }));

