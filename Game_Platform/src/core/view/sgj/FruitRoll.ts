class FruitRoll extends eui.Component implements  eui.UIComponent {
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
		this.fruitIcons = [this.fruitIcon1, this.fruitIcon2, this.fruitIcon3,
			this.fruitIcon4, this.fruitIcon5, this.fruitIcon6,
			this.fruitIcon7, this.fruitIcon8, this.fruitIcon9]
		this.fruitContainer.mask = this.maskRect;
		this.originFruitContainerY = this.fruitContainer.y;
	}

	private fruitContainer:eui.Group;
	private maskRect:eui.Rect;
	private flagy:number;
	private originFruitContainerY:number;

	private fruitIcon1:FruitIcon;
	private fruitIcon2:FruitIcon;
	private fruitIcon3:FruitIcon;
	private fruitIcon4:FruitIcon;
	private fruitIcon5:FruitIcon;
	private fruitIcon6:FruitIcon;
	private fruitIcon7:FruitIcon;
	private fruitIcon8:FruitIcon;
	private fruitIcon9:FruitIcon;

	private fruitIcons:Array<FruitIcon>;
	private totalArr:Array<number>;
	private tickIndex:number;
	private isEnding:boolean = false;
	private endIndex:number = 0;
	public rollIndex:number = 0;
	private speed:number = 0;
	private addSpeed:number = 60;
	private maxSpeed:number = 0;
	private maxTick:number = 0;
	private targetArr:Array<number> = [0,0,0];

	public showRoll(arr:Array<number>,curArr:Array<number>, index:number):void {
		let targetArr:Array<number> = arr;
		this.totalArr = [];
		this.targetArr = targetArr;
		this.totalArr.push(targetArr[0]);
		this.totalArr.push(targetArr[1]);
		this.totalArr.push(targetArr[2]);
		this.totalArr.push(curArr[0]);
		this.totalArr.push(curArr[1]);
		this.totalArr.push(curArr[2]);
		for(let i=0;i<3;i++) {
			this.totalArr.push(CommonUtil.RandomRangeInt(1,11));
		}
		this.showFruit();
		this.maxTick = index + 7;
	}

	private showFruit():void {
		for(let i=0;i<this.totalArr.length;i++) {
			this.fruitIcons[i].showFruit(this.totalArr[i]);
		}
	}
	
	public roll():void {
		this.fruitContainer.y = this.originFruitContainerY;
		egret.stopTick(this.updateRoll, this);
		this.flagy = this.fruitContainer.y;
		this.tickIndex = 0;
		this.isEnding = false;
		this.endIndex = 0;
		this.speed = 0;
		this.maxSpeed = 1800;
		this.lastTick = egret.getTimer();
		egret.startTick(this.updateRoll, this);
	}

	public stop() {
		egret.stopTick(this.updateRoll, this);
	}

	private lastTick:number = 0;
	public updateRoll(timestamp:number):boolean {
		if(this.isEnding) {
			if(this.fruitContainer.y < (this.flagy + 50) && this.endIndex != 1) {
				this.fruitContainer.y += 5;
			} else {
				this.endIndex = 1;
				this.fruitContainer.y -= 5;
				if(this.fruitContainer.y <= this.flagy) {
					egret.stopTick(this.updateRoll, this);
					let arr:Array<number> = [this.totalArr[3],this.totalArr[4],this.totalArr[5]];
					this.visible = false;
					game.AppFacade.getInstance().sendNotification(PanelNotify.UPDATE_ROLL_END, 
						{rollIndex:this.rollIndex, fruits:arr, fruitsIcons:
							[this.fruitIcons[3],this.fruitIcons[4],this.fruitIcons[5]]})
				}
			}
		} else {
			if(this.speed < this.maxSpeed) {
				this.speed += this.addSpeed;
			}
			let delta = timestamp - this.lastTick;
			this.fruitContainer.y += this.speed * (delta / 1000);
			if(this.fruitContainer.y >= 0) {
				if(this.tickIndex == this.maxTick) {
					// 结束 抖动一下
					this.isEnding = true;
				}
				let originArr = this.totalArr;
				this.totalArr = [];
				this.totalArr[0] = CommonUtil.RandomRangeInt(1,11);
				this.totalArr[1] = CommonUtil.RandomRangeInt(1,11);
				this.totalArr[2] = CommonUtil.RandomRangeInt(1,11);
				this.totalArr[3] = this.targetArr[0]//originArr[0];
				this.totalArr[4] = this.targetArr[1];
				this.totalArr[5] = this.targetArr[2];
				this.totalArr[6] = CommonUtil.RandomRangeInt(1,11);
				this.totalArr[7] = CommonUtil.RandomRangeInt(1,11);
				this.totalArr[8] = CommonUtil.RandomRangeInt(1,11);
				this.showFruit();
				this.fruitContainer.y = this.flagy;
				this.tickIndex++;
			}
		}
		this.lastTick = timestamp;
		return false;
	}

}