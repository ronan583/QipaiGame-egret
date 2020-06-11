module game.hhdz {
	export class HhdzHistoryPanel extends ResizePanel {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/hhdz/HhdzHistoryPanelSkin.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		public closeBtn: IButton;
		public cardTypeGroud: eui.Group;
		public resultGroup: eui.Group;

		public resultRoad: HhdzResultRoad;
		public bigRoad: HhdzBigRoad;
		public dyzRoad: HhdzThreeRoad;
		public smallRoad: HhdzThreeRoad;
		public yueyouRoad: HhdzThreeRoad;
		public redWinValue: eui.BitmapLabel;
		public blackWinValue: eui.BitmapLabel;
		public blackWinBg: eui.Image;
		public redWinBg: eui.Image;
		public winType20Gruop: eui.Group;
		public totalCountLab: eui.BitmapLabel;
		public redWinCountLab: eui.BitmapLabel;
		public blackWinCountLab: eui.BitmapLabel;


		protected childrenCreated(): void {
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		}

		public Reset() {
			this.bigRoad.clear();
			this.dyzRoad.clear();
			this.smallRoad.clear();
			this.yueyouRoad.clear();
		}

		public showHistory(data): void {
			this.Reset();
			var totalCount: number = data.redCount + data.blackCount;
			this.blackWinCountLab.text = "黑:" + data.blackCount + "局"
			this.redWinCountLab.text = "红:" + data.redCount + "局"
			this.totalCountLab.text = "第:" + totalCount + "局"

			//近20局输赢
			this.winType20Gruop.removeChildren();
			var redWinCount: number = 0;
			var blackWinCount: number = 0;
			var filterNum = 0;
			if (data.winType.length > 20) {
				filterNum = data.winType.length - 20;
			}

			for (var i: number = filterNum; i < data.winType.length; i++) {
				var winTypeValue: number = data.winType[i];
				var image: eui.Image = new eui.Image();
				image.width = 34;
				image.height = 34;
				if (winTypeValue == hhdz.HhdzType.red) {
					redWinCount++;
					image.source = "hhdz_history_json.hhdz_history_red_dian_1";
				} else {
					blackWinCount++;
					image.source = "hhdz_history_json.hhdz_history_black_dian_1";
				}
				this.winType20Gruop.addChild(image);
			}
			var winProbability: number = Math.floor((redWinCount / (redWinCount + blackWinCount)) * 100);
			this.redWinValue.text = winProbability + "%";
			this.blackWinValue.text = (100 - winProbability) + "%";
			this.redWinBg.width = this.blackWinBg.width * winProbability / 100;

			//大路
			this.resultRoad.updateRoad(data.winType)

			//其他路
			for (var i = 0; i < data.winType.length; i++) {
				this.addOtherRoad(data.winType[i]);
			}

			//牌型
			filterNum = 0;
			if (data.cardType.length > 34) {
				filterNum = data.cardType.length - 34;
				if (totalCount % 2 != 0) {
					filterNum += 1;
				}
			}
			this.cardTypeGroud.removeChildren();
			for (var i = filterNum; i < data.cardType.length; i++) {
				var cardTypeItem: HhdzCardTypeItem = new HhdzCardTypeItem();
				var isNew: boolean = i == data.cardType.length - 1 ? true : false;
				cardTypeItem.show(data.cardType[i], isNew);
				this.cardTypeGroud.addChild(cardTypeItem);
			}
		}


		private addOtherRoad(winType: number) {
			if (this.bigRoad.addItem(winType)) {
				var currCow = this.bigRoad.bigRoadRowLists.length;
				var currCol = this.bigRoad.bigRoadRowLists[currCow - 1].bigRoadItems.length;

				//大眼仔
				if ((currCow == 2 && currCol > 1) || currCow > 2) {
					if (this.blueOrRed(1)) {
						this.dyzRoad.addItem(1, "hhdz_history_json.hhdz_history_black_dian_4");
					} else {
						this.dyzRoad.addItem(2, "hhdz_history_json.hhdz_history_red_dian_4");
					}
				}
				//小路
				if ((currCow == 3 && currCol > 1) || currCow > 3) {
					if (this.blueOrRed(2)) {
						this.smallRoad.addItem(1, "hhdz_history_json.hhdz_history_black_dian_1");
					} else {
						this.smallRoad.addItem(2, "hhdz_history_json.hhdz_history_red_dian_1");
					}
				}
				//曱甴路
				if ((currCow == 4 && currCol > 1) || currCow > 4) {
					if (this.blueOrRed(3)) {
						this.yueyouRoad.addItem(1, "hhdz_history_json.hhdz_history_black_xian_1");
					} else {
						this.yueyouRoad.addItem(2, "hhdz_history_json.hhdz_history_red_xian_1");
					}
				}
			}
		}

		public blueOrRed(interval: number): boolean {
			var currCow = this.bigRoad.bigRoadRowLists.length;
			var currCol = this.bigRoad.bigRoadRowLists[currCow - 1].bigRoadItems.length;

			//齐脚
			if (currCol == 1) {
				if (this.bigRoad.bigRoadRowLists[currCow - interval - 1].bigRoadItems.length == this.bigRoad.bigRoadRowLists[currCow - interval - 2].bigRoadItems.length) {
					return true;
				} else {
					return false;
				}
				//成对
			} else if (this.bigRoad.bigRoadRowLists[currCow - interval - 1].bigRoadItems.length >= currCol) {
				return true;
			} else {
				//与上一口相同
				if (currCol - this.bigRoad.bigRoadRowLists[currCow - interval - 1].bigRoadItems.length == 1) {
					return false;
				} else {
					return true;
				}
			}
		}

		public closePanel(event: egret.TouchEvent) {
			PopUpManager.removePopUp(this, 1);
		}
	}
}