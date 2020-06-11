class DuobaoIcon extends egret.DisplayObjectContainer implements game.IPool{

	public iconImg:eui.Image;
	public candyGridX:number = -1;
	public candyGridY:number = -1;
	public dataPoint:egret.Point;
    private boomCompleteFunc: Function;
    private boomCompleteCaller:any;

	public downSound: boolean = false;
	public boomSound: boolean = false;

	public levelLength: number = 4;

	private p0x: number = 0;
	private p0y: number = 0;

	private p1x: number = 0;
	private p1y: number = 0;

	private p2x: number = 0;
	private p2y: number = 0;

	public get factor(): number {
		return 0;
	}

	public set factor(value: number) {
		this.x = (1 - value) * (1 - value) * this.p0x + 2 * value * (1 - value) * this.p1x + value * value * this.p2x;
		this.y = (1 - value) * (1 - value) * this.p0y + 2 * value * (1 - value) * this.p1y + value * value * this.p2y;
	}

	public constructor(treasureId:number) {
		super();
		this.iconImg = new eui.Image();
		this.addChildAt(this.iconImg, 0);
		this.poolKey = "duobaoIcon_" + treasureId;
		this.showTreasure(treasureId);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
		this.touchEnabled = false;
		this.touchChildren = false;
	}

	public free:boolean;
	public poolKey:string;
	private destoryDelayId:number;

	private moveSpeed:number;
	private startMoveTime:number;
	private startY:number;
	public treasureId:number;
	private singleY:number = 70;
	public boomerAnim: game.CommonDB;
	// public boomerAnim: DragonAnim;

	public needBounce: boolean = true;
	public reset():void {
		this.iconImg.scaleX = this.iconImg.scaleY = 1;
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
		if(this.boomPaticle3) {
			this.boomPaticle3.stop();
			if(this.boomPaticle3.stage)this.removeChild(this.boomPaticle3);
		}
		this.downSound = false;
		this.boomSound = false;
		this.levelLength = 4;
	}

	private boomPaticle1:particle.GravityParticleSystem;
	private boomPaticle2:particle.GravityParticleSystem;
	private boomPaticle3:particle.GravityParticleSystem;

	public start():void {
		this.addChild(this.iconImg);
	}

	public showTreasure(treasureId:number):void {
		this.treasureId = treasureId;
		let index:number = game.GameConst.getTreasureIconIndex(treasureId);
		this.iconImg.source = "db_gem_" + index;
		this.iconImg.anchorOffsetX = 31;
		this.iconImg.anchorOffsetY = 60;
		this.iconImg.x = this.iconImg.anchorOffsetX;
		this.iconImg.y = this.iconImg.anchorOffsetY;
	}
	public bounce(){
		if(this.isTreasureBoomer()) {
			return;
		}
		egret.Tween.get(this.iconImg).to({scaleY: 0.7}, 20, egret.Ease.circOut).call(()=>{
			egret.Tween.get(this.iconImg).to({scaleY: 1}, 45, egret.Ease.circIn);
		})
	}

	public besselFly(){
		let offsetX = (egret.lifecycle.stage.stageWidth - 1334) / 2;
		// let p0 = this.localToGlobal(this.x, this.y);
		// this.p0x = p0.x;
		// this.p0y = p0.y;
		let p1xArr = [330, 1004];
		let ranSide = CommonUtil.RandomRangeInt(0, 2);
		this.p1x = p1xArr[ranSide];
		this.p1y = 128;
		//console.error(ranSide);
		if(ranSide == 0){
			this.p2x = 0 + CommonUtil.RandomRange(0, 1) * (552 - 0) - 300;
		} else if(ranSide == 1){
			this.p2x = 743 + CommonUtil.RandomRange(0, 1) * (1334 - 743) + 300;
		}
		this.p2y = 675;

		if(this.parent){
			let p = this.parent.globalToLocal(this.p1x, this.p1y);
			this.p1x = p.x + offsetX;
			this.p1y = p.y - 500;
			p = this.parent.globalToLocal(this.p2x, this.p2y);
			this.p2x = p.x + offsetX;
			this.p2y = p.y + 500;
		}
		this.p0x = this.x;
		this.p0y = this.y;
		let randomTime = CommonUtil.RandomRangeInt(1000, 1500);
		egret.Tween.get(this).to({factor: 1}, randomTime).call(()=>{
			if(this && this.parent){
				this.parent.removeChild(this);
			}
		}, this);
	}

	private scaleCenterOrBottom(type: number){		//1 center 2 bottom
		this.iconImg.anchorOffsetY = type * 30;
		this.iconImg.y = this.iconImg.anchorOffsetY;
	}

	public boom(pos:egret.Point, isBoomer: boolean = false, isParticleFly: boolean, completeFunc:Function = null, completeCaller:any = null):void {
		if(isBoomer){
			this.boomerAnim = new game.CommonDB("db_posui_ske_dbbin", "db_posui_tex_json", "db_posui_tex_png", "Animation2", 2000);
			game.AppFacade.getInstance().sendNotification(PanelNotify.DESTORY_ONE_BOX);
			this.iconImg.visible = false;
			this.addChild(this.boomerAnim);
			let p1 = this.localToGlobal(this.iconImg.x, this.iconImg.y);
			let p = this.globalToLocal(p1.x, p1.y);
			this.boomerAnim.anchorOffsetX = 0;
			this.boomerAnim.anchorOffsetY = 30;
			this.boomerAnim.x = p.x;
			this.boomerAnim.y = p.y;
			this.boomerAnim.visible = true;
			if(this.boomSound){
				this.playBoomSound();
			}
			this.destoryDelayId = egret.setTimeout(this.destoryDelay, this, 500);
			return;
		}
	    this.boomCompleteFunc = completeFunc;
	    this.boomCompleteCaller = completeCaller;
		if(!this.boomPaticle2) {
			//this.boomPaticle1 = new particle.GravityParticleSystem(RES.getRes("boomRed_png"), RES.getRes("boomRed_json"));
			this.boomPaticle2 = new particle.GravityParticleSystem(RES.getRes("boomBlue_png"), RES.getRes("boomBlue_json"));
			this.boomPaticle2.blendMode = egret.BlendMode.ADD;
			//this.boomPaticle3 = new particle.GravityParticleSystem(RES.getRes("boomGray_png"), RES.getRes("boomGray_json"));
		}
		// this.addChild(this.boomPaticle1);
		this.addChild(this.boomPaticle2);
		//this.addChild(this.boomPaticle3);
		// this.boomPaticle1.x = this.boomPaticle2.x = this.boomPaticle3.x = 31;
		// this.boomPaticle1.y = this.boomPaticle2.y = this.boomPaticle3.y = 30;
		// this.boomPaticle1.emitterX = this.boomPaticle2.emitterX = this.boomPaticle3.emitterX =0 ;
		// this.boomPaticle1.emitterY = this.boomPaticle2.emitterY = this.boomPaticle3.emitterY =0 ;
		this.boomPaticle2.x= 31;
		this.boomPaticle2.y = 30;
		this.boomPaticle2.emitterX =0 ;
		this.boomPaticle2.emitterY =0 ;
		//this.boomPaticle1.start();
		this.boomPaticle2.start();
		//this.boomPaticle3.start();
		//设置中心点为中央
		this.scaleCenterOrBottom(1);
		egret.Tween.get(this.iconImg).to({scaleX:1.2, scaleY:1.2},150).call(()=>{
			egret.Tween.get(this.iconImg).to({scaleX:0.1, scaleY:0.1},250).call(()=>{
				// this.iconImg.scaleX = this.iconImg.scaleY = 1;
				if(isParticleFly){
					let p = this.globalToLocal(pos.x, pos.y);
					//egret.Tween.get(this.boomPaticle1).to({emitterX:p.x,emitterY:p.y}, 600);
					egret.Tween.get(this.boomPaticle2).to({emitterX:p.x,emitterY:p.y}, 600).call(this.boomComplete, this);
					//egret.Tween.get(this.boomPaticle3).to({emitterX:p.x,emitterY:p.y}, 600).call(this.boomComplete, this);
				} else{
					if(this.parent){
						this.parent.removeChild(this);
					}
				}
				//恢复中心点为底端
				this.scaleCenterOrBottom(2);
			}, this);
		}, this);
		this.destoryDelayId = egret.setTimeout(this.destoryDelay, this, 1200);
	}

	private boomComplete() {
	    if(this.boomCompleteFunc) {
	        this.boomCompleteFunc.call(this.boomCompleteCaller)
        }
    }

	private destoryDelay():void {
		if(this.parent) {
			// egret.Tween.removeTweens(this);
			egret.stopTick(this.updateMove, this);
			this.parent.removeChild(this);
		}
	}

	public setTarget(x:number, y:number):void {
		let duobaoData = game.duobao.DuobaoData.instance;
		if(x < duobaoData.duobaoMachineData.curLevelGrids) {
			this.setTweenTargetPos(-this.singleY * (x+1) - 13);
			//egret.Tween.get(this).to({y : -85 * (x+1) + 50}, 400).call(this.playDownSound, this);
		} else if(x == duobaoData.duobaoMachineData.curLevelGrids){
			if(duobaoData.currentLayer == 1) {
				this.setTweenTargetPos(-this.singleY * (x+1) - 222);
			} else if(duobaoData.currentLayer == 2) {
				this.setTweenTargetPos(-this.singleY * (x+1) - 142);
			} else {
				this.setTweenTargetPos(-this.singleY * (x+1) - 62);
			}
			
			//egret.Tween.get(this).to({y : -85 * (x+1) - 100}, 400).call(this.playDownSound, this);
		} else {
			this.setTweenTargetPos(-this.singleY * (x+1) - 300);
			//egret.Tween.get(this).to({y : -85 * (x+1) - 200}, 400).call(this.playDownSound, this);
		}
		this.candyGridX = x;
		this.candyGridY = y;
		if(this.candyGridX <= this.levelLength){
			this.downSound = true;
		}
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
			this.iconImg.scaleY = 1 - (deltaTime / ranTime) * 0.2;
		}
		if(deltaTime > ranTime) {
			this.y = this.startY + this.moveSpeed;
			if(this.needBounce && !this.isTreasureBoomer()){
				this.iconImg.scaleY = 0.8;
				this.bounce();
			}
			if(this.downSound){
				this.playDownSound();
			}
			egret.stopTick(this.updateMove, this);
		}
		return false;
	}

	private playDownSound():void {
		game.duobao.DuobaoSoundPlayer.instance.playSound(game.duobao.DuobaoSoundType.GEM_FALL);
	}
	private playBoomSound():void {
		game.duobao.DuobaoSoundPlayer.instance.playSound(game.duobao.DuobaoSoundType.GEM_DESTORY);
	}

	public moveDown(x:number, y:number, delay: number = 150):void {
		if(this.needBounce || this.isTreasureBoomer()){
			CommonUtil.registerTimeOut(()=>{
				this.setTarget(x, y);
			}, this, delay);
		} else {
			this.setTarget(x,y);
		}
	}

	private isTreasureBoomer(): boolean{
		if(this.treasureId == 106 || this.treasureId == 206 || this.treasureId == 306) {
			return true;
		}else{
			return false;
		}
	}

	private onRemove():void {
		CommonUtil.removeTimeout(this);
		game.PoolManager.instance.pushObj(this);
	}
}