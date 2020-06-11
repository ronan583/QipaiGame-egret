module TbRequest {
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("DiceBao_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function SendBets(type , value):void {
        var clazz = getMessage("OPDiceBaoStake");
        var obj = new clazz({
            "type" : type,
            "value" : value * 1000
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_STAKE, bytes)
    }


    export function requestPlayerBank(version:number):void {
        var clazz = getMessage("OPDiceBaoPlayerRank");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_PLAYER_RANK, bytes);
    }

    
    export function requestRoomList(gameType:number):void {
        var clazz = getMessage("OPDiceBaoList");
        var obj = new clazz({
            "gameType" : gameType
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_ROOM_LIST, bytes);
    }

    export function requestSingleRoom(roomId:number):void {
        var clazz = getMessage("OPDiceBaoSingle");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_ROOM_SINGLE, bytes);
    }

    export function requestOPWinFail(version:number):void {
        var clazz = getMessage("OPWinFail");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_WIN_FAIL, bytes);
    }
    
    export function requestFirstEnterRoom(roomId : number)
    {
        var clazz = getMessage("OpDiceBaoFirstRoom");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_FIRST_ROOM_PUSH, bytes);
    }

    export function requestContinue()
    {
        var clazz = getMessage("OpDiceContinueStake");
        var obj = new clazz({
            "version" : 0
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_CONTINUE_STAKE, bytes);
    }
    
    export function sendApplyBanker(type:number):void {
        var clazz = getMessage("OpDiceBaoUpBanker");
        var obj = new clazz({
            "type" : type
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_UP_BANKER, bytes);
    }

    
    export function sendDownBanker(version:number):void {
        var clazz = getMessage("OpDiceBaoDownBanker");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DICEBAO_DOWN_BANKER, bytes);
    }

}