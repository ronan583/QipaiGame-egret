module game.fqzs {
	export class FqzsResultPanel extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/fqzs/FqzsResultPanel.exml";
			this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public closeBtn: IButton;

		public myResult2: eui.Image;
		public myResult: eui.Group;

		public myResultNum: eui.BitmapLabel;
		public bankResultNum: eui.BitmapLabel;
		public bankerAll: eui.Image;

		public myName: eui.Label;
		public bankName: eui.Label;

		public rank1: eui.Image;
		public rank2: eui.Image;
		public rank3: eui.Image;
		public rank4: eui.Image;
		public rank5: eui.Image;

		public rankName1: eui.Label;
		public rankName2: eui.Label;
		public rankName3: eui.Label;
		public rankName4: eui.Label;
		public rankName5: eui.Label;

		public rankNum1: eui.Label;
		public rankNum2: eui.Label;
		public rankNum3: eui.Label;
		public rankNum4: eui.Label;
		public rankNum5: eui.Label;

		protected childrenCreated(): void {
			super.childrenCreated();

			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this.init();
		}

		private init() {
			this.bankerAll.visible = false;
			this.myResult.visible = false;
			this.myResult2.visible = false;
			this.rank1.visible = false;
			this.rank2.visible = false;
			this.rank3.visible = false;
			this.rank4.visible = false;
			this.rank5.visible = false;

			this.rankName1.visible = false;
			this.rankName2.visible = false;
			this.rankName3.visible = false;
			this.rankName4.visible = false;
			this.rankName5.visible = false;

			this.rankNum1.visible = false;
			this.rankNum2.visible = false;
			this.rankNum3.visible = false;
			this.rankNum4.visible = false;
			this.rankNum5.visible = false;
		}

		public onClose() {
			this.init();
			PopUpManager.removePopUp(this, 1);
		}

		public showResult(data, nickName?) {
			this.init();
			//清空下注状态
			FqzsData.isSelfStake = false;
			FqzsSoundPlayer.instance.playResult();
			if (data.battleInfo != null) {
				this.bankName.text = data.battleInfo[0].city;
				this.bankResultNum.visible = true;
				this.bankResultNum.font =  RES.getRes(Number(data.battleInfo[0].money) < 0 ? "fqzs_shu_fnt" : "fqzs_ying_fnt");
				this.bankResultNum.validateNow();
				this.bankResultNum.text = (Number(data.battleInfo[0].money) > 0 ? "+" : "") + Number(data.battleInfo[0].money.toFixed(2)) + '';
				if (Number(data.battleInfo[1].money) != 0) {
					this.myName.text = data.battleInfo[1].city;
					this.myResult2.visible = false;
					this.myResult.visible = true;
					this.myResultNum.font =  RES.getRes(Number(data.battleInfo[1].money) < 0 ? "fqzs_shu_fnt" : "fqzs_ying_fnt");
					this.myResultNum.validateNow();
					this.myResultNum.text = (Number(data.battleInfo[1].money) > 0 ? "+" : "") + Number(data.battleInfo[1].money.toFixed(2)) + '';
					if (Number(data.battleInfo[1].money) > 0) {
						FqzsSoundPlayer.instance.playWin();
					} else if (Number(data.battleInfo[1].money) < 0) {
						FqzsSoundPlayer.instance.playLose();
					}
				} else {
					this.myName.text = nickName;
					this.myResult2.visible = true;
					this.myResult.visible = false;
				}
			}
			if (data.rankInfo != null) {
				// console.log('bankName === ', data.battleInfo[i].city, data.battleInfo[i].money);
				for (var i = 0; i < data.rankInfo.length; i++) {
					if (i == 0 && Number(data.rankInfo[i].money) > 0) {
						this.rank1.visible = true;
						this.rankName1.visible = true;
						this.rankNum1.visible = true;
						this.rankName1.text = data.rankInfo[i].city;
						this.rankNum1.text = (Number(data.rankInfo[i].money) > 0 ? "+" : "") + Number(data.rankInfo[i].money).toFixed(2) + '';
					} else if (i == 1 && Number(data.rankInfo[i].money) > 0) {
						this.rank2.visible = true;
						this.rankName2.visible = true;
						this.rankNum2.visible = true;
						this.rankName2.text = data.rankInfo[i].city;
						this.rankNum2.text = (Number(data.rankInfo[i].money) > 0 ? "+" : "") + Number(data.rankInfo[i].money).toFixed(2) + '';
					} else if (i == 2 && Number(data.rankInfo[i].money) > 0) {
						this.rank3.visible = true;
						this.rankName3.visible = true;
						this.rankNum3.visible = true;
						this.rankName3.text = data.rankInfo[i].city;
						this.rankNum3.text = (Number(data.rankInfo[i].money) > 0 ? "+" : "") + Number(data.rankInfo[i].money).toFixed(2) + '';
					} else if (i == 3 && Number(data.rankInfo[i].money) > 0) {
						this.rank4.visible = true;
						this.rankName4.visible = true;
						this.rankNum4.visible = true;
						this.rankName4.text = data.rankInfo[i].city;
						this.rankNum4.text = (Number(data.rankInfo[i].money) > 0 ? "+" : "") + Number(data.rankInfo[i].money).toFixed(2) + '';
					} else if (i == 4 && Number(data.rankInfo[i].money) > 0) {
						this.rank5.visible = true;
						this.rankName5.visible = true;
						this.rankNum5.visible = true;
						this.rankName5.text = data.rankInfo[i].city;
						this.rankNum5.text = (Number(data.rankInfo[i].money) > 0 ? "+" : "") + Number(data.rankInfo[i].money).toFixed(2) + '';
					}
				}
			}

			//13.通吃 庄通吃
			if (data.winType == 13) {
				this.bankerAll.visible = true;
			}
		}

	}
}