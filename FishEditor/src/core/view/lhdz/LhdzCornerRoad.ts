module game.lhdz {
	export class LhdzCornerRoad extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public resultRoad: LhdzResultRoad;
		public bigRoad: LhdzBigRoad;
		public dyzRoad: LhdzThreeRoad;
		public smallRoad: LhdzThreeRoad;
		public yueyouRoad: LhdzThreeRoad;

		protected childrenCreated(): void {
			super.childrenCreated();
			var darkSprite = new egret.Sprite();
			darkSprite.graphics.clear();
			darkSprite.graphics.beginFill(0x000000, 1);
			darkSprite.graphics.drawRect(0, 0, 884, 264);
			darkSprite.graphics.endFill();
			darkSprite.width = 884;
			darkSprite.height = 264;
			this.mask = darkSprite;
			this.addChildAt(darkSprite, 0);
		}

		public Reset() {
			this.resultRoad.clear();
			this.bigRoad.clear();
			this.dyzRoad.clear();
			this.smallRoad.clear();
			this.yueyouRoad.clear();
		}

		public UpdateCorner(data) {
			this.Reset();
			this.resultRoad.updateRoad(data);
			var isRoad = false;
			for (var i = 0; i < this.resultRoad.bjlResultItems.length; i++) {
				this.addOtherRoad(i);
			}
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

	}
}