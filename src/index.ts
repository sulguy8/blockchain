import crypto from "crypto";

interface BlockShape {
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string,
    ) {
        this.hash = Block.calculateHash(prevHash, height, data);
    }
    static calculateHash(prevHash:string, height:number, data: string){
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class Blockchain {
    private blocks: Block[]
    constructor() {
        this.blocks = [];
    }
    private getPrevHash() {
        if(this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1]. hash;
    }
    public addBLock(data:string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    }
    public getBLocks() {
        return [...this.blocks];
    }
}

const blockchain = new Blockchain();

blockchain.addBLock("조용수");
blockchain.addBLock("김기용");
blockchain.addBLock("백건빈");

console.log(blockchain.getBLocks);