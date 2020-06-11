
class ZJHBipaiOld extends eui.Component implements  eui.UIComponent {
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
		this.leftArr = [this.card1_1, this.card1_2, this.card1_3]
		this.rightArr = [this.card2_1, this.card2_2, this.card2_3]
	}

	private pkAnim:game.CommonDB;
	private animGroup:eui.Group;

	private card1_1:Card;
	private card1_2:Card;
	private card1_3:Card;
	private card2_1:Card;
	private card2_2:Card;
	private card2_3:Card;

	private leftArr:Array<Card> = []
	private rightArr:Array<Card> = []
	private card1_bright_lie;
	private card1_lie;
	private card2_bright_lie;
	private card2_lie;

	private selfWin:boolean;

	public showAnim(iswin:boolean) {
		this.visible = true;
		this.selfWin = iswin;
		for(let c of this.leftArr) {
			c.visible = false;
		}
		for(let c of this.rightArr) {
			c.visible = false;
		}
		this.card1_bright_lie.visible = false;
		this.card1_lie.visible = false;
		this.card2_bright_lie.visible = false;
		this.card2_lie.visible = false;
		if(!this.pkAnim) {
			this.pkAnim  = new game.CommonDB("zjh_pk_ske_dbbin", "zjh_pk_tex_json", "zjh_pk_tex_png", "animation", 3000);
			this.animGroup.addChild(this.pkAnim);
			this.pkAnim.x = this.animGroup.width / 2;
			this.pkAnim.y =	this.animGroup.height / 2;
		} else {
			this.animGroup.addChild(this.pkAnim);
			this.pkAnim.restartRunAnim();
		}
		egret.setTimeout(this.showResult2,this,500);
	}

	private showResult2() {
		
	}

	private showResult():void {
		let zjhplayer = ZJHData.getInstance().getPlayerById(game.UserService.instance.playerId);
		if(this.selfWin) {
			this.card1_lie.visible = true;
			for(let c of this.rightArr) {
				c.visible = true;
			}
			if(zjhplayer && zjhplayer.cards.length == 3 && zjhplayer.cards[0] > 0) {
				this.rightArr[0].showCard(zjhplayer.cards[0] );
				this.rightArr[1].showCard(zjhplayer.cards[1] );
				this.rightArr[2].showCard(zjhplayer.cards[2] );
			} else{
				this.rightArr[0].showFrontOrBack(game.CardDirection.BACK)
				this.rightArr[1].showFrontOrBack(game.CardDirection.BACK)
				this.rightArr[2].showFrontOrBack(game.CardDirection.BACK)
			}
		} else {
			this.leftArr[0].showFrontOrBack(game.CardDirection.BACK)
			this.leftArr[1].showFrontOrBack(game.CardDirection.BACK)
			this.leftArr[2].showFrontOrBack(game.CardDirection.BACK)
			for(let c of this.leftArr) {
				c.visible = true;
			}
			if(zjhplayer && zjhplayer.cards.length == 3 && zjhplayer.cards[0] > 0) {
				this.rightArr[0].showCard(zjhplayer.cards[0] );
				this.rightArr[1].showCard(zjhplayer.cards[1] );
				this.rightArr[2].showCard(zjhplayer.cards[2] );
				for(let c of this.rightArr) {
					c.visible = true;
				}
				this.card2_bright_lie.visible = true
			} else {
				this.card2_lie.visible = true
			}
		}
		egret.setTimeout(this.hideAll,this,1000);
	}

	private hideAll() {
		this.visible = false;
	}
	
}