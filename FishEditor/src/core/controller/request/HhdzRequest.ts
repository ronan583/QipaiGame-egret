module HhdzRequest 
{
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("RedBlack_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function SendBets(type:number , value:number):void {
        var clazz = getMessage("OPRedBlackStake");
        var obj = new clazz({
            "type" : type,
            "value" : value * 1000
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_HHDZ_STAKE, bytes)
    }


    export function requestPlayerBank(version:number):void {
        var clazz = getMessage("OPRedBlackPlayerRank");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_HHDZ_PLAYERRANK, bytes);
    }


    export function requestOPWinFail(version:number):void {
        var clazz = getMessage("OPRedBlackWinFail");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_HHDZ_HISTORY, bytes);
    }

    
    export function requestFirstEnterRoom(roomId : number)
    {
        var clazz = getMessage("OpRedBlackFirstRoom");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_HHDZ_FIRSTROOM, bytes);
    }


    export function requestSingleRoom(roomId:number):void {
        var clazz = getMessage("OPRedBlackSingle");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_HHDZ_ROOM_SINGLE, bytes);
    }
    
    export function requestRoomList(gameType:number):void {
        var clazz = getMessage("OPRedBlackList");
        var obj = new clazz({
            "gameType" : gameType
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_HHDZ_ROOM_LIST, bytes);
    }

    export function sendApplyBanker() {
        var clazz = getMessage("OpRedBlackUpBanker");
        var obj = new clazz({
            "type" : 1
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_REDBLACK_UP_BANKER, bytes);   
    }

    export function sendDownBanker() {
        var clazz = getMessage("OpRedBlackDownBanker");
        var obj = new clazz({
            "version" : 1
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_REDBLACK_DOWN_BANKER, bytes);   
    }
}