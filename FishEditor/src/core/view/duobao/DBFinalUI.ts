module game.duobao {
    export class DBFinalUI extends GameScene {
        private recordStartTime: number;
        private startCheckId: number;
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/duobao/duobaoFinal.exml";
        }

        private item1: DBFinalItem;
        private item2: DBFinalItem;
        private item3: DBFinalItem;
        private item4: DBFinalItem;
        private item5: DBFinalItem;
        private itemArr: Array<DBFinalItem> = [];

        private touch1: eui.Rect;
        private touch2: eui.Rect;
        private touch3: eui.Rect;
        private touch4: eui.Rect;
        private touch5: eui.Rect;
        private touchArr: Array<eui.Rect> = [];

        private leijiLabel: eui.BitmapLabel;
        private leijiyingquLabel: eui.BitmapLabel;
        private plzImg: eui.BitmapLabel;

        private animGroup: eui.Group;
        private doorAnim: DragonAnim;
        private recordPosArr:Array<egret.Point> = []

        // private testBtn: eui.Button;
        // private onTest(){
        //     console.error("==============send");
        // 				game.AppFacade.getInstance().sendNotification(PanelNotify.DUOBAO_OPEN_OTHRES);

        // }
        protected componentInit(): void {
            this.itemArr = [this.item1, this.item2, this.item3, this.item4, this.item5];
            this.touchArr = [this.touch1, this.touch2, this.touch3, this.touch4, this.touch5];
            this.enableOthers(true);
            // this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTest, this);
            this.touch1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem1, this);
            this.touch2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem2, this);
            this.touch3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem3, this);
            this.touch4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem4, this);
            this.touch5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onItem5, this);

            this.item1.setNextNode(this.item2);
            this.item2.setNextNode(this.item3);
            this.item3.setNextNode(this.item4);
            this.item4.setNextNode(this.item5);
            this.item5.setNextNode(this.item1);
            for(let i=0;i<this.itemArr.length;i++) {
                this.recordPosArr.push(new egret.Point(this.itemArr[i].x,this.itemArr[i].y))
            }
        }

        protected onOpen() {
            this.doorEffect();
            this.showInfo();
            for (let i=0;i<this.itemArr.length;i++) {
                let item = this.itemArr[i];
                item.reset();
                item.scaleX = item.scaleY = 1;
                item.x = this.recordPosArr[i].x
                item.y = this.recordPosArr[i].y
            }
            this.item1.sortIndex = 0;
            this.item2.sortIndex = 1;
            this.item3.sortIndex = 2;
            this.item4.sortIndex = 3;
            this.item5.sortIndex = 4;
            //this.item1.defaultAnim();
            let dbData = DuobaoData.instance;
            let rewardPoint = dbData.duobaoRewardPoint;
            this.leijiyingquLabel.text = (dbData.winMoney - rewardPoint.getReward()).toFixed(2);
            //this.leijiyingquLabel.text = DuobaoData.instance.winMoney.toFixed(2);
            this.plzImg.visible = false;
            this.enableOthers(true);
        }

        public doorEffect() {
            this.animGroup.visible = true;
            this.doorAnim.playerOnce(this.showPlz, this);
            CommonUtil.registerTimeOut(() => {
                this.animGroup.visible = false;
            }, this, 3000);
        }

        public playCurtainDownAnim(func: Function, funcObj: any){
            this.animGroup.visible = true;
            this.doorAnim.playerOnce(()=>{
                this.animGroup.visible = false;
                func.call(funcObj);
            }, this, "animation1");
            CommonUtil.registerTimeOut(()=>{
                this.animGroup.visible  = false;
            }, this, 3000);
        }

        private showPlz() {
            this.plzImg.visible = true;
            this.plzImg.alpha = 0;
            this.plzImg.scaleX = this.plzImg.scaleY = 0.1;
            egret.Tween.get(this.plzImg).to({ alpha: 1, scaleX: 1, scaleY: 1}, 600);
        }

        private showInfo() {
            let data = DuobaoData.instance;
            this.leijiLabel.text = data.rewardPool.toFixed(0);
            this.leijiyingquLabel.text = "0";
        }

        private selectedItem: DBFinalItem;


        private onItem1() {
            this.item1.fanpai();
            this.selectedItem = this.item1;
            this.enableOthers(false);
        }
        private onItem2() {
            this.item2.fanpai();
            this.selectedItem = this.item2;
            this.enableOthers(false);
        }
        private onItem3() {
            this.item3.fanpai();
            this.selectedItem = this.item3;
            this.enableOthers(false);
        }
        private onItem4() {
            this.item4.fanpai();
            this.selectedItem = this.item4;
            this.enableOthers(false);
        }
        private onItem5() {
            this.item5.fanpai();
            this.selectedItem = this.item5;
            this.enableOthers(false);
        }

        private enableOthers(b: boolean): void {
            for (let i = 0; i < this.touchArr.length; i++) {
                this.touchArr[i].touchEnabled = b;
            }
        }

        private rewardArr = [];
        private rewardIndex = 0;
        public showUnReward() {
            let delay = 0;
            this.rewardIndex = 0;
            this.plzImg.visible = false;
            let data = DuobaoData.instance.duobaoRewardPoint;
            console.error("========DBFinalUI",  data)
            for (let i = 0; i < data.rewards.length; i++) {
                if (i == data.index) {
                    continue;
                }
                this.rewardArr.push(data.rewards[i]);
            }
            console.error("========this.rewardArr",  this.rewardArr)

            for (let item of this.itemArr) {
                if (item == this.selectedItem) {
                    continue;
                }
                let reward = this.rewardArr[this.rewardIndex] / 1000;
                CommonUtil.registerTimeOut(()=>{
                    item.fanpai(false, reward, delay);
                    console.error("========this.rewardArr",  reward)
                }, this, delay);
                this.rewardIndex++;
                delay += 80;
            }
            egret.setTimeout(() => {
                if (this.parent) {
                    this.playCurtainDownAnim(() => {
                        if(this.parent){
                            this.parent.removeChild(this);
                        }
                        DuobaoData.instance.duobaoRewardPoint = null;
                        AppFacade.getInstance().sendNotification(PanelNotify.UPDATE_DUOBAO_BATTLE);
                    }, this)
                }
            }, this, 4000);
        }
    }
}

