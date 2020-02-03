import AppStore from './AppStore';

class DrawTools{

    constructor(){
        if(! DrawTools.instancev){
            this.setProps();
        }
    }

    setProps(){
        this.canvas = document.getElementById('tetris');
        this.setResolution();
        this.context = this.canvas.getContext('2d');
    }

    setResolution(){
        this.canvas.width = AppStore.xSize * AppStore.side;
        this.canvas.height = AppStore.ySize * AppStore.side;
    }

    drawCell(context, x, y, size = AppStore.side, borderColor = '#000', fillColor = '#fff', borderSize = 1){
        context.beginPath();
        context.rect(x, y, size, size);
        context.fillStyle = fillColor;
        context.fill();
        context.lineWidth = borderSize;
        context.strokeStyle = borderColor;
        context.stroke();
    }

    drawField(){
        let tmpX = 0;
        let tmpY = 0;
        
        for(let i = 0; i < AppStore.ySize; i++){
            for(let j = 0; j < AppStore.xSize; j++){
                if(AppStore.field[i][j]['value'] == 0){
                    this.drawCell(this.context, tmpX, tmpY, AppStore.side );
                }else{
                    this.drawCell(this.context, tmpX, tmpY, AppStore.side, AppStore.field[i][j].borderColor, AppStore.field[i][j].color );
                }
                tmpX += AppStore.side;
            }
            tmpY += AppStore.side;
            tmpX = 0;
        }
    }

}

  
const instance = new DrawTools();

export default instance;