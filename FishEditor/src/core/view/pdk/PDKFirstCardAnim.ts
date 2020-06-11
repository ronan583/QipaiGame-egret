class PDKFirstCardAnim extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	public node1:eui.Group;
	public node2:eui.Group;
	public node3:eui.Group;
	public node4:eui.Group;
	public node5:eui.Group;
	public node6:eui.Group;
	public card:PDKPokerCard;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	public showAnim(cardValue:number, dir:number):void {
		this.visible = true;
		this.card.showCard(cardValue);
		console.log("show card : " + cardValue);
		if(dir == 1) {
			this.card.x = this.node1.x;
			this.card.y = this.node1.y;
			var tw:egret.Tween = egret.Tween.get(this.card);
			var holder = this;
			tw.to({x:holder.node2.x,y:holder.node2.y,scaleX:0.5,scaleY:0.5}, 1000, egret.Ease.sineIn).call(()=>{
				console.log("comlete 1 " + holder.node2.x + " " + holder.node2.y);
				tw = egret.Tween.get(holder.card);
				tw.to({x:holder.node3.x,y:holder.node3.y,scaleX:0.8,scaleY:0.8}, 1000, egret.Ease.sineOut).call(()=>{
					console.log("comlete 2 " + holder.node3.x + " " + holder.node3.y);
				});
			});
		} else {
			this.card.x = this.node5.x;
			this.card.y = this.node5.y;
			var tw:egret.Tween = egret.Tween.get(this.card);
			var holder = this;
			tw.to({x:holder.node6.x,y:holder.node6.y,scaleX:0.5,scaleY:0.5}, 1000, egret.Ease.sineIn).call(()=>{
				tw = egret.Tween.get(holder.card);
				tw.to({x:holder.node4.x,y:holder.node4.y,scaleX:0.8,scaleY:0.8}, 1000, egret.Ease.sineOut).call(()=>{
				});
			});
		}
		
		
	}
	
}
