class DZPKAddBet extends eui.Component implements eui.UIComponent {
	checkRefreshFunc: Function;
	checkRefreshFuncCaller: any;
	
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		this.arrowAnim.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.arrowAnim.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
		this.arrowAnim.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		this.addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAdd, this);
		this.subBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSub, this);
		this.init();

		this.arrowAnim.name = "arrow_bg";
		this.allInFireAnim.name = "allInFireAnim";
	}

	public maxBet: number;
	public minBet: number;
	public curBet: number;

	private chipGroup: eui.Group;
	private operationGroup: eui.Group;
	private arrowAnim: DragonAnim;
	private addBtn: eui.Button;
	private subBtn: eui.Button;
	private betLabel: eui.Label;
	private recordY: number;
	private recordBet: number;
	private topCoinAnim:DragonAnim;
	private allInFireAnim:DragonAnim;
	space: number;

	private onTouchBegin(e: egret.TouchEvent) {
		this.recordY = e.localY;
		this.recordBet = this.curBet;
	}
	private onTouchMove(e: egret.TouchEvent) {
		let total = this.maxBet - this.minBet;
		let delta = (this.arrowAnim.height - e.localY) / this.arrowAnim.height;
		delta = Math.min(delta, 1);
		this.curBet = this.minBet + delta * total;
		this.refreshChip();
	}
	private onTouchEnd(e: TouchEvent) {
		// 岁上面的那个 有个动画
		let topCoin = this.getTopCoin();
		if(topCoin) {
			this.topCoinAnim.visible = true;
			this.topCoinAnim.x = this.chipGroup.x + topCoin.x + topCoin.width / 2;
			this.topCoinAnim.y = this.chipGroup.y + topCoin.y + topCoin.height / 2;
			this.topCoinAnim.playerOnce(()=>{
				this.topCoinAnim.visible = false;
				topCoin.visible = true;
			}, this)
		}
	}

	private playCoinAnim() {

	}

	private add(delta: number) {
		this.curBet += delta;
		this.refreshChip();
	}

	public init() {
		this.minBet = 100;
		this.maxBet = 10000;
		this.curBet = 2000;
		// 默认显示一半
		this.refreshChip();
	}

	public setLimit(minValue:number, maxValue:number, space:number, checkRefreshFunc:Function, checkRefreshFuncCaller:any) {
		this.minBet = minValue;
		this.maxBet = maxValue;
		this.space = space;
		if(space == 0) {
			this.space = (maxValue - minValue) / this.chipGroup.numChildren;
		}
		this.checkRefreshFunc = checkRefreshFunc;
		this.checkRefreshFuncCaller = checkRefreshFuncCaller;
	}

	private onAdd() {
		this.curBet += this.space;
		if (this.curBet > this.maxBet) {
			this.curBet = this.maxBet;
		}
		this.refreshChip();
	}

	private onSub() {
		this.curBet -= this.space;
		if (this.curBet < this.minBet) {
			this.curBet = this.minBet;
		}
		this.refreshChip();
	}

	public refreshChip() {
		if (this.curBet > this.maxBet) {
			this.curBet = this.maxBet;
		}
		if (this.curBet < this.minBet) {
			this.curBet = this.minBet;
		}
		this.betLabel.text = this.curBet.toFixed(0);
		let p = (this.curBet - this.minBet) / (this.maxBet - this.minBet);
		let flag = Math.floor(p * this.chipGroup.numChildren);
		for (let i = 0; i < this.chipGroup.numChildren; i++) {
			let obj = this.chipGroup.getChildAt(i);
			if (i < flag) {
				obj.visible = true;
			} else {
				obj.visible = false;
			}
			if (i == flag) {
				this.operationGroup.y = obj.y + this.chipGroup.y;
			}
		}
		if(this.curBet == this.maxBet) {
			this.playAllInFireAnim();
			if(this.checkRefreshFunc) {
				this.checkRefreshFunc.call(this.checkRefreshFuncCaller, true);
			}
		} else {
			this.allInFireAnim.visible = false;
			this.allInFireAnim.stop();
			if(this.checkRefreshFunc) {
				this.checkRefreshFunc.call(this.checkRefreshFuncCaller, false);
			}
		}
	}

	private getTopCoin():eui.Image {
		for(let i=this.chipGroup.numChildren - 1;i--;i>0){
			if(this.chipGroup.getChildAt(i-1).visible) {
				return <eui.Image>this.chipGroup.getChildAt(i);
			}
		}
		return null;
	}

	public showDefault() {
		this.topCoinAnim.visible = false;
		this.topCoinAnim.stop();
		this.allInFireAnim.visible = false;
		this.allInFireAnim.stop();
		this.curBet = this.minBet;
		this.refreshChip();
	}

	private playAllInFireAnim() {
		if(this.allInFireAnim.visible) return;
		this.allInFireAnim.visible = true;
		this.allInFireAnim.setLoop(false)
		this.allInFireAnim.playerOnce(()=>{
			this.allInFireAnim.setLoop(true)
			this.allInFireAnim.playerTimes(null,null,0,"idle");
		},this,"start");
	}
}
