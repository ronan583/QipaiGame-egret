module game.hhdz {
	export class HHCard extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/hhdz/HHCard.exml";
		}

		public bg: eui.Image;
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public updateCard(card: any): void {
			this.bg.source = "othercards_json.oc_" + card;
			console.log(this.bg.source);
		}

		/**
		 * 显示牌的正面或者背面
		 */
		public showBack(): void {
			this.bg.source = "hhdz_desk004";
		}

		/**
	 	* 显示扑克牌数字
	 	*/
		public showCard(cardNum: number, listener: Function = null, target: any = null): void {
			SoundMenager.instance.playEffect("fanpai_mp3");
			egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2 }, 200).call(() => {
				egret.Tween.get(this).to({ scaleX: 0 }, 200).call(() => {
					this.updateCard(cardNum);
					egret.Tween.get(this).to({ scaleX: 1.2 }, 200).call(() => {
						if (listener != null) {
							egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200).call(listener, target);
						} else {
							egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 200);
						}
					}, this);
				}, this);
			});
		}

		public showCardSimpleEffect(cardNum: number): void {
			SoundMenager.instance.playEffect("fanpai_mp3");
			// egret.Tween.get(this).to({ scaleX: 1.2, scaleY: 1.2 }, 200).call(() => {
				egret.Tween.get(this).to({ scaleX: 0 }, 200).call(() => {
					this.updateCard(cardNum);
					egret.Tween.get(this).to({ scaleX: 1 }, 200);
				}, this);
			// });
		}

		public showCardDirect(cardNum: number) {
			egret.Tween.removeTweens(this);
			this.updateCard(cardNum);
			this.scaleX = this.scaleY = 1;
		}

		public clearAllCardTween() {
			egret.Tween.removeTweens(this);
		}

		public showDefault() {
			egret.Tween.removeTweens(this);
			this.showBack();
			this.scaleX = this.scaleY = 1;
		}

	}
}