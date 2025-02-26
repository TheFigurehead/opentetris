import BlockPicker from './classes/blocks/BlockPicker.js';
import AppStore from './AppStore.js';
import DrawTools from './DrawTools.js';

class BlockStore {
    constructor(){

        if(! BlockStore.instance){
            this.setProps();
            this.drawNextBlock();
        }
  
        return BlockStore.instance;

    }

    setProps(){
        this.blockPicker = new BlockPicker();
        this.block = this.blockPicker.getRandomBlock(0, 0);
        this.nextBlock = this.blockPicker.getRandomBlock(0, 0);
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
        if(this.nextBlock.checkCollision(this.nextBlock.x, this.nextBlock.y)){
            DrawTools.drawEndGame();
            return false;
        }
        this.block = this.nextBlock;
        this.nextBlock = this.blockPicker.getRandomBlock(0, 0);
        this.drawNextBlock();
        return true;
    }

    drawNextBlock(){
        const side = (AppStore.side < 20) ? AppStore.side : 20;
        const nextBlockCanvas = document.getElementById('nextBlock');
        nextBlockCanvas.width = this.nextBlock.shape[0].length * side;
        nextBlockCanvas.height = this.nextBlock.shape.length * side;
        const context = nextBlockCanvas.getContext('2d');
        this.nextBlock.draw(context, side);
    }

    pause(){
        AppStore.toggleActive();
    }

    refresh(){
        this.setProps();
    }

    drawBlock(){
        DrawTools.drawField();
        this.block.draw();
    }
    
    moveBlock(direction = 'down'){
        if(this.block.move(direction)){
            this.drawBlock();
        }
    }
    
    rotate(){
        this.block.rotate();
        this.drawBlock()
    }
    
    restart(){
        AppStore.refresh();
        this.refresh();
        DrawTools.drawField();
    }
  
}
  
const instance = new BlockStore();

export default instance;