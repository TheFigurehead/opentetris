class AppStore {
    constructor(){

        if(! AppStore.instance){
            this.xSize = parseInt(process.env.xSize);
            this.ySize = parseInt(process.env.ySize);
            this.side = parseInt(process.env.sideLength);
            this.field = Array(this.ySize).fill().map(()=>Array(this.xSize).fill(0));
            AppStore.instance = this;
        }
  
        return AppStore.instance;

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

    checkField(){
        this.field.forEach((item, key)=>{
            let filled = true;
            item.map((value) => {
                if(value == 0){
                    filled = false;
                }
            });
            if(filled){
                this.field.splice(key, 1);
                this.field.unshift(Array(this.xSize).fill(0));
            }
        });
    }
  
}
  
const instance = new AppStore();

export default instance;