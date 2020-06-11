module game.tb {
	export class TbCornerPanel extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbCornerPanel.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public sizeGroup : eui.Group;
		public totalGroup : eui.Group;
		public oneGroup : eui.Group;
		public twoGroup : eui.Group;
		public threeGroup : eui.Group;
		public sizeNum = 0;
		public totalNum = 0;
		public bigNum =0;
		public smallNum =0;
		public baoZiNum =0;

		protected childrenCreated():void
		{
			super.childrenCreated();
			
			// var darkSprite = new egret.Sprite();
	        // darkSprite.graphics.clear();
	        // darkSprite.graphics.beginFill(0x000000, 1);
	        // darkSprite.graphics.drawRect(0, 0, 624, 207);
	        // darkSprite.graphics.endFill();
	        // darkSprite.width = 624;
	        // darkSprite.height = 207;
			// this.mask = darkSprite;
			// this.addChildAt(darkSprite,0);
		}

		public UpdateCorner(data)
		{
			var sizeLabel : eui.Label;
			var totalLabel : eui.Label;
			var oneImg : eui.Image;
			var twoImg : eui.Image;
			var threeImg : eui.Image;
			var filterNum : number = 0;
			this.sizeGroup.removeChildren();
			this.totalGroup.removeChildren();
			this.oneGroup.removeChildren();
			this.twoGroup.removeChildren();
			this.threeGroup.removeChildren();
			this.sizeNum = 0;
			this.totalNum = 0;
			this.bigNum = 0;
			this.smallNum = 0;
			this.baoZiNum = 0;
			var tb1:number;
			var tb2:number;
			var tb3:number;
			var total:number;
			if(data.length > 15)
			{
				filterNum = data.length - 15;
			}
			for(var j = filterNum ; j < data.length ; j++)
			{
				tb1=data[j].diceNumbers[0];
				tb2=data[j].diceNumbers[1];
				tb3=data[j].diceNumbers[2];

				total=tb1+tb2+tb3;
				
				oneImg = new eui.Image();
				oneImg.source='tbGame_json.tb'+tb1;
				this.oneGroup.addChild(oneImg);

				twoImg = new eui.Image();
				twoImg.source='tbGame_json.tb'+tb2;
				this.twoGroup.addChild(twoImg);

				threeImg = new eui.Image();
				threeImg.source='tbGame_json.tb'+tb3;
				this.threeGroup.addChild(threeImg);

				totalLabel =new eui.Label();
				totalLabel.text=total.toString();
				totalLabel.size=23;
				totalLabel.width=33;
				totalLabel.height=33;
				totalLabel.verticalAlign=egret.VerticalAlign.MIDDLE;
				totalLabel.textAlign=egret.HorizontalAlign.CENTER;
				this.totalGroup.addChild(totalLabel);

				sizeLabel=new eui.Label();
				sizeLabel.size=23;
				sizeLabel.width=33;
				sizeLabel.height=33;
				if(total>10){
					sizeLabel.text='大';
					sizeLabel.textColor=0xFF0808;
					this.bigNum+=1;
				}else{
					sizeLabel.text='小';
					sizeLabel.textColor=0x08B1FF;
					this.smallNum+=1;
				}
				this.sizeGroup.addChild(sizeLabel);
				
				if(tb1==tb2&&tb1==tb3){
					this.baoZiNum+=1;
				}
				this.totalNum=data.length-filterNum;
				
			}
		}
	}
}