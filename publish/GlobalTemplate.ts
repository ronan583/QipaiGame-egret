/**
  * 游戏公用方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 使用方法如：Global.setCookie()
  */
module Global {
    export var serverIp: string = "-serverIp-";
    export var serverPort: number = -serverPort-;
    export var isNative: boolean = true;//是否为app true 是 false 不是
    export var isWss: boolean = true;
    export var isInetTest: boolean = false;
    export var version: string = "-version-";
    export var versionRoot: string = "2.0.2";
    export var isInitConnect:boolean = false;
    export var isBackgroud = false;

    export var platform:string = "gp";
    export var os:string = "";
    export var pauseTime:number = 0;
    export var isKickFromServer:boolean = false;
    export var deviceVersion:string = "";

    export var testAppPause = false;
    export var isInnerUpdate:boolean = false;

    export var designRect:egret.Point = new egret.Point(1334,750);
    // export var getIpUrl = "";
    export var getIpUrl = "";
    export var getBasicData = "";
    export var forceNativeUpdateUrl = "";   

    export var IS_SDK_MODE:boolean = false;
    export var SDK_ACCOUNT:string = "";
    export var SDK_PASSWORD:string = "";

    export function checkCfg() {
        if(!Global.IS_SDK_MODE) {
            let basicDataQueryUrl = GameCfg.getStringValue("basicDataQueryUrl");
            if(basicDataQueryUrl != "") {
                Global.getBasicData = basicDataQueryUrl;
            }
        }
        if(!Global.isNative) {
            let ipQueryUrl = GameCfg.getStringValue("ipQueryUrl");
            if(ipQueryUrl && ipQueryUrl != "") {
                Global.getIpUrl = ipQueryUrl;
            }
        }
    }

    //获取html文本
    export function getTextFlow(str: string): egret.ITextElement[] {
        var styleParser = new egret.HtmlTextParser();
        return styleParser.parser(str);
    }

    export function getUrlParamByName(name: string): string {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        /* 字符串截取，获取匹配参数值 */
        var r = window.location.search.substr(1).match(reg);
        /* 但会参数值 */
        if (r != null) {
            return decodeURIComponent(r[2]);;
        }
        return null;
    }


    export function init(): void {
        game.LangManager.instance.setData("chinese_json");
    }

    export function getVirtualUrl(name: string): string {
        return RES.getVersionController().getVirtualUrl(name);
    }
}