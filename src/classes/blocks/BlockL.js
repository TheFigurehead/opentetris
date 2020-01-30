import General from './General';

export default class BlockL extends General{
    constructor(x, y){
        super(x, y, [[0,0,1],[1,1,1]]);
    }
}