import AppStore from './AppStore.js';
import BlockStore from './BlockStore.js';

class TouchHandler{

    constructor(){

        this.xDown = null;                                                        
        this.yDown = null;
        this.move = false;
        this.timer;
        this.lockTimer;
        this.touchduration = 300;
        this.interval = false;
        this.shorttouch;
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
        this.onLongTouch = this.onLongTouch.bind(this);

        this.addEventsListeners();


    }

    addEventsListeners(){
        const tetris = document.getElementById('tetris');
        tetris.addEventListener('touchstart', this.handleTouchStart, false);        
        tetris.addEventListener('touchmove', this.handleTouchMove, false);
        tetris.addEventListener('touchend', this.handleTouchEnd, false);
    }

    handleTouchStart(event){

        const firstTouch = this.getTouches(event)[0];                                      
        this.xDown = firstTouch.clientX;                                      
        this.yDown = firstTouch.clientY;     
    
        this.shorttouch = true;
        
        if(this.lockTimer){
            return;
        }
        
        this.timer = setTimeout(this.onLongTouch, this.touchduration); 
        this.lockTimer = true;

    }

    handleTouchMove(event){

        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        this.move = true;
    
        var xUp = event.touches[0].clientX;                                    
        var yUp = event.touches[0].clientY;
    
        var xDiff = this.xDown - xUp;
        var yDiff = this.yDown - yUp;
    
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                BlockStore.moveBlock('left')
            } else {
                BlockStore.moveBlock('right')
            }                       
        } else {
            if ( yDiff < 0 ) {
                BlockStore.moveBlock('down')
            }                                                                 
        }
    
        this.xDown = null;
        this.yDown = null;     
    }

    handleTouchEnd(){
        if (this.timer){
            clearTimeout(this.timer);
            clearInterval(this.interval);
            this.lockTimer = false;
        }
        if(this.shorttouch && !this.move){
            BlockStore.rotate();
        }

        this.move = false;
    }

    getTouches(event) {
        return event.touches ||
            event.originalEvent.touches;
    }

    onLongTouch(){
        this.interval = setInterval(
        () => {
            this.shorttouch = false;
            if(AppStore.active){
                BlockStore.moveBlock('down');
                AppStore.checkField();
            }
        }, 100);
    }

}                                       

export default TouchHandler;