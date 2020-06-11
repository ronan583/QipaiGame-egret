module game.tb {
	export class TbCountDownUI extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbCountDownSkin.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}
        public tbCountTitle :eui.Image;
        public tbCount :eui.BitmapLabel;
        protected childrenCreated():void
		{
			super.childrenCreated();
			this.tbCount.text='';
			
		}   
        public initUI(countIndex,countNum) :void{
			// this.tbCountTitle.text= title;
			if(countIndex == 0)
			{
				this.tbCountTitle.source  = "game_dice_image_main_gui-baccarat_status_kongxian";
			}else if(countIndex == 1)
			{
				this.tbCountTitle.source = "diceGame_json.game_dice_image_main_gui-baccarat_status_xiazhu";
			}else if(countIndex == 2)
			{
				this.tbCountTitle.source = "diceGame_json.game_dice_image_main_gui-baccarat_status_kaijiang";
			}
			this.tbCount.text = countNum;
        }
    }
}