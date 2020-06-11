module TgpdRequest 
{
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Candy_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }


    export function enterGame(gameLevel):void {
        var clazz = getMessage("OPCandyEnterGame");
        var obj = new clazz({
            "gameLevel" : gameLevel
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TGPD_ENTERGAME, bytes)
    }


    export function requestSetStake(money:number):void {
        var clazz = getMessage("OPCandyStake");
        var obj = new clazz({
            "money" : money
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TGPD_STAKE, bytes);
    }

    export function requestSetLine(value:number):void {
        var clazz = getMessage("OPCandyLine");
        var obj = new clazz({
            "value" : value
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TGPD_LINE, bytes);
    }

    export function requestStartGame(version:number):void {
        var clazz = getMessage("OPCandyStartGame");
        var obj = new clazz({
            "version" : version.toFixed(0)
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TGPD_STARTGAME, bytes);
    }

    export function requestExitGame(isSave:boolean):void {
        var clazz = getMessage("OPCandyExitGame");
        var obj = new clazz({
            "isSave" : isSave
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_TGPD_EXIT, bytes);
    }


}