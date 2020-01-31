import General from './General';

export default class BlockS extends General{
    constructor(x, y){
        super(x, y, [[0,1,1],[1,1,0]]);
        this.color = '#cddc39';
        this.borderColor = '#9e9d24';
    }
}