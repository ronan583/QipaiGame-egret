module game.bjl {
	export class BjlFinishTask {
        private data:any;
        private resultData:BjlRoundResultData;
        private battleScene:BjlBattleScene;
        private cardInfo:BjlCardInfo;
        private bjlCardArr:Array<BjlCard>;
        private taskExecutor:BehaviorTaskExecutor;
        private isShowEnd:boolean = false;
		public constructor(data:any, resultData:BjlRoundResultData, battleScene:BjlBattleScene, isShowEnd:boolean) {
            this.data = data;
            this.resultData = resultData;
            this.battleScene = battleScene;
            this.cardInfo = battleScene.bjlCardInfo;
            this.cardInfo.reset();
            this.bjlCardArr = [battleScene.prepareCard1, battleScene.prepareCard2, battleScene.prepareCard3, battleScene.prepareCard4];
            this.isShowEnd = isShowEnd;
            this.generateTaskFromStartData();
		}

		public generateTaskFromStartData():BehaviorTaskExecutor{
            this.taskExecutor = new game.BehaviorTaskExecutor();
            let lastXianDian:number = 0;
            let xianCardNum:number = 0; 
            let lastZhuangDian:number = 0;
            let zhuangCardNum:number = 0;
            for(let i=0;i<this.resultData.cardInfo.resultCardItems.length;i++) {
                let item = this.resultData.cardInfo.resultCardItems[i];
                if(item.xianCard > 0) {
                    if(i == 0) {
                        let task:BehaviorTask = new BehaviorTask();
                        task.simulateTime = 700;
                        task.nextExecDelay = 300;
                        task.bindBehaviorWithParams(this.flyCardDirectShow, this, this.bjlCardArr[0], 
                            this.cardInfo.getCardByIndex(0), {card:item.xianCard, dian:item.xianDian})
                        task.bindFinalBehaviorWithParams(this.directShow, this, this.bjlCardArr[0], 
                            this.cardInfo.getCardByIndex(0), {card:item.xianCard, dian:item.xianDian})
                        this.taskExecutor.addTaskByTask(task);
                    } else if(i == 1){
                        let task:BehaviorTask = new BehaviorTask();
                        task.simulateTime = 1700;
                        task.nextExecDelay = 300;
                        task.bindBehaviorWithParams(this.flyCardCuopaiShow, this, this.bjlCardArr[1], 
                            this.cardInfo.getCardByIndex(1), {card:item.xianCard, dian:item.xianDian}, this.cardInfo.getCuopaiByIndex(i-1))
                        task.bindFinalBehaviorWithParams(this.directCuopaiShow, this, this.bjlCardArr[1], 
                            this.cardInfo.getCardByIndex(1), {card:item.xianCard, dian:item.xianDian}, this.cardInfo.getCuopaiByIndex(i-1))
                        this.taskExecutor.addTaskByTask(task);
                    } 
                    lastXianDian = item.xianDian;
                    xianCardNum = i;
                }
                if(item.zhuangCard > 0) {
                    if(i == 0) {
                        let task:BehaviorTask = new BehaviorTask();
                        task.simulateTime = 700;
                        task.nextExecDelay = 300;
                        task.bindBehaviorWithParams(this.flyCardDirectShow, this, this.bjlCardArr[2], 
                            this.cardInfo.getCardByIndex(3), {card:item.zhuangCard, dian:item.zhuangDian})
                        task.bindFinalBehaviorWithParams(this.directShow, this, this.bjlCardArr[2], 
                            this.cardInfo.getCardByIndex(3), {card:item.zhuangCard, dian:item.zhuangDian})
                        this.taskExecutor.addTaskByTask(task);
                    } else if(i==1) {
                        let task:BehaviorTask = new BehaviorTask();
                        task.simulateTime = 1700;
                        task.nextExecDelay = 300;
                        task.bindBehaviorWithParams(this.flyCardCuopaiShow, this, this.bjlCardArr[3], 
                            this.cardInfo.getCardByIndex(4), {card:item.zhuangCard, dian:item.zhuangDian}, this.cardInfo.getCuopaiByIndex(i+1));
                        task.bindFinalBehaviorWithParams(this.directCuopaiShow, this, this.bjlCardArr[3], 
                            this.cardInfo.getCardByIndex(4), {card:item.zhuangCard, dian:item.zhuangDian}, this.cardInfo.getCuopaiByIndex(i+1));
                        this.taskExecutor.addTaskByTask(task);
                    } 
                    lastZhuangDian = item.zhuangDian;
                    zhuangCardNum = i;
                }
            }
            if(this.resultData.cardInfo.resultCardItems[2] && this.resultData.cardInfo.resultCardItems[2].xianCard > 0) {
                let item = this.resultData.cardInfo.resultCardItems[2];
                this.taskExecutor.addTask(0, this.playXianAddSound, this, null, null, 0);
                let task:BehaviorTask = new BehaviorTask();
                task.simulateTime = 1700;
                task.nextExecDelay = 300;
                task.bindBehaviorWithParams(this.flyCardCuopaiFromFapaiShow, this, this.cardInfo.getCardByIndex(2),
                    this.cardInfo.getCardByIndex(2), {card:item.xianCard, dian:item.xianDian}, this.cardInfo.getCuopaiByIndex(2-1));
                task.bindFinalBehaviorWithParams(this.directCuopaiShowFromFapi, this, this.cardInfo.getCardByIndex(2), 
                    this.cardInfo.getCardByIndex(2), {card:item.xianCard, dian:item.xianDian}, this.cardInfo.getCuopaiByIndex(2-1));
                this.taskExecutor.addTaskByTask(task);
            }
            if(this.resultData.cardInfo.resultCardItems[2] && this.resultData.cardInfo.resultCardItems[2].zhuangCard > 0) {
                let item = this.resultData.cardInfo.resultCardItems[2];
                this.taskExecutor.addTask(0, this.playZhuangAddSound, this, null, null, 0);
                let task:BehaviorTask = new BehaviorTask();
                task.simulateTime = 1700;
                task.nextExecDelay = 300;
                task.bindBehaviorWithParams(this.flyCardCuopaiFromFapaiShow, this, this.cardInfo.getCardByIndex(5),
                    this.cardInfo.getCardByIndex(5), {card:item.zhuangCard, dian:item.zhuangDian}, this.cardInfo.getCuopaiByIndex(2+1));
                task.bindFinalBehaviorWithParams(this.directCuopaiShowFromFapi, this, this.cardInfo.getCardByIndex(5), 
                    this.cardInfo.getCardByIndex(5), {card:item.zhuangCard, dian:item.zhuangDian}, this.cardInfo.getCuopaiByIndex(2+1));
                this.taskExecutor.addTaskByTask(task);
            }
            let task:BehaviorTask = new BehaviorTask();
            task.bindBehaviorWithParams(this.showDianTogether, this, lastXianDian, xianCardNum, lastZhuangDian, zhuangCardNum);
            task.bindFinalBehaviorWithParams(this.showDianTogether, this, lastXianDian, xianCardNum, lastZhuangDian, zhuangCardNum);
            this.taskExecutor.addTaskByTask(task);
            let showXDianTask:BehaviorTask = new BehaviorTask();
            showXDianTask.bindBehaviorWithParams(this.showXDian, this, lastXianDian, true);
            showXDianTask.bindFinalBehaviorWithParams(this.showXDian, this, lastXianDian, false);
            showXDianTask.simulateTime = 800;
            this.taskExecutor.addTaskByTask(showXDianTask);
            
            let showZDianTask:BehaviorTask = new BehaviorTask();
            showZDianTask.simulateTime = 800;
            showZDianTask.bindBehaviorWithParams(this.showZDian, this, lastZhuangDian, true);
            showZDianTask.bindFinalBehaviorWithParams(this.showZDian, this, lastZhuangDian, false);
            this.taskExecutor.addTaskByTask(showZDianTask);

            this.taskExecutor.addTask(5000, this.showWinInfo, this, 
                ()=>{
                    this.battleScene.showFinishAfterBetTween(this.data);
                    this.battleScene.showFinishUI(this.resultData); 
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
                }, this, 0);
			return this.taskExecutor;
        }

        private flyCardDirectShow(params:Array<any>) {
			let card:BjlCard = params[0];
			let targetCard:BjlCard= params[1];
			let cardInfo:any = params[2];
            let targetGlobalPos = targetCard.parent.localToGlobal(targetCard.x, targetCard.y);
            let targetPos = card.parent.globalToLocal(targetGlobalPos.x, targetGlobalPos.y);
            let originPos = new egret.Point(card.x, card.y)
            egret.Tween.get(card).to({
                x:targetPos.x, y:targetPos.y, scaleX:0.7, scaleY:0.7
            }, 250).call(()=>{
                CommonUtil.registerTimeOut(()=>{
                    // 飞完直接显示牌
                    card.setVisible(false);
                    card.x = originPos.x
                    card.y = originPos.y
                    card.scaleX = card.scaleY = 0.5
                    targetCard.setVisible(true);
                    targetCard.showCard(cardInfo.card)
                }, this, 300);
            }, this);
        }

        private directShow(params:Array<any>) {
            let card:BjlCard = params[0];
            let targetCard:BjlCard= params[1];
            let cardInfo:any = params[2];
            card.setVisible(false);
            card.scaleX = card.scaleY = 0.5
            targetCard.setVisible(true);
            targetCard.showCardDirect(cardInfo.card)
        }

        private flyCardCuopaiShow(params:Array<any>) {
            let card:BjlCard = params[0];
			let targetCard:BjlCard= params[1];
            let cardInfo:any = params[2];
            let cuopai:Cuopai = params[3];
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
                    card.setVisible(false);
                    card.rotation = 0;
                    cuopai.play(cardInfo.card,()=>{
                        cuopai.visible = false;
                        targetCard.setVisible(true);
                        targetCard.showCardDirect(cardInfo.card)
                    },this);
                }, this, 300);
            }, this);
        }

        private directCuopaiShow(params:Array<any>) {
            let card:BjlCard = params[0];
			let targetCard:BjlCard= params[1];
            let cardInfo:any = params[2];
            let cuopai:Cuopai = params[3];
            card.scaleX = card.scaleY = 0.7
            card.setVisible(false);
            card.rotation = 0;
            cuopai.visible = false;
            targetCard.setVisible(true);
            targetCard.showCardDirect(cardInfo.card)
        }

        private directCuopaiShowFromFapi(params:Array<any>) {
            let card:BjlCard = params[0];
			let targetCard:BjlCard= params[1];
            let cardInfo:any = params[2];
            let cuopai:Cuopai = params[3];
            card.scaleX = card.scaleY = 0.7
            card.setVisible(false);
            card.rotation = 0;
            cuopai.visible = false;
            this.cardInfo.fixTargetCard(targetCard);
            targetCard.setVisible(true);
            targetCard.showCardDirect(cardInfo.card)
        }

        private flyCardCuopaiFromFapaiShow(params:Array<any>) {
            let card:BjlCard = params[0];
			let targetCard:BjlCard= params[1];
            let cardInfo:any = params[2];
            let cuopai:Cuopai = params[3];
            let targetGlobalPos = targetCard.parent.localToGlobal(targetCard.x, targetCard.y);
            let targetPos = card.parent.globalToLocal(targetGlobalPos.x, targetGlobalPos.y);
            card.setVisible(true);
            card.scaleX = card.scaleY = 0.2;
            let p = this.battleScene.fapaiImg.localToGlobal(70,70);
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
                        targetCard.setVisible(true);
                        targetCard.showCardDirect(cardInfo.card)
                    },this);
                }, this, 300);
            }, this);
        }

        private playXianAddSound() {
            BjlSoundPlayer.instance.playPlayerAdd();
        }

        private playZhuangAddSound() {
            BjlSoundPlayer.instance.playBankerAdd();
        }

        private showDianTogether(params:any[]) {
            let xdian:number = params[0];
            let xcardNum:number= params[1]; 
            let zdian:number = params[2];
            let zcardNum:number = params[3];
            this.cardInfo.showXDian(xdian, xcardNum);
            this.cardInfo.showZDian(zdian, zcardNum);
        }

        private showXDian(params:any[]) {
            let dian:number = params[0];
            let issound:number = params[1];
            if(issound) BjlSoundPlayer.instance.playXianPoint(dian);
        }

        private showZDian(params:any[]) {
            let dian:number = params[0];
            let issound:number = params[1];
            if(issound) BjlSoundPlayer.instance.playZhuangPoint(dian);
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
            if(this.battleScene.onBattleFinish) {
                this.battleScene.onBattleFinish({data:this.data, resultData:this.resultData}, this.isShowEnd);
            }
        }

        public execute(passtime:number = 0) {
            egret.log("finish pass time : " + passtime);
            this.cardInfo.init();
            if(this.taskExecutor) {
                this.taskExecutor.execute(passtime);
            }
        }

        public stop() {
            CommonUtil.removeTimeout(this);
            if(this.taskExecutor) {
                this.taskExecutor.stop();
                egret.log("bjl finish data stop imm");
            }
        }

    }
    
}