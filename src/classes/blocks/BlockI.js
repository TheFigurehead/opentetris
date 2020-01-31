import General from './General';

export default class BlockI extends General{
    constructor(x, y){
        super(x, y, [[1,1,1,1]]);
        this.color = '#009688';
        this.borderColor = '#004d40';
    }
}