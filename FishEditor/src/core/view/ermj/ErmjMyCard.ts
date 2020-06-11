module game.ermj {
	export class ErmjMyCard extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjMyCard.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		public drawCardGroup: egret.tween.TweenGroup;
		public selectCardGroup: egret.tween.TweenGroup;
		public pushGroup: egret.tween.TweenGroup;
		public cancelGroup: egret.tween.TweenGroup;
		public normalGroup: egret.tween.TweenGroup;
		public image: eui.Image;
		public darkSprite: egret.Sprite;


		private _selected = false;
		public cardIndex: number = 0;

		public get selected(): boolean {
			return this._selected;
		}
		public set selected(value: boolean) {
			if (value != this._selected) {
				this._selected = value;
				console.log('selected ========= ',this._selected);
				if (this.darkSprite != null && this.darkSprite.visible) {
					return;
				}
				if (value) {
					this.playSelectCardGroup();
				} else {
					this.playCancelCardGroup();
				}
			}
		}

		public cloneCard() {
			var card = new ErmjMyCard();
			this.parent.addChild(card);
			card.image.source = this.image.source;
			card.cardIndex = this.cardIndex;

			return card;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public playDrawCard(cardIndex: number) {
			this.drawCardGroup.stop();
			this.cardIndex = cardIndex;
			this.image.source = "ermj_battle_json.title" + cardIndex;
			TweenUtils.playAnimation(this.drawCardGroup, false);
		}

		public playDrawCard2(cardIndex: number) {
			this.drawCardGroup.stop();
			if (cardIndex != 0) {
				this.cardIndex = cardIndex;
				this.image.source = "ermj_battle_json.otherTiles" + cardIndex;
			} else {
				this.image.source = "ermj_battle_json.title0";
			}
			TweenUtils.playAnimation(this.drawCardGroup, false);
		}

		public playHuCard(cardIndex: number) {
			if (cardIndex != 0) {
				this.cardIndex = cardIndex;
				this.image.source = "ermj_battle_json.otherTiles" + cardIndex;
			} 
		}

		public playSelectCardGroup() {
			this.selected = true;
			this.selectCardGroup.stop();
			TweenUtils.playAnimation(this.selectCardGroup, false);
		}

		public playCancelCardGroup() {
			this.cancelGroup.stop();
			TweenUtils.playAnimation(this.cancelGroup, false);
		}

		public playPushCardGroup() {
			this.pushGroup.stop();
			TweenUtils.playAnimation(this.pushGroup, false);
		}

		public stopPushGroup() {
			this.pushGroup.stop();
			TweenUtils.stopAnimation(this.pushGroup);
		}

		public playNormaGroup() {
			TweenUtils.playAnimation(this.normalGroup, false);
		}

		public showDark() {
			if (this.darkSprite != null && this.darkSprite.visible) {
				return;
			}
			this.selected = false;
			if (this.darkSprite == null) {
				this.darkSprite = new egret.Sprite();
				this.darkSprite.graphics.clear();
				this.darkSprite.graphics.beginFill(0x000000, 0.5);
				this.darkSprite.graphics.drawRect(0, 0, this.image.width, this.image.height);
				this.darkSprite.graphics.endFill();
				this.darkSprite.width = this.width;
				this.darkSprite.height = this.height;
				this.addChild(this.darkSprite);
			} else {
				this.darkSprite.visible = true;
			}
		}

		public hideDark() {
			if (this.darkSprite != null) {
				this.darkSprite.visible = false;
			}
		}
	}
}