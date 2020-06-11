module game.lhdz {
	export class LhdzHistoryPanel extends ResizePanel implements eui.UIComponent {
		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
			this.skinName = "resource/eui_skins/lhdz/LhdzHistoryPanel.exml";
		}

		public createCompleteEvent(event: eui.UIEvent): void {
			this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public closeBtn: IButton;
		public resultGroup: eui.Group;


		public resultRoad: LhdzResultRoad;
		public bigRoad: LhdzBigRoad;
		public dyzRoad: LhdzThreeRoad;
		public smallRoad: LhdzThreeRoad;
		public yueyouRoad: LhdzThreeRoad;
		public dragonWinValue: eui.BitmapLabel;
		public tigerWinValue: eui.BitmapLabel;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanel, this);
		}

		public Reset() {
			this.resultRoad.clear();
			this.bigRoad.clear();
			this.dyzRoad.clear();
			this.smallRoad.clear();
			this.yueyouRoad.clear();
		}

		public showHistory(data): void {
			this.Reset();
			this.resultRoad.updateRoad(data.winType)
			for (var i = 0; i < this.resultRoad.bjlResultItems.length; i++) {
				this.addOtherRoad(i);
			}

			//近20局输赢
			var img: eui.Image;
			this.resultGroup.removeChildren();
			var dragonWinCount: number = 0;
			var tigerWinCount: number = 0;

			var startIndex = 0;
			var endIndex = data.winType.length;
			if (data.winType.length > 20) {
				endIndex = data.winType.length;
				startIndex = data.winType.length - 20;
			}
			for (var i = startIndex; i < endIndex; i++) {
				img = new eui.Image;
				if (data.winType[i] == 1) {
					dragonWinCount++;
					img.source = "lhdz_battle_json.lhdz_dragon";
				} else if (data.winType[i] == 2) {
					tigerWinCount++;
					img.source = "lhdz_battle_json.lhdz_tiger";
				} else if (data.winType[i] == 3) {
					img.source = "lhdz_battle_json.lhdz_draw";
				}
				this.resultGroup.addChild(img);
			}
			var winProbability: number = Math.floor((dragonWinCount / (dragonWinCount + tigerWinCount)) * 100);
			this.dragonWinValue.text = winProbability + "%";
			this.tigerWinValue.text = (100 - winProbability) + "%";
		}

		private addOtherRoad(index) {
			if (this.bigRoad.addItem(this.resultRoad.bjlResultItems[index].stakeType)) {
				var currCow = this.bigRoad.bigRoadRowLists.length;
				var currCol = this.bigRoad.bigRoadRowLists[currCow - 1].bigRoadItems.length;

				//大眼仔
				if ((currCow == 2 && currCol > 1) || currCow > 2) {
					if (this.blueOrRed(1)) {
						this.dyzRoad.addItem(1, "lhdz_battle_json.dyzl_item_red");
					} else {
						this.dyzRoad.addItem(2, "lhdz_battle_json.dyzl_item_blue");
					}
				}
				//小路
				if ((currCow == 3 && currCol > 1) || currCow > 3) {
					if (this.blueOrRed(2)) {
						this.smallRoad.addItem(1, "lhdz_battle_json.xl_item_red");
					} else {
						this.smallRoad.addItem(2, "lhdz_battle_json.xl_item_blue");
					}
				}
				//曱甴路
				if ((currCow == 4 && currCol > 1) || currCow > 4) {
					if (this.blueOrRed(3)) {
						this.yueyouRoad.addItem(1, "lhdz_battle_json.yyl_item_red");
					} else {
						this.yueyouRoad.addItem(2, "lhdz_battle_json.yyl_item_blue");
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