module game.bjl {
	export class BjlTrendPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		public showRoadBtn : eui.Image;
		public hideRoadBtn : eui.Image;
		public trendGroup : eui.Group;
		public roadGroup : eui.Group;
		public trendContent : BjlTrendContent;	
		private cornerPanel:BjlCornerPanel;

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		protected childrenCreated():void
		{
			super.childrenCreated();
			this.showRoadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onShowRoadGroup , this);
			this.hideRoadBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHideRoadGroup , this);
			this.touchChildren = true;
			this.touchEnabled = false;
		}

		public showDefault() {
			this.trendGroup.visible = true;
			this.roadGroup.visible = false;
		}

		public updateTrendPanel(data) : void
		{
			this.trendContent.UpdateContent(data.winFails);
			this.cornerPanel.UpdateCorner(data);
		}

		public addItem(winType){
			//this.trendContent.addItemAndValue(winType);
		}

		public onShowRoadGroup(event)
		{
			this.roadGroup.visible = true;
			this.trendGroup.visible = false;
			//egret.Tween.get(this.roadGroup).to({y : 0 }, 500);
			//egret.Tween.get(this.trendGroup).to({y : 456 }, 500);
		}

		public onHideRoadGroup(event)
		{
			/*
			egret.Tween.get(this.roadGroup).to({y : 456 }, 500).call(()=>{
				
			});
			egret.Tween.get(this.trendGroup).to({y : 308 }, 500).call(()=>{
				
			});
			*/
			this.roadGroup.visible = false;
			this.trendGroup.visible = true;
		}

	}
}