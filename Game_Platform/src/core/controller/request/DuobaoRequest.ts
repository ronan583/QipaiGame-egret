/**
  * 请求房间信息例子
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module DuobaoRequest {
    export var message: any;

    export var isTrusteeship:boolean;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Treasure_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);

    }

    export function sendEnterGame(gamelevel:number) {
        var clazz = getMessage("OPTreasureEnterGame");
        var obj = new clazz({
            "gameLevel" : gamelevel
        })
         var bytes = obj.toArrayBuffer();
        game.duobao.DuobaoData.instance.gameLevel = gamelevel;
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TREASURE_ENTER_GAME, bytes)
    }

    export function sendBetValue(betValue:number) {
        var clazz = getMessage("OPTreasureStake");
        var obj = new clazz({
            "money" : betValue
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TREASURE_SET_STAKE, bytes)
    }

    export function sendLineValue(lineValue:number){
        var clazz = getMessage("OPTreasureLine");
        var obj = new clazz({
            "value" : lineValue
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TREASURE_SET_LINE, bytes)
    }

    export function sendStartGame():void {
        var clazz = getMessage("OPTreasureStartGame");
        var obj = new clazz({
            "version" : "1"
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TREASURE_START_GAME, bytes)
    }

    
    export function sendExit(isSave:boolean):void {
        var clazz = getMessage("OPTreasureExitGame");
        var obj = new clazz({
            "isSave" : isSave
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TREASURE_EXIT_GAME, bytes)
    }
    

}
