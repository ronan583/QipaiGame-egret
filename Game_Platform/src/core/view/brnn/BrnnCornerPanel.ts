module game.brnn {
	export class BrnnCornerPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public spadeGroup : eui.Group;
		public heartGroup : eui.Group;
		public clubGroup : eui.Group;
		public diamondGroup : eui.Group;
		public spadeNum = 0;
		public heartNum = 0;
		public clubNum = 0;
		public diamondNum = 0;

		protected childrenCreated():void
		{
			super.childrenCreated();
			
			var darkSprite = new egret.Sprite();
	        darkSprite.graphics.clear();
	        darkSprite.graphics.beginFill(0x000000, 1);
	        darkSprite.graphics.drawRect(0, 0, 615, 209);
	        darkSprite.graphics.endFill();
	        darkSprite.width = 615;
	        darkSprite.height = 209;
			this.mask = darkSprite;
			this.addChildAt(darkSprite,0);
		}

		public UpdateCorner(data)
		{
			var img : eui.Image;
			var filterNum : number = 0;
			this.spadeGroup.removeChildren();
			this.heartGroup.removeChildren();
			this.clubGroup.removeChildren();
			this.diamondGroup.removeChildren();
			this.spadeNum = 0;
			this.heartNum = 0;
			this.clubNum = 0;
			this.diamondNum = 0;
			if(data.length > 13)
			{
				filterNum = data.length - 13;
			}
			for(var j = filterNum ; j < data.length ; j++)
			{
				for(var i = 0 ; i < data[j].winFails.length ; i++)
				{
					var winFail = data[j].winFails[i];
					img = new eui.Image();
					if(winFail.isWin)
					{
						img.source = "brnnGame_json.win";
					}else
					{
						img.source = "brnnGame_json.lose";
					}
					img.width = 30;
					img.height = 30;
					//img.width = img.height = 40;
					switch(winFail.type)
					{
						case 1:
						{
							if(winFail.isWin)
							this.spadeNum++;
							this.spadeGroup.addChild(img);
							break;
						}
						case 2:
						{
							if(winFail.isWin)
							this.heartNum++;
							this.heartGroup.addChild(img);
							break;
						}
						case 3:
						{
							if(winFail.isWin)
							this.clubNum++;
							this.clubGroup.addChild(img);
							break;
						}
						case 4:
						{
							if(winFail.isWin)
							this.diamondNum++;
							this.diamondGroup.addChild(img);
							break;
						}
					}
				}
			}
		}
	}
}