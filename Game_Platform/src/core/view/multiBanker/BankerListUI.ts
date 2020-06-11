module game {
    export class BankerListUI extends eui.Component {
        public constructor() {
            super();
            this.skinName = "resource/eui_skins/multiBanker/BankerList.exml";
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            if (this.scroller.horizontalScrollBar != null) {
                this.scroller.horizontalScrollBar.autoVisibility = false;
                this.scroller.horizontalScrollBar.visible = false;
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            if (this.scroller.verticalScrollBar != null) {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }

            if (this.data) {
                this.showData0(this.data, this.gameType);
            }
        }

        private firstBankerName: eui.Label;
        private firstBankerMoney: eui.Label;
        private firstBankerRoundInfo: eui.Label;
        private firstBankerVipLabel: eui.BitmapLabel;
        private itemGroup: eui.Group;
        private scroller: eui.Scroller;
        private contentGroup: eui.Group;
        private bankerListBgImg: eui.Image;

        private data: any;
        private gameType: number;
        /*
        required string nickName = 1;//昵称
        required int32 vipLevel	 = 2;//vip等级
        optional int64 money = 3;//余额 只有当前庄家传值
        required int32 totalRound	 = 4;//总局数
        required int32 currentRound	 = 5;//当前拘束
        required int64 cosMoney	 = 6;//输赢
        */
        public showData(data: any, gameType: number) {
            this.data = data;
            this.gameType = gameType;
            if (this.firstBankerName) {
                this.showData0(data, gameType);
            }
        }

        private showData0(data: any, gameType: number) {
            let first = data.bankerInfos[0];
            this.firstBankerName.text = first.nickName;
            this.firstBankerMoney.text = first.money;
            this.firstBankerVipLabel.text = first.vipLevel.toFixed(0);
            this.firstBankerRoundInfo.text = first.currentRound + "/" + first.totalRound + "  总盈亏 "
                + (first.cosMoney > 0 ? "+" + CommonUtil.convertMonetShow3(first.cosMoney) : CommonUtil.convertMonetShow3(first.cosMoney));
            this.itemGroup.removeChildren();
            let height = this.itemGroup.y;
            for (let i = 1; i < data.bankerInfos.length; i++) {
                let bankerItem = new MultiBankerItem();
                bankerItem.showItem(data.bankerInfos[i], gameType);
                this.itemGroup.addChild(bankerItem);
                height += bankerItem.height;
            }
            this.contentGroup.height = height + 40;
            if (gameType == ChildGameType.BRNN) {
                this.bankerListBgImg.source = "brnn_banker_bg_png";
            } else if (gameType == ChildGameType.BJL) {
                this.bankerListBgImg.source = "bjl_banker_bg_png";
            } else if (gameType == ChildGameType.HHDZ) {
                this.bankerListBgImg.source = "hhdz_banker_bg_png";
            } else if (gameType == ChildGameType.DiceBao) {
                this.bankerListBgImg.source = "tb_banker_bg_png";
            } else if (gameType == ChildGameType.BCBM) {
                this.bankerListBgImg.source = "bcbm_bankerlist_bg";
            } else if (gameType == ChildGameType.LHDZ) {
                this.bankerListBgImg.source = "lhdz_banker_bg_png";
            } else if (gameType == ChildGameType.FQZS) {
                this.bankerListBgImg.source = "fqzs_banker_bg_png";
            }
        }

        private onAdd() {
            // this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
        }

        private onstageclick(e: egret.TouchEvent) {
            if (!this.bankerListBgImg.hitTestPoint(e.stageX, e.stageY, true)) {
                game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BANKERLIST);
            }
        }

        private onRemove() {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
        }

    }

}