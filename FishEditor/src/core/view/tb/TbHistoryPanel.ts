module game.tb {
	export class TbHistoryPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbHistoryPanelSkin.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public historyGroup : eui.Group;
		// public itemGroup : eui.Group;
		// public popBtn : IButton;
		private status = false;


		protected childrenCreated():void
		{
			super.childrenCreated();
			// this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
			// this.popBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPopMenu , this);
			// this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCheckFocus , this);
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
				// this.popBtn.visible = false;
			}
		}

		public hideMenu()
		{
			if(this.status)
			{
				// TgpdSoundPlayer.instance.playerButton();
				egret.Tween.get(this.historyGroup).to({y : -this.historyGroup.height}, 500);
				this.status = false;
				// this.popBtn.visible = true;
			}
		}
		public initHistoryPanel(rounds)
		{
			// this.itemGroup.removeChildren();
			// var brnnHistoryItem :BrnnHistoryItem;
			var filterNum = 0;
			if(rounds.length > 13)
			{
				filterNum = rounds.length - 13;
			}
			for(var i = filterNum ; i < rounds.length - 1 ; i++)
			{
				// brnnHistoryItem = new BrnnHistoryItem();
				// this.itemGroup.addChild(brnnHistoryItem);
				// brnnHistoryItem.initData(rounds[i].isWin);
			}
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