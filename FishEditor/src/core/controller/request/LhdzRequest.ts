module LhdzRequest {

    export var message: any;

    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("DragonTiger_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function SendBets(type, value): void {
        var clazz = getMessage("OPLhuStake");
        var obj = new clazz({
            "type": type,
            "value": value * 1000
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_STAKE, bytes)
    }


    export function requestPlayerBank(version: number): void {
        var clazz = getMessage("OPLhuPlayerRank");
        var obj = new clazz({
            "version": version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_PLAYERRANK, bytes);
    }


    export function requestOPWinFail(version: number): void {
        var clazz = getMessage("OPLhuWinFail");
        var obj = new clazz({
            "version": version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_HISTORY, bytes);
    }


    export function requestFirstEnterRoom(roomId: number) {
        var clazz = getMessage("OpLhuFirstRoom");
        var obj = new clazz({
            "roomId": roomId
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_FIRSTROOM, bytes);
    }


    export function requestSingleRoom(roomId: number): void {
        var clazz = getMessage("OPLhuSingle");
        var obj = new clazz({
            "roomId": roomId
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_ROOM_SINGLE, bytes);
    }

    export function requestRoomList(gameType: number): void {
        var clazz = getMessage("OPLhuList");
        var obj = new clazz({
            "gameType": gameType
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_ROOM_LIST, bytes);
    }

    export function requestUpBanke(type: number): void {
        var clazz = getMessage("OpLhuUpBanker");
        var obj = new clazz({
            "type": type
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_UP_BANKER, bytes);
    }

    export function requestDownBanke(version: number): void {
        var clazz = getMessage("OpLhuDownBanker");
        var obj = new clazz({
            "version": version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_DOWN_BANKER, bytes);
    }

}