module game.ddz {
	export class DDZCartoon extends eui.Component implements  eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		protected childrenCreated():void
		{
			super.childrenCreated();
			this.landlord.visible = false;
			this.farm.visible = false;
			this.bianshe.visible = false;
		}
		
		private landlord:DragonAnim;
		private farm:DragonAnim;
		private curAnim:DragonAnim;
		private bianshe:DragonAnim;
		public curRole:DDZPlayerRole;

		public hideAll() {
			this.landlord.visible = false;
			this.farm.visible = false;
			this.bianshe.visible = false;
		}

		public setRole(role:DDZPlayerRole) {
			this.stop();
			this.curRole = role;
			if(role == DDZPlayerRole.FARMER) {
				this.farm.visible = true;
				this.landlord.visible = false;
				this.curAnim = this.farm;
			} else if(role == DDZPlayerRole.LANDLORD) {
				this.farm.visible = false;
				this.landlord.visible = true;
				this.curAnim = this.landlord;
			}
			this.curAnim.scaleX = 0.1;
			this.curAnim.scaleY = 0.1;
			this.curAnim.y = this.height / 2;
			egret.Tween.get(this.curAnim).to({scaleX:1, scaleY:1, y:0}, 1000, egret.Ease.backOut);
			this.playAction(RoleAction.IDLE);
			// 同时显示一个变身动画
			this.bianshe.visible = true;
			this.bianshe.playerOnce(()=>{
				this.bianshe.visible = false;
			}, this, "animation");
		}

		private getActionAnimName(action:RoleAction) {
			if(action == RoleAction.ATTACK) {
				return "attack";
			} else if(action == RoleAction.IDLE) {
				return "idle";
			} else if(action == RoleAction.LOSE) {
				return "lose";
			} else if(action == RoleAction.SKILL) {
				return "skill";
			} else if(action == RoleAction.WIN) {
				return "win";
			}
			return "";
		}

		public playAction(action:RoleAction) {
			if(!this.curAnim) return;
			let actionName = this.getActionAnimName(action);
			if(action == RoleAction.IDLE || action == RoleAction.LOSE || action == RoleAction.WIN) {
				this.curAnim.setLoop(true);
				this.curAnim.playerAnimOnce(actionName, 0);
			} else {
				this.curAnim.setLoop(false);
				this.curAnim.playerOnce(()=>{
					// 播放完之后接着播放idle
					this.curAnim.setLoop(true);
					this.curAnim.playerAnimOnce("idle", 0);
				}, this, actionName);
			}
		}

		public stop() {
			if(this.curAnim) {
				this.curAnim.setLoop(false);
				this.curAnim.stop();
			}
		}
	}
}
