module game.ermj {
	export class ErmjGameInfo extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjGameInfo.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public roundLightDown: eui.Group;
		public roundLightUp: eui.Group;

		public remainLabel: eui.BitmapLabel;
		public countDownLabel: eui.BitmapLabel;
		public battleStartCountDown: game.BattleStartCountDown;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.battleStartCountDown = new game.BattleStartCountDown();
			this.battleStartCountDown.countDownLabel = this.countDownLabel;
		}

		public reset() {
			egret.Tween.removeTweens(this);
			this.roundLightDown.visible = false;
			this.roundLightUp.visible = false;
			this.roundLightDown.alpha = 1;
			this.roundLightUp.alpha = 1;
			this.remainLabel.text = '0';
			this.countDownLabel.text = '0';
		}

		public showGameInfo(remain, direct, countDown) {
			egret.Tween.removeTweens(this);
			if (direct == 0) {
				this.respireDown();
			} else {
				this.respireUp();
			}
			this.remainLabel.text = remain;
			this.countDownLabel.text = countDown;
			this.battleStartCountDown.startCountDown(countDown);
		}

		public respireDown() {
			this.roundLightDown.visible = true;
			this.roundLightUp.visible = false;
			this.roundLightDown.alpha = 1;
			egret.Tween.removeTweens(this.roundLightUp);
			egret.Tween.removeTweens(this.roundLightDown);
			egret.Tween.get(this.roundLightDown).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000).call(() => {
				this.respireDown();
			}, this);
		}

		public respireUp() {
			this.roundLightUp.visible = true;
			this.roundLightDown.visible = false;
			this.roundLightUp.alpha = 1;
			egret.Tween.removeTweens(this.roundLightUp);
			egret.Tween.removeTweens(this.roundLightDown);
			egret.Tween.get(this.roundLightUp).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000).call(() => {
				this.respireUp();
			}, this);
		}
	}
}