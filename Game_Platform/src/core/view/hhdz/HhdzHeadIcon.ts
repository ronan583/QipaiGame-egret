module game.hhdz {
	export class HhdzHeadIcon extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		public playerInfo:game.PlayerInfo;
		protected contentGroup:eui.Group;
		protected headChangeAnim:DragonAnim;
		protected playerWinAnim:DragonAnim;
		private iconPos:eui.Group;
		public side:number = 0;

		protected childrenCreated():void
		{
			super.childrenCreated();
			if(this.headChangeAnim) this.headChangeAnim.visible = false;
			if(this.playerWinAnim) this.playerWinAnim.visible = false;
		}

		public showWinAnim() {
			if(this.playerWinAnim) {
				this.playerWinAnim.visible = true;
				this.playerWinAnim.playerOnce(()=>{
					this.playerWinAnim.visible = false;
				}, this);
			}
		}

		public showByPlayer(playerInfo:PlayerInfo) {
			this.visible = true;
			let isShowChange = false;
			if(playerInfo.postion >= 2 && playerInfo.postion <= 7) {
				if(this.playerInfo && this.playerInfo.playerId != playerInfo.playerId) {
					isShowChange = true;
				}
			}
			if(isShowChange) {
				this.headChangeAnim.visible = true;
				this.headChangeAnim.playerOnce(()=>{
					this.headChangeAnim.visible = false;
				}, this);
				CommonUtil.registerTimeOut(()=>{
					this.showPlayer(playerInfo);
				}, this, 450);
			} else {
				this.showPlayer(playerInfo);
			}
			this.playerInfo = playerInfo;
		}

		protected showPlayer(playerInfo:PlayerInfo) {

		}
		
		public hide(): void {
			this.visible = false;
		}

		public stakePosEffect() {
			if(this.contentGroup) 
			{
				egret.Tween.removeTweens(this.contentGroup);
				if(!this.playerInfo || this.playerInfo.postion == 1 || this.playerInfo.postion == 0) return;
				if(this.side == 0) return;
				this.contentGroup.x = 0;
				let targetX = (this.side == 1?20:-20);
				egret.Tween.get(this.contentGroup).to({x:targetX}, 150).call(
					()=>{
						egret.Tween.get(this.contentGroup).to({x:0}, 150);
					}, this
				)
				return targetX;
			}
		}

		public clearPlayerInfo() {
			this.playerInfo = null;
		}

		public getHeadPos():egret.Point {
			if(this.iconPos) {
				return this.iconPos.localToGlobal(this.iconPos.width / 2, this.iconPos.height / 2);
			}
			return new egret.Point(0,0);
		}
	}
}