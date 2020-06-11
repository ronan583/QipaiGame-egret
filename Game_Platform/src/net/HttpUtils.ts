module game {

    export class HttpUtils {
        private static _instance: HttpUtils;

        constructor() {
        }

        static get instance(): HttpUtils {
            if (!this._instance) {
                this._instance = new game.HttpUtils();
            }
            return this._instance;
        }

        /**
         * 发送消息
         */
        send(url: string, params: any, callBack: Function, thisObject: any, showTimeOut?: boolean): void {
            params = params || {};
            var timer: egret.Timer = new egret.Timer(1000, 10);
            function success(data): void {
                if (data) {
                    if (data.ret == 0) {
                        if (callBack && thisObject) {
                            callBack(data.data);
                        }
                    } else {
                        // var msg = ErrorCodeManager.instance.getText(data.ret);
                        // Message.instance.send(MsgCMD.SHOW_TIP_TEXT, { tipText: msg });
                    }
                } else {
                    console.log("data is null");
                }
                timer.stop();
            }

            function error(): void {
                if (showTimeOut) {
                    console.log("请求超时");
                }
            }
            var param = this.objectToUrlParam(params) + "callback";
            JsonpReq.process("http://127.0.0.1:9000" + url + "?" + param + "=", success, this);
            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, error, this);
            timer.start();
        }

		/**
		* 对象转URL参数
		* @param data
		*/
        public objectToUrlParam(data: any): string {
            var retStr: string = "";
            for (var key in data) {
                var value = data[key];
                if (value) {
                    if (value.constructor == Array) {

                    } else if (value.constructor == Object) {
                        retStr += this.objectToUrlParam(value);
                    } else {
                        retStr += key + "=" + value + "&";
                    }
                } else {
                    retStr += key + "=&";
                }
            }
            return retStr;
        }
    }

}