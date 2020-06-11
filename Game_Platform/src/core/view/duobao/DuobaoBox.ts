class DuobaoBox extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	private reward:number;

	protected childrenCreated():void
	{
		super.childrenCreated();
		if(this.reward) {
			if(this.reward > 1000000) {
				this.rewardBoxLabel.text = (this.reward / 1000000).toFixed(2) + "m";
			} else if(this.reward > 1000) {
				this.rewardBoxLabel.text = (this.reward / 1000).toFixed(2) + "k";
			} else {
				this.rewardBoxLabel.text = Number(this.reward).toFixed(2);
			}
		}
		
	}

	private rewardBoxLabel:eui.BitmapLabel;
	
	public showReward(reward:number):void {
		this.reward = reward;
		if(!this.rewardBoxLabel) return;
		if(reward > 1000000) {
			this.rewardBoxLabel.text = (reward / 1000000).toFixed(2) + "m";
		} else if(reward > 1000) {
			this.rewardBoxLabel.text = (reward / 1000).toFixed(2) + "k";
		} else {
			this.rewardBoxLabel.text = Number(reward).toFixed(2);
		}
	}

}