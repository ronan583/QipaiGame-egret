/**
  * 跑胡子请求协议
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module PlayerRequest {
    export var message: any;

    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("Player_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);

    }
    export function sendLogin(): void {
        //OPCreateRoom_class
        var OPBeardBattleStep_class = getMessage("OPLogin");

        //创建一条消息
        var play = new OPBeardBattleStep_class({
            "puid": "1111",
            "platform": "1111",
            "version": "1111",
            "deviceId": "11"
        });

        //序列化
        var bytes = play.toArrayBuffer();
    }
}
