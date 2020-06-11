class BrnnRoundResult extends eui.Component implements  eui.UIComponent {
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
		this.closeBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
	}
	
	private loseBg:eui.Image;
	private winBg:eui.Image;
	private loseTitle:eui.Image;
	private winTitle:eui.Image;
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


	private areaMoney1:eui.Label;
	private areaMoney2:eui.Label;
	private areaMoney3:eui.Label;
	private areaMoney4:eui.Label;

	private endCardsBanker:BrnnEndCards;
	private endCards1:BrnnEndCards;
	private endCards2:BrnnEndCards;
	private endCards3:BrnnEndCards;
	private endCards4:BrnnEndCards;

	private playerNameArr:Array<eui.Label> ;
	private playerMoneyArr:Array<eui.Label> ;
	private closeBtn:IButton;
	private closeBtn2:IButton;
	private playerGroup1:eui.Group;
	private playerGroup2:eui.Group;
	private playerGroup3:eui.Group;
	private playerGroup4:eui.Group;
	private playerGroup5:eui.Group;

	private playerGroupArr:Array<eui.Group>;
	private closeTimeOutId:number = 0;
	private zhuangtongshaImg:eui.Image;
	public showRoundResult(data:BrnnRoundResultData) {
		this.zhuangtongshaImg.visible = data.isZhuangTongSha();
		this.selfNameLabel.text = data.getSelfName();
		this.bankerNameLabel.text = data.getBankerName();
		// 把信息都打印出来
		egret.log("结果信息")
		for(let resultInfo of data.resultInfos) {
			egret.log(resultInfo.name + "  " + resultInfo.money);
		}
		egret.log("结果信息end")
		let money = data.getSelfWin();
		if(money < 0) {
			this.loseBg.visible = this.loseTitle.visible = this.closeBtn2.visible = true;
			this.winBg.visible = this.winTitle.visible = this.closeBtn.visible = false;
		} else {
			this.loseBg.visible = this.loseTitle.visible = this.closeBtn2.visible= false;
			this.winBg.visible = this.winTitle.visible = this.closeBtn.visible= true;
		}

		if(money == 0) {
			this.selfTotalUnBetImg.visible = true;
			this.selfWinLabel.visible = this.selfLoseLabel.visible = false;
		} else {
			this.selfTotalUnBetImg.visible = false;
			if(money > 0) {
				this.selfWinLabel.visible = true;
				this.selfLoseLabel.visible = false;
				this.selfWinLabel.text = "+" + CommonUtil.fixMoneyFormat2(money);
				game.brnn.BrnnSoundPlayer.instance.playWin1();
			} else {
				this.selfWinLabel.visible = false;
				this.selfLoseLabel.visible = true;
				this.selfLoseLabel.text =  CommonUtil.fixMoneyFormat2(money);
				game.brnn.BrnnSoundPlayer.instance.playFail();
			}
		}

		money = data.getBankWin();
		if(money > 0) {
			this.bankerWinLabel.visible = true;
			this.bankerLoseLabel.visible = false;
			this.bankerWinLabel.text =  "+" + CommonUtil.fixMoneyFormat2(money);
		} else {
			this.bankerWinLabel.visible = false;
			this.bankerLoseLabel.visible = true;
			this.bankerLoseLabel.text = CommonUtil.fixMoneyFormat2(money);
		}
		let areaList = data.getAreaList();
		this.areaMoney1.text = (areaList[0].money > 0 ? "+" + areaList[0].money : areaList[0].money.toFixed(2));
		this.areaMoney2.text = (areaList[1].money > 0 ? "+" + areaList[1].money : areaList[1].money.toFixed(2));
		this.areaMoney3.text = (areaList[2].money > 0 ? "+" + areaList[2].money : areaList[2].money.toFixed(2));
		this.areaMoney4.text = (areaList[3].money > 0 ? "+" + areaList[3].money : areaList[3].money.toFixed(2));

		let bankerCardInfo = data.getCardInfoByType(0);
		if(bankerCardInfo) {
			this.endCardsBanker.showCard(bankerCardInfo);
		}
		this.endCards1.showCard(data.getCardInfoByType(1))
		this.endCards2.showCard(data.getCardInfoByType(2))
		this.endCards3.showCard(data.getCardInfoByType(3))
		this.endCards4.showCard(data.getCardInfoByType(4))
		let rankList = data.getPlayerRankList();
		for(let i=0;i<this.playerNameArr.length;i++) {
			if(rankList[i]) {
				this.playerGroupArr[i].visible = true;
				this.playerNameArr[i].text = rankList[i].name;
				if(rankList[i].money > 0) {
					this.playerMoneyArr[i].text = "+" + rankList[i].money.toFixed(2);
				} else {
					this.playerMoneyArr[i].text = rankList[i].money.toFixed(2);
				}
			} else {
				this.playerGroupArr[i].visible = false;
			}
		}
		// 3s之后自动关闭
		this.closeTimeOutId = egret.setTimeout(()=>{
			this.visible = false;
			this.closeTimeOutId = 0;
		},this, 10000);
	}

	public onClose() {
		this.visible = false;
		if(this.closeTimeOutId > 0) {
			egret.clearTimeout(this.closeTimeOutId);
		}
	}

}