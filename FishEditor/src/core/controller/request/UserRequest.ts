/**
  * 请求用户信息例子
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */

module UserRequest {
    export var message: any;

    export function getMessage(name: string): any {
        if (message == null) {
            //初始化template_proto
            message = dcodeIO.ProtoBuf.loadProto(RES.getRes("User_proto"));
        }
        return message.build(name);
    }

    export function getReceiveData(name: string, data: any): any {
        //创建user_login_class
        var value = getMessage(name);
        return value.decode(data.buffer);

    }

    //游客登陆
    export function sendGuestLogin(macAddress: string, oss: string, platform: string): void {
        var clazz = getMessage("OPLogin");
        var obj = new clazz({
            "type": 1,
            "macAddress": macAddress,
            "os": oss,
            "ip": UserService.instance.clientIp,
            "platform": Global.platform
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_PLAYER_LOGIN, bytes)
        egret.log("发送游客登录:" + UserService.instance.lat + "  " + UserService.instance.lng)
        this.sendGpsInfo()
    }

    //账号登陆
    export function sendAccountLogin(userAccount: string, password: string, macAddress: string, oss: string, platform: string): void {
        var clazz = getMessage("OPLogin");
        var obj = new clazz({
            "type": 2,
            "macAddress": macAddress,
            "userAccount": userAccount,
            "password": password,
            "os": oss,
            "ip": UserService.instance.clientIp,
            "platform": Global.platform
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_PLAYER_LOGIN, bytes)
        egret.log("发送账号登录:" + UserService.instance.lat + "  " + UserService.instance.lng)
        this.sendGpsInfo()

    }

    export function sendRegisterAccount(mobile: string, code: string, password: string): void {
        var clazz = getMessage("OPRegisterAccount");
        var obj = new clazz({
            "mobile": mobile,
            "code": code,
            "password": password,
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_REGISTER_ACCOUNT, bytes)

    }

    export function sendGetCode(mobile: string, type: number) {
        var clazz = getMessage("OPGetCode");
        var obj = new clazz({
            "mobile": mobile,
            "type": type
        });

        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_GET_CODE, bytes)
    }


    export function sendUpateHead(type: number, iconIndex: number) {
        var clazz = getMessage("OPUpateHead");
        var obj = new clazz({
            "type": type,
            "number": iconIndex
        });

        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_UPATE_HEAD, bytes)
    }


    export function sendUpateNickName(nickName: string) {
        var clazz = getMessage("OPUpateNickName");
        var obj = new clazz({
            "nickName": nickName
        });

        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_UPATE_NICK_NAME, bytes)
    }


    export function sendUpatePassword(mobile: string, password: string, code: string) {
        var clazz = getMessage("OPPassword");
        var obj = new clazz({
            "mobile": mobile,
            "password": password,
            "code": code
        });

        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_UPATE_PASSWORD, bytes)
    }

    export function sendOperatorMoney(type: number, money: number) {
        var clazz = getMessage("OPBankMoney");
        var obj = new clazz({
            "type": type,
            "money": money * 1000
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_OPERATOR_MONEY, bytes)
    }


    export function sendHeartbeat(): void {
        var clazz = getMessage("OPHeartbeat");
        var obj = new clazz({
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_HEART_BEAT, bytes)
    }

    export function sendNoticeList(): void {
        var clazz = getMessage("OPNoticeList");
        var obj = new clazz({
            "version": "1"
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_NOTICE_LIST, bytes)
    }
    export function sendNoticeDetail(id: number): void {
        var clazz = getMessage("OPNoticeDetail");
        var obj = new clazz({
            "id": id
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_NOTICE_DETAIL, bytes)
    }

    export function sendKefuInfo(info: string): void {
        var clazz = getMessage("OPCustomerService");
        var obj = new clazz({
            "info": info
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_CUSTOMER_SERVICE, bytes)
    }

    export function sendRanking(type: number): void {
        var clazz = getMessage("OPRanking");
        var obj = new clazz({
            "type": type
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_RANKING, bytes)
    }

    export function sendBindBank(type: number, account: string, name: string): void {
        var clazz = getMessage("OPSetUpBank");
        var obj = new clazz({
            "type": type,
            "account": account,
            "name": name
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_SETUP_BANK, bytes)
    }

    export function sendExchange(type: number, money: number): void {
        var clazz = getMessage("OPExchange");
        var obj = new clazz({
            "type": type,
            "money": money * 1000
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_EXCHANGE_MONEY, bytes)
    }

    export function sendExchangeRecord(page: number): void {
        var clazz = getMessage("OPExchangeRecord");
        var obj = new clazz({
            "page": page
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_EXCHANGE_RECORD, bytes)
    }

    export function sendGpsInfo() {
        if (UserService.instance.clientIp == "") return;
        var clazz = getMessage("OPUpdateGpsInfo");
        var obj = new clazz({
            "latitude": "",
            "longitude": "",
            "ip": UserService.instance.clientIp
        });
        var bytes = obj.toArrayBuffer();
        SocketManager.sendMessage(ProtocolConstant.OPCODE_UPDATE_GPS_INFO, bytes)
    }

}
