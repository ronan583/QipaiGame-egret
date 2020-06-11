module game.sgj {
    export class FruitCrazyUI extends eui.Component {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
            this.skinName = "resource/eui_skins/sgj/fruitCrazy.exml";
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private totalMoneyLabel:eui.BitmapLabel;
        private levelIcon1_1:FruitCrazyIcon;
        private levelIcon1_2:FruitCrazyIcon;
        private levelIcon1_3:FruitCrazyIcon;
        private levelIcon1_4:FruitCrazyIcon;
        private levelIcon1_5:FruitCrazyIcon;
        private levelIcon2_1:FruitCrazyIcon;
        private levelIcon2_2:FruitCrazyIcon;
        private levelIcon2_3:FruitCrazyIcon;
        private levelIcon2_4:FruitCrazyIcon;
        private levelIcon2_5:FruitCrazyIcon;
        private levelIcon3_1:FruitCrazyIcon;
        private levelIcon3_2:FruitCrazyIcon;
        private levelIcon3_3:FruitCrazyIcon;
        private levelIcon3_4:FruitCrazyIcon;
        private levelIcon3_5:FruitCrazyIcon;
        private levelIcon4_1:FruitCrazyIcon;
        private levelIcon4_2:FruitCrazyIcon;
        private levelIcon4_3:FruitCrazyIcon;
        private levelIcon4_4:FruitCrazyIcon;
        private levelIcon4_5:FruitCrazyIcon;

        private gameOverGroup:eui.Group;
        private winMoneyLabel:eui.BitmapLabel;
        private totalWinLabel:eui.BitmapLabel;

        private levelIcons:Array<Array<FruitCrazyIcon>> = [];

        protected childrenCreated():void {
            super.childrenCreated();   
            this.levelIcons = [
                [this.levelIcon1_1, this.levelIcon1_2, this.levelIcon1_3, this.levelIcon1_4, this.levelIcon1_5],
                [this.levelIcon2_1, this.levelIcon2_2, this.levelIcon2_3, this.levelIcon2_4, this.levelIcon2_5],
                [this.levelIcon3_1, this.levelIcon3_2, this.levelIcon3_3, this.levelIcon3_4, this.levelIcon3_5],
                [this.levelIcon4_1, this.levelIcon4_2, this.levelIcon4_3, this.levelIcon4_4, this.levelIcon4_5]
            ];
            this.init();
        }

        private onAdd():void {
            this.gameOverGroup.visible = false;
            if(this.levelIcons) {
                this.init();
            }   
        }

        private init():void {
            // 等级1 的全亮
            for(let i=0;i<this.levelIcons.length;i++) {
                let index = 0;
                for(let icon of this.levelIcons[i]) {
                    icon.showLevel(i, index);
                    icon.showLight(i == 0);
                    index++;
                }   
            }
            if(this.totalWinLabel) {
                this.totalWinLabel.text = "0.00";
            }
            
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public updateBoom(crazyIcon:FruitCrazyIcon):void {
            let boomCount:number = crazyIcon.level - 1;
            let arr:Array<number> = [0,1,2,3,4];
            arr.splice(arr.indexOf(crazyIcon.index), 1);
            let boomIndexArr:Array<number> = [];
            for(let i=0;i<boomCount;i++) {
                let randIndex:number = CommonUtil.RandomRangeInt(0, arr.length);
                let randValue:number = arr[randIndex];
                arr.splice(randIndex, 1);
                boomIndexArr.push(randValue);
            }
            let multiArr:Array<number> = [5,10,15,20,25];
            for(let i=0;i<5;i++) {
                this.levelIcons[crazyIcon.level][i].touchEnabled = false;
                this.levelIcons[crazyIcon.level][i].touchChildren = false;
                if(i == crazyIcon.index) continue;
                if(boomIndexArr.indexOf(i) >= 0) {
                    this.levelIcons[crazyIcon.level][i].showBoom();
                    this.levelIcons[crazyIcon.level][i].showLight(false);
                } else {
                    this.levelIcons[crazyIcon.level][i].showLight(false);
                    this.levelIcons[crazyIcon.level][i].showMoney(multiArr[CommonUtil.RandomRangeInt(0, multiArr.length)]
                        * RoomManager.getInstance().curRoomData.bottomBet);
                }
            }
            egret.setTimeout(this.showGameOver, this, 1500);
        }

        private showGameOver():void {
            this.gameOverGroup.visible = true;
            let total:number = 0;
            let bottomBet:number = RoomManager.getInstance().curRoomData.bottomBet;
            for(let i=0;i<FruitData.instance.crazyArr.length;i++) {
                total += FruitData.instance.crazyArr[i] * bottomBet;
            }
            this.winMoneyLabel.text = total.toFixed(2);

            egret.setTimeout(this.close, this, 1500);
        }

        private close():void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_FRUIT_CRAZY_UI);
        }

        public updateReward(crazyIcon:FruitCrazyIcon):void {
            let boomCount:number = crazyIcon.level;
            let arr:Array<number> = [0,1,2,3,4];
            arr.splice(arr.indexOf(crazyIcon.index), 1);
            let boomIndexArr:Array<number> = [];
            for(let i=0;i<boomCount;i++) {
                let randIndex:number = CommonUtil.RandomRangeInt(0, arr.length);
                let randValue:number = arr[randIndex];
                arr.splice(randIndex, 1);
                boomIndexArr.push(randValue);
            }
            let multiArr:Array<number> = [5,10,15,20,25];
            for(let i=0;i<5;i++) {
                this.levelIcons[crazyIcon.level][i].touchEnabled = false;
                this.levelIcons[crazyIcon.level][i].touchChildren = false;
                if(i == crazyIcon.index) continue;
                if(boomIndexArr.indexOf(i) >= 0) {
                    this.levelIcons[crazyIcon.level][i].showBoom();
                    this.levelIcons[crazyIcon.level][i].showLight(false);
                } else {
                    this.levelIcons[crazyIcon.level][i].showLight(false);
                    this.levelIcons[crazyIcon.level][i].showMoney(multiArr[CommonUtil.RandomRangeInt(0, multiArr.length)]
                        * RoomManager.getInstance().curRoomData.bottomBet);
                }
            }

            let total:number = 0;
            let bottomBet:number = RoomManager.getInstance().curRoomData.bottomBet;
            for(let i=0;i<=crazyIcon.level;i++) {
                total += FruitData.instance.crazyArr[i] * bottomBet;
            }
            this.totalWinLabel.text = total.toFixed(2);

            if(crazyIcon.level >= 3) {
                // 结束
                egret.setTimeout(this.showGameOver, this, 1500);
            } else {
                for(let icon of this.levelIcons[crazyIcon.level + 1]) {
                    icon.showLight(true);
                }   
            }

        }

       
    }
}