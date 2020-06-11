class BYMoney extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private ry:number = 0;
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addMoney.alpha = 0;
		this.ry = this.addMoney.y;
	}

	public moneyLabel:eui.BitmapLabel;
	public addMoney:eui.BitmapLabel;
	private startAddShowTime:number;
	public nameLabel:eui.Label;
	private totalMoney:number;
	private vipLabel:eui.BitmapLabel;

	public showMoney(money:number):void {
		this.totalMoney = money;
		this.moneyLabel.text = money.toFixed(3);
	}

	public showName(name:string) {
		this.nameLabel.text = name;
	}

	public showVip(vip:number) {
		this.vipLabel.text = vip.toFixed(0);
	}

	public showAddMoney(money:number, totalMoney:number):void {
		let str = money.toFixed(3);
		let ss = str.split('.');
		let isInt = ss[1] == "000";
		if(isInt) {
			this.addMoney.text = "+" + ss[0];
		} else {
			this.addMoney.text = "+" + str;
		}
		
		this.totalMoney = totalMoney;
		this.startAddShowTime = egret.getTimer();
		this.addMoney.y = this.ry;
		this.addMoney.alpha = 1;
		egret.Tween.removeTweens(this.addMoney);
		egret.Tween.get(this.addMoney).to({y:this.ry - 20}, 400).call(()=>{
			egret.Tween.get(this.addMoney).to({alpha:0},500).call(()=>{
				this.moneyLabel.text = this.totalMoney.toFixed(3);
			}, this);
		}, this);
	}

	private updateAddMoney(timestamp:number):boolean {
		if(timestamp - this.startAddShowTime > 500) {
			this.addMoney.alpha = 1 - (timestamp - this.startAddShowTime - 500) / 500;
		}
		if(this.addMoney.alpha == 0) {
			egret.stopTick(this.updateAddMoney, this);
			this.moneyLabel.text = this.totalMoney.toFixed(3);
		}
		return false;
	}
	
}