class AppStore {
    constructor(){

        if(! AppStore.instance){
            this.setProps();
        }
  
        return AppStore.instance;

    }

    setProps(){
        this.xSize = parseInt(process.env.xSize);
        this.ySize = parseInt(process.env.ySize);
        this.side = parseInt(process.env.sideLength);
        this.defaultFieldCell = {color: '#fff', borderColor: '#000', value: 0};
        this.field = Array(this.ySize).fill().map(()=>Array(this.xSize).fill(this.defaultFieldCell));
        this.active = true;
        this.score = 0;
        AppStore.instance = this;
    }

    setX(value){
        AppStore.instance.xSize = value;
    }

    setY(value){
        AppStore.instance.ySize = value;
    }

    setSide(value){
        AppStore.instance.side = value;
    }

    setField(field){
        AppStore.instance.field = field;
    }

    toggleActive(){
        this.active = !this.active;
    }

    checkField(){
        this.field.forEach((item, key)=>{
            let filled = true;
            item.map((cell) => {
                if(cell['value'] == 0){
                    filled = false;
                }
            });
            if(filled){
                this.field.splice(key, 1);
                this.field.unshift(Array(this.xSize).fill(this.defaultFieldCell));
                this.setScore();
            }
        });
    }

    refresh(){
        this.setProps();
    }

    setScore(){
        this.score += parseInt(process.env.points);
        document.querySelector('.scoreValue').innerHTML = this.score;
    }
  
}
  
const instance = new AppStore();

export default instance;