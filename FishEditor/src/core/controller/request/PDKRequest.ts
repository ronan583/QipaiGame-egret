/**
  * 跑得快请求协议
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module PDKRequest {
    export var message;

    export function getMessage(name: string): any {
        if (message == null) {
            //初始ki化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("PdkPoker_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        var value: any = this.getMessage(name);
        return value.decode(data.buffer);
    }

    export function playStep(isDont:boolean, cards:Array<number>):void {
        var clazz = getMessage("OpPdkBattleStep");
        var obj = new clazz({
            "isDont" : isDont,
            "cards" : cards,
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_PDK_STEP_BATTLE, bytes)

        game.pdk.PDKBattleData.getInstance().clearLastTip();
    }
    
}
