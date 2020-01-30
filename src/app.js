// import Init from './classes/Init.js';

import AppStore from './AppStore.js';
import BlockStore from './BlockStore.js';

document.addEventListener('DOMContentLoaded', function(){

    const canvas = document.getElementById('tetris');
    canvas.width = AppStore.xSize * AppStore.side;
    console.log(AppStore.xSize * AppStore.side);
    canvas.height = AppStore.ySize * AppStore.side;
    
    const context = canvas.getContext('2d');
    
    const drawCell = (context, x, y, size = AppStore.side, borderColor = '#000', fillColor = '#fff', borderSize = 1) => {
        context.beginPath();
        context.rect(x, y, size, size);
        context.fillStyle = fillColor;
        context.fill();
        // context.font = "20px Arial";
        // context.fillStyle = "black";
        // context.fillText( ((x) ? x/size : 0) + ";" + ((y) ? y/size : 0), x+5, y+size-10);
        context.lineWidth = borderSize;
        context.strokeStyle = borderColor;
        context.stroke();
    }
    
    const drawField = (context) => {
        let tmpX = 0;
        let tmpY = 0;
        
        for(let i = 0; i < AppStore.ySize; i++){
            for(let j = 0; j < AppStore.ySize; j++){
                if(AppStore.field[i][j] == 0){
                    drawCell(context, tmpX, tmpY, AppStore.side);
                }else{
                    drawCell(context, tmpX, tmpY, AppStore.side, 'red', 'green');
                }
                tmpX += AppStore.side;
            }
            tmpY += AppStore.side;
            tmpX = 0;
        }
    }
    
    const drawBlock = (size) => {
        drawField(context);
        BlockStore.block.draw(context, drawCell);
    }
    
    const moveBlock = (context, size, direction = 'down') => {
        BlockStore.block.move(size, direction);
        drawBlock(context, size);
    }
    
    const rotate = () => {
        BlockStore.block.rotate();
        drawBlock(AppStore.side)
    }
    
    drawField(context);
    
    const drawBtn = document.getElementById('drawBlock');
    drawBtn.addEventListener(
        'click',
        ()=>{
            BlockStore.block.draw(context, drawCell);
        }
    );
    
    const rotateBtn = document.getElementById('rotate');
    rotateBtn.addEventListener(
        'click',
        ()=>{
            rotate()
        }
    );
    
    const moveBtns = document.getElementsByClassName('moveBlock');
    for(let k = 0; k < moveBtns.length; k++ ){
        let item = moveBtns[k];
        let direction = item.dataset.direction;
        item.addEventListener(
            'click',
            ()=>{
                moveBlock(context, AppStore.side, direction)
            }
        );
    }
    // keyboard events
    document.addEventListener('keydown', (event) => {
        
        if(event.key == 'ArrowDown'){
            moveBlock(context, AppStore.side, 'down');
        }
        
        if(event.key == 'ArrowUp'){
            rotate();
        }
        
        if(event.key == 'ArrowLeft'){
            moveBlock(context, AppStore.side, 'left');
        }
        
        if(event.key == 'ArrowRight'){
            moveBlock(context, AppStore.side, 'right');
        }
    }, false);

    let timerId = setInterval(
    () => {
        moveBlock(context, AppStore.side, 'down');
        AppStore.checkField();
    }, 1000);
});
