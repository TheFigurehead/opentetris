import AppStore from '../../AppStore.js';
import BlockStore from '../../BlockStore.js';
import DrawTools from '../../DrawTools.js';

class General{

    constructor(x = 0, y = 0, shape = [[0,1,0],[1,1,1]]){
        this.x = x;
        this.y = y;
        this.shape = shape;
        this.color = '#4CAF50';
        this.borderColor = '#ff7043';
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    rotate(){

        let newShape = [];

        for(let i = this.shape[0].length-1; i >= 0; i--){
            newShape.push(Array(this.shape.length).fill(0));
            for(let j = 0; j < this.shape.length; j++){
                newShape[newShape.length-1][j] = this.shape[j][i];
            }
        }

        if(this.checkCollision(this.x, this.y, newShape)){
            return false;
        }

        this.shape = newShape;

    }

    draw(context = DrawTools.context, side = AppStore.side){

        let tmpX = this.x;
        let tmpY = this.y;
                
        for(let i = 0; i < this.shape.length; i++){

            for(let j = 0; j < this.shape[i].length; j++){

                if(this.shape[i][j] == 1){

                    DrawTools.drawCell(context, tmpX, tmpY, side, this.borderColor, this.color);

                }

                tmpX += side;
            }

            tmpY += side;
            tmpX = this.x;

        }

    }

    move(size, direction = 'down'){

        let nextX = this.x;
        let nextY = this.y;

        switch(direction){
            case 'up':
                nextY -= size;
                break;
            case 'down':
                nextY += size;
                break;
            case 'left':
                nextX -= size;
                break;
            case 'right':
                    nextX += size;
                break;
        }

        if(this.checkCollision(nextX, nextY)){
            switch(direction){
                case 'down':
                    this.freeze();
                    break;
                default:
                    return false;
            }
        }else{
            this.x = nextX;
            this.y = nextY;
        }
    }

    checkCollision(nextX, nextY, shape = this.shape){

        if( (nextX < 0 ) || ( nextY < 0 ) ){
            return true;
        }

        const posX = nextX / AppStore.side;
        const posY = nextY / AppStore.side;

        if( (posY + shape.length > AppStore.ySize ) || (posX + shape[0].length > AppStore.xSize ) ){
            return true;
        }

        for(let i = 0; i < shape.length ; i++){

            for(let j = 0; j < shape[i].length; j++){

                if( AppStore.field[posY + i][posX + j].value == 1 && shape[i][j] == 1 ){

                    return true;

                }

            }

        }

        return false;

    }

    freeze(){

        let x = (this.x / AppStore.side);
        let y = (this.y / AppStore.side);

        for(let i = this.shape.length - 1; i >= 0; i--){
            for(let j = this.shape[i].length - 1; j >= 0; j--){
                if(this.shape[i][j] != 0){
                    AppStore.field[y+i][x+j] = {
                        value: 1,
                        color: this.color,
                        borderColor: this.borderColor
                    };
                }
            }
        }

        BlockStore.refreshBlock();         

    }

}

export default General;