class Coin extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public iconLabel:eui.BitmapLabel;
	private num:number = 0;
	private chipImg:eui.Image;

	protected childrenCreated():void
	{
		super.childrenCreated();
		if(this.num > 0) {
			this.showCoin(this.num);
		}
		this.anchorOffsetX = this.width /2;
		this.anchorOffsetY = this.height /2; 
	}

	public showCoin(num:number):void {
		if(this.iconLabel != null) {
			this.iconLabel.text = num.toFixed(0);
			let level = game.RoomManager.getInstance().curRoomData.gameLevel;
			if(level == 0) level = 2;
			let arr:Array<number> = [
				game.GameConst.betConfig[level * 100],
				game.GameConst.betConfig[level * 100 + 1],
				game.GameConst.betConfig[level * 100 + 2],
				game.GameConst.betConfig[level * 100 + 3],
				game.GameConst.betConfig[level * 100 + 4],
			];
			let flag:number = 0;
			for(let i=0;i<arr.length;i++) {
				if(arr[i] >= num) {
					flag = i;
					break;
				}
			}

			this.chipImg.source = "zjh_chip_" + flag.toFixed(0);
		} else {
			this.num = num;	
		}
	}
	
}
