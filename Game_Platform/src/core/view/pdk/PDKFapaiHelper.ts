module game.pdk {
    export class PDKFapaiHelper {
        constructor(cardOperation:PDKPokerCardOperation,
            contentGroup:eui.Group,fapaiBegin:eui.Image,
            leftCard2:PDKCardCount,leftCard3:PDKCardCount,
            pdkBattleUI:PDKBattleUI) {
                this.cardOperation = cardOperation;
                this.contentGroup = contentGroup;
                this.fapaiBegin = fapaiBegin;
                this.pdkBattleUI = pdkBattleUI;
                this.leftCard2 = leftCard2;
                this.leftCard3 = leftCard3;
        }

        private cards:Array<number>;
        private cardOperation:PDKPokerCardOperation;
        private fapaiImgArr:Array<eui.Image> = [];
        private contentGroup:eui.Group;
        private fapaiBegin:eui.Image;
        private pdkBattleUI:PDKBattleUI;
        private leftCard2:PDKCardCount;
        private leftCard3:PDKCardCount;
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

        public clear() {
            this._isRunning = false;
        }

        public playFapai(cards:Array<number>) {
            this.cards = cards;
            this.pdkBattleUI.leftCard2.visible = false;
            this.pdkBattleUI.leftCard3.visible = false;
            this._isRunning = true;
            for(let i=0;i<this.cards.length;i++) {
                let targetCard = this.cardOperation.getCardByIndex(i);
                let p = targetCard.localToGlobal(0,0);
                p = this.contentGroup.globalToLocal(p.x,p.y);
                this.pdkBattleUI.setTimeOut(()=>{
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
                    egret.Tween.get(img1).to({x:this.leftCard2.x - 25,y:this.leftCard2.y + 10,scaleX:0.4,scaleY:0.4}, 200).call(
                        ()=>{
                            egret.Tween.get(img1).to({x:this.leftCard2.x + 5,y:this.leftCard2.y + 10}, 200);
                        }, this
                    )
                    this.fapaiImgArr.push(img1);
                    let img2 = new eui.Image(this.fapaiBegin.source);
                    this.contentGroup.addChild(img2);
                    img2.x = this.fapaiBegin.x;
                    img2.y = this.fapaiBegin.y;
                    egret.Tween.get(img2).to({x:this.leftCard3.x + 25,y:this.leftCard3.y + 10,scaleX:0.4,scaleY:0.4}, 200).call(
                        ()=>{
                            egret.Tween.get(img2).to({x:this.leftCard3.x + 5,y:this.leftCard3.y + 10}, 200);
                        }, this
                    )
                    this.fapaiImgArr.push(img2);
                },i*50);
            }
            let holder = this;
            this.pdkBattleUI.setTimeOut(()=>{
                // 收缩 再展开
                this.cardOperation.explodeAgain();
                for(let img of this.fapaiImgArr) {
                    if(img.parent) {
                        img.parent.removeChild(img);
                    }
                }
                
                let roomData = RoomManager.getInstance().curRoomData;
                this.leftCard2.visible = true;
                let player = PDKBattleData.getInstance().getPlayer(roomData.getPlayerInfoByPos(1).playerId)
                this.leftCard2.showCount(player ? player.cardCount : 16, roomData.getPlayerInfoByPos(1).playerId);
                this.leftCard3.visible = true;
                player = PDKBattleData.getInstance().getPlayer(roomData.getPlayerInfoByPos(2).playerId)
                this.leftCard3.showCount(player ? player.cardCount : 16, roomData.getPlayerInfoByPos(2).playerId);
                this.pdkBattleUI.setTimeOut(()=>{
                    // 发牌结束
                    holder._isRunning = false;
                    if(holder.completeFunc) {
                        holder.completeFunc.call(holder.completeCaller);
                        holder.completeFunc = null
                        holder.completeCaller = null
                    }
                }, 600);
            }, cards.length * 50 + 200);
        }
    }
}