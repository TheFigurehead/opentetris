import AppStore from '../../AppStore.js';
import BlockStore from '../../BlockStore.js';

export default class General{

    constructor(x = 0, y = 0, shape = [[0,1,0],[1,1,1]]){
        this.x = x;
        this.y = y;
        this.shape = shape;
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

        this.shape = newShape;

    }

    draw(context, drawCell){

        let tmpX = this.x;
        let tmpY = this.y;
                
        for(let i = 0; i < this.shape.length; i++){

            for(let j = 0; j < this.shape[i].length; j++){

                if(this.shape[i][j] == 1){

                    drawCell(context, tmpX, tmpY, AppStore.side, 'red', 'green');

                }

                tmpX += AppStore.side;
            }

            tmpY += AppStore.side;
            tmpX = this.x;

        }
        if(tmpY/AppStore.side == AppStore.ySize){

            this.freeze();
            return 0;

        }

        const posX = this.x / AppStore.side;
        const posY = this.y / AppStore.side + this.shape.length;

        for(let i = this.shape.length-1; i >= 0 ; i--){

            for(let j = 0; j < this.shape[i].length; j++){


                if( AppStore.field[posY - i][posX + j] == 1 && this.shape[(this.shape.length-1)-i][j] == 1 ){

                    this.freeze();
                    return 0;

                }

            }

        }

    }

    move(size, direction = 'down'){
        let positionCell;
        switch(direction){
            case 'up':
                this.y -= size;
                break;
            case 'down':
                this.y += size;
                break;
            case 'left':
                for(let i = 0; i < this.shape.length; i++){
                    for(let j = 0; j < this.shape[i].length; j++){
                        if( this.shape[i][j] == 1 ){
                            let xPos = this.x / size;
                            let yPos = this.y / size;
                            if(AppStore.field[yPos+i][ xPos + (j-1) ] == 1){
                                return;
                            }
                        }
                    }
                }
                positionCell = this.x / size;
                if(positionCell >= 1 && positionCell < AppStore.xSize){
                    this.x -= size;
                }
                break;
            case 'right':
                for(let i = 0; i < this.shape.length; i++){
                    for(let j = this.shape[i].length-1; j > 0; j--){
                        if( this.shape[i][j] == 1 ){
                            let xPos = this.x / size;
                            let yPos = this.y / size;
                            if(AppStore.field[yPos+i][ xPos + (j+1) ] == 1){
                                return;
                            }
                        }
                    }
                }
                positionCell = this.x / size + this.shape[0].length;
                if(positionCell >= 1 && positionCell < AppStore.xSize){
                    this.x += size;
                }
                break;
        }
    }

    freeze(){
        
        let x = (this.x / AppStore.side);
        let y = (this.y / AppStore.side);

        for(let i = this.shape.length - 1; i >= 0; i--){
            for(let j = this.shape[i].length - 1; j >= 0; j--){
                if(this.shape[i][j] != 0){
                    AppStore.field[y+i][x+j] = this.shape[i][j];
                }
            }
        }

        // this.setX( 200 );
        // this.setY( 0 );
        BlockStore.refreshBlock();

        console.log('dev');
        

    }

}