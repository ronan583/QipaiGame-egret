module game.brnn {
	export class BrnnHistoryPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public historyGroup : eui.Group;
		public itemGroup : eui.Group;
		public newResultItem : BrnnHistoryItem;
		public popBtn : IButton;
		private status = false;
		private winCount1:eui.BitmapLabel;
		private winCount2:eui.BitmapLabel;
		private winCount3:eui.BitmapLabel;
		private winCount4:eui.BitmapLabel;

		protected childrenCreated():void
		{
			super.childrenCreated();
			// this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
			this.popBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPopMenu , this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCheckFocus , this);
		}

		public onCheckFocus(event:egret.TouchEvent)
		{
			/*
			if(!this.isThis(event.target))
			{
				this.hideMenu();
			}
			*/
		}

		public isThis(target)
		{
			if(!target) return false;
			if(target == this.stage)
			{
				return false;
			}
			if(target != this)
			{
				return this.isThis(target.parent);
			}else
			{
				return true;
			}
		}


		public onPopMenu(event)
		{
			if(!this.status)
			{
				// TgpdSoundPlayer.instance.playerButton();
				egret.Tween.get(this.historyGroup).to({y : 0 }, 500);
				this.status = true;
				this.popBtn.visible = false;
			}
		}

		public hideMenu()
		{
			if(this.status)
			{
				// TgpdSoundPlayer.instance.playerButton();
				egret.Tween.get(this.historyGroup).to({y : -this.historyGroup.height}, 500);
				this.status = false;
				this.popBtn.visible = true;
			}
		}
		public initHistoryPanel(rounds)
		{
			// this.itemGroup.removeChildren();
			for(let i=0;i<this.itemGroup.numChildren;i++) {
				this.itemGroup.getChildAt(i).visible = false;
			}
			let flag = 1;
			let winCountArr = [0,0,0,0];
			let winCountEndArr = [0,0,0,0]
			for(let i = rounds.length - 1;i >= 0;i--) {
				let index = this.itemGroup.numChildren - flag;
				if(index < 0) continue;
				let item = <BrnnHistoryItem>this.itemGroup.getChildAt(index);
				item.initData(rounds[i].isWin);
				item.visible = true;
				flag++;
				for(let j=0;j<rounds[i].isWin.length;j++) {
					if(rounds[i].isWin[j]) {
						if(winCountEndArr[j] == 0) {
							winCountArr[j] = winCountArr[j] + 1;
						}
					} else {
						winCountEndArr[j] = 1;
					}
				}
			}
			this.winCount1.text = winCountArr[0].toFixed(0);
			this.winCount2.text = winCountArr[1].toFixed(0);
			this.winCount3.text = winCountArr[2].toFixed(0);
			this.winCount4.text = winCountArr[3].toFixed(0);
			// if(rounds.length > 0)
			// {
			// 	if(!this.newResultItem.visible)
			// 	{
			// 		this.newResultItem.visible = true;
			// 	}
			// 	this.newResultItem.initData(rounds[rounds.length - 1].isWin);
			// }else
			// {
			// 	this.newResultItem.visible = false;
			// }
		}

		private closePanel(event : egret.TouchEvent)
		{
			PopUpManager.removePopUp(this , 1);
		}
	}
}