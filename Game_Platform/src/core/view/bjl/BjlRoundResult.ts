class BjlRoundResult extends eui.Component implements  eui.UIComponent {
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
		this.playerNameArr = [this.playerName1,this.playerName2,this.playerName3,this.playerName4,this.playerName5];
		this.playerMoneyArr = [this.playerMoney1,this.playerMoney2,this.playerMoney3,this.playerMoney4,this.playerMoney5];
		this.playerGroupArr = [this.playerGroup1, this.playerGroup2, this.playerGroup3, this.playerGroup4, this.playerGroup5]
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
	}
	
	private loseTitle:eui.Image;
	private winTitle:eui.Image;
	private winTitle2:eui.Image;
	private loseTitle2:eui.Image;
	private selfNameLabel:eui.Label;
	private bankerNameLabel:eui.Label;
	private selfTotalUnBetImg:eui.Image;
	private bankerLoseLabel:eui.BitmapLabel;
	private bankerWinLabel:eui.BitmapLabel;
	private selfLoseLabel:eui.BitmapLabel;
	private selfWinLabel:eui.BitmapLabel;

	private playerName1:eui.Label;
	private playerName2:eui.Label;
	private playerName3:eui.Label;
	private playerName4:eui.Label;
	private playerName5:eui.Label;

	private playerMoney1:eui.Label;
	private playerMoney2:eui.Label;
	private playerMoney3:eui.Label;
	private playerMoney4:eui.Label;
	private playerMoney5:eui.Label;

	private resultCard1:BjlRoundResultCard;
	private resultCard2:BjlRoundResultCard;

	private playerNameArr:Array<eui.Label> ;
	private playerMoneyArr:Array<eui.Label> ;
	private closeBtn:IButton;
	private playerGroup1:eui.Group;
	private playerGroup2:eui.Group;
	private playerGroup3:eui.Group;
	private playerGroup4:eui.Group;
	private playerGroup5:eui.Group;

	private playerGroupArr:Array<eui.Group>;
	public showRoundResult(bjlData:game.bjl.BjlData, data:game.bjl.BjlRoundResultData) {
		this.selfNameLabel.text = data.getSelfName();
		this.bankerNameLabel.text = data.getBankerName();
		let money = data.getSelfWin();
		if(money < 0) {
			this.loseTitle2.visible = this.loseTitle.visible = true;
			this.winTitle2.visible = this.winTitle.visible = false;
		} else {
			this.loseTitle2.visible = this.loseTitle.visible = false;
			this.winTitle2.visible = this.winTitle.visible = true;
		}

		if(!bjlData.isSelfBet) {
			this.selfTotalUnBetImg.visible = true;
			this.selfWinLabel.visible = this.selfLoseLabel.visible = false;
		} else {
			this.selfTotalUnBetImg.visible = false;
			if(money >= 0) {
				this.selfWinLabel.visible = true;
				this.selfLoseLabel.visible = false;
				this.selfWinLabel.text = "+" + CommonUtil.fixMoneyFormat2(money);
				game.bjl.BjlSoundPlayer.instance.playWin();
			} else {
				this.selfWinLabel.visible = false;
				this.selfLoseLabel.visible = true;
				this.selfLoseLabel.text =  CommonUtil.fixMoneyFormat2(money);
				game.bjl.BjlSoundPlayer.instance.playFail();
			}
		}

		money = data.getBankWin();
		if(money > 0) {
			this.bankerWinLabel.visible = true;
			this.bankerLoseLabel.visible = false;
			this.bankerWinLabel.text = "+" + CommonUtil.fixMoneyFormat2(money);
		} else {
			this.bankerWinLabel.visible = false;
			this.bankerLoseLabel.visible = true;
			this.bankerLoseLabel.text = CommonUtil.fixMoneyFormat2(money);
		}
		let cardInfo = data.cardInfo
		this.resultCard1.showItem(cardInfo.getXianList(), cardInfo.getXianDian(), data.isXianFail());
		this.resultCard2.showItem(cardInfo.getZhuangList(), cardInfo.getZhuangDian(), data.isZhuangFail());
		let rankList = data.getPlayerRankList();
		for(let i=0;i<this.playerNameArr.length;i++) {
			if(rankList[i]) {
				this.playerGroupArr[i].visible = true;
				this.playerNameArr[i].text = rankList[i].name;
				if(rankList[i].money > 0) {
					this.playerMoneyArr[i].text = "+" + rankList[i].money.toFixed(0);
				} else {
					this.playerMoneyArr[i].text = rankList[i].money.toFixed(0);
				}
				
			} else {
				this.playerGroupArr[i].visible = false;
			}
		}
		// 3s之后自动关闭
		egret.setTimeout(()=>{this.visible = false;},this, 10000);
	}

	public onClose() {
		this.visible = false;
	}

}
