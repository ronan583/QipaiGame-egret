module game.ermj {
	export class ErmjSelectGroupPanel extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjSelectGroupPanel.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public selectGroup: eui.Group;
		public titleImg: eui.Image;
		public gangObjs: Array<Object[]>;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public showChi(chiCards: Array<number[]>) {
			this.visible = true;
			this.titleImg.source = "ermj_battle_json.select_bg";
			while (this.selectGroup.numChildren > 0) {
				this.selectGroup.removeChildAt(0);
			}
			var smallCard: ErmjSmallGroup;
			for (var i = 0; i < chiCards.length; i++) {
				smallCard = new ErmjSmallGroup();
				this.selectGroup.addChild(smallCard);
				smallCard.showChi3(chiCards[i]);
				smallCard.scaleX = smallCard.scaleY = 0.8;
				smallCard.bg.visible = true;
				this.SendBattleStep(smallCard, chiCards[i])
			}
		}

		public SendBattleStep(smallCard, cards: number[]) {
			smallCard.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
				ErmjRequest.SendBattleStep(MJPlayType.Chi, cards);
			}, this);
		}

		public hidePanel() {
			this.visible = false;
		}

		public showGang(gangObjs: Array<Object[]>) {
			this.visible = true;
			this.gangObjs = gangObjs;
			this.titleImg.source = "ermj_battle_json.select_bg";
			while (this.selectGroup.numChildren > 0) {
				this.selectGroup.removeChildAt(0);
			}
			var smallCard: ErmjSmallGroup;
			for (var i = 0; i < gangObjs.length; i++) {
				smallCard = new ErmjSmallGroup();
				this.selectGroup.addChild(smallCard);
				if (smallCard.bg) smallCard.bg.visible = true;
				smallCard.currentState = "gang";
				smallCard.showGang(gangObjs[i]["card"], gangObjs[i]["playType"]);
				smallCard.scaleX = smallCard.scaleY = 0.8;
				this.SendBattleKongStep(smallCard, gangObjs[i]["card"], gangObjs[i]["playType"]);
			}
		}

		public SendBattleKongStep(smallCard, cards: number[], cardType) {
			smallCard.addEventListener(egret.TouchEvent.TOUCH_TAP, (event) => {
				ErmjRequest.SendBattleStep(cardType, cards);
			}, this);
		}
	}
}