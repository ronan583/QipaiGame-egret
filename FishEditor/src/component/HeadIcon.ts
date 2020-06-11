class HeadIcon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	public headIconImg:eui.Image;
	public center: eui.Image;
	// public headFrameImg:eui.Image;
	public waitImg:eui.Image;
	public gold:eui.Label;
	public playerName:SingleLineLabel;
	public bankerImg:eui.Image;
	public compareBtn:eui.Button;
	public side:number = 1;
	public pos: number;
	private starParticle:particle.GravityParticleSystem;
	private pkwinAnim:DragonAnim;
	private compareGroup:eui.Group;
	private pkChooseArrowAnim:DragonAnim;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	protected childrenCreated():void
	{
		super.childrenCreated();
		let w = this.clockImg.width / 2;
		let h = this.clockImg.height / 2;
		this.radiusStar = Math.sqrt(w * w + h * h)
		this.radiusWith = w;
		this.radiusHeight = h;
		this.compareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCompareBtnClick, this);
		this.hideTips();
		this.clock.visible = false;
		this.initParticle();
		this.pkwinAnim.visible = false;
		this.parentGroup = this.parent;
	}

	private initParticle() {
		this.starParticle = new particle.GravityParticleSystem(RES.getRes("playcountdown_png"), RES.getRes("playcountdown_json"));
		this.clock.addChild(this.starParticle);
		this.starParticle.emitterX = this.starParticle.emitterY = 0;
		this.starParticle.x = 0;
		this.starParticle.y = 0;
	}

	public playerInfo : game.PlayerInfo;
	public clock:eui.Group;
	public clockImg:eui.Image;
	private unitDrawAngle:number = 0.12;
	private radius:number = 100;

	private tempShape:egret.Shape = null;
	private angle:number ;
	private startTime:number = 0;
	private startAngle:number = 0;

	public loseTip:eui.Group;
	public winTip:eui.Group;
	public loseTipLabel:eui.Label;
	public winTipLabel:eui.Label;
	public star:eui.Group;

	private radiusStar:number = 50;
	private radiusWith:number = 0;
	private radiusHeight:number = 0;

	private totalTime:number;
	private winAnim:game.CommonDB;
	private rightTips:eui.Group;
	private leftTips:eui.Group;
	private centerTips:eui.Group;
	private rightTipsImg:eui.BitmapLabel;
	private leftTipsImg:eui.BitmapLabel;
	private centerTipsImg:eui.BitmapLabel;
	private grayLayer:eui.Image;
	private isPk:boolean = false;
	private showCardGroup:eui.Group;
	private showCardAnim:DragonAnim;
	private card1:ZJHOtherCard;
	private card2:ZJHOtherCard;
	private card3:ZJHOtherCard;
	private typeImg:eui.Image;

	public parentGroup: egret.DisplayObjectContainer;

	private allinAnim: DragonAnim;

	public drawFan():void{
		this.clock.visible = true;
		this.tempShape = new egret.Shape();
		this.clock.addChild(this.tempShape);
        egret.startTick(this.onClockTick, this);
        this.clockImg.mask = this.tempShape;
    }

	private ta(angle:number):number {
		let a = angle * Math.PI / 180;
		return Math.tan(a);
	}

	private reposstar() {
		let p:egret.Point = new egret.Point();
		if(this.angle <= 45) {
			p.y = 0;
			p.x = this.ta(this.angle) * this.radiusStar + this.radiusWith;
		} else if(this.angle < 90) {
			p.x = this.radiusWith * 2;
			p.y = this.radiusHeight - this.ta(90 - this.angle) * this.radiusStar;
		} else if(this.angle < 135) {
			p.x = this.radiusWith * 2;
			p.y = this.radiusHeight + this.ta(this.angle - 90) * this.radiusStar;
		} else if(this.angle < 180) {
			p.y = this.radiusHeight * 2;
			p.x = this.radiusWith + this.ta(180 - this.angle) * this.radiusStar;
		} else if(this.angle < 225)  {
			p.y = this.radiusHeight * 2;
			p.x = this.radiusWith - this.ta(this.angle - 180) * this.radiusStar;
		} else if(this.angle < 270) {
			p.x = 0;
			p.y = this.radiusHeight + this.ta(270 - this.angle) * this.radiusStar;
		} else if(this.angle < 315) {
			p.x = 0;
			p.y = this.radiusHeight - this.ta(this.angle - 270) * this.radiusStar;
		} else if(this.angle < 360) {
			p.y = 0;
			p.x = this.radiusWith - this.ta(360 - this.angle) * this.radiusStar;
		}
		this.star.visible = true;
		this.starParticle.x = p.x;
		this.starParticle.y = p.y;
	}

	private zhouchangarr:Array<number> = [];
	private totalzhouchange:number = 0;

	private prevFlag:number = -1;

	private reposstar2() {
		if(this.totalzhouchange == 0) {
			this.zhouchangarr = [this.radiusWith, this.radiusHeight*2, this.radiusWith*2, this.radiusHeight*2, this.radiusWith];
			for(let f of this.zhouchangarr) {
				this.totalzhouchange += f;
			}
		}
		let percent = this.angle / 360;
		let newf = this.totalzhouchange * percent;
		let i=0;
		let limit = 0;
		let p:egret.Point = new egret.Point(0,0);
		if(this.tempShape) {
			this.tempShape.graphics.clear();
			this.tempShape.graphics.beginFill(0xff0000);
			this.tempShape.graphics.moveTo(this.radiusWith,0);
			this.tempShape.graphics.lineTo(this.radiusWith, this.radiusHeight);
		}
		
		for(i=0;i<this.zhouchangarr.length;i++) {
			limit += this.zhouchangarr[i]
			if(newf < limit) {
				limit -= this.zhouchangarr[i];
				break;
			}
		}

		if(this.tempShape){
			if(i == 0) {
				p.x = this.radiusWith + newf;
				p.y = 0;
				this.tempShape.graphics.lineTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith,0);
			} else if(i == 1){
				p.x = this.radiusWith * 2;
				p.y = newf - limit;
				this.tempShape.graphics.lineTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
				this.tempShape.graphics.lineTo(this.radiusWith,0);
			} else if(i == 2) {
				p.x = this.radiusWith * 2 - (newf - limit);
				p.y = this.radiusHeight * 2;
				this.tempShape.graphics.lineTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
				this.tempShape.graphics.lineTo(this.radiusWith,0);
			} else if(i == 3) {
				p.x = 0;
				p.y = this.radiusHeight*2 - (newf - limit)
				this.tempShape.graphics.lineTo(p.x, p.y);
				this.tempShape.graphics.lineTo(0, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
				this.tempShape.graphics.lineTo(this.radiusWith,0);
			} else if(i == 4) {
				p.y = 0;
				p.x = newf - limit;
				this.tempShape.graphics.lineTo(p.x, p.y);
				this.tempShape.graphics.lineTo(0, 0);
				this.tempShape.graphics.lineTo(0, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
				this.tempShape.graphics.lineTo(this.radiusWith,0);
			}
			this.tempShape.graphics.endFill();
		}
		this.star.visible = true;
		this.starParticle.emitterX = p.x;
		this.starParticle.emitterY = p.y;
	}

	private onClockTick(timeStamp:number):boolean{
		this.angle = (((timeStamp - this.startTime) / 1000 + this.startAngle) / this.totalTime ) * 360
		this.angle =  this.angle % 360;
		this.reposstar2();
		// this.changeGraphics(this.angle, this.tempShape);
		if(this.angle >= 355) {
			this.clearClock();
		}
		return true;
	}

	private changeGraphics(angle, shape:egret.Shape) {
		shape.graphics.clear();
		shape.graphics.beginFill(0xff0000);
		shape.graphics.moveTo(this.radiusWith, this.radiusHeight);
		// shape.graphics.lineTo(100, this.radiusStar);
		shape.graphics.drawArc(this.radiusWith, this.radiusHeight, this.radiusStar, -90 * Math.PI / 180, (angle - 90) * Math.PI / 180, true);
		shape.graphics.lineTo(this.radiusWith, this.radiusHeight);
		shape.graphics.endFill();
	}

	public ShowPlayerHead(playerInfo:game.PlayerInfo):void {
		this.playerInfo = playerInfo;
		this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
		this.gold.text = CommonUtil.convertMonetShow(playerInfo.money);
		this.playerName.text = this.subText(playerInfo.nickName);

		this.loseTip.visible = false;
		this.winTip.visible = false;
		this.showCardGroup.visible = false;
	}

	public showClock(time:number) :void {
		this.totalTime = time;
		this.startTime = egret.getTimer();
		this.startAngle = 10 - time;
		this.drawFan();
		this.starParticle.start();
	}

	public clearClock():void {
		egret.stopTick(this.onClockTick, this);
		this.startAngle = 0;
		this.startTime = 0;
		this.star.visible = false;
		if(this.tempShape != null) {
			if(this.tempShape.parent != null) {
				this.tempShape.parent.removeChild(this.tempShape);
			}
			this.tempShape = null;
		}
		this.clock.visible = false;
		this.starParticle.stop();
	}

	public showAllin(): void{
		if(this.allinAnim){
			this.allinAnim.visible = true;
			this.allinAnim.playerTimes(null, this, 0);
		}
		
	}

	public clearAllin(): void{
		if(this.allinAnim){
			this.allinAnim.visible = false;
			this.allinAnim.stop();
		}
	}

	public showImmGold(gold:number):void {
		this.gold.text = CommonUtil.convertMonetShow(gold);
	}
	
	public ShowWait(isWait:boolean):void {
		this.waitImg.visible = isWait;
	}

	// public ShowBanker(isBanker:boolean) :void {
	// 	this.bankerImg.visible = isBanker;
	// }

	public showCompare(isComapre:boolean) {
		this.compareGroup.visible = isComapre;
	}
	public showGrey(isGrey:boolean) {
		this.grayLayer.visible = isGrey;
	}

	private onCompareBtnClick(e:egret.TouchEvent):void {
		ZJHRequest.comparisonCard(this.playerInfo.playerId);
		game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_COMPARE_CHOOSE);
	}

	public showWin(win:number):void {
		if(win != 0){
			this.winTip.visible = true;
			this.winTip.x = 0;
			this.winTip.y = 0;
			this.winTipLabel.text = "+" + win.toFixed(2) + "y";
			var tw:egret.Tween = egret.Tween.get(this.winTip);
			var target = this.winTip;
			tw.to({y:-100},3000,egret.Ease.sineInOut).call(()=>{
				target.visible = false;
				this.showWinCardInfo();
			}, this);
		} else {
			CommonUtil.registerTimeOut(this.showWinCardInfo, this, 3000);
		}
		// this.showWinAnim();
	}

	private showWinCardInfo() {
		let cardInfo = ZJHData.getInstance().BattleFinishData.winCardInfo;
		if(cardInfo) {
			this.showCards(cardInfo.card, cardInfo.cardType);
		}
	}

	public showLose(lose:number):void {
		if(lose != 0){
			lose = Math.abs(lose);
			this.loseTip.visible = true;
			this.loseTip.x = 0;
			this.loseTip.y = 0;
			if(lose > 0){
				this.loseTipLabel.text = "-" + lose.toFixed(2) + "y";
			}else{
				this.loseTipLabel.text = lose.toFixed(2) + "y";
			}
			var tw:egret.Tween = egret.Tween.get(this.loseTip);
			var target = this.loseTip;
			tw.to({y:-100},3000,egret.Ease.sineInOut).call(()=>{
				target.visible = false;
			});
		}
	}

	public showWinAnim() {
		if(!this.winAnim) {
			this.winAnim = new game.CommonDB("yingl_ske_dbbin", "yingl_tex_json", "yingl_tex_png", "animation", 4000);
			this.addChild(this.winAnim);
			this.winAnim.x = 90;
			this.winAnim.y = 165;
		} else {
			this.addChild(this.winAnim);
			this.winAnim.restartRunAnim();
		}
	}

	public showTips(status:number) {
		//看牌/弃牌/比牌输
		let labelText: string = "";
		if(status == game.zjh.ZJHPlayerStatus.KANPAI) {
			labelText = "已看牌";
		} else if(status == game.zjh.ZJHPlayerStatus.QIPAI) {
			labelText = "弃牌";
		} else if(status == game.zjh.ZJHPlayerStatus.SHIBAI) {
			labelText = "比牌输";
		} else{
			return;
		}

		this.leftTips.visible = false;
		this.rightTips.visible = false;
		this.centerTips.visible = false;
		if(this.side == 1) {
			if(this.isPk) {
				this.recordTipsArr[1] = true;
			} else {
				this.leftTips.visible = true;
			}
			this.leftTipsImg.text = labelText;
		} else if(this.side == 2){
			if(this.isPk) {
				this.recordTipsArr[2] = true;
			} else {
				this.rightTips.visible = true;
			}
			this.rightTipsImg.text = labelText;
		} else if(this.side == 3) {
			if(this.isPk) {
				this.recordTipsArr[0] = true;
			} else {
				this.centerTips.visible = true;
			}
			this.centerTipsImg.text = labelText;
		}
	}

	public hideTips() {
		this.leftTips.visible = this.rightTips.visible = this.centerTips.visible = false;
	}


	public startPk() {
		this.isPk = true;
		this.clearClock();
		this.compareGroup.visible = false;
		this.recordTipsArr = [this.centerTips.visible, this.leftTips.visible, this.rightTips.visible];
		this.hideTips();
	}

	public recovery() {
		this.isPk = false;
		this.centerTips.visible = this.recordTipsArr[0];
		this.leftTips.visible = this.recordTipsArr[1];
		this.rightTips.visible = this.recordTipsArr[2];
		if(this.parent && this.parent != this.parentGroup){
			this.parent.removeChild(this);
			this.parentGroup.addChild(this);
		}
	}

	private recordPos:egret.Point;
	private recordTipsArr:Array<any> = [];

	public tweenMoveTo(pos:egret.Point) {
		let localPos = this.parent.globalToLocal(pos.x, pos.y);
		this.recordPos = new egret.Point(this.x, this.y);
		egret.log("aaaaaa : " + localPos.x + "-----" + localPos.y);
		egret.Tween.get(this).to({x:localPos.x, y:localPos.y}, 200);
	}

	public backState() {
		if(this.recordPos) {
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({x:this.recordPos.x, y:this.recordPos.y, scaleX:1, scaleY:1}, 200).call(()=>{
				this.recovery();
			}, this);
		}
	}

	public showPkWin() {
		this.pkwinAnim.visible = true;
		this.pkwinAnim.playerOnce(this.pkwinanimcomplete, this);
	}

	private pkwinanimcomplete() {
		this.pkwinAnim.stop();
		this.pkwinAnim.visible = false;
	}
	private wait2showCards:Array<number>;
	private wait2showCardType:number;
	public showCards(cards:Array<number>, cardType:number) {
		this.wait2showCards = cards;
		this.wait2showCardType = cardType;
		this.showCardGroup.visible = true;
		this.card1.visible = false;
		this.card2.visible = false;
		this.card3.visible = false;
		this.typeImg.visible = false;
		CommonUtil.registerTimeOut(this.showCardsTrue, this, 1000);
		//this.showCardAnim.playerOnce(this.showCardsTrue, this);
	}

	private showCardsTrue() {
		this.card1.visible = this.card2.visible = this.card3.visible = false;
		this.typeImg.visible = true;
		this.card1.showCard(this.wait2showCards[0])
		this.card2.showCard(this.wait2showCards[1])
		this.card3.showCard(this.wait2showCards[2])
		// 1.对子 2.顺子 3.同花 4.同花顺 5.豹子 -1没看牌
		if(this.wait2showCardType == 1) {
			this.typeImg.source = "zjh_win_duizi";
		} else if(this.wait2showCardType == 2) {
			this.typeImg.source = "zjh_win_shunzi";
		} else if(this.wait2showCardType == 3) {
			this.typeImg.source = "zjh_win_tonghua";
		} else if(this.wait2showCardType == 4) {
			this.typeImg.source = "zjh_win_tonghuashun";
		} else if(this.wait2showCardType == 5) {
			this.typeImg.source = "zjh_win_santiao";
		} else if(this.wait2showCardType == 0) {
			this.typeImg.source = "zjh_win_gaopai";
		} else {
			this.typeImg.source = "";
		}
		this.typeImg.anchorOffsetX = this.typeImg.width / 2;
		this.typeImg.anchorOffsetY = this.typeImg.height / 2;
	}

	public hideCardsShow() {
		this.showCardGroup.visible = false;
	}

	private subText(text: string) {
		if (text.length > 4) {
			return text.substring(0, 4) + "...";
		} else return text;
	}
}
