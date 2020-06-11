class DuobaoRoundWinAnim extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		//this.skinName = "resource\eui_skins\duobao\DuobaoRoundWinAnim.exml"
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public winMoneyLabel: eui.BitmapLabel;
	private winMoney: string = "";
	public baofuAnim: DragonAnim;

	public showWin(win: string, baofu: boolean): void{
		this.visible = true;
		this.winMoneyLabel.text = "";
		this.winMoney = "";		
		this.baofuAnim.visible = false;
		this.baofuAnim.stop();
		
		this.winMoney = win;
		if(baofu){
			this.baofuAnim.visible = true;
			this.baofuAnim.playerOnce(()=>{
				this.baofuAnim.playAnim("animation2");
			}, this, "animation");
			egret.setTimeout(this.showMoney, this, 500);
		}else {
			this.showMoney();
		}
		egret.setTimeout(this.clearWin, this, 4000);
	}
	private showMoney(){
		this.winMoneyLabel.text = "+" + this.winMoney;
		this.winMoneyLabel.scaleX = this.winMoneyLabel.scaleY = 1.5;
		egret.Tween.get(this.winMoneyLabel).to({ scaleX: 0.5, scaleY: 0.5 }, 200).call(() => {
			egret.Tween.get(this.winMoneyLabel).to({ scaleX: 1, scaleY: 1 }, 200);
		}, this);
	}
	public clearWin(){
		this.visible = false;
		this.baofuAnim.visible = false;
		this.baofuAnim.stop();
		this.winMoneyLabel.text = "";
		this.winMoney = "";
	}
}
