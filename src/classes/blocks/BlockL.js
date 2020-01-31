import General from './General';

export default class BlockL extends General{
    constructor(x, y){
        super(x, y, [[0,0,1],[1,1,1]]);
        this.color = "#7e57c2";
        this.borderColor = "#311b92";
    }
}