import General from './General';
import BlockO from './BlockO';
import BlockI from './BlockI';
import BlockS from './BlockS';
import BlockZ from './BlockZ';
import BlockJ from './BlockJ';
import BlockL from './BlockL';

export default class BlockPicker{

    getRandomBlock(x, y){
        const random = Math.round(Math.random() * (+7 - +1) + +1);
        switch(random){
            case 1: 
                return new BlockO(x,y);
            case 2:
                return new General(x,y)
            case 3:
                return new BlockI(x,y)
            case 4:
                return new BlockS(x,y)
            case 5:
                return new BlockZ(x,y)
            case 6:
                return new BlockJ(x,y)
            case 7:
                return new BlockL(x,y)
            default:
                return new General(x,y)
        }
    }

}