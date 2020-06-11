class BYMoney extends eui.Component implements  eui.UIComponent {
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
		this.addMoney.alpha = 0;
	}

	public moneyLabel:eui.BitmapLabel;
	public addMoney:eui.BitmapLabel;
	private startAddShowTime:number;
	public nameLabel:eui.Label;
	private totalMoney:number;

	public showMoney(money:number):void {
		this.totalMoney = money;
		this.moneyLabel.text = money.toFixed(3);
	}

	public showName(name:string) {
		this.nameLabel.text = name;
	}

	public showAddMoney(money:number, totalMoney:number):void {
		this.addMoney.text = "+" + money.toFixed(3);
		this.totalMoney = totalMoney;
		this.startAddShowTime = egret.getTimer();
		this.addMoney.alpha = 1;		
		egret.startTick(this.updateAddMoney, this);
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