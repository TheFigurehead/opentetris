import BlockStore from './BlockStore.js';

class ButtonEventHandler{

    constructor(){

        this.setHandlers();

    }
    
    setHandlers(){
        this.setRestart();
        this.setPause();
    }

    setRestart(){
        const restartBtn = document.getElementById('restart');
        restartBtn.addEventListener(
            'click',
            ()=>{
                BlockStore.restart()
            }
        );
    }

    setPause(){
        const pauseBtn = document.getElementById('pause');
        pauseBtn.addEventListener(
            'click',
            ()=>{
                BlockStore.pause()
            }
        );
    }

}

export default ButtonEventHandler;