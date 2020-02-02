// import Init from './classes/Init.js';

import AppStore from './AppStore.js';
import BlockStore from './BlockStore.js';

document.addEventListener('DOMContentLoaded', function(){

    const canvas = document.getElementById('tetris');
    canvas.width = AppStore.xSize * AppStore.side;
    canvas.height = AppStore.ySize * AppStore.side;
    
    const context = canvas.getContext('2d');
    
    const drawCell = (context, x, y, size = AppStore.side, borderColor = '#000', fillColor = '#fff', borderSize = 1) => {
        context.beginPath();
        context.rect(x, y, size, size);
        context.fillStyle = fillColor;
        context.fill();
        context.lineWidth = borderSize;
        context.strokeStyle = borderColor;
        context.stroke();
    }
    
    const drawField = (context) => {
        let tmpX = 0;
        let tmpY = 0;
        
        for(let i = 0; i < AppStore.ySize; i++){
            for(let j = 0; j < AppStore.xSize; j++){
                if(AppStore.field[i][j]['value'] == 0){
                    drawCell( context, tmpX, tmpY, AppStore.side );
                }else{
                    drawCell( context, tmpX, tmpY, AppStore.side, AppStore.field[i][j].borderColor, AppStore.field[i][j].color );
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
    
    const restart = () => {
        AppStore.refresh();
        BlockStore.refresh();
        drawField(context);
    }

    const pause = () => {
        AppStore.toggleActive();
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
    
    const canvasBlock = document.getElementById('tetris');
    canvasBlock.addEventListener(
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

    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener(
        'click',
        ()=>{
            restart()
        }
    );

    const pauseBtn = document.getElementById('pause');
    pauseBtn.addEventListener(
        'click',
        ()=>{
            pause()
        }
    );
    
    // keyboard events
    document.addEventListener('keydown', (event) => {
        
        if(AppStore.active){

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

        }
    }, false);

    let timerId = setInterval(
    () => {
        if(AppStore.active){
            moveBlock(context, AppStore.side, 'down');
            AppStore.checkField();
        }
    }, 1000);
});
