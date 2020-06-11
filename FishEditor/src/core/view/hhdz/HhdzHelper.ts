module game.hhdz {
    export class HhdzHelper {
        /**
         * 在
         */
        public static clearAnims(hhdzBattleScene:HhdzBattleScene) {
            // hhdzBattleScene.resetCardShow();
            hhdzBattleScene.redWinAnim.visible = false;
            hhdzBattleScene.redWinAnim.stop();
            hhdzBattleScene.blackWinAnim.visible = false;
            hhdzBattleScene.blackWinAnim.stop();
            hhdzBattleScene.redTypeAnim.visible = false;
            hhdzBattleScene.redTypeAnim.stop();
            hhdzBattleScene.blackTypeAnim.visible = false;
            hhdzBattleScene.blackTypeAnim.stop();
            hhdzBattleScene.redWinMcAnim.visible = false;
            hhdzBattleScene.redWinMcAnim.stop();
            hhdzBattleScene.blackWinAnim.visible = false;
            hhdzBattleScene.blackWinAnim.stop();
            hhdzBattleScene.leftWinAnim.visible = false;
            hhdzBattleScene.leftWinAnim.stop();
            hhdzBattleScene.rigthWinAnim.visible = false;
            hhdzBattleScene.rigthWinAnim.stop();
            hhdzBattleScene.centerWinAnim.visible = false;
            hhdzBattleScene.centerWinAnim.stop();
            hhdzBattleScene.endBoomAnim.visible = false;
            hhdzBattleScene.endBoomAnim.stop();
        }

        public static genFinishTask(data:any, hhdzBattleScene:HhdzBattleScene):game.BehaviorTaskExecutor {
            HhdzHelper.clearAnims(hhdzBattleScene);
            let finishExec = new game.BehaviorTaskExecutor();
            let redCardInfo: any = hhdzBattleScene.getCardInfo(data, HhdzType.red);
            let blackCardInfo: any = hhdzBattleScene.getCardInfo(data, HhdzType.black);
            if (redCardInfo) {
                for(let i = 0; i < redCardInfo.card.length; i++) {
                    finishExec.addTask(500, ()=>{
                        if(i <= 1) {
                            hhdzBattleScene.cardArr[i].showCardSimpleEffect(redCardInfo.card[i]);
                        } else {
                            hhdzBattleScene.cardArr[i].showCard(redCardInfo.card[i]);
                        }
                        
                    }, this, ()=>{
                        hhdzBattleScene.cardArr[i].showCardDirect(redCardInfo.card[i]);
                    }, this, i == 1 ? 200 : 0);
                }

                finishExec.addTask(1000, ()=>{
                    hhdzBattleScene.redTypeAnim.visible = true;
                    HhdzSoundPlayer.instance.playCardType(redCardInfo.cardType);
                    hhdzBattleScene.redTypeAnim.playerOnce(null, null, "animation_" + redCardInfo.cardType);
                }, this,()=>{
                    hhdzBattleScene.redTypeAnim.visible = true;
                    hhdzBattleScene.redTypeAnim.showProgress(1, "animation_" + redCardInfo.cardType);
                }, this, 0);
            }

            if (blackCardInfo) {
                for(let i = 0; i < redCardInfo.card.length; i++) {
                    finishExec.addTask(500, ()=>{
                        if(i <= 1) {
                            hhdzBattleScene.cardArr[i + 3].showCardSimpleEffect(blackCardInfo.card[i]);
                        } else {
                            hhdzBattleScene.cardArr[i + 3].showCard(blackCardInfo.card[i]);
                        }
                    }, this, ()=>{
                        hhdzBattleScene.cardArr[i + 3].showCardDirect(blackCardInfo.card[i]);
                    }, this, i == 1 ? 200 : 0);
                }

                finishExec.addTask(1000, ()=>{
                    hhdzBattleScene.blackTypeAnim.visible = true;
                    HhdzSoundPlayer.instance.playCardType(blackCardInfo.cardType);
                    hhdzBattleScene.blackTypeAnim.playerOnce(null, null, "animation_" + blackCardInfo.cardType);
                }, this,()=>{
                    hhdzBattleScene.blackTypeAnim.visible = true;
                    hhdzBattleScene.blackTypeAnim.showProgress(1, "animation_" + blackCardInfo.cardType);
                }, this, 0);
            }
            let winCardInfo = null;
            let winTypes:number[] = [];
            let redWin = false;
            let blackWin = false;
            if (redCardInfo.isWin) {
                winCardInfo = redCardInfo;
                redWin = true;
                winTypes.push(HhdzType.red)
                finishExec.addTask(1000, ()=>{
                    hhdzBattleScene.redWinAnim.visible = true;
                    hhdzBattleScene.redWinAnim.playerOnce();
                    hhdzBattleScene.redAnim.playerTimes(null, null,100,"animation2");
                    hhdzBattleScene.blackAnim.playerTimes(null, null,100,"animation3");
                }, this, ()=>{
                    hhdzBattleScene.redWinAnim.visible = true;
                    hhdzBattleScene.redWinAnim.showProgress(1);
                }, this, 0);
            } else if(blackCardInfo.isWin) {
                blackWin = true;
                winTypes.push(HhdzType.black)
                winCardInfo = blackCardInfo;
                finishExec.addTask(1000, ()=>{
                    hhdzBattleScene.blackWinAnim.visible = true;
                    hhdzBattleScene.blackWinAnim.playerOnce();
                    hhdzBattleScene.redAnim.playerTimes(null, null,100,"animation3");
                    hhdzBattleScene.blackAnim.playerTimes(null, null,100,"animation2");
                }, this, ()=>{
                    hhdzBattleScene.blackWinAnim.visible = true;
                    hhdzBattleScene.blackWinAnim.showProgress(1);
                }, this, 0);
            }
            let luckyWin = false;
            if ((winCardInfo.cardType == HhdzCardType.duizi && hhdzBattleScene.getMaxCard(winCardInfo.card)) 
                || (winCardInfo.cardType > HhdzCardType.duizi)) {
                luckyWin = true;
                winTypes.push(HhdzType.lucky)
            }
            
            if (winCardInfo.type == HhdzType.red) {
                 finishExec.addTask(1000, ()=>{
                    hhdzBattleScene.leftWinAnim.visible = true;
                    hhdzBattleScene.leftWinAnim.playerTimes(null, null, 4);
                    hhdzBattleScene.flyGoldenToBanker(HhdzType.black);
                    if(luckyWin) {
                        hhdzBattleScene.centerWinAnim.visible = true;
                        hhdzBattleScene.centerWinAnim.playerTimes(null, null, 4);
                    } else {
                        hhdzBattleScene.flyGoldenToBanker(HhdzType.lucky);
                    }
                }, this, ()=>{
                    hhdzBattleScene.leftWinAnim.visible = false;
                    hhdzBattleScene.clearGolden(HhdzType.black);
                    hhdzBattleScene.centerWinAnim.visible = false;
                    if(!luckyWin) {
                        hhdzBattleScene.clearGolden(HhdzType.lucky);
                    }
                }, this, 0);
            } else if (winCardInfo.type == HhdzType.black) {
				finishExec.addTask(1000, ()=>{
                    hhdzBattleScene.rigthWinAnim.visible = true;
                    hhdzBattleScene.rigthWinAnim.playerTimes(null, null, 4);
                    hhdzBattleScene.flyGoldenToBanker(HhdzType.red);
                    if(luckyWin) {
                        hhdzBattleScene.centerWinAnim.visible = true;
                        hhdzBattleScene.centerWinAnim.playerTimes(null, null, 4);
                    } else {
                        hhdzBattleScene.flyGoldenToBanker(HhdzType.lucky);
                    }
                }, this, ()=>{
                    hhdzBattleScene.rigthWinAnim.visible = false;
                    hhdzBattleScene.clearGolden(HhdzType.red);
                    hhdzBattleScene.centerWinAnim.visible = false;
                    if(!luckyWin) {
                        hhdzBattleScene.clearGolden(HhdzType.lucky);
                    }
                }, this, 0);
            }
            
            finishExec.addTask(2000, ()=>{
                let playerFlyInfo = hhdzBattleScene.checkBankerToStakeArea(winTypes, winCardInfo.cardType);
                CommonUtil.registerTimeOut(()=>{
                    hhdzBattleScene.checkBetToPlayer(playerFlyInfo);
                }, hhdzBattleScene, 1000);
            },this,()=>{
                hhdzBattleScene.clearCoins();
            }, this, 0);
            finishExec.addTask(1000, ()=>{
                hhdzBattleScene.finishAfterFlyCoins(redWin, blackWin, luckyWin, data);
                hhdzBattleScene.updateLogHistory(winCardInfo.type, winCardInfo.cardType, true);
            },this,()=>{
                hhdzBattleScene.finishAfterFlyCoins(redWin, blackWin, luckyWin, data);
                hhdzBattleScene.updateLogHistory(winCardInfo.type, winCardInfo.cardType, true);
            }, this, 0);

            return finishExec;
        }
    }

    export class HhdzPlayerGenCoins {
        constructor() {
        }
        public playerId:number = 0;
        public typeMap:HashMap = new HashMap();
        public costTypeAndMoney(type:number, money:number) {
            let key = "type_" + type
            if(this.typeMap.contains(key)) {
                this.typeMap.put(key, this.typeMap.get(key) - money);
            }
        }

        public getTypeMoney(type:number) {
            let key = "type_" + type
            if(this.typeMap.contains(key)) {
                return this.typeMap.get(key);
            }
            return 0;
        }

        public isNeed(type:number) {
            return this.getTypeMoney(type) > 0;
        }
    }

    export class HhdzPlayerFlyInfo {
        constructor() {
        }

        public playerCoinsArr:Array<HhdzPlayerGenCoins> = [];

        public initFromHhdzData(hhdzData:game.hhdz.HhdzData, winTypes:Array<number>, multiArr:Array<number>) {
            let roomData = RoomManager.getInstance().curRoomData;
            let playerIds = hhdzData.getPlayerTypeBetAllPlayers();
            for(let playerId of playerIds) {
                if(!roomData.getPlayerInfo(playerId)) {
                    continue;
                }
                let playerCoins = new HhdzPlayerGenCoins();
                playerCoins.playerId = playerId;
                let needAdd = false;
                for(let i=0;i<winTypes.length;i++) {
                    let type = winTypes[i];
                    let v = hhdzData.getPlayerTypeBet(playerId, type);
                    if(v > 0) {
                        playerCoins.typeMap.put("type_" + type, v * multiArr[i]);
                        needAdd = true;
                    }
                }
                if(needAdd) {
                    this.playerCoinsArr.push(playerCoins);
                }
            }
        }

        public getLeftPlayers():Array<HhdzPlayerGenCoins> {
            let playerIds = new Array<HhdzPlayerGenCoins>();
            let types = [1,2,3];
            for(let coinInfo of this.playerCoinsArr) {
                for(let type of types) {
                    if(coinInfo.isNeed(type)) {
                        playerIds.push(coinInfo);
                    }
                }
            }
            return playerIds;
        }

        public alloc(type:number, value:number):number{
            for(let playerCoins of this.playerCoinsArr) {
                if(playerCoins.isNeed(type)) {
                    playerCoins.costTypeAndMoney(type, value);
                    return playerCoins.playerId;
                }
            }
            return 0;
        }
    }
}