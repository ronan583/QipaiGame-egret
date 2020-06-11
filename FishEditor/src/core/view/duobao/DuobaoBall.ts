class DuobaoBall extends eui.Component implements  eui.UIComponent {
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
	}

	private p0x:number;
	private p0y:number;
	private p1x:number;
	private p1y:number;
	private p2x:number;
	private p2y:number;

	private step:number = 0;
	private levelMap:game.HashMap;
	private rewardPoints:Array<egret.DisplayObject>;
	private linePointArr:Array<number>;

	public startFly(lineArr:Array<number>, levelMap:game.HashMap, rewardPoints:Array<egret.DisplayObject>):void {
		console.log("lineArr : " + lineArr.join("__"));
		this.step = 0;
		this.linePointArr = lineArr;
		this.levelMap = levelMap;
		this.rewardPoints = rewardPoints;
		this.stepNext();
	}

	private stepNext():void {
		if(this.step > 3) {
			console.log("complete........................");
			game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_DUOBAO_BALL_COMPLETE);
			return;
		}
		this.p0x = this.x;
		this.p0y = this.y;
		let nextObj:egret.DisplayObject ;
		if(this.step <= 2) {
			nextObj = this.levelMap.get(this.step + 2)[this.linePointArr[this.step]];
		} else {
			nextObj = this.rewardPoints[this.linePointArr[this.step]];
		}
		this.p2x = nextObj.x;
		this.p2y = nextObj.y;

		this.p1x = this.x + (nextObj.x - this.x) / 2;
		this.p1y = this.y - 10;
		
		this.step++;
		game.duobao.DuobaoSoundPlayer.instance.playSound(game.duobao.DuobaoSoundType.JUMP);
		egret.Tween.get(this).to({factor:1},500).call(this.stepNext, this)
	}

	public get factor():number {
        return 0;
    }
 
    public set factor(value:number) {
        this.x = (1 - value) * (1 - value) * this.p0x + 2 * value * (1 - value) * this.p1x + value * value * this.p2x;
        this.y = (1 - value) * (1 - value) * this.p0y + 2 * value * (1 - value) * this.p1y + value * value * this.p2y;
    }
	
}