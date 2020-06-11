module game.bjl {
    /**
     * 百家乐初始化发牌
     */
    export class BjlInitCardDeliver {
        private bjlCardArr:Array<BjlCard>;
        private bjlBattleScene:BjlBattleScene;
        private recordPosArr:Array<egret.Point> = [];
        private completeFunc:()=>void;
        private completeCaller:any;
        constructor(bjlCardArr:Array<BjlCard>, bjlBattleScene:BjlBattleScene) {
            this.bjlCardArr = bjlCardArr;
            this.bjlBattleScene = bjlBattleScene;
            for(let card of this.bjlCardArr) {
                this.recordPosArr.push(new egret.Point(card.x, card.y));
            }
        }

        public init() {
            // 初始化状态下  card 应该都不显示 并且缩到发牌器那里
            for(let card of this.bjlCardArr) {
                card.visible = false;
                egret.Tween.removeTweens(card);
                let p = this.bjlBattleScene.fapaiImg.localToGlobal(70,70);
                let initPos = card.parent.globalToLocal(p.x, p.y);
                card.x = initPos.x;
                card.y = initPos.y;
                card.scaleX = card.scaleY = 0.2;
                egret.log("fapaiGlobalPosaaaaaaaaaaaaaaaaa " + initPos.x + "  " + initPos.y);
            }
        }

        public showEnd() {
            let i=0;
            for(let card of this.bjlCardArr) {
                egret.Tween.removeTweens(card);
                card.x = this.recordPosArr[i].x
                card.y = this.recordPosArr[i].y
                card.rotation = 0
                card.scaleX = card.scaleY = 0.5;
                i++;
                card.visible = true;
            }
        }

        public resetCard() {
            for(let card of this.bjlCardArr) {
                card.visible = false;
                egret.Tween.removeTweens(card);
                card.scaleX = card.scaleY = 0.05;
                let p = this.bjlBattleScene.fapaiImg.localToGlobal(70,70);
                let initPos = card.parent.globalToLocal(p.x, p.y);
                card.x = initPos.x;
                card.y = initPos.y;
            }
        }

        public playDeliver(f:()=>void = null, fo:any = null) {
            this.checkCardTween();
            // 确认初始化
            this.init();
            let times = [0,600,250,850];
            for(let i=0;i<this.bjlCardArr.length;i++) {
                let card = this.bjlCardArr[i];
                CommonUtil.registerTimeOut(()=>{
                    card.visible = true;
                    card.rotation = 45;
                    if(i == this.bjlCardArr.length - 1 && f && fo) {
                        egret.Tween.get(card).to({
                            x:this.recordPosArr[i].x,
                            y:this.recordPosArr[i].y,
                            scaleX:0.5,
                            scaleY:0.5,
                            rotation:0
                        }, 250).call(f, fo);
                    } else {
                        egret.Tween.get(card).to({
                            x:this.recordPosArr[i].x,
                            y:this.recordPosArr[i].y,
                            scaleX:0.5,
                            scaleY:0.5,
                            rotation:0
                        }, 250);
                    }
                    
                }, this, times[i]);
            }
        }

        private checkCardTween() {
            for(let card of this.bjlCardArr) {
                egret.Tween.removeTweens(card);
            }
        }
    }

    export class BjlFinishCardDeliver {
        private bjlCardArr:Array<BjlCard>;
        private bjlBattleScene:BjlBattleScene;
        private recordPosArr:Array<egret.Point> = [];
        private fapaiGlobalPos:egret.Point;
        private cardInfo:BjlCardInfo;
        private flowCtrl:SimpleFlowCtrl;
        private resultData:game.bjl.BjlRoundResultData;
        private f:Function;
        private fCaller:any;
        private data:any;
        constructor(bjlCardArr:Array<BjlCard>, bjlCardInfo:BjlCardInfo, bjlBattleScene:BjlBattleScene) {
            this.bjlCardArr = bjlCardArr;
            this.bjlBattleScene = bjlBattleScene;
            this.cardInfo = bjlCardInfo;
            for(let card of this.bjlCardArr) {
                this.recordPosArr.push(new egret.Point(card.x, card.y));
            }
            this.fapaiGlobalPos = bjlBattleScene.fapaiImg.localToGlobal(100,100);
        }

        public stopDeliver() {
            if(this.flowCtrl) {
                this.flowCtrl.stop();
            }
            CommonUtil.removeTimeout(this);
            this.cardInfo.visible = false;
        }

        public playFinishDeliver(resultData:game.bjl.BjlRoundResultData, f:Function, fCaller:any, data:any) {
            this.resultData = resultData;
            this.f = f;
            this.fCaller = fCaller;
            this.data = data;
            let cardInfo = resultData.cardInfo;
            this.cardInfo.init();
            this.flowCtrl = new SimpleFlowCtrl();
            // 先播放闲
            let lastXianDian:number = 0;
            let xianCardNum:number = 0; 
            let lastZhuangDian:number = 0;
            let zhuangCardNum:number = 0;
            // 不播放闲家语音和庄家语音了
            // this.flowCtrl.pushItem(this.playXianSound, this);
            for(let i=0;i<cardInfo.resultCardItems.length;i++) {
                let item = cardInfo.resultCardItems[i];
                if(item.xianCard > 0) {
                    if(i == 0) {
                        this.flowCtrl.pushItem(this.flyCardDirectShow, this, this.bjlCardArr[0], 
                            this.cardInfo.getCardByIndex(0), {card:item.xianCard, dian:item.xianDian})
                    } else if(i == 1){
                        this.flowCtrl.pushItem(this.flyCardCuopaiShow, this, this.bjlCardArr[1], 
                            this.cardInfo.getCardByIndex(1), {card:item.xianCard, dian:item.xianDian}, this.cardInfo.getCuopaiByIndex(i-1))
                    } 
                    lastXianDian = item.xianDian;
                    xianCardNum = i;
                }
                if(item.zhuangCard > 0) {
                    if(i == 0) {
                        this.flowCtrl.pushItem(this.flyCardDirectShow, this, this.bjlCardArr[2], 
                            this.cardInfo.getCardByIndex(3), {card:item.zhuangCard, dian:item.zhuangDian})
                    } else if(i==1) {
                        this.flowCtrl.pushItem(this.flyCardCuopaiShow, this, this.bjlCardArr[3], 
                            this.cardInfo.getCardByIndex(4), {card:item.zhuangCard, dian:item.zhuangDian}, this.cardInfo.getCuopaiByIndex(i+1))
                    } 
                    lastZhuangDian = item.zhuangDian;
                    zhuangCardNum = i;
                }
            }
            /*
            this.flowCtrl.pushItem(this.playZhuangSound, this);
            for(let i=0;i<cardInfo.resultCardItems.length;i++) {
                let item = cardInfo.resultCardItems[i];
                if(item.zhuangCard > 0) {
                    if(i == 0) {
                        this.flowCtrl.pushItem(this.flyCardDirectShow, this, this.bjlCardArr[2], 
                            this.cardInfo.getCardByIndex(3), {card:item.zhuangCard, dian:item.zhuangDian})
                    } else if(i==1) {
                        this.flowCtrl.pushItem(this.flyCardCuopaiShow, this, this.bjlCardArr[3], 
                            this.cardInfo.getCardByIndex(4), {card:item.zhuangCard, dian:item.zhuangDian}, this.cardInfo.getCuopaiByIndex(i+1))
                    } 
                    lastZhuangDian = item.zhuangDian;
                    zhuangCardNum = i;
                }
            }
            */
            if(cardInfo.resultCardItems[2] && cardInfo.resultCardItems[2].xianCard > 0) {
                let item = cardInfo.resultCardItems[2];
                this.flowCtrl.pushItem(this.playXianAddSound, this);
                this.flowCtrl.pushItem(this.flyCardCuopaiFromFapaiShow, this, this.cardInfo.getCardByIndex(2), this.cardInfo.getCardByIndex(2), {card:item.xianCard, dian:item.xianDian}, this.cardInfo.getCuopaiByIndex(2-1))
            }
            if(cardInfo.resultCardItems[2] && cardInfo.resultCardItems[2].zhuangCard > 0) {
                let item = cardInfo.resultCardItems[2];
                this.flowCtrl.pushItem(this.playZhuangAddSound, this);
                this.flowCtrl.pushItem(this.flyCardCuopaiFromFapaiShow, this, this.cardInfo.getCardByIndex(5), this.cardInfo.getCardByIndex(5), {card:item.zhuangCard, dian:item.zhuangDian}, this.cardInfo.getCuopaiByIndex(2+1))
            }
            this.flowCtrl.pushItem(this.showDianTogether, this, lastXianDian, xianCardNum, lastZhuangDian, zhuangCardNum)
            // 显示闲家点数
            this.flowCtrl.pushItem(this.showXDian, this, lastXianDian, xianCardNum);
            // 显示庄家点数
            this.flowCtrl.pushItem(this.showZDian, this, lastZhuangDian, zhuangCardNum);
            this.flowCtrl.pushItem(this.showWinInfo, this);
            // this.flowCtrl.pushItem(this.showEndBattle, this);
            this.flowCtrl.playNext();
        }

        private playXianSound() {
            BjlSoundPlayer.instance.playPlayer();
            this.flowCtrl.playNext();
        }

        
        private playZhuangSound() {
            BjlSoundPlayer.instance.playBanker();
            this.flowCtrl.playNext();
        }

        private playXianAddSound() {
            BjlSoundPlayer.instance.playPlayerAdd();
            this.flowCtrl.playNext();
        }

        private playZhuangAddSound() {
            BjlSoundPlayer.instance.playBankerAdd();
            this.flowCtrl.playNext();
        }

        private showWinInfo() {
            for(let win of this.resultData.winTypes) {
                if(win == 1) {
                    BjlSoundPlayer.instance.playPlayerWin();
                    this.cardInfo.showXianWin();
                } else if(win == 2) {
                    BjlSoundPlayer.instance.playBankerWin();
                    this.cardInfo.showZhuangWin();
                } else if(win == 3) {
                    BjlSoundPlayer.instance.playTie();
                }
            }
            if(this.f) {
                this.f.call(this.fCaller, this.data);
            }
            CommonUtil.registerTimeOut(()=>{
                this.flowCtrl.playNext();
            }, this, 3000)
        }

        private showDianTogether(xdian:number, xcardNum:number, zdian:number, zcardNum:number) {
            this.cardInfo.showXDian(xdian, xcardNum);
            this.cardInfo.showZDian(zdian, zcardNum);
            this.flowCtrl.playNext();
        }

        private showXDian(dian:number, xcardNum:number) {
            // this.cardInfo.showXDian(dian, xcardNum);
            BjlSoundPlayer.instance.playXianPoint(dian);
            CommonUtil.registerTimeOut(()=>{
                this.flowCtrl.playNext();
            }, this, 800);
            
        }
        private showZDian(dian:number, zcardNum:number) {
            // this.cardInfo.showZDian(dian, zcardNum);
            BjlSoundPlayer.instance.playZhuangPoint(dian);
            CommonUtil.registerTimeOut(()=>{
                this.flowCtrl.playNext();
            }, this, 800);
        }
        private showEndBattle() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BJL_FINISH_UI, this.resultData);
        }
        private flyCardDirectShow(card:BjlCard, targetCard:BjlCard, cardInfo:any) {
            let targetGlobalPos = targetCard.parent.localToGlobal(targetCard.x, targetCard.y);
            let targetPos = card.parent.globalToLocal(targetGlobalPos.x, targetGlobalPos.y);
            let originPos = new egret.Point(card.x, card.y)
            egret.Tween.get(card).to({
                x:targetPos.x, y:targetPos.y, scaleX:0.7, scaleY:0.7
            }, 250).call(()=>{
                CommonUtil.registerTimeOut(()=>{
                    // 飞完直接显示牌
                    card.visible = false;
                    card.x = originPos.x
                    card.y = originPos.y
                    card.scaleX = card.scaleY = 0.5
                    targetCard.visible = true;
                    targetCard.showCard(cardInfo.card)
                    this.flowCtrl.playNext();
                }, this, 300);
            }, this);
        }

        private flyCardCuopaiShow(card:BjlCard, targetCard:BjlCard, cardInfo:any, cuopai:Cuopai) {
            let targetGlobalPos = targetCard.parent.localToGlobal(targetCard.x, targetCard.y);
            let targetPos = card.parent.globalToLocal(targetGlobalPos.x, targetGlobalPos.y);
            let originPos = new egret.Point(card.x, card.y)
            egret.Tween.get(card).to({
                x:targetPos.x, y:targetPos.y, rotation:90,  scaleX:0.7, scaleY:0.7
            }, 250).call(()=>{
                CommonUtil.registerTimeOut(()=>{
                    cuopai.visible = true;
                    card.x = originPos.x
                    card.y = originPos.y
                    card.scaleX = card.scaleY = 0.7
                    card.visible = false;
                    card.rotation = 0;
                    cuopai.play(cardInfo.card,()=>{
                        cuopai.visible = false;
                        targetCard.visible = true;
                        targetCard.showCardDirect(cardInfo.card)
                        this.flowCtrl.playNext();
                    },this);
                }, this, 300);
            }, this);
        }

        private flyCardCuopaiFromFapaiShow(card:BjlCard, targetCard:BjlCard, cardInfo:any, cuopai:Cuopai) {
            let targetGlobalPos = targetCard.parent.localToGlobal(targetCard.x, targetCard.y);
            let targetPos = card.parent.globalToLocal(targetGlobalPos.x, targetGlobalPos.y);
            card.visible = true;
            card.scaleX = card.scaleY = 0.2;
            let p = this.bjlBattleScene.fapaiImg.localToGlobal(70,70);
            let initPos = card.parent.globalToLocal(p.x, p.y);
            card.x = initPos.x;
            card.y = initPos.y;
            egret.Tween.get(card).to({
                x:targetPos.x, y:targetPos.y, rotation:90,  scaleX:0.7, scaleY:.7
            }, 250).call(()=>{
                CommonUtil.registerTimeOut(()=>{
                    cuopai.visible = true;
                    card.rotation = 0;
                    card.visible = false;
                    cuopai.play(cardInfo.card,()=>{
                        cuopai.visible = false;
                        targetCard.visible = true;
                        targetCard.showCardDirect(cardInfo.card)
                        this.flowCtrl.playNext();
                    },this);
                }, this, 300);
            }, this);
        }
    }
}