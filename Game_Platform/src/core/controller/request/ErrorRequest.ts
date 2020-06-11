/**
  * 跑得快请求协议
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module ErrorRequest {
    export var message;

    export function getMessage(name: string): any {
        if (message == null) {
            //初始ki化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("ErrorCode_proto"));
        }
        return message.build(name);
    }
    export function getReceiveData(name: string, data: any): any {
        var value: any = this.getMessage(name);
        return value.decode(data.buffer);
    }

    export function sendErrorInfo(name:string,type:string,msg:string):void {
        var clazz = getMessage("OPErrorUpload");
        var obj = new clazz({
            "name" : name,
            "type" : type,
            "errorMsg" : SocketManager.lastSendId + "  " + msg
        })
         var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.ERROR_INFO_UPLOAD, bytes)
    }
}
