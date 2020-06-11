module game.by {
    export class BYChangeCanonPanel extends eui.Component {
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/by/BYChangeCanon.exml";
        }
        public closeBtn:eui.Button = null;

        public createCompleteEvent(event: eui.UIEvent): void {
            console.log("createCompleteEvent");
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        protected childrenCreated():void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBtnClick, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

            this.canonViewList = [this.canonView1,this.canonView2,this.canonView3,this.canonView4,this.canonView5,this.canonView6,this.canonView7];
            for(let i=0;i<this.canonViewList.length;i++) {
                this.canonViewList[i].showCanon(i);
            }
        }

        private onAddToStage():void {

        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        private canonView1:BYCanonView;
        private canonView2:BYCanonView;
        private canonView3:BYCanonView;
        private canonView4:BYCanonView;
        private canonView5:BYCanonView;
        private canonView6:BYCanonView;
        private canonView7:BYCanonView;

        private canonViewList:Array<BYCanonView> ;

        public refresh():void {
            if(this.canonView1) {
                for(let i=0;i<this.canonViewList.length;i++) {
                    this.canonViewList[i].showCanon(i);
                }
            }
        }

        private onBackBtnClick(e:egret.TouchEvent):void {
            AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_CHANGE_CANON_PANEL);
        }

    }
}