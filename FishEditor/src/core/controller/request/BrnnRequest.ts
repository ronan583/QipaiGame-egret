module BrnnRequest {
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("BaiRenNiu_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function SendBets(type , value):void {
        var clazz = getMessage("OPBrenStake");
        var obj = new clazz({
            "type" : type,
            "value" : value * 1000
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_BRENSTAKE, bytes)
    }


    export function sendApplyBanker(type:number):void {
        var clazz = getMessage("OpBrenUpBanker");
        var obj = new clazz({
            "type" : type
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_APLLYBANKER, bytes);
    }

    export function sendDownBanker():void {
        var clazz = getMessage("OpBrenDownBanker");
        var obj = new clazz({
            "version" : 1
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_DOWNBANKER, bytes);
    }

    export function requestPlayerBank(version:number):void {
        var clazz = getMessage("OPBrenPlayerRank");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_PLAYERRANK, bytes);
    }

    
    export function requestRoomList(gameType:number):void {
        var clazz = getMessage("OPBrenList");
        var obj = new clazz({
            "gameType" : gameType
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_ROOMLIST, bytes);
    }

    export function requestSingleRoom(roomId:number):void {
        var clazz = getMessage("OPBrenSingle");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_SINGLE, bytes);
    }

    export function requestOPWinFail(version:number):void {
        var clazz = getMessage("OPWinFail");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_HISTORY, bytes);
    }
    
    export function requestFirstEnterRoom(roomId : number)
    {
        var clazz = getMessage("OpBrenFirstRoom");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FIRST_ROOM_PUSH, bytes);
    }
    export function requestApplyDownBanker(version:number):void {
        var clazz = getMessage("OPBrenApplyDownBanker");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BRNN_DOWNBANKER, bytes);
    }
}