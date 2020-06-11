module game.brnn {

    export class BrnnFinishTask {
        constructor() {

        }

        public static generateTaskFromStartData(data:any, battleScene:BrnnBattleScene, isShowEnd:boolean):BehaviorTaskExecutor{
            let taskExecutor = new game.BehaviorTaskExecutor();
            // 牌展开动画
            taskExecutor.addTask(1000, 
                ()=>{
                    for(let i = 0 ; i < data.cardInfos.length ; i++)
                    {
                        let cardInfo = data.cardInfos[i];
                        battleScene.playerCardArr[i].showCardContent4(cardInfo.groupCards, cardInfo.cardsAll);
                    }
                },
                battleScene, 
                ()=>{
                    for(let i = 0 ; i < data.cardInfos.length ; i++)
                    {
                        let cardInfo = data.cardInfos[i];
                        battleScene.playerCardArr[i].showCardContentDirect(cardInfo.groupCards, cardInfo.cardsAll);
                    }
                }, battleScene);
            // 牌逐个显示牛的动画
			for(let i = 0; i < data.cardInfos.length ; i++) {
				let cardGroup:BRNNCardGroup = battleScene.playerCardArr[i];
				taskExecutor.addTask(cardGroup.getCuopaiTime() + 300, ()=>{
					let cardGroup:BRNNCardGroup = battleScene.playerCardArr[i];
					let cardInfo = data.cardInfos[i];
					cardGroup.newShowCardContentLast(cardInfo.groupCards, cardInfo.value);
				}, battleScene, ()=>{
                    let cardGroup:BRNNCardGroup = battleScene.playerCardArr[i];
					let cardInfo = data.cardInfos[i];
					cardGroup.showCardContentLastNoEffect(cardInfo.groupCards, cardInfo.value, true);
                }, battleScene, 300);
            }
            let roundResult = new BrnnRoundResultData();
            roundResult.setData(data.resultInfos, data.cardInfos);
            let result = battleScene.isBankerAllWin(data.cardInfos);
            let isBankerAllWin = result[0];
            let isBankerAllLose = result[1];
            // 赢牌区域闪烁动画
            taskExecutor.addTask(2000, ()=>{
                battleScene.shakeWinType(data.cardInfos);
            }, battleScene, null, null, 0);

            taskExecutor.addTask(battleScene.calcBankerWinFlyTime(data.cardInfos), ()=>{
                battleScene.checkBankerWinFly(data.cardInfos);
            }, battleScene, null, null, 500);
        
            if(!isBankerAllWin) {
                taskExecutor.addTask(battleScene.calcBankerToStakeAreaTime(data.cardInfos, roundResult), ()=>{
                    battleScene.checkBankerToStakeArea(data.cardInfos, roundResult);
                }, battleScene, null, null, 500);
                taskExecutor.addTask(battleScene.calcStakeWinTime(data), ()=>{
                    battleScene.checkStakeWin(data);
                }, battleScene, null, null, isBankerAllWin ? 0 : 500);
            }
            
            taskExecutor.addTask(0, ()=>{
                BrnnRequest.requestOPWinFail(0);
                battleScene.showFinish(data, isShowEnd);
            }, battleScene, 
            ()=>{
                BrnnRequest.requestOPWinFail(0);
                battleScene.showFinish(data, isShowEnd);
            }, battleScene, 0);

			return taskExecutor;
        }

    }
    
}