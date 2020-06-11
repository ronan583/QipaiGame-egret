class FruitCrazyIcon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.levelImgs = [this.level1, this.level2, this.level3, this.level4];
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	
	private level1:eui.Image;
	private level2:eui.Image;
	private level3:eui.Image;
	private level4:eui.Image;
	private moneyLabel:eui.BitmapLabel;

	private levelImgs:Array<eui.Image> ;

	private boom:eui.Image;
	public level:number;
	public index:number;

	private updateRewardIndex:number;
	private startShowRewardTime:number;
	private targetReward:number;
	private bottomBet:number;
	public showLevel(level:number, index:number):void {
		this.level = level;
		this.index = index;
		for(let levelImg of this.levelImgs) {
			levelImg.visible = false;
		}
		this.boom.visible = false;
		this.moneyLabel.visible = false;
		this.levelImgs[level].visible = true;
	}

	public showBoom():void {
		for(let levelImg of this.levelImgs) {
			levelImg.visible = false;
		}
		this.boom.visible = true;
	}

	public showLight(isLight:boolean):void {
		if(isLight) {
			this.filters = [];
			this.touchEnabled = true;
		} else {
			var colorMatrix = [
				0.3,0.6,0,0,0,
				0.3,0.6,0,0,0,
				0.3,0.6,0,0,0,
				0,0,0,1,0
			];
			var flilter = new egret.ColorMatrixFilter(colorMatrix);
			this.filters = [flilter];
			this.touchEnabled = false;
			this.touchChildren = false;
		}
	}

	public showMoney(money:number):void {
		this.moneyLabel.text = money.toFixed(2);
		this.moneyLabel.visible = true;
	}

	private onClick():void {
		this.bottomBet = game.RoomManager.getInstance().curRoomData.bottomBet;
		if(this.level < game.sgj.FruitData.instance.crazyArr.length) {
			// 开奖
			this.moneyLabel.visible = true;
			this.moneyLabel.text = this.bottomBet.toFixed(2);
			this.targetReward = game.sgj.FruitData.instance.crazyArr[this.level];
			this.startShowRewardTime = egret.getTimer();
			this.updateRewardIndex = 1;
			egret.startTick(this.updateRewardShow, this);
			game.AppFacade.getInstance().sendNotification(PanelNotify.UPDATE_FRUIT_CRAZY_REWARD, this);
		} else {
			this.boom.visible = true;
			for(let levelImg of this.levelImgs) {
				levelImg.visible = false;
			}
			var mc:game.CommonMC = new game.CommonMC("Boom_mc_json", "Boom_tex_png", "Boom", this.width, this.height);
			this.addChild(mc);
			mc.x = this.width / 2;
			game.sgj.FruitSoundPlayer.instance.playSound(game.sgj.FruitSoundType.SMALL_BOOM);
			/*
			var data = RES.getRes("Boom_mc_json");
            var txtr = RES.getRes("Boom_tex_png");
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
			
            var mc = new egret.MovieClip(mcFactory.generateMovieClipData("Boom"));
			this.addChild(mc);
			mc.play(-1);
			mc.x =0;
			mc.y =0;
			*/
			game.AppFacade.getInstance().sendNotification(PanelNotify.UPDATE_FRUIT_CRAZY_BOOM, this);
		}
	}

	private updateRewardShow(timestamp:number):boolean {
		if(timestamp - this.startShowRewardTime > 50) {
			this.updateRewardIndex++;
			if(this.updateRewardIndex > this.targetReward) {
				egret.stopTick(this.updateRewardShow, this);
			} else {
				this.moneyLabel.text = (this.bottomBet * this.updateRewardIndex).toFixed(2);
			}
		}
		return false;
	}

}