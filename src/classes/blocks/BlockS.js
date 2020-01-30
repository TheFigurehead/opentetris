import General from './General';

export default class BlockS extends General{
    constructor(x, y){
        super(x, y, [[0,1,1],[1,1,0]]);
    }
}