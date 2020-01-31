import General from './General';

export default class BlockJ extends General{
    constructor(x, y){
        super(x, y, [[1,0,0],[1,1,1]]);
        this.color = "#1E88E5";
        this.borderColor = "#0D47A1";
    }
}