/**
  * 请求房间信息例子
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module ZJHRequest {
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("ThreePoker_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }

    export function Follow(type:number, betValue:number):void {
        let level:number = game.RoomManager.getInstance().curRoomData.gameLevel;
        let bValue = (level == 0 ? 2 : level) * 100 + betValue;
        var clazz = getMessage("OPBets");
        var obj = new clazz({
            "type" : type,
            "singleBet" : bValue
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_THREE_BETS, bytes)
    }

    export function discard() :void {
        var clazz = getMessage("OPDiscardCard");
        var obj = new clazz({
            "version" : "1"
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_THREE_DISCARDCARD, bytes)
    }

    export function look():void {
        var clazz = getMessage("OPLookCard");
        var obj = new clazz({
            "version" : "1"
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_THREE_LOOK_CARD, bytes)
    }

    export function comparisonCard(targetId:number) : void {
        var clazz = getMessage("OPComparisonCard");
        var obj = new clazz({
            "targetId" : targetId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_THREE_COMPARISON_CARD, bytes)

        game.zjh.ZJHSoundPlayer.instance.playSound(game.UserService.instance.playerId, game.zjh.ZJHSoundType.COMP);
    }

    export function alwaysFollow(isAlwaysFollow:boolean) :void {
        var clazz = getMessage("OPAlwaysSet");
        var obj = new clazz({
            "value" : isAlwaysFollow
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_THREE_ALWAYSSET, bytes)
        
    }

    export function brightCards():void{
        var clazz = getMessage("OPBrightCard");
        var obj = new clazz({
            "version" : "1"
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_THREE_BRIGHT_CARD, bytes);     
    }
}
