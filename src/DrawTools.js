import AppStore from './AppStore';

class DrawTools{

    constructor(){
        if(! DrawTools.instance ){
            this.setProps();
        }
        return DrawTools.instance;
    }

    setProps(){
        this.canvas = document.getElementById('tetris');
        this.setResolution();
        this.context = this.canvas.getContext('2d');
        DrawTools.instance = this;
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

    drawEndGame(){

        const text = [
            {
                size: '28px',
                text: 'This is the end...',
                color: '#1a237e',
                font: 'Lemonada'

            },
            {
                size: '28px',
                text: 'My only friend, the end...',
                color: '#1a237e',
                font: 'Lemonada'
            },
            {
                size: '32px',
                text: 'Total score:',
                color: '#3e2723',
                font: 'Roboto'
            },
            {
                size: '34px',
                text: AppStore.score,
                color: '#3e2723',
                font: 'Roboto'
            }
        ];

        const lineHeight = '50';
        const startPoint = (this.canvas.height / 2) - ( (text.length*lineHeight) / 2 );
        this.context.filter = 'blur(15px)';

        this.drawField();

        this.context.filter = 'blur(0px)';
        this.context.textAlign = "center";

        for(let i = 0; i < text.length; i++){
            this.context.fillStyle = text[i].color;
            this.context.font = 'normal normal bold ' + text[i].size + ' ' + text[i].font;
            this.context.fillText( text[i].text, this.canvas.width / 2, startPoint + (i * lineHeight), this.canvas.width - 20);
        }
		
    }

}

  
const instance = new DrawTools();

export default instance;