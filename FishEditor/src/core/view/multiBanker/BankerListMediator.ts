/**
  * 扎金花战斗
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

    export class BankerListMediator extends BaseMediator {
        public static NAME: string = "BankerListMediator";

        public constructor(viewComponent: any = null) {
            super(BankerListMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                PanelNotify.DESIDE_BANKERLIST_POS,
                PanelNotify.SHOW_BANKERLIST_DATA,
                PanelNotify.CLOSE_BANKERLIST
            ];
        }
        private bankerListUI: game.BankerListUI = null;
        private showPos:egret.Point;
        private showGameType:number;
        private commonDarkSprite:egret.Sprite;

        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.DESIDE_BANKERLIST_POS: 
                    this.showPos = data.pos;
                    this.showGameType = data.gameType;
                    if(this.bankerListUI && this.bankerListUI.stage) {
                        this.bankerListUI.parent.removeChild(this.bankerListUI);
                        return;
                    }
                    let roomdata = RoomManager.getInstance().curRoomData;
                    if(roomdata) {
                        RoomRequest.sendBankerList(data.gameType, roomdata.gameLevel);
                    }
                   break;
                case PanelNotify.SHOW_BANKERLIST_DATA: 
                    if(!this.commonDarkSprite) {
                        this.commonDarkSprite = new egret.Sprite();
                        this.commonDarkSprite.graphics.clear();
                        this.commonDarkSprite.graphics.beginFill(0x000000, 0.3);
                        this.commonDarkSprite.graphics.drawRect(0, 0, GameConfig.curWidth(), GameConfig.curHeight());
                        this.commonDarkSprite.graphics.endFill();
                        this.commonDarkSprite.width = GameConfig.curWidth();
                        this.commonDarkSprite.height = GameConfig.curHeight();
                        this.commonDarkSprite.touchEnabled = true;
                    }
                    if(this.bankerListUI && this.bankerListUI.stage) {
                        this.bankerListUI.parent.removeChild(this.bankerListUI);
                        return;
                    }
                    if(!this.bankerListUI) {
                        this.bankerListUI = new game.BankerListUI();
                        this.bankerListUI.addChildAt(this.commonDarkSprite, 0);
                        this.commonDarkSprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                    }
                    if(!this.bankerListUI.stage) {
                        let stage = egret.lifecycle.stage;
                        stage.addChild(this.bankerListUI);
                        this.bankerListUI.x = this.showPos.x
                        this.bankerListUI.y = this.showPos.y
                        let p = this.bankerListUI.globalToLocal(0,0);
                        this.commonDarkSprite.x = p.x;
                        this.commonDarkSprite.y = p.y;
                        this.bankerListUI.showData(data, this.showGameType);
                    }
                   break;
                case PanelNotify.CLOSE_BANKERLIST:
                    if(this.bankerListUI && this.bankerListUI.stage) {
                        this.bankerListUI.parent.removeChild(this.bankerListUI);
                    }
                break;
            }
        }

        private onClose() {
            if(this.bankerListUI && this.bankerListUI.stage) {
                this.bankerListUI.parent.removeChild(this.bankerListUI);
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {

        }


        /**
         * 初始化面板数据
         */
        public initData(): void {
        }

        public destroy(): void {

        }

    }
}
