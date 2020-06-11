module game.tb {
	export class TbResultPanel extends ResizePanel implements eui.UIComponent{
		public constructor() {
			super();
		}
		
		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public winAnim : CommonDBLoop2;
		public loseAnim : CommonDBLoop2;

		public noStakeIcon : eui.Image;
		public resultGroup : eui.Group;
		public bankerWinLabel : eui.BitmapLabel;
		public bankerLoseLabel : eui.BitmapLabel;
		public selfWinLabel : eui.BitmapLabel;
		public selfLoseLabel : eui.BitmapLabel;
		public okBtn : IButton;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onClose , this);
		}

		public showResult(data)
		{
			this.resultGroup.removeChildren();
			let tempInfo;
			let selfNum = 0;
			let bankerNum = 0;
			let playerInfo : game.PlayerInfo;
			for(var i = 0 ; i < data.length ; i++)
			{
				tempInfo = data[i];
				if(i == 0)
				{
					bankerNum = tempInfo.money;
				}
				if(i == 1) {
					selfNum = tempInfo.money;
				}
			}
			if(selfNum == 0)
			{
				this.selfWinLabel.visible = false;
				this.selfLoseLabel.visible = false;
				this.noStakeIcon.visible = true;
				if(this.winAnim == null)
				{
					this.winAnim = new CommonDBLoop2("winAnim_ske_json","winAnim_tex_json","winAnim_tex_png","winAnim",false);
				}
				this.resultGroup.addChild(this.winAnim);
				TbSoundPlayer.instance.playWinCoin();
			}else
			{
				this.noStakeIcon.visible = false;
				if(selfNum > 0)
				{
					if(this.winAnim == null)
					{
						this.winAnim = new CommonDBLoop2("winAnim_ske_json","winAnim_tex_json","winAnim_tex_png","winAnim");
					}
					this.resultGroup.addChild(this.winAnim);
					this.selfWinLabel.visible = true;
					this.selfLoseLabel.visible = false;
					this.selfWinLabel.text = "+" + selfNum.toFixed(2);
					TbSoundPlayer.instance.playWinCoin();
				}else
				{
					if(this.loseAnim == null)
					{
						this.loseAnim = new CommonDBLoop2("loseAnim_ske_json","loseAnim_tex_json","loseAnim_tex_png","loseAnim");
					}
					this.resultGroup.addChild(this.loseAnim);
					this.selfWinLabel.visible = false;
					this.selfLoseLabel.visible = true;
					this.selfLoseLabel.text = selfNum.toFixed(2);
					TbSoundPlayer.instance.playLoseCoin();
				}
			}
			if(bankerNum > 0)
			{
				this.bankerWinLabel.text = "+" + bankerNum.toFixed(2);
				this.bankerWinLabel.visible = true;
				this.bankerLoseLabel.visible = false;
			}else
			{
				this.bankerLoseLabel.text = bankerNum.toFixed(2);
				this.bankerWinLabel.visible = false;
				this.bankerLoseLabel.visible = true;
			}
			egret.setTimeout(function(){
				this.visible = false;
			} , this , 5000);
		}

		public onClose(event)
		{
			this.visible = false;
		}
	}
}