module BjlRequest 
{
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Baccara_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function SendBets(type , value):void {
        var clazz = getMessage("OPBaccaraStake");
        var obj = new clazz({
            "type" : type,
            "value" : value * 1000
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BJL_STAKE, bytes)
    }


    export function requestRoomList(gameType:number):void {
        var clazz = getMessage("OPBaccaraList");
        var obj = new clazz({
            "gameType" : gameType
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BJL_ROOMLIST, bytes);
    }

    export function requestSingleRoom(roomId:number):void {
        var clazz = getMessage("OPBaccaraSingle");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BJL_SINGLEROOM, bytes);
    }

    export function applyPlayerBank(type:number):void {
        var clazz = getMessage("OpBaccaraUpBanker");
        var obj = new clazz({
            "type" : type
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BACCARA_UP_BANKER, bytes);
    }

    export function requestPlayerRank() {
        var clazz = getMessage("OPBaccaraPlayerRank");
        var obj = new clazz({
            "version" : 1
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BJL_PLAYERRANK, bytes);
    }

    export function downPlayerBank():void {
        var clazz = getMessage("OpBaccaraDownBanker");
        var obj = new clazz({
            "version" : 1
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BACCARA_DOWN_BANKER, bytes);
    }

    export function requestFirstEnterRoom(roomId : number)
    {
        var clazz = getMessage("OpBaccaraFirstRoom");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BJL_FIRST_ROOM_PUSH, bytes);
    }

    export function requestOPWinFail(version:number):void {
        var clazz = getMessage("OPBaccaraWinFail");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BJL_HISTORY, bytes);
    }

}