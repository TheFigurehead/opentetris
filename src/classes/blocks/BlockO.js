import General from './General';

export default class BlockO extends General{
    constructor(x, y){
        super(x, y, [[1,1],[1,1]]);
        this.color = "#ff7043";
        this.borderColor = "#bf360c";
    }
}