import AppStore from './AppStore.js';
import BlockStore from './BlockStore.js';

class KeyEventHandler{

    constructor(){
        this.setHandlers();
    }

    setHandlers(){

        document.addEventListener('keydown', (event) => {
        
            if(AppStore.active){
        
                if(event.key == 'ArrowDown'){
                    BlockStore.moveBlock('down');
                }
                
                if(event.key == 'ArrowUp'){
                    BlockStore.rotate();
                }
                
                if(event.key == 'ArrowLeft'){
                    BlockStore.moveBlock('left');
                }
                
                if(event.key == 'ArrowRight'){
                    BlockStore.moveBlock('right');
                }
                    
            }

            if(event.key == 'Backspace'){
                BlockStore.restart();
            }
            
            if(event.key == 'Spacebar' || event.key == ' '){
                BlockStore.pause();
            }

        }, false);

    }

}

export default KeyEventHandler;