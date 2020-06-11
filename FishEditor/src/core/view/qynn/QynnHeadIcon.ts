class QynnHeadIcon extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public headIconImg: eui.Image;
	// public headFrameImg:eui.Image;
	public gold: eui.Label;
	public playerName: eui.Label;
	public bankerImg: eui.Image;
	public boxLightImg: eui.Image;
	public vip: eui.BitmapLabel;

	public bebankerBitlabel: eui.BitmapLabel;
	public multipleBitLabel: eui.BitmapLabel;

	public bankerAnim: game.CommonDBLoop2;
	public kuangMc: egret.MovieClip;
	public renxAnim: game.CommonDBLoop2;
	public coinAnim: game.CommonDBLoop2;

	private starParticle: particle.GravityParticleSystem;
	private totalTime: number;

	public playerInfo: game.PlayerInfo;
	public clock: eui.Group;
	public clockImg: eui.Image;
	private unitDrawAngle: number = 0.12;
	private radius: number = 100;

	private tempShape: egret.Shape = null;
	private angle: number;
	private startTime: number = 0;
	private startAngle: number = 0;
	public star: eui.Image;

	protected childrenCreated(): void {
		super.childrenCreated();
		this.initAnim();
		let w = this.clockImg.width / 2;
		let h = this.clockImg.height / 2;
		this.radiusStar = Math.sqrt(w * w + h * h)
		this.radiusWith = w;
		this.radiusHeight = h;

		this.initParticle();
	}

	private initParticle() {
		this.starParticle = new particle.GravityParticleSystem(RES.getRes("playcountdown_png"), RES.getRes("playcountdown_json"));
		this.clock.addChild(this.starParticle);
		this.starParticle.emitterX = this.starParticle.emitterY = 0;
		this.starParticle.x = 0;
		this.starParticle.y = 0;
	}

	public initAnim() {
		this.coinAnim = new game.CommonDBLoop2("qznn_jinboom_ske_dbbin", "qznn_jinboom_tex_json", "qznn_jinboom_tex_png", "animation", false, false);
		this.addChild(this.coinAnim);
		this.coinAnim.x = this.width / 2;
		this.coinAnim.y = this.height / 2 - 8;
		this.coinAnim.width = 150;
		this.coinAnim.height = 200;
		this.coinAnim.touchChildren = false;
		this.coinAnim.touchEnabled = false;
		this.coinAnim.visible = false;
		let data = RES.getRes("qznn_touxiangkuang_mc_json");
		let txtr = RES.getRes("qznn_touxiangkuang_tex_png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		this.kuangMc = new egret.MovieClip(mcFactory.generateMovieClipData("qznn_touxiangkuang"));
		this.addChild(this.kuangMc);
		this.kuangMc.x = 90;
		this.kuangMc.y = 100;
		this.kuangMc.visible = false;
		this.renxAnim = new game.CommonDBLoop2("renx_ske_dbbin", "renx_tex_json", "renx_tex_png", "animation", false, false);
		this.addChild(this.renxAnim);
		this.renxAnim.x = this.width / 2;
		this.renxAnim.y = this.height / 2 + 22;
		this.renxAnim.width = 150;
		this.renxAnim.height = 200;
		this.renxAnim.touchChildren = false;
		this.renxAnim.touchEnabled = false;
		this.renxAnim.visible = false;
		this.bankerAnim = new game.CommonDBLoop2("zhuang_1_ske_dbbin", "zhuang_1_tex_json", "zhuang_1_tex_png", "animation", false, false);
		this.addChild(this.bankerAnim);
		this.bankerAnim.x = 150;
		this.bankerAnim.y = 28;
		this.bankerAnim.width = 70;
		this.bankerAnim.height = 70;
		this.bankerAnim.touchChildren = false;
		this.bankerAnim.touchEnabled = false;
		this.bankerAnim.visible = false;

		this.cont = 0;
		this.clock.visible = false;
		this.boxLightImg.visible = false;
		this.bankerImg.visible = false;
		if (this.tempShape != null) {
			this.tempShape.graphics.clear();
			if (this.tempShape.parent != null) {
				this.tempShape.parent.removeChild(this.tempShape);
			}
			this.tempShape = null;
		}
	}

	public resetHeadIcon(): void {
		egret.Tween.removeTweens(this.boxLightImg);
		CommonUtil.removeTimeout(this);
		this.bebankerBitlabel.visible = false;
		this.multipleBitLabel.visible = false;
		this.renxAnim.visible = false;
		this.bankerAnim.visible = false;
		this.coinAnim.visible = false;
		this.bankerImg.visible = false;
		this.kuangMc.visible = false;

		if (this.tempShape != null) {
			this.tempShape.graphics.clear();
			if (this.tempShape.parent != null) {
				this.tempShape.parent.removeChild(this.tempShape);
			}
			this.tempShape = null;
		}
	}

	public drawFan(): void {
		this.clock.visible = true;
		if (this.tempShape != null) {
			this.tempShape.graphics.clear();
			if (this.tempShape.parent != null) {
				this.tempShape.parent.removeChild(this.tempShape);
			}
			this.tempShape = null;
		}
		this.tempShape = new egret.Shape();
		this.clock.addChild(this.tempShape);
		egret.startTick(this.onClockTick, this);
		this.tempShape.mask = this.clockImg
	}

	private ta(angle: number): number {
		let a = angle * Math.PI / 180;
		return Math.tan(a);
	}

	private zhouchangarr: Array<number> = [];
	private totalzhouchange: number = 0;
	private radiusStar: number = 50;
	private radiusWith: number = 0;
	private radiusHeight: number = 0;

	private reposstar() {
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
		}

		for (i = 0; i < this.zhouchangarr.length; i++) {
			limit += this.zhouchangarr[i]
			if (newf < limit) {
				limit -= this.zhouchangarr[i];
				break;
			}
		}

		if (this.tempShape) {
			if (i == 0) {
				p.x = this.radiusWith + newf;
				p.y = 0;
				this.tempShape.graphics.beginFill(0xb1cb1e);
				this.tempShape.graphics.moveTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith, this.radiusHeight);
				this.tempShape.graphics.lineTo(this.radiusWith, 0);
				this.tempShape.graphics.lineTo(0, 0);
				this.tempShape.graphics.lineTo(0, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, 0);
			} else if (i == 1) {
				p.x = this.radiusWith * 2;
				p.y = newf - limit;
				this.tempShape.graphics.beginFill(0xe9e52a);
				this.tempShape.graphics.moveTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith, this.radiusHeight);
				this.tempShape.graphics.lineTo(this.radiusWith, 0);
				this.tempShape.graphics.lineTo(0, 0);
				this.tempShape.graphics.lineTo(0, this.radiusHeight * 2);
				this.tempShape.graphics.lineTo(this.radiusWith * 2, this.radiusHeight * 2);
			} else if (i == 2) {
				p.x = this.radiusWith * 2 - (newf - limit);
				p.y = this.radiusHeight * 2;
				this.tempShape.graphics.beginFill(0xf5bf1a);
				this.tempShape.graphics.moveTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith, this.radiusHeight);
				this.tempShape.graphics.lineTo(this.radiusWith, 0);
				this.tempShape.graphics.lineTo(0, 0);
				this.tempShape.graphics.lineTo(0, this.radiusHeight * 2);
			} else if (i == 3) {
				p.x = 0;
				p.y = this.radiusHeight * 2 - (newf - limit)
				this.tempShape.graphics.beginFill(0xe2a12d);
				this.tempShape.graphics.moveTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith, this.radiusHeight);
				this.tempShape.graphics.lineTo(this.radiusWith, 0);
				this.tempShape.graphics.lineTo(0, 0);
			} else if (i == 4) {
				p.y = 0;
				p.x = newf - limit;
				this.tempShape.graphics.beginFill(0xe8660a);
				this.tempShape.graphics.moveTo(p.x, p.y);
				this.tempShape.graphics.lineTo(this.radiusWith, this.radiusHeight);
				this.tempShape.graphics.lineTo(this.radiusWith, 0);
			}
			this.tempShape.graphics.endFill();
			this.star.visible = true;

			this.starParticle.emitterX = p.x;
			this.starParticle.emitterY = p.y;
		}
	}

	private onClockTick(timeStamp: number): boolean {
		this.angle = (((timeStamp - this.startTime) / 1000 + this.startAngle) / this.totalTime) * 360;
		this.angle = this.angle % 360;
		this.reposstar();
		if (this.angle >= 355) {
			this.clearClock();
		}
		return true;
	}

	private changeGraphics(angle, shape: egret.Shape) {
		shape.graphics.clear();
		shape.graphics.beginFill(0xff0000);
		shape.graphics.moveTo(this.radiusWith, this.radiusHeight);
		shape.graphics.drawArc(this.radiusWith, this.radiusHeight, this.radiusStar, -90 * Math.PI / 180, (angle - 90) * Math.PI / 180, true);
		shape.graphics.lineTo(this.radiusWith, this.radiusHeight);
		shape.graphics.endFill();
	}

	public ShowPlayerHead(playerInfo: game.PlayerInfo): void {
		this.playerInfo = playerInfo;
		this.vip.text = "V" + playerInfo.vipLevel;
		this.headIconImg.source = "gp_head_" + (playerInfo.headNum + 1);
		// this.headFrameImg.source = "gp_headframe_0_" + (playerInfo.headNum < 6 ? 2: 1);
		this.gold.text = CommonUtil.fixMoneyFormat(playerInfo.money);
		this.playerName.text = playerInfo.nickName;

		this.bebankerBitlabel.visible = false;
		this.multipleBitLabel.visible = false;

		this.initAnim();
		this.clearClock();
	}

	public showClock(time: number): void {
		this.totalTime = time;
		this.startTime = egret.getTimer();
		this.startAngle = time - time;
		this.drawFan();
		this.starParticle.start();
	}

	public clearClock(): void {
		egret.stopTick(this.onClockTick, this);
		this.startAngle = 0;
		this.startTime = 0;
		this.star.visible = false;
		if (this.tempShape != null) {
			this.tempShape.graphics.clear();
			if (this.tempShape.parent != null) {
				this.tempShape.parent.removeChild(this.tempShape);
			}
			this.tempShape = null;
		}
		this.clock.visible = false;
		this.starParticle.stop();
	}

	public showImmGold(gold: number): void {
		this.gold.text = CommonUtil.fixMoneyFormat(gold);
	}

	public showBanker(isBanker: boolean): void {
		this.bankerImg.visible = isBanker;
		this.bankerAnim.visible = false;
	}

	public showRenx(): void {
		this.renxAnim.visible = true;
		this.renxAnim.playOnce();
	}

	public showCoin(): void {
		if (!this.coinAnim.armature.animation.isPlaying) {
			this.coinAnim.visible = true;
			this.coinAnim.playOnce();
		}
	}

	private showBankerAnim(): void {
		var self = this;
		this.bankerAnim.visible = true;
		this.bankerAnim.playOnce();
		CommonUtil.registerTimeOut(function () {
			this.kuangMc.stop();
			this.kuangMc.visible = false;
			if (self.bebankerBitlabel.text == "b") {
				self.bebankerBitlabel.visible = true;
				self.bebankerBitlabel.text = "x1";
			}
		}, this, 1000);
	}

	public showEffect(time = 1000): void {
		this.flashImage(this.boxLightImg);
		CommonUtil.registerTimeOut(function () {
			this.kuangMc.stop();
			this.kuangMc.visible = true;
			this.kuangMc.gotoAndPlay(1, 5);
			CommonUtil.registerTimeOut(function () {
				this.showBankerAnim();
			}, this, time);
		}, this, 500);
	}

	public stopEffect(): void {
		this.kuangMc.stop();
		this.kuangMc.visible = false;
	}

	public cont: number = 0;
	public flashImage(img: eui.Image, cont = 2) {
		if (!img || img == null) {
			return;
		}
		this.cont++;
		img.visible = true;
		img.alpha = 1;
		egret.Tween.removeTweens(img);
		egret.Tween.get(img).to({ alpha: 0 }, 200).call(() => {
			img.alpha = 0;
			if (this.cont < cont) {
				this.flashImage(img);
			}
		}, this);
	}
}