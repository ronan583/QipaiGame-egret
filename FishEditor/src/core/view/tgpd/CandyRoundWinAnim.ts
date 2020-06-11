class CandyRoundWinAnim extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
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

	private DEFAULT_SCALE: number = 0.9;

	public showWin(win: string, baofu: boolean): void{
		// baofu = true;
		this.visible = true;
		this.winMoneyLabel.text = "";
		this.winMoney = "";		
		this.baofuAnim.visible = false;
		this.baofuAnim.stop();

		this.winMoney = win;
		if(baofu){
			this.baofuAnim.visible = true;
			this.baofuAnim.playerOnce(()=>{
				this.baofuAnim.playAnim("animation_2");
			}, this, "animation_1");
			egret.setTimeout(this.showMoney, this, 500);
		}else {
			this.showMoney();
		}
		egret.setTimeout(this.clearWin, this, 2000);
	}
	private showMoney(){
		this.winMoneyLabel.text = "+" + this.winMoney;
		this.winMoneyLabel.scaleX = this.winMoneyLabel.scaleY = 1.5 * this.DEFAULT_SCALE;
		egret.Tween.get(this.winMoneyLabel).to({ scaleX: 0.5 * this.DEFAULT_SCALE, scaleY: 0.5 * this.DEFAULT_SCALE }, 200).call(() => {
			egret.Tween.get(this.winMoneyLabel).to({ scaleX: 1 * this.DEFAULT_SCALE, scaleY: 1 * this.DEFAULT_SCALE }, 200);
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
