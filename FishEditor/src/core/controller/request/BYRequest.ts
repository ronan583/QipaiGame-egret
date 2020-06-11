/**
  * 捕鱼request
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module BYRequest {
    export var message: any;
    export var sendOutList:Array<string> = [];
    export var moneyTips:TipsUI;
    export var OpFishesBattleStep_clazz:any;
    var sendCount:number = 0;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Fishes_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }

    export function sendShootInfo(targetX:number, targetY:number) {
        let player = game.by.BYData.instance.getPlayerInfo(game.UserService.instance.playerId);
        if(player.money < game.RoomManager.getInstance().curRoomData.enterMinMoney) {            
            game.AppFacade.getInstance().sendNotification(PanelNotify.MOENY_NOT_ENOUGH);
            if(this.moneyTips == null) {
                this.moneyTips = TipsUI.showTips({
                    "text":"当前房间需要" + (game.RoomManager.getInstance().curRoomData.enterMinMoney).toFixed(0) + "元才可进入，是否立刻充值？",
                    "callback":this.showCharge,
                    "callbackObject":this,
                    "okBitmapLabelPath":"btn_charge_quick",
                    "tipsType":TipsType.OkAndCancel,
                    "effectType":0
                })
            } else if(!this.moneyTips.stage){
                this.moneyTips.message = "当前房间需要" + game.RoomManager.getInstance().curRoomData.enterMinMoney.toFixed(0) + "元才可进入，是否立刻充值？"
                this.moneyTips.UpdatePanel();
                TipsUI.showTipsByInstance(this.moneyTips);
            }
            return ;
        }
        if(!this.OpFishesBattleStep_clazz) {
            var clazz = getMessage("OpFishesBattleStep");
            this.OpFishesBattleStep_clazz = new clazz({
                "targetX" : targetX,
                "targetY" : targetY
            })
        }
        this.OpFishesBattleStep_clazz.targetX = targetX;
        this.OpFishesBattleStep_clazz.targetY = targetY;
        var bytes = this.OpFishesBattleStep_clazz.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FISHES_BATTLE_STEP, bytes)
        sendCount++;
        // console.log("sendcount : " + sendCount);
    }

    export function sendShootHitInfo(fishId:string , uuid:string, code:string ) {
        var clazz = getMessage("OpFishesBattleHit");
        var obj = new clazz({
            "fishId" : fishId,
            "uuid": uuid,
            "code": code
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FISHES_BATTLE_HIT, bytes)
    }

    export function sendBulletMoney(bulletMoney:number) {
        var clazz = getMessage("OpFishesSetBulletMoney");
        var obj = new clazz({
            "bulletMoney" : bulletMoney
        })
        console.log("byyyyyyyyyyyyyyy bullet : " + bulletMoney);
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FISHES_SET_MONEY, bytes)
    }

    export function sendShootAutoInfo(shootType:number, lockFishId:string, targetX:number, targetY:number) {
        var clazz = getMessage("OpFishesShootInfo");
        var obj = new clazz({
            "curShootType" : shootType,
            "curLockTargetFishId" : lockFishId,
            "curShootTargetX" : targetX,
            "curShootTargetY" : targetY
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FISHES_CHANGE_SHOOT, bytes)
    }
    
    export function sendFishOut(fishId:string) {
        if(game.UserService.instance.playerId != game.by.BYData.instance.getFirstPlayer()) return;
        if(this.sendOutList.length >= 10) {
            var clazz = getMessage("OpFishesOut");
            var obj = new clazz({
                "id" : this.sendOutList
            })
            var bytes = obj.toArrayBuffer();
            SocketManager.sendMessage(ProtocolConstant.OPCODE_FISHES_OUT, bytes)
            this.sendOutList = [];
        } else {
            this.sendOutList.push(fishId);
        }
    }

    export function changeCanon(canonIndex:number):void {
        var clazz = getMessage("OpChangeCannon");
        var obj = new clazz({
            "cannonId" : canonIndex.toFixed(0)
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FISHES_CHANGE_CANON, bytes)
    }
}
