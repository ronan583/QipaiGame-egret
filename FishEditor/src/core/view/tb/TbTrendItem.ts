module game.tb {
	export class TbTrendItem extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
		public dice1:eui.Image;
		public dice2:eui.Image;
		public dice3:eui.Image;

		public pointNum : eui.BitmapLabel;
		public typeIcon : eui.Image;
		public newIcon : eui.Image;

		private showType:number = 0;
		private diceNums:Array<number> = [];
		private isNew:boolean = false;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.showItem(this.showType, this.diceNums, this.isNew);
		}

		public showItem(type , diceNums , isNew)
		{
			this.showType = type;
			this.diceNums = diceNums;
			this.isNew = isNew;
			if(!this.dice1) return;
			this.dice1.source = "diceGame_json.game_dice_image_trend_dice_" + diceNums[0];
			this.dice2.source = "diceGame_json.game_dice_image_trend_dice_" + diceNums[1];
			this.dice3.source = "diceGame_json.game_dice_image_trend_dice_" + diceNums[2];
			if(isNew)
			{
				this.newIcon.visible = true;
			}else
			{
				this.newIcon.visible = false;
			}
			if(type == 1)
			{
				this.typeIcon.source = "diceGame_json.game_dice_image_trend_txt_da";
			}else 
			if(type == 2)
			{
				this.typeIcon.source = "diceGame_json.game_dice_image_trend_txt_xiao";
			}else
			if(type == 3)
			{
				this.typeIcon.source = "diceGame_json.game_dice_image_trend_txt_bao";
			}
			this.pointNum.text = (diceNums[0] + diceNums[1] + diceNums[2]).toString() + "点";
		}
	}
}