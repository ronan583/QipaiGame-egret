module game {

    export class SimpleTweenFlowItem {
        private f:Function;
        private fCaller?:any;
        private params?: any[];
        public exec() {
            if(this.f) {
                this.f.call(this.fCaller, ...this.params);
            }
        }
        public static valueOf(f:Function,fCaller?:any,params?: any[]):SimpleTweenFlowItem{
            let item = new SimpleTweenFlowItem();
            item.f = f;
            item.fCaller = fCaller;
            item.params = params;
            return item;
        }
    }

    export class SimpleFlowCtrl {   

        private items:Array<SimpleTweenFlowItem> = [];
        private cursor:number = -1;
        private isstop = false;

        public pushItem0(item:SimpleTweenFlowItem) {
            this.items.push(item);
        }

        public pushItem(f:Function,fCaller?:any, ...params: any[]) {
            this.pushItem0(SimpleTweenFlowItem.valueOf(f,fCaller,params));
        }

        public playNext() {
            this.cursor++;
            if(this.cursor > this.items.length - 1) {
                return ;
            }
            if(this.isstop) return;
            egret.setTimeout(()=>{
                if(this.isstop) return;
                this.items[this.cursor].exec();
            }, this, 500);
        }

        public stop() {
            this.isstop = true;
        }
    }
}

