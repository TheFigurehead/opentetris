import AppStore from './AppStore.js';
import BlockStore from './BlockStore.js';
import DrawTools from './DrawTools.js';

document.addEventListener('DOMContentLoaded', function(){
    
    const drawBlock = (size) => {
        DrawTools.drawField();
        BlockStore.block.draw();
    }
    
    const moveBlock = (size, direction = 'down') => {
        BlockStore.block.move(size, direction);
        drawBlock(size);
    }
    
    const rotate = () => {
        BlockStore.block.rotate();
        drawBlock(AppStore.side)
    }
    
    const restart = () => {
        AppStore.refresh();
        BlockStore.refresh();
        DrawTools.drawField();
    }

    const pause = () => {
        AppStore.toggleActive();
    }
    
    DrawTools.drawField();
    
    const moveBtns = document.getElementsByClassName('moveBlock');
    for(let k = 0; k < moveBtns.length; k++ ){
        let item = moveBtns[k];
        let direction = item.dataset.direction;
        item.addEventListener(
            'click',
            ()=>{
                moveBlock(AppStore.side, direction)
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
                moveBlock(AppStore.side, 'down');
            }
            
            if(event.key == 'ArrowUp'){
                rotate();
            }
            
            if(event.key == 'ArrowLeft'){
                moveBlock(AppStore.side, 'left');
            }
            
            if(event.key == 'ArrowRight'){
                moveBlock(AppStore.side, 'right');
            }

        }
    }, false);

    let timerId = setInterval(
    () => {
        if(AppStore.active){
            moveBlock(AppStore.side, 'down');
            AppStore.checkField();
        }
    }, 1000);

    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;

    function getTouches(evt) {
    return evt.touches ||
            evt.originalEvent.touches;
    }                                                     

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                moveBlock(AppStore.side, 'left')
            } else {
                moveBlock(AppStore.side, 'right')
            }                       
        } else {
            if ( yDiff > 0 ) {
                rotate(); 
            } else { 
                moveBlock(AppStore.side, 'down')
            }                                                                 
        }

        xDown = null;
        yDown = null;                                             
    };

    var interval;

    const onlongtouch = () => {
        interval = setInterval(
        () => {
            if(AppStore.active){
                moveBlock(AppStore.side, 'down');
                AppStore.checkField();
            }
        }, 100);
    }

    var timer, lockTimer;
    var touchduration = 300;

    function touchstart(e) {
        e.preventDefault();
        if(lockTimer){
            return;
        }
        timer = setTimeout(onlongtouch, touchduration); 
        lockTimer = true;
    }

    function touchend() {
        if (timer){
            clearTimeout(timer);
            clearInterval(interval);
            lockTimer = false;
        }
    }

    document.addEventListener('touchstart', touchstart, false);        
    document.addEventListener('touchend', touchend, false);

});
