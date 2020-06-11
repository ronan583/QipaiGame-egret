// TypeScript file
module CommonUtil {

    export var noticeMsgUI: NoticeMsgUI;

    export function RandomRange(min: number, max: number) {
        return (max - min) * Math.random() + min;
    }

    export function RandomRangeInt(min: number, max: number) {
        return Math.floor((max - min) * Math.random() + min);
    }

    export function registerTimeOut2(func: Function, caller: any, timeout: number): void {
        if (caller['timeoutIdList'] == undefined || caller['timeoutIdList'] == null) {
            caller['timeoutIdList'] = [];
        }
        var holder: any = caller;
        var timeOutId: number = egret.setTimeout(function () {
            func.call(holder);
            let index: number = caller['timeoutIdList'].indexOf(timeOutId);
            if (index >= 0) {
                caller['timeoutIdList'].splice(index, 1);
            }
        }, caller, timeout);
        caller['timeoutIdList'].push(timeOutId);
    }

    export function removeTimeout2(caller: any): void {
        if (caller['timeoutIdList'] == undefined || caller['timeoutIdList'] == null) return;
        let arr: Array<number> = caller['timeoutIdList'];
        for (let key of arr) {
            egret.clearTimeout(key);
        }
        caller['timeoutIdList'] = [];
    }

    export function registerTimeOut(func: Function, caller: any, timeout: number): game.TickTimeOut {
        return game.TickTimeOut.SetTimeOut(func,caller, timeout);
    }

    export function removeTimeout(caller: any): void {
        if (!caller['tickTimeOutList']) return;
        let arr: Array<game.TickTimeOut> = caller['tickTimeOutList'];
        for (let key of arr) {
            if(key == undefined) {
                egret.log("=========================为什么会有undefined");
                continue;
            }
            (<game.TickTimeOut>key).stop();
        }
        caller['tickTimeOutList'] = [];
    }

    export function disableDisplayObj(obj: egret.DisplayObjectContainer): void {
        var colorMatrix = [
            0.8, 0.2, 0, 0, 0,
            0.2, 0.8, 0, 0, 0,
            0.2, 0.8, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        var flilter = new egret.ColorMatrixFilter(colorMatrix);
        obj.filters = [flilter];
        obj.touchEnabled = false;
        obj.touchChildren = false;
    }

    export function getGrayColorMatrixFilter() {
        let colorMatrix = [
            0.8, 0.2, 0, 0, 0,
            0.2, 0.8, 0, 0, 0,
            0.2, 0.8, 0, 0, 0,
            0, 0, 0, 1, 0
        ];
        return new egret.ColorMatrixFilter(colorMatrix);
    }

    export function enableDisplayObj(obj: egret.DisplayObject): void {
        obj.filters = [];
        obj.touchEnabled = true;
    }

    export function bindTouchEffect(obj: egret.DisplayObject): void {
        function OnTouchEffect(event: egret.TouchEvent): void {
            var sign: number = obj.scaleX / Math.abs(obj.scaleX);

            switch (event.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    var colorMatrix = [
                        1, 0, 0, 0, 50,
                        0, 1, 0, 0, 50,
                        0, 0, 1, 0, 50,
                        0, 0, 0, 1, 0
                    ];
                    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
                    obj.filters = [colorFlilter];
                    egret.Tween.get(obj).to({ scaleX: 0.95 * sign, scaleY: 0.95 }, 80, egret.Ease.sineIn);
                    break;

                case egret.TouchEvent.TOUCH_RELEASE_OUTSIDE:
                case egret.TouchEvent.TOUCH_END:
                    obj.filters = null;
                    egret.Tween.get(obj).to({ scaleX: 1 * sign, scaleY: 1 }, 50, egret.Ease.sineOut);
                    break;
            }

        }
        function onTapEffect(event: egret.TouchEvent): void {
            SoundMenager.instance.PlayClick();
        }
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, OnTouchEffect, obj);
        obj.addEventListener(egret.TouchEvent.TOUCH_END, OnTouchEffect, obj);
        obj.addEventListener(egret.TouchEvent.TOUCH_TAP, onTapEffect, obj);
        obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, OnTouchEffect, obj);

        if (obj.anchorOffsetX == 0 && obj.anchorOffsetY == 0) {

            obj.anchorOffsetX = obj.width / 2;
            obj.anchorOffsetY = obj.height / 2;
            obj.x += obj.anchorOffsetX;
            obj.y += obj.anchorOffsetY;
        }
    }

    export function noticeMsg(msg: string): void {
        if (this.noticeMsgUI && this.noticeMsgUI.stage) {
            this.noticeMsgUI.parent.removeChild(this.noticeMsgUI);
        }
        this.noticeMsgUI = new NoticeMsgUI();
        egret.MainContext.instance.stage.addChild(this.noticeMsgUI);
        this.noticeMsgUI.showErrorMsg(msg);
    }

    export function noticeGameUpdateCompleteMsg(msg: string): void {
        if (this.noticeMsgUI && this.noticeMsgUI.stage) {
            this.noticeMsgUI.parent.removeChild(this.noticeMsgUI);
        }
        this.noticeMsgUI = new NoticeMsgUI();
        egret.MainContext.instance.stage.addChild(this.noticeMsgUI);
        this.noticeMsgUI.showGameCompleteMsg(msg);
    }

    export function leaveGame(gameType:ChildGameType = ChildGameType.NONE): void {
        if(gameType == ChildGameType.NONE) {
            if (!game.RoomManager.getInstance().curRoomData) return;
            gameType = game.RoomManager.getInstance().curRoomData.gameType
            if(gameType == ChildGameType.NONE) {
                return;
            }
        }
        switch (gameType) {
            case game.ChildGameType.ZJH:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_ZJH_BATTLE_UI)
                    //game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_ZJH_ROOM_UI)
                    break;
                }
            case game.ChildGameType.QYNN:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_QYNN_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.BRNN:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BRNN_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.DDZ:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DDZ_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.DZPK:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DZPK_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.PDK:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_PDK_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.LHDZ:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_LHDZ_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.HHDZ:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_HHDZ_BATTLE_UI);
                }
            case game.ChildGameType.ERMJ:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_ERMJ_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.BY:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BY_ROOM_UI);
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BY_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.BJL:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BJL_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.FRUIT:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_FRUIT_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.DiceBao:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_TB_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.FQZS:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_FQZS_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.BCBM:
                {
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BCBM_BATTLE_UI);
                    break;
                }
            case game.ChildGameType.TGPD:
                game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_TGPD_BATTLE_UI);
                break;
        }
        game.RoomManager.getInstance().curRoomData = null;
        game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_HELP_UI);
        if (game.RoomUI.curActiveRoomUI) {
            PopUpManager.addPopUp(game.RoomUI.curActiveRoomUI);
        }
        if (TipsUI.instance && TipsUI.instance.parent) {
            TipsUI.instance.parent.removeChild(TipsUI.instance);
        }
    }

    export function log(msg: string) {
        if (!Global.isNative) {
            egret.log(msg);
        }
    }

    export function moneyFormat(money: number): string {
        let moneyStr = "";
        if (money.toFixed(0).length >= 8) {
            var yiNum = money / 100000000;
            if (yiNum >= 1) {
                moneyStr = yiNum.toFixed(2) + "亿";
            } else {
                var wanNum = money / 10000;
                if (wanNum >= 1) {
                    moneyStr += wanNum.toFixed(2) + "万";
                }
            }
        } else {
            moneyStr += Number(money.toFixed(2));
        }

        return moneyStr;
    }

    export function moneyFormatTwoDecimal(money: number): string {
        let moneyStr = "";
        if (money.toFixed(0).length >= 8) {
            var yiNum = money + 0.001 / 100000000;
            if (yiNum >= 1) {
                moneyStr = yiNum.toFixed(2) + "亿";
            } else {
                var wanNum = money + 0.001 / 10000;
                if (wanNum >= 1) {
                    moneyStr += wanNum.toFixed(2) + "万";
                }
            }
        } else {
            moneyStr += Number((money + 0.001).toFixed(2));
        }

        return moneyStr;
    }


    export function moneyFormatNoDecimal(money: number): string {
        let moneyStr = "";
        if (money.toFixed(0).length >= 5) {
            var yiNum = money / 100000000;
            if (yiNum >= 1) {
                moneyStr = yiNum.toFixed(2) + "亿";
            } else {
                var wanNum = money / 10000;
                if (wanNum >= 1) {
                    moneyStr += wanNum.toFixed(2) + "万";
                }
            }
        } else {
            moneyStr += Number(money.toFixed(2));
        }

        return moneyStr;
    }

    export function setNextFrameCall(func: Function, funcObj: egret.DisplayObject) {
        if(funcObj['nextframecall']) {
            egret.stopTick(funcObj['nextframecall'], funcObj);
        }
        let tick = 0;
        let callback: (timeStamp: number) => boolean = function (t: number): boolean {
            tick++;
            if (tick == 2) {
                func.call(funcObj);
            }
            if(tick >= 2) {
                if (funcObj['nextframecall']) {
                    egret.stopTick(funcObj['nextframecall'], funcObj);
                }
            }                        
            return false
        }
        egret.startTick(callback, funcObj)
        funcObj['nextframecall'] = callback;
    }

    export function convertMonetShow(money: number): string {
        let isfu = money < 0;
        money = Math.abs(money);
        if (money >= 10000) {
            return (isfu ? "-" : "" ) + Math.floor(money / 10000) + "万";
        } else if (money >= 1000) {
            return (isfu ? "-" : "" ) + Math.floor(money / 1000) + "千";
        } else if (money >= 100) {
            return (isfu ? "-" : "" ) + Math.floor(money / 100) + "百";
        } else {
            return (isfu ? "-" : "" ) + money.toFixed(2);
        }
    }

    export function convertMonetShow3(money: number): string {
        let isfu = money < 0;
        money = Math.abs(money);
        if (money >= 10000) {
            return (isfu ? "-" : "" ) + CommonUtil.fixMoneyFormat2(money / 10000) + "万";
        } else if (money >= 1000) {
            return (isfu ? "-" : "" ) + CommonUtil.fixMoneyFormat2(money / 1000) + "千";
        } else {
            return (isfu ? "-" : "" ) + CommonUtil.fixMoneyFormat2(money);
        }
    }

    export function convertMonetShow2(money: number): string {
        return RegUtils.regMoney(money);
    }

    export function generateDirectionParticle(texture: egret.Texture, config: any,
        startPoint: egret.Point, endPoint: egret.Point, speed: number,
        onComplete:Function, onCompleteCaller, offsetvalue:number = 10): particle.GravityParticleSystem {
        let deltax: number = endPoint.x - startPoint.x;
        let deltay: number = endPoint.y - startPoint.y;
        // 靠近目标点的时候就要消失了 所以不能直接到endpoint;
        let offset = new egret.Point(deltax, deltay);
        offset.normalize(1);
        endPoint = new egret.Point(endPoint.x - offset.x * offsetvalue, endPoint.y - offset.y * offsetvalue);
        deltax = endPoint.x - startPoint.x;
        deltay = endPoint.y - startPoint.y;
        let distance: number = egret.Point.distance(endPoint, startPoint);
        let angle = Math.atan(deltay / deltax) * 180 / 3.1415926;
        config.emitAngle = angle + 180;
        /*
        config.useEmitterRect = true;
        config.emitterRect = {x:startPoint.x + deltax / 2, y:startPoint.y + deltay / 2, width:deltax, height:deltay};
        */
        let chargeParticle = new particle.GravityParticleSystem(texture, config);
        chargeParticle['startTime'] = egret.getTimer();
        chargeParticle['startPoint'] = startPoint;
        chargeParticle['endPoint'] = endPoint;
        chargeParticle['deltax'] = deltax;
        chargeParticle['deltay'] = deltay;
        chargeParticle['duration'] = distance * 1000 / speed;
        egret.startTick(this.updateParticle, chargeParticle);
        chargeParticle['updateParticle'] = this.updateParticle;
        chargeParticle['onComplete'] = onComplete;
        chargeParticle['onCompleteCaller'] = onCompleteCaller;
        chargeParticle.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onParticleRemove, chargeParticle);

        return chargeParticle;
    }

    export function updateParticle(timestamp: number): boolean {
        if (timestamp > this['startTime'] + this['duration']) {
            egret.stopTick(this.updateParticle, this);
            this.stop();
            this['updateMethod'] = null;
            if(this['onComplete']) {
                this['onComplete'].call(this['onCompleteCaller']);
                this['onComplete'] = null;
            }
            egret.setTimeout(function () {
                if (this.stage) {
                    this.parent.removeChild(this);
                }
            }, this, 3000);
        }
        this.emitterX = this['startPoint'].x + this['deltax'] * (timestamp - this['startTime']) / this['duration'];
        this.emitterY = this['startPoint'].y + this['deltay'] * (timestamp - this['startTime']) / this['duration'];
        return false;
    }

    export function onParticleRemove() {
        if (this["updateMethod"]) {
            egret.stopTick(this["updateMethod"], this);
        }
    }

    export function fixMoneyFormat2(money: number, p: number = 2) {
        let str = money.toString();
        let dot = str.indexOf('.');
        if (dot >= 0) {
            let end = dot + p + 1;
            while (str.length < end) {
                str += "0";
            }
            return str.substring(0, end)
        } else {
            return str + ".00";
        }
    }

    export function fixMoneyFormat(money: number, p: number = 2, isW:boolean = false) {
        // 新增处理显示万 和 亿
        if(money > 10000) {
            if(money > 100000000) {
                return CommonUtil.fixMoneyFormat2(money / 100000000) + "亿";
            } else {
                return CommonUtil.fixMoneyFormat2(money / 10000) + (isW ? "w" : "万");
            }
        } else {
            return CommonUtil.fixMoneyFormat2(money, p);
        }
    }

    export function limitName(name: string, count: number = 4): string {
        if (name.length > count) {
            return name.substr(0, count) + "...";
        } else {
            return name;
        }
    }

    export function bindOtherAreaTouchClose(target:egret.DisplayObject) {
        function onCheck(e:egret.TouchEvent) {
            if(!this.hitTestPoint(e.stageX, e.stageY, true)) {
                if(this.parent) {
                    this.parent.removeChild(this);
                    if(this["dark"] && this["dark"].parent) {
                        this["dark"].parent.removeChild(this["dark"]);
                    }
                }
            }
        }
        function onAddToStage() {
            CommonUtil.registerTimeOut(()=>{
                egret.lifecycle.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, onCheck, this);
            }, target, 200);
        }
        function onRemoveFromStage() {
            egret.lifecycle.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, onCheck, target);
        }
        target.addEventListener(egret.Event.ADDED_TO_STAGE, onAddToStage, target)
        target.addEventListener(egret.Event.REMOVED_FROM_STAGE, onRemoveFromStage, target)
    }

    export function disorder(arr:Array<number>):Array<number> {
        let arr1 = [];
        for(let c of arr) {
            arr1.push(c);
        }
        let result = [];
        while(arr1.length > 0) {
            let ri = CommonUtil.RandomRangeInt(0, arr1.length);
            let c = arr1[ri];
            result.push(c);
            arr1.splice(ri, 1);
        }
        return result;
    }

    export function subArr(arr:Array<number>, subArr:Array<number>) {
        for(let v of subArr) {
            let idx = arr.indexOf(v);
            if(idx >= 0) arr.splice(idx, 1);
        }
        return arr;
    }


    export function sortNumberArray(arr:Array<number>) {
        arr.sort((a:number, b:number):number=>{return a - b});
    }

    export function copyNumberArray(cards:Array<number>):Array<number> {
        let result = [];
        for(let c of cards) {
            result.push(c);
        }
        return result;
    }

    export function isNumberArrayEquals(arr:Array<number>, arr1:Array<number>) {
        if(arr.length != arr1.length) return false;
        let sortFunc = (a:number, b:number):number=>{
            return a - b;
        }
        arr.sort(sortFunc);
        arr1.sort(sortFunc);
        let equals = true;
        for(let i=0;i<arr.length;i++) {
            if(arr[i] != arr1[i]) {
                equals = false;
                break;
            }
        }
        return equals;
    }

    export function isAllNumInOtherArr(arr:Array<number>, arr1:Array<number>) {
        let isAllIn = true;
        for(let c of arr) {
            if(arr1.indexOf(c) < 0) {
                isAllIn = false;
            }
        }
        return isAllIn;
    }

    export function getRealWidth():number{
        let stageWidth = egret.lifecycle.stage.stageWidth;
        if(stageWidth >= 1624) return 1624;
        if(stageWidth <= 1334) return 1334;
        return stageWidth;
    }

}
