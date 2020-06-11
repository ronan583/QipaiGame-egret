module game.ddz {
    export class DDZFapaiHelper {
        constructor(cardOperation:PokerCardOperation,
            contentGroup:eui.Group,fapaiBegin:eui.Image,
            leftCard2:DDZCardCount,leftCard3:DDZCardCount,
            ddzBattleUI:DDZBattleUI
            ) {
            this.cardOperation = cardOperation;
            this.contentGroup = contentGroup;
            this.fapaiBegin = fapaiBegin;
            this.ddzBattleUI = ddzBattleUI;
            this.leftCard2 = leftCard2;
            this.leftCard3 = leftCard3;
        }
        private cards:Array<number>;
        private cardOperation:PokerCardOperation;
        private fapaiImgArr:Array<eui.Image> = [];
        private contentGroup:eui.Group;
        private fapaiBegin:eui.Image;
        private ddzBattleUI:DDZBattleUI;
        private leftCard2:DDZCardCount;
        private leftCard3:DDZCardCount;
        private _isRunning = false;
        private completeFunc:Function;
        private completeCaller:any;

        public get isRunning():boolean {
            return this._isRunning;
        }

        public addFapaiComplete(f:Function, fc:any) {
            this.completeFunc = f;
            this.completeCaller = fc;
        }

        public playFapai(cards:Array<number>) {
            this.cards = cards;
            this.completeFunc = null;
            this._isRunning = true;
            for(let i=0;i<this.cards.length;i++) {
                let targetCard = this.cardOperation.getCardByIndex(i);
                let p = targetCard.localToGlobal(0,0);
                p = this.contentGroup.globalToLocal(p.x,p.y);
                this.ddzBattleUI.setTimeOut(()=>{
                    let img = new eui.Image(this.fapaiBegin.source);
                    this.contentGroup.addChild(img);
                    img.x = this.fapaiBegin.x;
                    img.y = this.fapaiBegin.y;
                    egret.Tween.get(img).to({x:p.x,y:p.y}, 200).call(()=>{
                        targetCard.visible = true;
                        if(img.parent) img.parent.removeChild(img);
                    }, this);
                    this.fapaiImgArr.push(img);
                    // 飞向其他两家
                    let img1 = new eui.Image(this.fapaiBegin.source);
                    this.contentGroup.addChild(img1);
                    img1.x = this.fapaiBegin.x;
                    img1.y = this.fapaiBegin.y;
                    egret.Tween.get(img1).to({x:this.leftCard2.x - 20,y:this.leftCard2.y,scaleX:0.2,scaleY:0.25}, 200).call(
                        ()=>{
                            egret.Tween.get(img1).to({x:this.leftCard2.x,y:this.leftCard2.y}, 200);
                        }, this
                    )
                    this.fapaiImgArr.push(img1);
                    let img2 = new eui.Image(this.fapaiBegin.source);
                    this.contentGroup.addChild(img2);
                    img2.x = this.fapaiBegin.x;
                    img2.y = this.fapaiBegin.y;
                    egret.Tween.get(img2).to({x:this.leftCard3.x + 20,y:this.leftCard3.y,scaleX:0.2,scaleY:0.25}, 200).call(
                        ()=>{
                            egret.Tween.get(img2).to({x:this.leftCard3.x,y:this.leftCard3.y}, 200);
                        }, this
                    )
                    this.fapaiImgArr.push(img2);
                },i*50);
            }
            this.ddzBattleUI.setTimeOut(()=>{
                // 收缩 再展开
                this.cardOperation.explodeAgain();
                for(let img of this.fapaiImgArr) {
                    if(img.parent) {
                        img.parent.removeChild(img);
                    }
                }
                let roomData = RoomManager.getInstance().curRoomData;
                this.leftCard2.visible = true;
                this.leftCard2.showCount(17, roomData.getPlayerInfoByPos(1).playerId);
                this.leftCard3.visible = true;
                this.leftCard3.showCount(17, roomData.getPlayerInfoByPos(2).playerId);
                this.ddzBattleUI.setTimeOut(()=>{
                    // 发牌结束
                    this._isRunning = false;
                    if(this.completeFunc) {
                        this.completeFunc.call(this.completeCaller);
                    }
                }, 300);
            }, cards.length * 50 + 200);
        }
    }
}