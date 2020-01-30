import General from './General';

export default class BlockJ extends General{
    constructor(x, y){
        super(x, y, [[1,0,0],[1,1,1]]);
    }
}