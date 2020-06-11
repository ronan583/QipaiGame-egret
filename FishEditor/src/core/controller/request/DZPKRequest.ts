/**
  * 请求房间信息例子
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module DZPKRequest {
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("TexasPoker_proto"));
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
            "singleBet" : bValue * 1000
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_THREE_BETS, bytes)
    }

    export function stake(stakeType: number, stakeMoney:number = 0) :void {
        var clazz = getMessage("OPTexasStep");
        var obj = new clazz({
            "stakeType" : stakeType,
            "stakeMoney" : stakeMoney * 1000
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TEXASPOKER_STEP, bytes)
    }

    export function autoset(type:number):void {
        var clazz = getMessage("OPTexasStepSet");
        var obj = new clazz({
            "type" : type
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TEXASPOKER_AUTOSET, bytes)
    }

    
}
