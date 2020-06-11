module BcbmRequest {
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("BenzBmw_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function SendBets(type , value):void {
        var clazz = getMessage("OPBenzBmwStake");
        var obj = new clazz({
            "type" : type,
            "value" : value * 1000
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BENZBMW_STAKE, bytes)
    }


    //请求在线人数
    export function requestOnlinePlayer(version:number):void {
        var clazz = getMessage("OPBenzBmwPlayerRank");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BENZBMW_PLAYER_RANK, bytes);
    }


    export function requestOPWinFail(version:number):void {
        var clazz = getMessage("OPBenzBmwRoundInfo");
        var obj = new clazz({
            "version" : version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BENZBMW_WIN_FAIL, bytes);
    }

    export function requestUpBanker(version:number):void {
        var clazz = getMessage("OpBenzBmwUpBanker");
        var obj = new clazz({
            "version" : version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BENZBMW_UP_BANKER, bytes);
    }  

    export function requestDownBanker(version:number):void {
        var clazz = getMessage("OpBenzBmwDownBanker");
        var obj = new clazz({
            "version" : version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_BENZBMW_DOWN_BANKER, bytes);
    }      


    export function requestFirstEnterRoom(roomId : number)
    {
        var clazz = getMessage("OpBenzBmwFirstRoom");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_FIRSTROOM, bytes);
    }


    export function requestSingleRoom(roomId:number):void {
        var clazz = getMessage("OPLhuSingle");
        var obj = new clazz({
            "roomId" : roomId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_ROOM_SINGLE, bytes);
    }
    
    export function requestRoomList(gameType:number):void {
        var clazz = getMessage("OPLhuList");
        var obj = new clazz({
            "gameType" : gameType
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_ROOM_LIST, bytes);
    }

}