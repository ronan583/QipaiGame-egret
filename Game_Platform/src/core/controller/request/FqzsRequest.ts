module FqzsRequest {

    export var message: any;

    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("BirAndBea_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }

    export function SendBets(type, value): void {
        var clazz = getMessage("OPBirAndBeaRoomStake");
        var obj = new clazz({
            "type": type,
            "value": value * 1000
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FQZS_STAKE, bytes)
    }

    export function requestPlayerBank(version: number): void {
        var clazz = getMessage("OPBirAndBeaPlayerRank");
        var obj = new clazz({
            "version": version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FQZS_PLAYERRANK, bytes);
    }

    export function requestRoundInfo(version: number): void {
        var clazz = getMessage("OPBirAndBeaRoundInfo");
        var obj = new clazz({
            "version": version
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FQZS_HISTORY, bytes);
    }

    export function requestUpBanker(type: number): void {
        var clazz = getMessage("OpBirAndBeaUpBanker");
        var obj = new clazz({
            "type": type
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FQZS_UPBANKER, bytes);
    }

    export function requestDownBanker(): void {
        var clazz = getMessage("OpBirAndBeaDownBanker");
        var obj = new clazz({
            "version": 1
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_FQZS_DOWNBANKER, bytes);
    }

    export function requestRoomList(gameType: number): void {
        // var clazz = getMessage("OPLhuList");
        // var obj = new clazz({
        //     "gameType": gameType
        // })
        // var bytes = obj.toArrayBuffer();
        // SocketManager.sendMessage(ProtocolConstant.OPCODE_LHDZ_ROOM_LIST, bytes);
    }

}