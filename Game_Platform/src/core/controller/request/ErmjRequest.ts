module ErmjRequest 
{
	
    export var message: any;
    
    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Mahjong_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);
    }

    export function SendBattleStep(playType : number , cards:number[]):void {
        var clazz = getMessage("OPMahjongBattleStep");
        var obj = new clazz({
            "playType" : playType,
            "cards" : cards
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_ERMJ_PLAYBATTLE, bytes)
    }
}