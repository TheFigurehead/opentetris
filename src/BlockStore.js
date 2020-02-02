import BlockPicker from './classes/blocks/BlockPicker.js';

class BlockStore {
    constructor(){

        if(! BlockStore.instance){
            this.setProps();
        }
  
        return BlockStore.instance;

    }

    setProps(){
        this.blockPicker = new BlockPicker();
        this.block = this.blockPicker.getRandomBlock(0, 0);
        BlockStore.instance = this;
    }

    setX(value){
        BlockStore.instance.xSize = value;
    }

    setY(value){
        BlockStore.instance.ySize = value;
    }

    setSide(value){
        BlockStore.instance.side = value;
    }

    setField(field){
        BlockStore.instance.field = field;
    }

    refreshBlock(){
        this.block = this.blockPicker.getRandomBlock(0, 0);
    }

    refresh(){
        this.setProps();
    }
  
}
  
const instance = new BlockStore();

export default instance;