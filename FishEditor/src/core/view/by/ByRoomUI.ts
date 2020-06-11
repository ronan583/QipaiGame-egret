module game.by {
    export class BYRoomUI extends RoomUI {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/by/byRoom.exml";
        }
        public backbtn:eui.Button = null;
        public _scroller : eui.Scroller;
        private system:particle.GravityParticleSystem;
        private goldLabel:eui.BitmapLabel;
        private nameLabel:eui.Label;
        private headImg:eui.Image;
        private roomItem1:ByRoomItem;
        private roomItem2:ByRoomItem;
        private roomItem3:ByRoomItem;
        private roomItem4:ByRoomItem;
        private helpbtn:eui.Button;
        private quickGroup:eui.Group;
        private testBtn:eui.Button;
        protected childrenCreated():void {
            super.childrenCreated();
            this.backbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick0, this);
            this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick1, this);
            this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick2, this);
            this.roomItem4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick3, this);
            this.quickGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuick, this);
            this.helpbtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpClick, this);
            this.testBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTestClick, this);
            if(this._scroller.horizontalScrollBar != null)
            {
                this._scroller.horizontalScrollBar.autoVisibility = false;
                this._scroller.horizontalScrollBar.visible = false;
            }
            if(this._scroller.verticalScrollBar != null)
            {
                this._scroller.verticalScrollBar.autoVisibility = false;
                this._scroller.verticalScrollBar.visible = false;
                this._scroller.scrollPolicyV = eui.ScrollPolicy.OFF;
            }
            var texture = RES.getRes("paopao_png");
            var config = RES.getRes("paopao_json");
            this.system = new particle.GravityParticleSystem(texture, config);
            this.system.start();
            this.addChild(this.system);
        }
        
        protected addToStage() {
            super.addToStage();
            this.refreshInfo();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        private onHelpClick() {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.BY);
        }

        private onByBtnClick(index:number) : void {
            // 发送进入房间协议
            RoomRequest.sendEnterRoomInfo(game.ChildGameType.BY, index);
        }

        private onQuick() {
            game.QuickStart.instance.quickStart(ChildGameType.BY);
        }

        private onByBtnClick0(e:egret.TouchEvent):void {
            this.onByBtnClick(0);
        }
        private onByBtnClick1(e:egret.TouchEvent):void {
            this.onByBtnClick(1);
        }
        private onByBtnClick2(e:egret.TouchEvent):void {
            this.onByBtnClick(2);
        }
        private onByBtnClick3(e:egret.TouchEvent):void {
            this.onByBtnClick(3);
        }
        
        private onBackBtnClick(e:egret.TouchEvent):void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BY_ROOM_UI);
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
        }

        public refreshInfo() {
            let user = UserService.instance;
            this.nameLabel.text = user.name;
            this.goldLabel.text = user.money.toFixed(2);
            this.headImg.source = "gp_head_" + (user.headNum + 1);
        }
        
        public refreshPlayerInfo() {
			this.refreshInfo();
		}

        private onTestClick() {
            AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BY_TRACK_UI);
        }
    }
}