class DZPKCards extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cards = [this.card1, this.card2];
		this.originPos = new egret.Point(this.card2.x, this.card2.y);
		this.init();
	}

	public card1: Card;
	public card2: Card;

	public playerId: number;
	public cards: Array<Card>;

	public showState: number = 1;

	public init(): void {
		for (let card of this.cards) {
			card.visible = false;
			card.clearSelected();
			egret.Tween.removeTweens(card);
		}
	}

	public showFapaiTween(index: number, battlUI: game.dzpk.DZPKBattleUI): void {
		let arr: Card[] = [this.card1, this.card2];
		let bsCard = new BSTweenCard("dzpk_card_png");
		battlUI.initFapaiGroup.addChild(bsCard);
		bsCard.anchorOffsetX = bsCard.width / 2;
		bsCard.anchorOffsetY = bsCard.height / 2;
		bsCard.x = battlUI.initFapaiGroup.width / 2;
		bsCard.y = battlUI.initFapaiGroup.height / 2;
		bsCard.scaleX = 0.3;
		bsCard.scaleY = 0.3;
		let targetCard = arr[index];
		let globalTargetPoint = this.localToGlobal(targetCard.x + targetCard.width / 2, targetCard.y + targetCard.height / 2);
		let targetPoint = battlUI.initFapaiGroup.globalToLocal(globalTargetPoint.x, globalTargetPoint.y);
		let texasPlayer: game.dzpk.TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(this.playerId);
		let card: Card = this.cards[index];
		bsCard.startTween2(bsCard.x, bsCard.y, targetPoint.x, targetPoint.y, 0.45, 0.45, 359, arr[index], () => {
			card.visible = true;
			card.showFrontOrBack(game.CardDirection.BACK);
			if(index == 1 && texasPlayer) {
				this.showCard(texasPlayer.cards);
			}
		});
	}

	public showCardsDirect() {
		for(let i=0;i<2;i++) {
			this.cards[i].showFrontOrBack(game.CardDirection.BACK);
		}
		let texasPlayer: game.dzpk.TexasPlayer = game.dzpk.TexasBattleData.getInstance().getPlayer(this.playerId);
		if (texasPlayer && texasPlayer.cards && texasPlayer.cards.length > 0) {
			for(let i=0;i<2;i++) {
				this.cards[i].showCard(texasPlayer.cards[i]);
			}
		}
	}

	public dropFlay(battlUI: game.dzpk.DZPKBattleUI, isOther:boolean = false, f:Function = null, fCaller:any = null) {
		this.cards[0].visible = false;
		this.cards[1].visible = false;
		let targetPos = battlUI.initFapaiGroup.localToGlobal(battlUI.initFapaiGroup.width / 2, battlUI.initFapaiGroup.height / 2)
		targetPos = this.globalToLocal(targetPos.x, targetPos.y);
		for(let i=0;i<2;i++) {
			let card = new Card();
			this.addChild(card);
			card.showFrontOrBack(game.CardDirection.BACK);
			card.x = this.cards[i].x;
			card.y = this.cards[i].y;
			CommonUtil.registerTimeOut(()=>{
				egret.Tween.get(card).to({
					x:targetPos.x, 
					y:targetPos.y, 
					rotation:359, 
					scaleX:0.2, 
					scaleY:0.2, 
					alpha:0.3
				}, 300).call(()=>{
					if(card.parent) card.parent.removeChild(card);
				}, this);
			}, this, 150 * i);
		}
		if(!isOther) {
			CommonUtil.registerTimeOut(()=>{
				this.card1.visible = this.card2.visible = true;
				this.card1.alpha = this.card2.alpha = 0.1;
				this.card1.y = this.card2.y = this.originPos.y + 100;
				egret.Tween.get(this.card1).to({ y: this.originPos.y, alpha:1}, 300)
				egret.Tween.get(this.card2).to({ y: this.originPos.y, alpha:1}, 300).call(()=>{
					if(f) {
						f.call(fCaller)
					}
				}, this);
			}, this, 400);
		} else {
			CommonUtil.registerTimeOut(()=>{
				if(f) {
					f.call(fCaller)
				}
			}, this, 450);
		}
	}

	private originPos: egret.Point;
	public showCard(cards: Array<number>): void {
		if(!cards || cards.length == 0) {
			this.card1.showFrontOrBack(game.CardDirection.BACK);
			this.card2.showFrontOrBack(game.CardDirection.BACK);
			this.card2.x = this.originPos.x
			this.card2.y = this.originPos.y
			return;
		}
		if (this.card1.isFront()) {
			return;
		}
		egret.Tween.get(this.card2).to({ x: this.card1.x }, 150).call(() => {
			// 两个整体上浮
			egret.Tween.get(this.card1).to({ y: this.originPos.y - 40 }, 150)
			egret.Tween.get(this.card2).to({ y: this.originPos.y - 40 }, 150).call(()=>{
				egret.Tween.get(this.card1).to({ y: this.originPos.y}, 150)
				egret.Tween.get(this.card2).to({ y: this.originPos.y}, 150).call(()=>{
					this.card1.showCard(cards[0]);
					this.card2.showCard(cards[1]);
					egret.Tween.get(this.card2).to({ x: this.originPos.x}, 300, egret.Ease.backOut);
				}, this);
			}, this)
		}, this);
	}

	showGrayState() {
		this.card1.showGrayState();
		this.card2.showGrayState();
    }

}
