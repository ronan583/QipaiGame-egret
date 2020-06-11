module game {
    export class GameNoticeList extends eui.Component {
        public constructor(data: any) {
            super();
            this.skinName = "resource/eui_skins/common/notice/GameNoticeList.exml";
            this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnNoticeItemClick, this);

            this.titleLab.text = data.title;
            this.senderLab.text = data.sender;
            this.dateLab.text = data.time;
            this.dbId = data.id;
            this.dbType = data.type;
            this.notice_email.source = "notice_email_read";

            if (data.type == 2) {
                if (data.status) {
                    this.notice_email.source = "notice_email_readed";
                    this.annImg.visible = true;
                } else {
                    // this.ydBtn.visible = false;
                    // this.lqBtn.visible = true;
                }
            } else {
                if (data.status) {
                    this.notice_email.source = "notice_email_readed";
                    this.annImg.visible = true;
                } else {
                    // this.ydBtn.visible = true;
                    // this.lqBtn.visible = false;
                }
            }
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private OnNoticeItemClick(e: egret.TouchEvent): void {
            // SoundMenager.instance.PlayClick();
            UserRequest.sendNoticeDetail(this.dbId);

            this.annImg.visible = true;
            // if (this.dbType == 2) {
            //     this.annImg.source = "ann_gained_png";
            // } else {
            //     this.annImg.source = "ann_readed_png";
            // }
            // this.ydBtn.visible = false;
            // this.lqBtn.visible = false;
        }

        public titleLab: eui.Label;
        public dateLab: eui.Label;
        public senderLab: eui.Label;
        public annImg: eui.Image;
        public notice_email: eui.Image;

        private dbId: number;
        private dbType: number;

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}