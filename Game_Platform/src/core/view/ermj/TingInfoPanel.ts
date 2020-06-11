module game.ermj {
	export class TingInfoPanel extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/TingInfoPanel.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		public bgImg: eui.Image;
		public cardGroup: eui.Group;
		public rateLabel: eui.Label;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public showTingInfo(tingHuInfos) {
			var tingCard: TingInfoCard;
			this.cardGroup.removeChildren();
			for (var i = 0; i < tingHuInfos.length; i++) {
				tingCard = new TingInfoCard();
				tingCard.width = 174;
				tingCard.height = 104;
				this.cardGroup.addChild(tingCard);

				tingCard.cardIcon.source = "ermj_battle_json.playedTiles" + tingHuInfos[i].card;//牌
				tingCard.fanLabel.text = tingHuInfos[i].fan + "番";//番数
				tingCard.numLabel.text = tingHuInfos[i].huCount + "张";//可胡牌数
			}
			if (this.cardGroup.numChildren <= 5) {
				this.currentState = "single";
				this.bgImg.width = this.cardGroup.numChildren * 174 + 160;
				this.width = this.bgImg.width;
			} else {
				this.currentState = "double";
			}
			this.bgImg.validateNow();
			this.cardGroup.validateNow();
			this.validateSize(true);
		}
	}
}