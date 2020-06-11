/**
  * 跑得快请求协议
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module DDZRequest {
    export var message;

    export function getMessage(name: string): any {
        if (message == null) {
            //初始ki化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("DdzPoker_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        var value: any = this.getMessage(name);
        return value.decode(data.buffer);
    }

    export function callScore(score:number):void {
        var clazz = getMessage("OPDdzCallScore");
        var obj = new clazz({
            "score" : score
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DDZ_CALL_SCORE, bytes)
    }

    export function callDouble(multi:number):void {
        var clazz = getMessage("OPDdzDouble");
        var obj = new clazz({
            "multiple" : multi
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DDZ_DOUBLE, bytes)
    }

    export function playStep(isDont:boolean, cards:Array<number>):void {
        var clazz = getMessage("OpDdzBattleStep");
        var obj = new clazz({
            "isDont" : isDont,
            "cards" : cards,
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DDZ_STEP_BATTLE, bytes)
        game.ddz.DDZBattleData.getInstance().clearLastTip();
    }
    
    export function reqMultiInfo() {
        var clazz = getMessage("OPDdzMultipleDetail");
        var obj = new clazz({
            "version" : 1
        })
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_DDZ_REQ_MULTI, bytes)
    }

}
