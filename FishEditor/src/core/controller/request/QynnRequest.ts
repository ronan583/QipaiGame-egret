module QynnRequest {
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("RobNiuNiu_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function SendRobBanker(multiple:number):void {
        var clazz = getMessage("OPRobBanker");
        var obj = new clazz({
            "multiple" : multiple
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_QYNN_ROBBANKER, bytes)
    }

    export function SendBets(multiple:number):void {
        var clazz = getMessage("OPRobStake");
        var obj = new clazz({
            "bets" : multiple
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_QYNN_ROBSTAKE, bytes)
    }


    export function SendLookCar(version:number):void {
        var clazz = getMessage("OPRobLookCard");
        var obj = new clazz({
            "version" : version
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_QYNN_ROBLOOKCARD, bytes)
    }

    export function requestFirstEnterRoom(gameLevel)
    {
        var clazz = getMessage("OPReconnectAndGuan");
        var obj = new clazz({
            "gameLevel" : gameLevel
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_QYNN_FIRSTROOM, bytes);
    }

}