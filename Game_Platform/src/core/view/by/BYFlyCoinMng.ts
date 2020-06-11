module game.by {
	export class BYFlyCoinMng {
		private static _instance:BYFlyCoinMng;
		public static get instance():BYFlyCoinMng {
			if(!BYFlyCoinMng._instance) BYFlyCoinMng._instance = new BYFlyCoinMng();
			return BYFlyCoinMng._instance;
		}
		public constructor() {
		}

		private fish:NFish|NFishRing;

		public showCoins(fishPos:egret.Point, canonPos:egret.Point, byBattleUI:BYBattleUI, fish:NFish|NFishRing, 
				count:number, isBig:boolean, deadInfo:game.by.FishDeadInfo):void {
			for(let i=0;i<count;i++) {
				let effectStr = isBig ? "buyu_jinbi" : "buyu_yinbi";
				let byCoins:game.by.BYEffect = game.by.BYEffectFactory.getEffect(effectStr, false);
				egret.setTimeout(() => {
					this.fish = fish;
					this.fish.stopMotion();
					this.fish.dead(1000);
					if(fishPos.x == 0 && fishPos.y == 0) return;
					byBattleUI.addChild(byCoins);
					let xm = fishPos.x - 50;
					let xmx = fishPos.x + 50;
					byCoins.x = xm + Math.random() * (xmx - xm);
					byCoins.y = fishPos.y + 150;
					byCoins.scaleX = byCoins.scaleY = 0.6;
					if(i == count - 1) {
						egret.Tween.get(byCoins).to({y:fishPos.y},500, egret.Ease.backInOut).call(
							()=>{
								egret.setTimeout(this.startFly, this, 500, byCoins, canonPos, deadInfo);
							}, this
						);
						game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_BY_ADD_MONEY, deadInfo);
					} else {
						egret.Tween.get(byCoins).to({y:fishPos.y},500, egret.Ease.backInOut).call(
							()=>{
								egret.setTimeout(this.startFly, this, 500, byCoins, canonPos, deadInfo);
							}, this
						);
					}
				}, this, i * 200);
			}
		}

		private startFly(byCoins:game.by.BYEffect, canonPos:egret.Point, deadInfo:game.by.FishDeadInfo):void {
			egret.Tween.removeTweens(byCoins);
			var tw:egret.Tween = egret.Tween.get(byCoins);
			var coins:game.by.BYEffect = byCoins;
			tw.to({x:canonPos.x,y:canonPos.y},500).call(()=>{
				if(coins && coins.parent) {
					coins.parent.removeChild(coins);	
				}
			});
		}
	}
}