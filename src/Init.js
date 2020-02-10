import AppStore from './AppStore.js';
import DrawTools from './DrawTools.js';
import BlockStore from './BlockStore.js';
import TouchHandler from './TouchHandler.js';
import KeyEventHandler from './KeyEventHandler.js';
import ButtonEventHandler from './ButtonEventHandler.js';

class Init{

    static initApp(){
        new TouchHandler();
        new KeyEventHandler();
        new ButtonEventHandler();
        
        DrawTools.drawField();

        let timerId = setInterval(
        () => {
            if(AppStore.active){
                BlockStore.moveBlock('down');
                AppStore.checkField();
            }
        }, 1000);
    }

}

export default Init;