class CandyIcon extends egret.DisplayObjectContainer implements game.IPool{

	public iconImg: eui.Image;
	public candyGridX: number = -1;
	public candyGridY: number = -1;
	public dataPoint: egret.Point;

	public constructor(id: number) {
		super();
		this.iconImg = new eui.Image();
		this.addChild(this.iconImg);
		this.poolKey = "candyIcon_" + id;
		this.iconImg.scaleX = this.iconImg.scaleY = 0.5
		this.showCandy(id);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.touchEnabled =false;
		this.touchChildren = false;
	}

	public free:boolean;
	public poolKey:string;
	private destoryDelayId:number;

	private moveSpeed:number;
	private startMoveTime:number;
	private startY:number;
	public treasureId:number = 0;
	private singleY:number = 70;
	public boomerAnim: game.CommonDB;
	// public boomerAnim: DragonAnim;

	public needBounce: boolean = true;	

	public reset():void {
		this.iconImg.scaleX = this.iconImg.scaleY = 1 * 0.5;
		this.iconImg.visible = true;
		egret.Tween.removeTweens(this.iconImg);
		this.needBounce = true;
		if(this.destoryDelayId > 0) {
			egret.clearTimeout(this.destoryDelayId);
		}
		if(this.boomPaticle1) {
			this.boomPaticle1.stop();
			if(this.boomPaticle1.stage)this.removeChild(this.boomPaticle1);
		}
		if(this.boomPaticle2) {
			this.boomPaticle2.stop();
			if(this.boomPaticle2.stage)this.removeChild(this.boomPaticle2);
		}
	}

	public start():void {
		this.addChild(this.iconImg);
	}

	public showCandy(candyId: number): void {
		this.treasureId = candyId;
		if (candyId == 401) {
			this.iconImg.source = "pic_symbol_freegame";
		} else if (candyId == 402) {
			this.iconImg.source = "pic_symbol_jackpot";
		} else if (Math.floor(candyId / 100).toFixed(0) != "6") {
			this.iconImg.source = "pic_symbol_m" + ((candyId % 100)).toFixed(0) + "_round" + Math.floor(candyId / 100).toFixed(0);
		}
		if (Math.floor(candyId % 100) == 6) {
			this.iconImg.source = "pic_symbol_freegame";
		}
		this.iconImg.anchorOffsetX = 72;
		this.iconImg.anchorOffsetY = 144;
		this.iconImg.x = 36;
		this.iconImg.y = 72;
	}

	private scaleCenterOrBottom(type: number){		//1 center 2 bottom
		this.iconImg.anchorOffsetY = type * 72;
		this.iconImg.y = type * 36;
	}

	public bounce(){
		if(this.isTreasureBoomer()) {
			return;
		}
		egret.Tween.get(this.iconImg).to({scaleY: 0.7 * 0.5}, 20, egret.Ease.circOut).call(()=>{
			egret.Tween.get(this.iconImg).to({scaleY: 1 * 0.5}, 45, egret.Ease.circIn);
		})
	}

	private isTreasureBoomer(): boolean{
		if(this.treasureId % 100 == 6) {
			return true;
		}else{
			return false;
		}
	}		

	private boomPaticle1:particle.GravityParticleSystem;
	private boomPaticle2:particle.GravityParticleSystem;

	public boom(pos: egret.Point, isParticleFly: boolean): void {
		// var movieClip: egret.MovieClip;
		if (this.treasureId % 100 == 6) {
			//过关水果boom动画 aim_pass_mc_tex
			// movieClip = TweenUtils.getMovieClip("aim_pass_mc", "aim_pass_mc");
			this.boomerAnim = new game.CommonDB("bonustime_blast_ske_dbbin", "bonustime_blast_tex_json", "bonustime_blast_tex_png", "animation", 2000);
			game.AppFacade.getInstance().sendNotification(PanelNotify.DESTORY_ONE_BOX);
			this.iconImg.visible = false;
			this.addChild(this.boomerAnim);
			let p1 = this.localToGlobal(0, 0);
			let p = this.globalToLocal(p1.x, p1.y);
			// this.boomerAnim.anchorOffsetX = 36;
			// this.boomerAnim.anchorOffsetY = 36;
			this.boomerAnim.x = p.x + this.iconImg.width / 4;
			this.boomerAnim.y = p.y + this.iconImg.height / 4;
			this.boomerAnim.visible = true;
			this.destoryDelayId = egret.setTimeout(this.destoryDelay, this, 500);
			return;

		} else {
			if (this.treasureId / 100 == 4) {
				// movieClip = TweenUtils.getMovieClip("aim_shine_jp_mc", "aim_shine_jp_mc");
			} else {
				// movieClip = TweenUtils.getMovieClip("aim_shine_normal_mc", "aim_shine_normal_mc");
			}
		}
		let centerX = this.x + this.width / 2;
		let centerY = this.y + this.height / 2;

		if(!this.boomPaticle1){
			this.boomPaticle1 = new particle.GravityParticleSystem(RES.getRes("tgpd_h_png"), RES.getRes("tgpd_h_json"));
			// this.boomPaticle2 = new particle.GravityParticleSystem(RES.getRes("tgpd_r_png"), RES.getRes("tgpd_r_json"));
		}
		this.addChild(this.boomPaticle1);
		// this.addChild(this.boomPaticle2);
		this.boomPaticle1.x = this.width / 2;
		this.boomPaticle1.y = this.height / 2;
		// this.boomPaticle2.x = this.width / 2;
		// this.boomPaticle2.y = this.height / 2;
		this.boomPaticle1.emitterX = this.boomPaticle1.emitterY = 0;
		// this.boomPaticle2.emitterY = this.boomPaticle2.emitterY = 0;
		this.boomPaticle1.start();
		// this.boomPaticle2.start();
		this.scaleCenterOrBottom(1);
		egret.Tween.get(this.iconImg).to({scaleX:1.2 * 0.5, scaleY:1.2 * 0.5},150).call(()=>{
			egret.Tween.get(this.iconImg).to({scaleX:0.1 * 0.5, scaleY:0.1 * 0.5},250).call(()=>{
				// this.iconImg.scaleX = this.iconImg.scaleY = 1;
				if(isParticleFly){
					let p = this.globalToLocal(pos.x, pos.y);
					egret.Tween.get(this.boomPaticle1).to({emitterX:p.x,emitterY:p.y}, 600);
					// egret.Tween.get(this.boomPaticle2).to({emitterX:p.x,emitterY:p.y}, 600).call(this.boomComplete, this);
				} else{
					if(this.parent){
						this.parent.removeChild(this);
					}
				}
				//恢复中心点为底端
				this.scaleCenterOrBottom(2);
			}, this);
		}, this);
		// if (isParticleFly) {
		// 	let p = this.globalToLocal(pos.x, pos.y);
		// 	egret.Tween.get(this.boomPaticle1).to({ emitterX: p.x, emitterY: p.y }, 800);
		// 	// egret.Tween.get(this.boomPaticle2).to({ emitterX: p.x, emitterY: p.y }, 800)//.call(this.destoryDelay, this);
		// } else {
		// 	if (this.parent) {
		// 		this.parent.removeChild(this);
		// 	}
		// }

		// movieClip.scaleX = movieClip.scaleY = 0.5;
		// this.parent.addChild(movieClip);
		// movieClip.blendMode = egret.BlendMode.ADD;
		// movieClip.x = centerX;
		// movieClip.y = centerY;//this.icon_charge_btn.y;
		// movieClip.play(1);
		// movieClip.addEventListener(egret.Event.COMPLETE, this.boomComplete, this);
		// this.iconImg.source = "";
		this.destoryDelayId = egret.setTimeout(this.destoryDelay, this, 1000);
	}

	private boomComplete(event: egret.Event) {

		if (event.target.parent != null) {
			//egret.stopTick(this.updateMove, this);
			event.target.parent.removeChild(event.target);
		}
	}

	private destoryDelay():void {
		if(this.parent) {
			// egret.Tween.removeTweens(this);
			egret.stopTick(this.updateMove, this);
			this.parent.removeChild(this);
		}
	}	

	public setTarget(x: number, y: number): void {
		let candyData = game.tgpd.CandyData.instance;
		if (x < candyData.candyMachineData.curLevelGrids) {
			this.setTweenTargetPos(-85 * (x + 1) - 20);
			//egret.Tween.get(this).to({y : -85 * (x+1) + 50}, 400).call(this.playDownSound, this);
		} else if (x == candyData.candyMachineData.curLevelGrids) {
			this.setTweenTargetPos(-85 * (x + 1) - 100);
			if (candyData.candyMachineData.curLevel > 1) {
				this.setTweenTargetPos(-85 * (x + 1) - 250);
			}
			//egret.Tween.get(this).to({y : -85 * (x+1) - 100}, 400).call(this.playDownSound, this);
		} else {
			this.setTweenTargetPos(-85 * (x + 1) - 250);
			//egret.Tween.get(this).to({y : -85 * (x+1) - 200}, 400).call(this.playDownSound, this);
		}
		this.candyGridX = x;
		this.candyGridY = y;
	}

	private setTweenTargetPos(targetY:number):void {
		let delta:number = targetY - this.y;
		let deltaScale: number = 0.5;
		this.moveSpeed = delta;// delta / 400;
		this.startMoveTime = egret.getTimer();
		this.startY = this.y;
		egret.startTick(this.updateMove, this);
	}
	private randomTime(delta: number): number{
		let timeRandomPart = CommonUtil.RandomRangeInt(50, 100);
		let delayPart = 0;
		// if(this.needBounce || this.isTreasureBoomer()){		//代表【原本游戏区石块下落】
		// 	delayPart = 200
		// }
		let timeFalldownPart = (delta / 1000) * 250;	//delta/1000是比例，300是最大值
		return timeRandomPart + timeFalldownPart + delayPart;
	}
	private updateMove(timestamp:number):boolean {
		if(!this.visible && this.y > -600) this.visible = true;
		var deltaTime:number = timestamp - this.startMoveTime;
		var deltaY: number = this.moveSpeed;
		let ranTime = this.randomTime(deltaY);
		this.y = this.startY + (deltaTime / ranTime) * this.moveSpeed;
		if(this.needBounce && !this.isTreasureBoomer()){
			this.iconImg.scaleY = (1 - (deltaTime / ranTime) * 0.2) * 0.5;
		}
		if(deltaTime > ranTime) {
			this.y = this.startY + this.moveSpeed;
			if(this.needBounce && !this.isTreasureBoomer()){
				this.iconImg.scaleY = 0.8 * 0.5;
				// this.playDownSound();
				this.bounce();
			}
			egret.stopTick(this.updateMove, this);
		}
		return false;
	}

	public moveDown(x:number, y:number, delay: number = 150):void {
		if(this.needBounce || this.isTreasureBoomer()){
			egret.setTimeout(()=>{
				this.setTarget(x, y);
			}, this, delay);
		} else {
			this.setTarget(x,y);
		}
	}

	private onRemove(): void{
		CommonUtil.removeTimeout(this);
		game.PoolManager.instance.pushObj(this);
	}
}