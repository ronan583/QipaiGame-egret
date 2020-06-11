module game.by {
    export class BYBattleUI extends GameScene {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/by/byBattleUI.exml";
            this.gameType = ChildGameType.BY;
        }

        private byFishPond:BYFishPond;

        private canon1:BYCanon;
        private canon2:BYCanon;
        private canon3:BYCanon;
        private canon4:BYCanon;

        private bulletMoney1:BYCoins; 
        private bulletMoney2:BYCoins; 
        private bulletMoney3:BYCoins; 
        private bulletMoney4:BYCoins; 

        private playerMoney1:BYMoney;
        private playerMoney2:BYMoney;
        private playerMoney3:BYMoney;
        private playerMoney4:BYMoney;

        private canonList:Array<BYCanon>;
        private bulletMoneyList:Array<BYCoins>;
        private playerMoneyList:Array<BYMoney>;

        public autoLockBtn:eui.Image;
        public autoShootBtn:eui.Image;

        private bossNotice:eui.Group;
        private bossNoticeShox:eui.Image;
        private boosNoticeStartTime:number;

        private contentGroup:eui.Group;

        private menuImg:eui.Image;
        private menuGroup:MenuGroup;
        private menuContent:eui.Group;
        private bankBtn:eui.Button;
        private setBtn:eui.Button;
        private backBtn:eui.Button;
        private fishBtn:eui.Button;

        protected componentInit():void
        {
            super.componentInit();
            this.bossNotice.visible = false;
            this.byFishPond = new BYFishPond();
            this.contentGroup.addChild(this.byFishPond);
            this.contentGroup.setChildIndex(this.byFishPond, 1);
            this.byFishPond.touchEnabled = false;
            this.byFishPond.touchChildren = false;

            this.canonList = [this.canon1, this.canon2, this.canon3, this.canon4];
            this.bulletMoneyList = [this.bulletMoney1, this.bulletMoney2, this.bulletMoney3, this.bulletMoney4];
            this.playerMoneyList = [this.playerMoney1, this.playerMoney2, this.playerMoney3, this.playerMoney4];

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStage, this);
            this.autoLockBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoLockClick, this);
            this.autoShootBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.autoShootClick, this);
            this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBank, this);
            this.setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSetting, this);
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
            this.fishBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelp, this);
            this.autoLockBtn.name = "autoLockBtn";
            this.autoShootBtn.name = "autoShootBtn";
            this.menuGroup = new MenuGroup(this.menuImg, this.menuContent, "by_arrow_down", "by_arrow_up");
            this.byFishPond.startFishMotion();
        }

        protected onOpen() {
            super.onOpen();
            this.menuGroup.showDeault();
            this.byFishPond.createFishTest();
        }

        protected addToStage():void {
            super.addToStage();
            this.anchorOffsetX = this.stage.stageWidth / 2;
            this.anchorOffsetY = this.stage.stageHeight / 2;
            this.x = this.stage.stageWidth / 2;
            this.y = this.stage.stageHeight / 2;
        }

        private openBank() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.BY);
        }

        private openSetting() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.BY);
        }

        private onBack() {
            RoomRequest.leaveRoom(game.ChildGameType.BY);
        }

        private onHelp() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BY);
        }

        private autoLockClick():void {
            var player:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
            if(player) {
                if(player.shootInfo.isLock()) {
                    player.shootInfo.setLock(false);
                    BYRequest.sendShootAutoInfo(player.shootInfo.shootType,player.recordTargetFishId,player.recordTargetX,player.recordTargetY);
                } else {
                    player.shootInfo.setLock(true);
                    BYRequest.sendShootAutoInfo(player.shootInfo.shootType,player.recordTargetFishId,player.recordTargetX,player.recordTargetY);
                }
            }
        }

        private autoShootClick():void {
            var player:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
            if(player) {
                if(player.shootInfo.isAuto()) {
                    player.shootInfo.setAuto(false);
                    BYRequest.sendShootAutoInfo(player.shootInfo.shootType,player.recordTargetFishId,player.recordTargetX,player.recordTargetY);
                } else {
                    player.shootInfo.setAuto(true);
                    BYRequest.sendShootAutoInfo(player.shootInfo.shootType,player.recordTargetFishId,player.recordTargetX,player.recordTargetY);
                }
            }
        }

        public refreshOper():void {
            var player:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
            if(player) {
                if(player.shootInfo.isAuto()) {
                    this.autoShootBtn.source = "toll_bt_auto_ing";
                } else{
                    this.autoShootBtn.source = "toll_bt_auto";
                } 
                if(player.shootInfo.isLock()) {
                    this.autoLockBtn.source = "toll_bt_lock_ing";
                } else {
                    this.autoLockBtn.source = "toll_bt_lock";
                }
            }
        }

        private onSettingBtnClick():void {
            var settingPanel : SettingPanel = new SettingPanel();
            PopUpManager.addPopUp(settingPanel, true, 0, 0, 1);
        }

        private onBackBtnClick():void {
            if(RoomManager.getInstance().curRoomData.status == GameStatus.RUNNING) {
                BattleLeaveTips.showTips({
                    "text" : "您还在游戏中，是否退出房间",
                    "callback" : (data:any)=>{
                        RoomRequest.leaveRoom(ChildGameType.ZJH);
                    },
                    "callbackObject" : this,
                    "effectType" : 0,
                    "tipsType" : TipsType.OkAndCancel
                });
            } else {
                RoomRequest.leaveRoom(ChildGameType.BY);
            }
            
        }

        private clickStage(e:egret.TouchEvent):void {
            if(e.target instanceof eui.Button 
                || e.target.name == "autoLockBtn" 
                || e.target.name == "autoShootBtn"
                || e.target.name == "subBtn"
                || e.target.name == "addBtn") return;
            var playerInfo:game.by.BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
           /*
            var curCanon:BYCanon = this.canonList[playerInfo.position - 1];
            this.byFishPond.operateCanon = curCanon;
            curCanon.shootToTargetPoint(e.stageX, e.stageY);
            this.byFishPond.operateCanon.curTargetFish = this.byFishPond.getFishByPos(e.stageX, e.stageY);
            */
            var y:number = e.stageY;
            if(this.byFishPond.isFlip) {
                y = Global.designRect.y - e.stageY;
            }
            egret.log("click shoot info ：" + e.stageX + "   " + y);
            let pondPos = this.byFishPond.globalToLocal(e.stageX, y);
            egret.log("send shoot info ：" + pondPos.x + "   " + pondPos.y);
            if(playerInfo.shootInfo) {
                var fish:BYFish|BYFishRing = this.byFishPond.getFishByPos(e.stageX, y);
                if(fish) {
                    egret.log("点击了鱼 ： " + fish.id);
                    if(playerInfo.recordTargetFishId != fish.id) {
                        playerInfo.recordTargetFishId = fish.id;
                        BYRequest.sendShootAutoInfo(playerInfo.shootInfo.shootType,playerInfo.recordTargetFishId,pondPos.x,pondPos.y);
                    }
                } else {
                    if(playerInfo.recordTargetFishId != "") {
                        playerInfo.recordTargetFishId = "";
                        BYRequest.sendShootAutoInfo(playerInfo.shootInfo.shootType,playerInfo.recordTargetFishId,pondPos.x,pondPos.y);
                    }
                }
                if(!playerInfo.shootInfo.isAuto() && !playerInfo.shootInfo.isLock()) {
                    BYRequest.sendShootInfo(pondPos.x, pondPos.y);
                    // 发送消息之后 直接播放捕鱼的动画 不等待服务器回包
                    this.playShootSelf(pondPos.x, pondPos.y)
                    playerInfo.recordTargetX = pondPos.x;
                    playerInfo.recordTargetY = pondPos.y;
                    
                } 
            }
        }

        public onDestroy():void {
            
        }

        private getBulletMoneyByPos(pos:number):BYCoins {
            return this.bulletMoneyList[pos - 1];
        }

        public showPlayers():void {
            let roomData = RoomManager.getInstance().curRoomData;
            for(let player of BYData.instance.players) {
                this.bulletMoneyList[player.position - 1].showCoins(player.playerId, player.curBulletMoney);
                this.playerMoneyList[player.position - 1].showMoney(player.money);
                let playerInfo = roomData.getPlayerInfo(player.playerId);
                if(playerInfo) {
                    this.playerMoneyList[player.position - 1].showName(playerInfo.nickName);
                }
                this.getCanonByPlayerId(player.playerId).bindPlayer(player);
            }
        }

        public playShootSelf(targetX:number, targetY:number) {
            var playerInfo:BYPlayerInfo = BYData.instance.getPlayerInfo(UserService.instance.playerId);
            var canon:BYCanon = this.getCanonByPlayerId(playerInfo.playerId);
            if(playerInfo.money < playerInfo.curBulletMoney) return;
            if(playerInfo.money < game.RoomManager.getInstance().curRoomData.enterMinMoney) return;
            
            // 扣除金钱显示 
            playerInfo.money -= playerInfo.curBulletMoney;
            this.refreshPlayerMoney();
            if(playerInfo.shootInfo.isLock()) {
                var y:number = this.byFishPond.isFlip ? (Global.designRect.y - targetY) : targetY;
                var fish:BYFish|BYFishRing = BYFishPond.instance.getFishById(playerInfo.shootInfo.lockTargetFishId);
                // CommonUtil.log("shoot lock fish  : " + (fish != null ? fish.id : "null"));
                if(!fish || isNaN(fish.x)) {
                    let max = game.by.BYFishPond.instance.getMaxFish();
                    if(max) {
                        playerInfo.shootInfo.lockTargetFishId = max.id;
                        fish = max;
                    }
                } else {
                    let max = game.by.BYFishPond.instance.getMaxFish();
                    if(max != fish && max.fishIndex != fish.fishIndex) {
                        max.attachNotice();
                    }
                }
                if(fish) {
                    canon.shootToTargetPoint(targetX, y, "", fish);
                }
            } else {
                if(canon) {
                    var y:number = this.byFishPond.isFlip ? (Global.designRect.y - targetY) : targetY;
                    canon.shootToTargetPoint(targetX, y, "");
                }
            }
        }

        public playShoot(shootActionData:any):void {
            var shootPlayerId:number = Number(shootActionData.playerId);
            if(shootPlayerId == UserService.instance.playerId) {
                // 自己的捕鱼动画自己播放 不等待服务器通知
                return;
            }
            var playerInfo:BYPlayerInfo = BYData.instance.getPlayerInfo(shootPlayerId);
            var canon:BYCanon = this.getCanonByPlayerId(playerInfo.playerId);
            if(playerInfo.shootInfo.isLock()) {
                var y:number = this.byFishPond.isFlip ? (Global.designRect.y - shootActionData.targetY) : shootActionData.targetY;
                var fish:BYFish|BYFishRing = BYFishPond.instance.getFishById(playerInfo.shootInfo.lockTargetFishId);
                // CommonUtil.log("shoot lock fish  : " + (fish != null ? fish.id : "null"));
                if(!fish || isNaN(fish.x)) {
                    let max = game.by.BYFishPond.instance.getMaxFish();
                    if(max) {
                        playerInfo.shootInfo.lockTargetFishId = max.id;
                        fish = max;
                    }
                } else {
                    let max = game.by.BYFishPond.instance.getMaxFish();
                    if(max != fish && max.fishIndex != fish.fishIndex) {
                        max.attachNotice();
                    }
                }
                if(fish) {
                    canon.shootToTargetPoint(shootActionData.targetX, y, shootActionData.code, fish);
                }
            } else {
                if(canon) {
                    var y:number = this.byFishPond.isFlip ? (Global.designRect.y - shootActionData.targetY) : shootActionData.targetY;
                    canon.shootToTargetPoint(shootActionData.targetX, y, shootActionData.code);
                    egret.log("recv shoot info ：" + shootActionData.targetX + "   " + y);
                }
            }
            
            this.refreshPlayerMoney();
        }

        public setAutoShoot(playerId:number, shootInfo:ShootInfo):void {
            var playerInfo:BYPlayerInfo = BYData.instance.getPlayerInfo(playerId);
            var canon:BYCanon = this.canonList[playerInfo.position - 1];
            if(canon) {
                canon.shootInfo = shootInfo;
            }
        }

        public setBulletMoney(playerId:number, bulletMoney:number):void {
            var playerInfo:BYPlayerInfo = BYData.instance.getPlayerInfo(playerId);
            var bulletCoins:BYCoins = this.bulletMoneyList[playerInfo.position - 1];
            bulletCoins.showCoins(playerInfo.playerId, bulletMoney);
        }

        private hideAllCanon():void {
            for(let canon of this.canonList) {
                canon.visible = false;
                canon.bindPlayerInfo = null;
            }
        }

        private hideAllMoney():void {
            for(let money of this.playerMoneyList) {
                money.visible = false;
            }
        }

        private hideAllBulletMoney():void {
            for(let money of this.bulletMoneyList) {
                money.showWaitting(true);
            }
        }

        public getCanonByPlayerId(playerId:number):BYCanon {
            var pos:number = this.getShowPos(playerId);
            if(pos == -1) return null;
            return this.canonList[pos];
        }

        public getPlayerMoneyByPlayerId(playerId:number):BYMoney {
            var playerInfo:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(playerId);
            return this.playerMoneyList[playerInfo.position - 1];
        }

        private getShowPos(playerId:number):number {
            var self:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
            var isflip:boolean = false;
            if(self && self.position > 2) {
                isflip = true;
            }
            var playerInfo:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(playerId);
            if(playerInfo) {
                var pos:number = playerInfo.position;
                if(isflip) {
                    if(pos == 3) {
                        pos = 2
                    } else if(pos == 4){
                        pos = 1;
                    } else if(pos == 1) {
                        pos = 4;
                    } else {
                        pos = 3;                        
                    }
                }
                return pos - 1;
            }
            return -1;
        }

        public refreshPlayers():void {
            this.hideAllCanon();
            this.hideAllMoney();
            this.hideAllBulletMoney();
            var self:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
            var isflip:boolean = false;
            if(self && self.position > 2) {
                isflip = true;
            }
            this.byFishPond.start(isflip);
            for(let playerInfo of game.by.BYData.instance.players) {
                var canon:BYCanon = this.getCanonByPlayerId(playerInfo.playerId)
                canon.visible = true;
                canon.bindPlayerInfo = playerInfo;
                var playerMoney:BYMoney = this.playerMoneyList[this.getShowPos(playerInfo.playerId)];
                playerMoney.visible = true;
                playerMoney.showMoney(playerInfo.money);
                let p = RoomManager.getInstance().curRoomData.getPlayerInfo(playerInfo.playerId);
                playerMoney.showName(p.nickName);
                var bulletMoney:BYCoins = this.bulletMoneyList[this.getShowPos(playerInfo.playerId)];
                bulletMoney.visible = true;
                bulletMoney.showWaitting(false);
                bulletMoney.showCoins(playerInfo.playerId, playerInfo.curBulletMoney);
                this.getCanonByPlayerId(playerInfo.playerId).bindPlayer(playerInfo);
            }

            this.byFishPond.canonList = this.canonList;
            var player:game.by.BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
        }

        public fishDead(deadInfo:game.by.FishDeadInfo):void {
            var playerInfo:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(deadInfo.killerId);
            var fish:BYFish|BYFishRing = this.byFishPond.getFishById(deadInfo.fishId);
            var canon:BYCanon = this.canonList[playerInfo.position - 1];
            if(fish) {
                // 播放爆炸动画  还有金币动画 然后鱼死亡 最后金币飞到人身上
                let count = Math.floor(deadInfo.addMoney);
                count = Math.min(10, count);
                count = Math.max(1, count);
                BYFlyCoinMng.instance.showCoins(fish.getPos(), canon.getPos(), this, fish, 
                    count, playerInfo.playerId == UserService.instance.playerId, deadInfo);
            }
            
            game.by.BYData.instance.removeFish(deadInfo.fishId);
            // 播放鱼死亡的语音
            game.by.BYSoundPlayer.instance.playDeadVoice();
        }

        private refreshPlayerMoney():void {
            for(let playerInfo of game.by.BYData.instance.players) {
                let playerMoney:BYMoney = this.playerMoneyList[playerInfo.position - 1];
                playerMoney.visible = true;
                playerMoney.showMoney(playerInfo.money);
            }
        }

        public stopAndClear():void {
            this.byFishPond.stop();
            this.hideAllCanon();
            this.hideAllMoney();
            this.hideAllBulletMoney();
        }

        public createFishs():void {
            for(let fishInfo of BYData.instance.fishInfos) {
               this.byFishPond.createFish(fishInfo);
            }
            BYData.instance.fishInfos = [];
        }

        public createFish(fishInfo:FishInfo):void {
            this.byFishPond.createFishImm(fishInfo);
        }

        public switchCanon(playerId:number,cannonId:any):void {
            this.getCanonByPlayerId(playerId).switchCanon(Number(cannonId));
        }

        public showAddMoney(deadInfo:game.by.FishDeadInfo):void {
            let playermoney = game.by.BYData.instance.getPlayerInfo(Number(deadInfo.killerId));
            this.getPlayerMoneyByPlayerId(deadInfo.killerId).showAddMoney(deadInfo.addMoney, playermoney.money);
        }

        public resumeApp(pass:number):void {
            this.byFishPond.setPass(pass);
        }

        public showBossNotice():void {
            if(this.boosNoticeStartTime > 0) return;
            this.bossNotice.visible = true;
            this.bossNoticeShox.alpha = 1;
            this.boosNoticeStartTime = egret.getTimer();
            BYSoundPlayer.instance.playSound(BYSoundType.WARNING);
            egret.startTick(this.updateBossNotice, this);
        }

        public stopAuto():void {
            var player:BYPlayerInfo = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
            if(player && player.shootInfo.isAuto()) {
                player.shootInfo.setAuto(false);
            }
            if(player && player.shootInfo.isLock()) {
                player.shootInfo.setLock(false);
            }
            this.refreshOper();
        }

        private updateBossNotice(timestamp:number):boolean {
            if(timestamp - this.boosNoticeStartTime > 6000) {
                // 结束
                egret.stopTick(this.updateBossNotice, this);
                this.bossNotice.visible = false;
                this.boosNoticeStartTime = 0;
            } else {
                var t:number = ((timestamp - this.boosNoticeStartTime) % 500 / 500);
                var a:number = Math.floor((timestamp - this.boosNoticeStartTime) / 500);
                if(a % 2 == 0) {
                    this.bossNoticeShox.alpha = t;
                } else {
                    this.bossNoticeShox.alpha = 1- t;
                }
            }
            return false;
        }
    }
}