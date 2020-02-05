import AppStore from './AppStore.js';
import DrawTools from './DrawTools.js';
import BlockStore from './BlockStore.js';
import TouchHandler from './TouchHandler.js';

document.addEventListener('DOMContentLoaded', function(){

    const touchHandler = new TouchHandler();
    
    DrawTools.drawField();
    
    const moveBtns = document.getElementsByClassName('moveBlock');
    for(let k = 0; k < moveBtns.length; k++ ){
        let item = moveBtns[k];
        let direction = item.dataset.direction;
        item.addEventListener(
            'click',
            ()=>{
                BlockStore.moveBlock(AppStore.side, direction)
            }
        );
    }

    const restartBtn = document.getElementById('restart');
    restartBtn.addEventListener(
        'click',
        ()=>{
            BlockStore.restart()
        }
    );

    const pauseBtn = document.getElementById('pause');
    pauseBtn.addEventListener(
        'click',
        ()=>{
            BlockStore.pause()
        }
    );
    
    // keyboard events
    document.addEventListener('keydown', (event) => {
        
        if(AppStore.active){

            if(event.key == 'ArrowDown'){
                BlockStore.moveBlock(AppStore.side, 'down');
            }
            
            if(event.key == 'ArrowUp'){
                BlockStore.rotate();
            }
            
            if(event.key == 'ArrowLeft'){
                BlockStore.moveBlock(AppStore.side, 'left');
            }
            
            if(event.key == 'ArrowRight'){
                BlockStore.moveBlock(AppStore.side, 'right');
            }

        }
    }, false);

    let timerId = setInterval(
    () => {
        if(AppStore.active){
            BlockStore.moveBlock(AppStore.side, 'down');
            AppStore.checkField();
        }
    }, 1000);

});
