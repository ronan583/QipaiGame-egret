class DZPKHeadIcon extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	public headIconImg: eui.Image;
	public headFrameImg: eui.Image;
	public waitImg: eui.Image;
	public gold: eui.Label;
	public playerName: eui.Label;
	public bankerImg: eui.Image;
	private winAnim: DragonAnim;
	private cardGroup: eui.Group;
	private cardBgImg: eui.Image;
	private allInFireAnim: DragonAnim;

	private bankerPos:egret.Point;

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		let w = this.clockImg.width / 2;
		let h = this.clockImg.height / 2;
		this.radiusStar = Math.sqrt(w * w + h * h)
		this.radiusWith = w;
		this.radiusHeight = h;
		this.clock.visible = false;
		this.winAnim.visible = false;
		this.initParticle();
		this.clearClock();
		this.clearState();
		this.bankerPos = egret.Point.create(this.bankerImg.x, this.bankerImg.y);
	}

	private initParticle() {
		this.starParticle = new particle.GravityParticleSystem(RES.getRes("playcountdown_png"), RES.getRes("playcountdown_json"));
		this.clock.addChild(this.starParticle);
		this.starParticle.emitterX = this.starParticle.emitterY = 0;
		this.starParticle.x = 0;
		this.starParticle.y = 0;
	}

	public playerInfo: game.PlayerInfo;
	public clock: eui.Group;
	public clockImg: eui.Image;
	private radiusStar: number = 50;
	private radiusWith: number = 0;
	private radiusHeight: number = 0;

	private tempShape: egret.Shape = null;
	private angle: number;
	private startTime: number = 0;
	private startAngle: number = 0;

	public loseTip: eui.Group;
	public winTip: eui.Group;
	public loseTipLabel: eui.Label;
	public winTipLabel: eui.Label;
	private starParticle: particle.GravityParticleSystem;
	public stackTypeImg: eui.Image;
	private halfNotice: boolean = false;
	public card1: Card;
	public card2: Card;
	private fireEffect: egret.MovieClip;
	private totalTime: number;
	public curStakeType: game.dzpk.StakeType = game.dzpk.StakeType.NONE;
	private zhouchangarr: Array<number> = [];
	private totalzhouchange: number = 0;
	public drawFan(): void {
		this.clock.visible = true;
		this.tempShape = new egret.Shape();
		this.clock.addChild(this.tempShape);
		egret.startTick(this.onClockTick, this);
		this.clockImg.mask = this.tempShape;
	}

	private ta(angle: number): number {
		let a = angle * Math.PI / 180;
		return Math.tan(a);
	}

	private reposstar2() {
		if (this.totalzhouchange == 0) {
			this.zhouchangarr = [this.radiusWith, this.radiusHeight * 2, this.radiusWith * 2, this.radiusHeight * 2, this.radiusWith];
			for (let f of this.zhouchangarr) {
				this.totalzhouchange += f;
			}
		}
		let percent = this.angle / 360;
		let newf = this.totalzhouchange * percent;
		let i = 0;
		let limit = 0;
		let p: egret.Point = new egret.Point(0, 0);
		if (this.tempShape) {
			this.tempShape.graphics.clear();
			this.tempShape.graphics.beginFill(0xff0000);
			this.tempShape.graphics.moveTo(this.radiusWith, 0);
			this.tempShape.graphics.lineTo(this.radiusWith, this.radiusHeight);
		}

		for (i = 0; i < this.zhouchangarr.length; i++) {
			limit += this.zhouchangarr[i]
			if (newf < limit) {
				limit -= this.zhouchangarr[i];
				break;
			}
		}

		if (i == 0) {
			p.x = this.radiusWith + newf;
			p.y = 0;
			this.tempShape.graphics.lineTo(p.x, p.y);
			this.tempShape.graphics.lineTo(this.radiusWith, 0);
		} else if (i == 1) {
			p.x = this.radiusWith * 2;
			p.y = newf - limit;
			this.tempShape.graphics.lineTo(p.x, p.y);
			this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
			this.tempShape.graphics.lineTo(this.radiusWith, 0);
		} else if (i == 2) {
			p.x = this.radiusWith * 2 - (newf - limit);
			p.y = this.radiusHeight * 2;
			this.tempShape.graphics.lineTo(p.x, p.y);
			this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
			this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
			this.tempShape.graphics.lineTo(this.radiusWith, 0);
		} else if (i == 3) {
			p.x = 0;
			p.y = this.radiusHeight * 2 - (newf - limit)
			this.tempShape.graphics.lineTo(p.x, p.y);
			this.tempShape.graphics.lineTo(0, this.radiusHeight * 2);
			this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
			this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
			this.tempShape.graphics.lineTo(this.radiusWith, 0);
		} else if (i == 4) {
			p.y = 0;
			p.x = newf - limit;
			this.tempShape.graphics.lineTo(p.x, p.y);
			this.tempShape.graphics.lineTo(0, 0);
			this.tempShape.graphics.lineTo(0, this.radiusHeight * 2);
			this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
			this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
			this.tempShape.graphics.lineTo(this.radiusWith, 0);
		}
		this.tempShape.graphics.endFill();
		this.starParticle.emitterX = p.x;
		this.starParticle.emitterY = p.y;
	}

	private onClockTick(timeStamp: number): boolean {
		let passAngle = (((timeStamp - this.startTime) / 1000) / this.totalTime) * 360;
		this.angle = passAngle + this.startAngle;
		this.angle = this.angle % 360;
		this.reposstar2();
		if (this.angle >= 355) {
			this.clearClock();
		}
		if (!this.halfNotice && this.angle >= 180) {
			game.dzpk.DZPKSoundPlayer.instance.playSound(game.dzpk.DZPKSoundType.HALF_TIME);
			this.halfNotice = true;
		}
		return true;
	}

	public ShowPlayerHead(playerInfo: game.PlayerInfo): void {
		this.clearClock();
		this.clearCard();
		this.visible = true;
		this.playerInfo = playerInfo;
		this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
		// this.headFrameImg.source = "gp_headframe_0_1";
		this.gold.text = CommonUtil.convertMonetShow(playerInfo.money);
		this.playerName.text = playerInfo.nickName;

		this.loseTip.visible = false;
		this.winTip.visible = false;
	}

	public showClock(time: number): void {
		this.totalTime = 9;
		this.startTime = egret.getTimer();
		this.startAngle = ((this.totalTime - time) / this.totalTime) * 360;
		this.drawFan();
	}

	public clearClock(): void {
		egret.stopTick(this.onClockTick, this);
		this.startAngle = 0;
		this.startTime = 0;
		this.angle = 0;
		if (this.tempShape != null) {
			if (this.tempShape.parent != null) {
				this.tempShape.parent.removeChild(this.tempShape);
			}
			this.tempShape = null;
		}
		this.clock.visible = false;
		this.halfNotice = false;
		this.starParticle.stop();
	}

	public showImmGold(gold: number): void {
		this.gold.text = gold.toFixed(2);
	}

	public ShowWait(isWait: boolean): void {
		this.waitImg.visible = isWait;
	}

	public ShowBanker(isBanker: boolean, withAnim:boolean = false): void {
		this.bankerImg.visible = isBanker;
		if(isBanker && withAnim) {
			// 做一个飞行动画
			let center = game.GameUtil.getStageWH();
			center = this.globalToLocal(center.x / 2, center.y / 2);
			this.bankerImg.x = center.x;
			this.bankerImg.y = center.y;
			egret.Tween.get(this.bankerImg).to({x:this.bankerPos.x, y:this.bankerPos.y}, 500);
		} else {
			this.bankerImg.x = this.bankerPos.x;
			this.bankerImg.y = this.bankerPos.y;
		}
	}

	public showWin(win: number): void {
		if (win == 0) return;
		this.winTip.visible = true;
		this.winTip.x = 0;
		this.winTip.y = 0;
		this.winTipLabel.text = "+" + win.toFixed(2);
		var tw: egret.Tween = egret.Tween.get(this.winTip);
		var target = this.winTip;
		tw.to({ y: -100 }, 500).call(() => {
			this.winAnim.visible = true;
			this.winAnim.playerOnce(()=>{target.visible = false;}, this);
		});
	}

	public showLose(lose: number): void {
		if (lose == 0) return;
		this.loseTip.visible = true;
		this.loseTip.x = 0;
		this.loseTip.y = 0;
		if (lose > 0) {
			this.loseTipLabel.text = "-" + lose.toFixed(2);
		} else {
			this.loseTipLabel.text = lose.toFixed(2);
		}
		var tw: egret.Tween = egret.Tween.get(this.loseTip);
		var target = this.loseTip;
		tw.to({ y: -100 }, 1500, egret.Ease.sineInOut).call(() => {
			target.visible = false;
		});
	}

	public clearState(): void {
		this.stackTypeImg.source = "";
		this.playerName.visible = true;
	}

	public showFinishCardType(winType: number): void {
		this.playerName.visible = false;
		switch (winType) {
			case game.dzpk.TexasCardType.DUI:
				this.stackTypeImg.source = "ndzpk_one_pair";
				break;
			case game.dzpk.TexasCardType.SHUANG_DUI:
				this.stackTypeImg.source = "ndzpk_two_pairs";
				break;
			case game.dzpk.TexasCardType.GAO_PAI:
				this.stackTypeImg.source = "ndzpk_high_card";
				break;
			case game.dzpk.TexasCardType.HULU:
				this.stackTypeImg.source = "ndzpk_full_house";
				break;
			case game.dzpk.TexasCardType.JIN_GANG:
				this.stackTypeImg.source = "ndzpk_four";
				break;
			case game.dzpk.TexasCardType.MAX_TONG_HUA_SHUN:
				this.stackTypeImg.source = "ndzpk_royal_flush";
				break;
			case game.dzpk.TexasCardType.SAN:
				this.stackTypeImg.source = "ndzpk_three";
				break;
			case game.dzpk.TexasCardType.SHUN:
				this.stackTypeImg.source = "ndzpk_straight";
				break;
			case game.dzpk.TexasCardType.TONG_HUA:
				this.stackTypeImg.source = "ndzpk_flush";
				break;
			case game.dzpk.TexasCardType.TONG_HUA_SHUN:
				this.stackTypeImg.source = "ndzpk_straight_flush";
				break;
		}
	}

	public showStakeStateNormal(stakeType: number): void {
		if(stakeType != game.dzpk.StakeType.DISCARD) {
			this.showStakeState(stakeType);
		}
	}

	public showStakeState(stakeType: number): void {
		let source = "";
		switch (stakeType) {
			case game.dzpk.StakeType.ADD:
			case game.dzpk.StakeType.DAMANG_FOUR:
			case game.dzpk.StakeType.DAMANG_THREE:
			case game.dzpk.StakeType.BET_BOTTOM:
				source = "ndzpk_opt_raise";
				break;
			case game.dzpk.StakeType.PASS:
				source = "ndzpk_opt_next";
				break;
			case game.dzpk.StakeType.FOLLOW:
				source = "ndzpk_opt_follow";
				break;
			case game.dzpk.StakeType.DISCARD:
				source = "ndzpk_opt_drop";
				break;
			case game.dzpk.StakeType.ALL_IN:
				source = "ndzpk_opt_allin";
				this.showFire();
				break;
		}
		if(source == "") {
			// 显示名字
			this.playerName.visible = true;
		} else {
			this.playerName.visible = false;
		}
		this.stackTypeImg.source = source;
		this.curStakeType = stakeType;
	}

	public showCard(cards: Array<number>, cardShow: Array<boolean>, isWin: boolean): void {
		egret.log("手上的手牌 : " + cards.join(",") + "   " + cardShow.join(","))
		this.cardGroup.visible = true;
		this.cardBgImg.source = isWin ? "ndzpk_win_bright_card_bg" : "ndzpk_head_gray_layer";
		this.card1.visible = this.card2.visible = true;
		this.card1.clearSelected();
		this.card2.clearSelected();
		this.card1.showCard(cards[0]);
		this.card2.showCard(cards[1]);
		this.card1.showSelected(cardShow[0]);
		this.card2.showSelected(cardShow[1]);
	}

	public showFire(): void {
		this.allInFireAnim.visible = true;
		this.allInFireAnim.setLoop(true);
		this.allInFireAnim.playerTimes(null, null, 0, "idle");
	}

	public clearEffect(): void {
		if (this.allInFireAnim) {
			this.allInFireAnim.stop();
			this.allInFireAnim.visible = false;
		}
	}

	public clearCard(): void {
		this.card1.visible = this.card2.visible = false;
		this.cardGroup.visible = false;
	}

	getHeadPos() {
		return this.localToGlobal(this.headIconImg.x + this.headIconImg.width / 2, this.headIconImg.y + this.headIconImg.height / 2)
	}

	showGrayState() {
		this.waitImg.visible = true;
		this.showStakeState(game.dzpk.StakeType.DISCARD);
    }
}