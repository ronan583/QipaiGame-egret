class DDZOperTip extends eui.Component implements  eui.UIComponent {
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
		this.setSource("");
	}
	
	public tipImg:eui.Image;

	private tipsType:number = 0;

	public clear():void {
		this.setSource("");
	}

	public clearMultiOrScore() {
		if(this.tipsType == 1 || this.tipsType == 2) {
			egret.log("clearMultiOrScore ========== ");
			this.clear();
		}
	}

	public showScoreTip(score:number) {
		if(score == 0) {
			this.setSource("ddz_battle_json.ddz_pass_lords");
		} else if(score == 1) {
			this.setSource("ddz_battle_json.ddz_rates1");
		} else if(score == 2) {
			this.setSource("ddz_battle_json.ddz_rates2");
		} else if(score == 3) {
			this.setSource("ddz_battle_json.ddz_rates3");
		}
		this.tipsType = 1;
	}

	public showMultiTip(multi:number) {
		if(multi == 1) {
			this.setSource("ddz_battle_json.ddz_no_doubles");
		} else if(multi == 2) {
			this.setSource("ddz_battle_json.ddz_doubles");
		} 
		this.tipsType = 2;
		// 最大3s之后就隐藏
		CommonUtil.registerTimeOut(()=>{
			this.tipImg.source = "";
		}, this, 3000);
	}

	public setSource(s:string) {
		CommonUtil.removeTimeout(this);
		this.tipImg.source = s;
	}

	public cancenJiabeiJiaofenShow() {

	}

	public showDonot():void {
		this.visible = true;
		this.setSource("ddz_no_play_png");
		this.tipsType = 3;
	}
	
	public showWaitjiabei():void {
		this.setSource("ddz_battle_json.ddz_wait_jiabei");
		this.tipsType = 4;
	}
}