import DuobaoData = game.duobao.DuobaoData;
import DuobaoRewardPoint = game.duobao.DuobaoRewardPoint;

class DBFinalItem extends eui.Component implements  eui.UIComponent {
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
		// this.anchorOffsetX = this.width / 2;
		// this.anchorOffsetY = this.height / 2;
		// this.fanpaiGuangbiaoAnim.mask = this.backImg;
	}

	private backImg:eui.Image;
	private frontGroup:eui.Group;
	private fanpaiAnim:DragonAnim;
	private rewardLabel:eui.BitmapLabel;
	private fanpaiGuangbiaoAnim:DragonAnim;
	public sortIndex:number = 0;
	private isReward: boolean = false;

	private nextNode:DBFinalItem;

	public reset() {
		this.visible = true;
		this.backImg.visible = true;
		this.fanpaiAnim.visible = false;
		// this.fanpaiAnim.playAnim("animation2");
		this.fanpaiGuangbiaoAnim.visible = false;
		this.fanpaiGuangbiaoAnim.mask = null;
		this.rewardLabel.visible = false;
		this.alpha = 1;
		this.scaleY = this.scaleX = 1;
	}

	public setNextNode(item:DBFinalItem) {
		this.nextNode = item;
	}

	public defaultAnim() {
		this.fanpaiGuangbiaoAnim.playerOnce(this.defaultComplete, this, "animation");
	}

	private defaultComplete() {
		if(this.nextNode) {
			this.nextNode.defaultAnim();
		}
	}

	public fanpai(isreward:boolean = true, reward:number = 0, delay: number = 0) {
		this.isReward = isreward;
		// if(!DuobaoData.instance.duobaoRewardPoint) {
		// 	let reward = new DuobaoRewardPoint();
		// 	reward.rewards = [2000,3000,4000,5000,6000];
		// 	reward.index = 2;
		// 	DuobaoData.instance.duobaoRewardPoint = reward;
		// }
		this.fanpaiAnim.visible = true;
		this.fanpaiAnim.playerAnimOnce("animation1");
		this.fanpaiGuangbiaoAnim.mask = this.backImg;
		egret.setTimeout(()=>{
			this.rewardLabel.visible = true;
			this.rewardLabel.alpha = 0;
			this.rewardLabel.scaleY = this.rewardLabel.scaleX = 0.1;
			egret.Tween.get(this.rewardLabel).to({alpha: 1, scaleX: 1, scaleY: 1}, 400);

			this.fanpaiGuangbiaoAnim.visible = true;
			this.fanpaiGuangbiaoAnim.playerTimes(()=>{}, this, 2);

			if(isreward) {
				console.error(DuobaoData.instance.duobaoRewardPoint);
				console.error(DuobaoData.instance.duobaoRewardPoint.getReward());
				this.rewardLabel.text = CommonUtil.convertMonetShow2(DuobaoData.instance.duobaoRewardPoint.getReward());
				// 其他的牌翻拍
				CommonUtil.registerTimeOut(()=>{
					//Tween变大————旋转飞入缩小渐隐
					egret.Tween.get(this).to({scaleX: 1.2, scaleY: 1.2}, 200).call(()=>{
						this.flyBottom();
						egret.setTimeout(()=>{
							game.AppFacade.getInstance().sendNotification(PanelNotify.DUOBAO_OPEN_OTHRES);
						}, this, 1200);
					}, this);
				}, this, 2000);
			} else {
				this.rewardLabel.text = CommonUtil.convertMonetShow2(reward);
				CommonUtil.registerTimeOut(()=>{
					egret.Tween.get(this).to({alpha: 0, scaleX: 0.1, scaleY: 0.1}, 700);
				}, this, 2000)
			}
		}, this, 700);
	}

	public BOTTOM_POS: number[] = [718, 567];
	private flyBottom(){
		let p: egret.Point = new egret.Point(this.BOTTOM_POS[0], this.BOTTOM_POS[1]);
		if(this.parent){
			let p1 = this.parent.globalToLocal(p.x, p.y);
			egret.Tween.get(this).to({x: p1.x, y: p1.y, alpha: 0, scaleX: 0.3, scaleY: 0.3}, 700);
		}
	}

	public fadeAway(){

	}

	private animComplete() {
		this.rewardLabel.visible = true;
	}
}