module game.hhdz {
	export class HhdzCornerRoad extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public resultRoad: HhdzResultRoad;
		public bigRoad: HhdzBigRoad;
		public dyzRoad: HhdzThreeRoad;
		public smallRoad: HhdzThreeRoad;
		public yueyouRoad: HhdzThreeRoad;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.touchEnabled = false;
			this.touchChildren = false;
			var darkSprite = new egret.Sprite();
			darkSprite.graphics.clear();
			darkSprite.graphics.beginFill(0x000000, 1);
			darkSprite.graphics.drawRect(0, 0, 662, 175);
			darkSprite.graphics.endFill();
			darkSprite.width = 662;
			darkSprite.height = 175;
			this.mask = darkSprite;
			this.addChildAt(darkSprite, 0);
		}

		public Reset() {
			this.bigRoad.clear();
			this.dyzRoad.clear();
			this.smallRoad.clear();
			this.yueyouRoad.clear();
		}

		public UpdateCorner(data) {
			this.Reset();
			this.resultRoad.updateRoad(data);
			var isRoad = false;
			for (var i = 0; i < data.length; i++) {
				this.addOtherRoad(data[i]);
			}
		}

		private addOtherRoad(winType : number) {
			if (this.bigRoad.addItem(winType)) {
				var currCow = this.bigRoad.bigRoadRowLists.length;
				var currCol = this.bigRoad.bigRoadRowLists[currCow - 1].bigRoadItems.length;

				//大眼仔
				if ((currCow == 2 && currCol > 1) || currCow > 2) {
					if (this.blueOrRed(1)) {
						this.dyzRoad.addItem(1, "hhdzGame_json.dyzl_item_red");
					} else {
						this.dyzRoad.addItem(2, "hhdzGame_json.dyzl_item_blue");
					}
				}
				//小路
				if ((currCow == 3 && currCol > 1) || currCow > 3) {
					if (this.blueOrRed(2)) {
						this.smallRoad.addItem(1, "hhdzGame_json.xl_item_red");
					} else {
						this.smallRoad.addItem(2, "hhdzGame_json.xl_item_blue");
					}
				}
				//曱甴路
				if ((currCow == 4 && currCol > 1) || currCow > 4) {
					if (this.blueOrRed(3)) {
						this.yueyouRoad.addItem(1, "hhdzGame_json.yyl_item_red");
					} else {
						this.yueyouRoad.addItem(2, "hhdzGame_json.yyl_item_blue");
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
	}
}