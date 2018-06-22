const sha256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, prevHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return sha256(this.index + this.prevHash
      + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [Blockchain.createGenesisBlock()];
  }

  static createGenesisBlock() {
    return new Block(0, new Date(), 'Initial block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}

const soonooCoin = new Blockchain();
soonooCoin.addBlock(new Block(1, new Date(), { amount: 5 }));
soonooCoin.addBlock(new Block(2, new Date(), { amount: 10 }));
soonooCoin.addBlock(new Block(3, new Date(), { amount: 2 }));

console.log(JSON.stringify(soonooCoin, null, 4));

