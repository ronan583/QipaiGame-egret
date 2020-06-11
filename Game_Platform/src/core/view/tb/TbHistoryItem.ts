module game.tb {
	export class TbHistoryItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbHistoryItemSkin.exml';
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
			
		}	

		public UpdateCorner(data)
		{
			var sizeImage : eui.Image;
			var totalImage : eui.Image;
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
                oneImg.width=30;
                oneImg.height=30;
				oneImg.source='tbGame_json.tb'+tb1;
				this.oneGroup.addChild(oneImg);

				twoImg = new eui.Image();
                twoImg.width=30;
                twoImg.height=30;
				twoImg.source='tbGame_json.tb'+tb2;
				this.twoGroup.addChild(twoImg);

				threeImg = new eui.Image();
                threeImg.width=30;
                threeImg.height=30;
				threeImg.source='tbGame_json.tb'+tb3;
				this.threeGroup.addChild(threeImg);

				totalImage =new eui.Image();
				totalImage.width=30;
				totalImage.height=30;
                totalImage.source='tbGame_json.'+total;
				this.totalGroup.addChild(totalImage);

				sizeImage=new eui.Image();
				sizeImage.width=33;
				sizeImage.height=33;
				if(total>10){
					sizeImage.source='';
				}else{
					sizeImage.source='';
				}
				this.sizeGroup.addChild(sizeImage);
				
			}
		}
	}
}