module game.duobao {
	export class DuobaoRoomUI extends eui.Component {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/duobao/duobaoRoom.exml";
        }
        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public backBtn:eui.Button = null;
        private roomTop:RoomTop;
        private menuAnim:game.CommonDBLoop;
        protected childrenCreated():void {
            super.childrenCreated();
            this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.roomTop.backFunc = this.onBackBtnClick;
            this.roomTop.backFuncObj = this;
            /*
            this.menuAnim = new game.CommonDBLoop( "roomGirl_ske_dbbin", "roomGirl_tex_json", "roomGirl_tex_png", "animation");

            this.animGroup.addChild(this.menuAnim);
            this.menuAnim.x = this.animGroup.width;

            this.menuAnim.y = 900 + this.animGroup.height;
            */
        }

        private onAdd():void {
            // 请求房间奖池信息
            FruitRequest.reqAllRoomPoolMoney();
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
            if(partName.indexOf("btn") >= 0) {
                let index = parseInt(partName.replace("btnRoom",""));
                if(index == 0) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick0, this);
                }else if(index == 1) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick1, this);
                } else if(index == 2) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick3, this);
                }else if(index == 3) {
                    instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onByBtnClick0, this);
                }            }
        }

        private onByBtnClick(index:number) : void {
            DuobaoData.instance.enterRoomLevel = index;
            // 发送进入房间协议
            DuobaoRequest.sendEnterGame(index);
        }

        private onByBtnClick0(e:egret.TouchEvent):void {
            SoundMenager.instance.PlayClick();
            this.onByBtnClick(0);
        }
        private onByBtnClick1(e:egret.TouchEvent):void {
            SoundMenager.instance.PlayClick();
            this.onByBtnClick(1);
        }
        private onByBtnClick2(e:egret.TouchEvent):void {
            SoundMenager.instance.PlayClick();
            this.onByBtnClick(2);
        }
        private onByBtnClick3(e:egret.TouchEvent):void {
            SoundMenager.instance.PlayClick();
            this.onByBtnClick(3);
        }
        private onByBtnClick4(e:egret.TouchEvent):void {
            SoundMenager.instance.PlayClick();
            this.onByBtnClick(4);
        }
        private onBackBtnClick(e:egret.TouchEvent):void {
            SoundMenager.instance.PlayClick();
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_DUOBAO_ROOM_UI);
            AppFacade.getInstance().sendNotification(PanelNotify.BACK_HALL);
        }

	}
}