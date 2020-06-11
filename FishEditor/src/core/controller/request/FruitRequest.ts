/**
  * 水果机request
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module FruitRequest {
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Fruits_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);

    }

    export function reqAllRoomPoolMoney() {
        var clazz = getMessage("OPFruitsRoomPoolMoney");
        var obj = new clazz({
            "version" : "0"
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FRUITS_ALL_ROOM_POOL, bytes)
    }

    export function reqSetMoney(money:number):void {
         var clazz = getMessage("OPFruitsSetMoney");
        var obj = new clazz({
            "money" : money
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FRUITS_SET_MONEY, bytes)
    }

    export function reqStartGame():void {
         var clazz = getMessage("OPFruitsStartGame");
        var obj = new clazz({
            "version" : "1"
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FRUITS_START_GAME, bytes)
    }

    export function reqSetLine(line:number):void {
        var clazz = getMessage("OPFruitsSetLine");
        var obj = new clazz({
            "lineCount" : line
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FRUITS_SET_LINE, bytes)
    }

    export function reqRoomInfo():void {
        var clazz = getMessage("OPFruitsRoomInfo");
        var obj = new clazz({
            "version" : "1"
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FRUITS_GET_ROOM, bytes)

    }
}
