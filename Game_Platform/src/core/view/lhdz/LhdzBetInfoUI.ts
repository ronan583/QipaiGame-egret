module game.lhdz {
	export class LhdzBetInfoUI extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		private shensuanziPos: eui.Image;
		private shensuanziAnim: DragonAnim;
		private _hasFlagDuShen: boolean = false;
		public set hasFlagDuShen(v: boolean) {
			this._hasFlagDuShen = v;
		}
		public get hasFlagDuShen(): boolean {
			return this._hasFlagDuShen;
		}

		public betLabel: eui.BitmapLabel;
		public selfBetLabel: eui.BitmapLabel;
		private betValue = 0;
		private selfBetValue:number = 0;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.reset();
		}

		public reset() {
			this.betValue = 0;
			this.betLabel.text = "";
			this.selfBetLabel.visible = false;
			this.shensuanziPos.visible = false;
			this.shensuanziAnim.visible = false;
			this.selfBetValue = 0
			this.selfBetLabel.text = "";
			this._hasFlagDuShen = false;
		}

		public updateSelfRetInfo(selfRetNum) {
			this.selfBetValue+= selfRetNum;
			if (this.selfBetLabel.visible == false && this.selfBetValue != 0) {
				this.selfBetLabel.visible = true;
			}
			this.selfBetLabel.text = this.selfBetValue.toFixed(0);
		}

		public updateTotalRetInfo(retNum) {
			this.betValue += retNum;
			this.betLabel.text = this.betValue.toFixed(0);
		}

		public updateTotalRetInfo2(retNum) {
			this.betValue = retNum;
			this.betLabel.text = this.betValue.toFixed(0);
		}

		private moneyFormatNoDecimal(money: number): string {
			let moneyStr = "";
			if (money.toFixed(0).length >= 5) {
				var yiNum = money / 100000000;
				if (yiNum >= 1) {
					moneyStr = yiNum.toFixed(0) + "y";
				} else {
					var wanNum = money / 10000;
					if (wanNum >= 1) {
						moneyStr += wanNum.toFixed(0) + "w";
					}
				}
			} else {
				moneyStr += RegUtils.regMoney(Number(money.toFixed(0)));
			}
			return moneyStr;
		}

		public getShensuanziPos(): egret.Point {
			if (this.shensuanziPos) {
				return this.shensuanziPos.localToGlobal(this.shensuanziPos.width / 2, this.shensuanziPos.height / 2);
			}
			return null;
		}

		public showShensuanziAnim() {
			this.shensuanziAnim.visible = true;
			this.shensuanziAnim.playerOnce(() => {
				this.shensuanziAnim.visible = false;
				this.shensuanziPos.visible = true
			});
		}
	}
}