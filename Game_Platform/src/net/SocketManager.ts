/**
 * 网络公共类
 * by dily
 * (c) copyright 2014 - 2035
 * All Rights Reserved. 
 * 存放网络公共方法 
 * 注意：是同步请求，不是异步
 */
module SocketManager {

    var socket: game.SocketProxy;
    var failCount: number = 0;
    var sendBuff: egret.ByteArray = new egret.ByteArray();

    export var lastSendId: number = 0;
    export var needDropData:boolean = false;
    export var serverTimestampDelta:number = 0;
    //连接服务器
    export function connectServer(host: string = "", port: number = 80) {
        if (this.socket != null && this.socket.connected) {
            return;
        }
        this.socket = this.createSocket();
        egret.log("this.socket.connect");
        if (Global.isWss) {
            // this.socket.connectByUrl("wss://g-api.xsaqzf.com");
            let serverUrl: string = game.GameServerInfo.instance.getCurApi();
            this.socket.connectByUrl(serverUrl);
            egret.log("through connectServer " + serverUrl);
        } else {
            this.socket.connect(host, port);
        }
    }

    export function close() {
        if(this.socket) {
            this.socket.close();
        }
    }

    export function createSocket() {
        let socket = new game.SocketProxy();
        socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        socket.addEventListener(game.SocketProxy.CONNECT_TIMEOUT, this.onSocketTimeout, this);
        return socket;
    }

    export function onSocketTimeout() {
        TipsUI.showTips({
            "text": "网络连接有点小故障，请重新连接",
            "callback": (data: any) => {
                egret.log("onSocketTimeout  createSocket");
                if (this.socket) { this.socket.dispose() }
                this.socket = this.createSocket();
                if (Global.isWss) {
                    // this.socket.connectByUrl("wss://g-api.xsaqzf.com");
                    let serverUrl: string = game.GameServerInfo.instance.getCurApi();
                    this.socket.connectByUrl(serverUrl);
                    egret.log("through onSocketTimeout " + serverUrl);
                } else {
                    this.socket.connect(Global.serverIp, Global.serverPort);
                }
            },
            "callbackObject": this,
            "effectType": 0,
            "tipsType": TipsType.OnlyOk
        });

    }

    export function noticeReconnect() {
        TipsUI.showTips({
            "text": "网络连接有点小故障，请重新连接",
            "callback": (data: any) => {
                egret.log("noticeReconnect  createSocket");
                if (this.socket) { this.socket.dispose() }
                this.socket = this.createSocket();
                if (Global.isWss) {
                    // this.socket.connectByUrl("wss://g-api.xsaqzf.com");
                    let serverUrl: string = game.GameServerInfo.instance.getCurApi();
                    this.socket.connectByUrl(serverUrl);
                    egret.log(serverUrl);
                } else {
                    this.socket.connect(Global.serverIp, Global.serverPort);
                }
            },
            "callbackObject": this,
            "effectType": 0,
            "tipsType": TipsType.OnlyOk
        });
    }

    //服务器断开
    export function onSocketClose(): void {
        egret.log("this.socket.close");
        var msg: string = "网络连接失败，请检查网络后重试。";
        this.socket.cancelCheck();
        if (Global.isKickFromServer) {
            return;
        }
        egret.Ticker.getInstance().unregister(this.onHeartbeat, this);
        egret.log("网络连接失败，请检查网络后重试。");
        if (!Global.isInitConnect) {
            game.GameServerInfo.instance.moveNext();
            egret.log("this.socket.close after move next " + game.GameServerInfo.instance.getCurApi());
            this.noticeReconnect();
            return;
        }

        this.failCount++;
        if (this.failCount < 3) {
            // game.NetConnectionUI.showFlower();
            this.noticeReconnect();
        } else {
            game.NetConnectionUI.showNetDisconnect();
        }
    }
    export function onSocketError(e): void {
        egret.log("socket error " + e.message);
        this.lastSocketError = true;
    }

    export function socketClose(): void {
        this.socket.close();
        egret.Ticker.getInstance().unregister(this.onHeartbeat, this);

    }
    //连接成功返回
    export function onSocketOpen(): void {
        egret.log("连接成功-------------");
        Global.isInitConnect = true;
        this.recordPauseTime = 0;
        this.recordResumeTime = 0;
        egret.Ticker.getInstance().register(this.onHeartbeat, this);
        if (Global.isNative) {
            if(Global.IS_SDK_MODE) {
                egret.log("sdk login : " + Global.SDK_ACCOUNT + "  " + Global.SDK_PASSWORD + " " + NativeApi.getLocalData("user_login_deviceid"))
                UserRequest.sendSdkLogin(Global.SDK_ACCOUNT,NativeApi.getLocalData("user_login_deviceid"), Global.os, Global.platform);
            } else {
                let account: string = NativeApi.getLocalData("user_login_account");
                let pwd: string = NativeApi.getLocalData("user_login_password");
                let deviceId: string = NativeApi.getLocalData("user_login_deviceid");
                if (account != null && pwd != null && pwd !== "" && account !== "") {
                    UserRequest.sendAccountLogin(account, pwd, deviceId, Global.os, Global.platform);
                } else {
                    UserRequest.sendGuestLogin(deviceId, Global.os, Global.platform);
                }
            }
        } else {
            if(UserService.curGuestLoginDeviceId) {
                UserRequest.sendGuestLogin(UserService.curGuestLoginDeviceId, Global.os, Global.platform);
            } else {
                game.AppFacade.getInstance().sendNotification(SceneNotify.OPEN_LOGIN);
                game.NetConnectionUI.hide();
            }
        }
    }

    export function onLoginSuccess(): void {
        this.failCount = 0;
        var reconnectionSkin: any = GameLayerManager.gameLayer().effectLayer.getChildByName("reconnectionSkin");
        if (reconnectionSkin != null) {
            GameLayerManager.gameLayer().effectLayer.removeChild(reconnectionSkin);
        }
        if (!Global.isNative) {
            game.NetConnectionUI.hide();
        }
        game.AppFacade.getInstance().sendNotification(PanelNotify.SOCKET_RECONNECT);
    }


    //心跳
    var sendCont: number = 0;
    export function onHeartbeat(): void {
        sendCont++;
        if (sendCont >= 200) {
            UserRequest.sendHeartbeat();
            sendCont = 0;
        }
    }

    //重置心跳数字
    export function resHeartbeatCount(): void {
        sendCont = 0;
    }

    export var recordPauseTime:number = 0;
    export var recordResumeTime:number = 0;

    //消息返回  
    export function onReceiveMessage(): void {
        //  Global.hideWaritPanel();
        var _arr: egret.ByteArray = new egret.ByteArray();
        this.socket.readBytes(_arr);
        _arr.readShort();
        let cmdTimestamp = _arr.readUnsignedInt();
        var mainId = _arr.readInt();
        var cmdDataBA: egret.ByteArray = new egret.ByteArray();
        if (_arr.length > 10) {
            var len = _arr.readInt();
            _arr.readBytes(cmdDataBA);
        }
        if (mainId != 20002) {
            if (!Global.isNative) {
                console.log("收到服务器协议号-------------：" + mainId);
            }
            NetLoading.hideLoading();
        }
        let curTime = new Date().getTime();
        let cmdTimeStr = curTime.toFixed(0).substr(0,4) + cmdTimestamp;
        let cmdTime = Number(cmdTimeStr)
        if(this.recordPauseTime == 0){
            this.serverTimestampDelta = curTime - cmdTime;
        }
        else {
            let resumeTime = this.recordResumeTime - this.serverTimestampDelta;
            egret.log("检测对比时间: " + resumeTime + "  " + cmdTime)
            if(resumeTime > cmdTime) {
                egret.log("忽略: " + resumeTime + "  ----   " + cmdTime);
                return;
            } else {
                this.recordPauseTime = 0;
                this.recordResumeTime = 0;
            }
        }
        game.AppFacade.getInstance().sendNotification("Processor_" + mainId, cmdDataBA);
    }
    
    export function dropRecvData() {
        if(this.socket) {
            this.socket.dropRecvData();
        }
    }

    export function isSocketConnected() {
        return this.socket && this.socket.connected;
    }

    //向服务端发送消息
    export function sendMessage(mainId: number, msg: any): void {
        if (this.socket == null || !this.socket.connected) {
            // 重新连接
            this.noticeReconnect();
            return;
        }
        if (mainId != 20002) {
            if (!Global.isNative) {
                console.log("发送协议号-------------：" + mainId);
            }
            NetLoading.showLoading(mainId);
        }
        sendBuff = new egret.ByteArray();
        sendBuff.writeShort(0x5D6B);
        sendBuff.writeInt(mainId);
        var data: egret.ByteArray = new egret.ByteArray(msg);
        sendBuff.writeInt(data.length);
        sendBuff.writeBytes(data);
        this.socket.writeBytes(sendBuff, 0, sendBuff.bytesAvailable);
        this.socket.flush();
    }
}
