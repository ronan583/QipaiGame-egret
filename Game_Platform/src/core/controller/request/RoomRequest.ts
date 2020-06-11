/**
  * 请求房间信息例子
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module RoomRequest {
    export var message: any;

    export var isTrusteeship:boolean;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Room_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);

    }

    export function sendEnterRoomInfo(type:game.ChildGameType, gamelevel:number) {
        var clazz = getMessage("OPEnterRoom");
        var obj = new clazz({
            "gameType" : type,
            "gameLevel" : gamelevel
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_ENTER_ROOM, bytes)

        game.QuickStart.instance.recordQuickStartData(type, gamelevel);
    }

    export function leaveRoom(type:game.ChildGameType):void {
        var clazz = getMessage("OPExitRoom");
        var obj = new clazz({
            "gameType" : type
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_ROOM_EXIT, bytes)
    }

    export function trusteeship(type:game.ChildGameType , isTrusteeship):void {
        this.isTrusteeship = isTrusteeship;
        var clazz = getMessage("OPTrusteeship");
        var obj = new clazz({
            "gameType" : type,
            "isTrusteeship" : isTrusteeship
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TRUSTEESHIP, bytes)
    }

    export function reqPlayerInfo(targetPlayerId:number):void {
        var clazz = getMessage("OPSeeHead");
        var obj = new clazz({
            "targetPlayerId" : targetPlayerId
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_SEE_HEAD, bytes)
    }
    //
    export function reqZJCXInfo(gameType:number):void {
        var clazz = getMessage("OPRoomRecord");
        var obj = new clazz({
            "gameType" : gameType
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_ZJCX_RECORD, bytes)
    }

    export function sendBankerList(gameType:number, gameLevel:number) {
        var clazz = getMessage("OPRoomBankerList");
        var obj = new clazz({
            "gameType" : gameType,
            "gameLevel" : gameLevel,
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_ROOM_BANKER_LIST, bytes)
    }

    //true 准备  false 取消准备
    export function sendBeady(isReady: boolean, gameType: number) {
        var clazz = getMessage("OPRoomReady");
        var obj = new clazz({
            "isReady": isReady,
            "gameType": gameType,
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_ROOM_READY, bytes)
    }


    //玩家历史记录查询
    export function sendPlayerRecord(gameType: number){
        var clazz = getMessage("OpRoomPlayerRecordInfo");
        var obj = new clazz({
            "gameType": gameType
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_ROOM_PLAYER_RECORD, bytes)        
    }
    export function reqGameRule(gameType:number = 0) {
        var clazz = getMessage("OPRoomMoneyRule");
        var obj = new clazz({
            "gameType": gameType
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_REQ_GAME_RULE, bytes)

    }
}
