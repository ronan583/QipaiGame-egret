class BYCanon extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, this.onAdd, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeCanon, this);
		this.gun.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowChangeBtn, this);
		this.canonIndex = 0;
		this.refreshCanon();
		this.recordY = this.changeBtn.y + this.changeBtn.height;
	}

	public gun:eui.Group;
	private gunImg:eui.Image;
	public firePoint:eui.Group;
	public gunBg:eui.Image;
	private targetX:number = 0;
	private targetY:number = 0;
	public lastShootTime:number = 0;
	private shootCd:number = 250;
	private lastTargetX:number = 0;
	private lastTargetY:number = 0;

	public curTargetFish:game.by.BYFish = null;

	public shootInfo:game.by.ShootInfo;

	public bindPlayerInfo:game.by.BYPlayerInfo;

	private linsArr:Array<eui.Image> = [];
	private changeBtn:eui.Button;
	private canonIndex:number = 0;
	private fishCanonAnim:DragonAnim;
	private selfTipGroup:eui.Group;
	private frameImg:eui.Image;
	private changeAnim:MCAnim;
	private recordY:number = 0;

	private winGroup:eui.Group;
	private winCircleImg:eui.Image;
	private winFontGroup:eui.Group;
	private winMoneyLabel:eui.Label;
	private beginWinTime:number;

	public bindPlayer(playerInfo:game.by.BYPlayerInfo):void {
		if(playerInfo.isAdd && playerInfo.playerId == game.UserService.instance.playerId) {
			this.showSelfTips();
		} else {
			this.changeBtn.visible = false;
		}
	}

	private onAdd():void {
		this.changeBtn.visible = false;
		if(this.bindPlayerInfo) {
			this.bindPlayer(this.bindPlayerInfo);
			if(this.bindPlayerInfo.playerId == UserService.instance.playerId) {
				if(game.by.BYData.instance.recordCanonId > 0) {
					this.canonIndex = game.by.BYData.instance.recordCanonId 
				} else {
					this.canonIndex = this.bindPlayerInfo.canonIndex;
				}
			} else {
				this.canonIndex = this.bindPlayerInfo.canonIndex;
			}
			
			this.refreshCanon();
		}
		this.selfTipGroup.visible = false;
		this.changeAnim.visible = false;
		this.winGroup.visible = false;
	}

	public showSelfTips() {
		this.selfTipGroup.visible = true;
		// 呼吸效果3次
		this.startTime = egret.getTimer();
		egret.startTick(this.updateTips, this);
	}
	private startTime:number;
	private delayHideId:number;
	private updateTips(timestamp:number) : boolean {
		let pass = timestamp - this.startTime;
		if(pass > 3000) {
			egret.stopTick(this.updateTips, this);
			this.selfTipGroup.visible = false;
			this.showChangeBtnWithAnim();
		}
		if(Math.floor(pass / 500) % 2 == 0) {
			this.frameImg.alpha = (pass % 500) / 500;
		} else {
			this.frameImg.alpha = 1 - ((pass % 500) / 500);
		}
		return false;
	}

	public showChangeBtnWithAnim() {
		if(this.changeBtn.visible) return;
		egret.Tween.removeTweens(this.changeBtn)
		this.changeBtn.visible = true;
		this.changeBtn.alpha = 0;
		this.changeBtn.y = this.recordY
		egret.Tween.get(this.changeBtn).to({
			y:this.recordY - this.changeBtn.height,
			alpha:1
		}, 500);
		this.delayHideId = egret.setTimeout(()=>{
			egret.Tween.removeTweens(this.changeBtn)
			egret.Tween.get(this.changeBtn).to({
				y:this.recordY,
				alpha:0
			}, 500).call(()=>{
				this.changeBtn.visible = false;
			}, this)
		}, this, 3500);
	}

	public lookAt(x:number, y:number):boolean {
		this.targetX = x;
		this.targetY = y;
		var gunGlobalPoint:egret.Point = this.localToGlobal(this.gun.x,this.gun.y);
		gunGlobalPoint = game.by.BYFishPond.instance.globalToLocal(gunGlobalPoint.x, gunGlobalPoint.y);
		var angle:number = Math.atan(this.scaleY * (y - gunGlobalPoint.y) /( x - gunGlobalPoint.x));
		// console.log("angle : " + angle);
		if(x < gunGlobalPoint.x) {
			angle = -(90 - angle*180/3.1415926);
		} else {
			angle = angle*180/3.1415926 + 90;
		}
		if(isNaN(angle)) {
			return false;
		}
		this.gun.rotation = angle;
		return true;
	}
	
	public getPos():egret.Point {
		return this.localToGlobal(this.gun.x,this.gun.y);
	}

	public getFirePoint():egret.Point {
		let p = this.firePoint.parent.localToGlobal(this.firePoint.x, this.firePoint.y);
		return game.by.BYFishPond.instance.globalToLocal(p.x, p.y);
	}

	public isCd() : boolean {
		return (egret.getTimer() - this.lastShootTime) < this.shootCd;
	}

	public shootAutoDir(tx:number, ty:number):boolean {
		if(this.isCd()) return;
		this.lastShootTime = egret.getTimer();
		return BYRequest.sendShootInfo(tx,ty);
	}

	public shootToTargetPoint(targetX:number, targetY:number, code:string, lockFish:game.by.NFish|game.by.NFishRing = null):void {
		this.lastTargetX = targetX;
		this.lastTargetY = targetY;
		this.fire();
		if(lockFish && lockFish.deadBeginTime <= 0) {
			let p = lockFish.getPos();
			p = game.by.BYFishPond.instance.globalToLocal(p.x, p.y);
			this.lookAt(p.x, p.y);
		} else {
			this.lookAt(targetX, targetY);
		}
		var cannonPos = this.getFirePoint();
		// this.shootBullet(this.canon1.getPos(), new egret.Point(e.stageX,e.stageY));
		var bullet:game.BYBullet = game.BYBulletFactory.instance.createBullet(this.canonIndex);
		game.by.BYFishPond.instance.addChild(bullet);
		bullet.x = cannonPos.x;
		bullet.y = cannonPos.y;
		bullet.scaleY = this.scaleY;
		bullet.setTarget(new egret.Point(targetX,targetY));
		if(bullet.scaleY == 1) {
			bullet.rotation = this.gun.rotation;
		} else {
			bullet.rotation = 360-this.gun.rotation;
		}
		var byEffect:game.by.BYEffect = game.by.BYEffectFactory.getEffect("fireeffect");
		game.by.BYFishPond.instance.addChild(byEffect);
		byEffect.play();
		byEffect.x = cannonPos.x;
		byEffect.y = cannonPos.y;
		this.lastShootTime = egret.getTimer();
		if(this.bindPlayerInfo.shootInfo.isLock() && lockFish && lockFish.deadBeginTime <= 0) {
			bullet.lockFish = lockFish;
			if(lockFish) {
				bullet.speed = 1600;
			}
		} else {
			bullet.lockFish = null;
		}
		bullet.bindPlayerInfo = this.bindPlayerInfo;		
		bullet.code = code;

		game.by.BYSoundPlayer.instance.playSound(game.by.BYSoundType.SHOOT);
	}
	
	public clearLockLine():void {
		for(let lineNode of this.linsArr) {
			if(lineNode.parent) {
				lineNode.parent.removeChild(lineNode);
			}
		}
		this.linsArr = [];
	}

	public drawLockLine(startPoint:egret.Point,endPoint:egret.Point):void {
		var distance:number = egret.Point.distance(startPoint, endPoint);
		startPoint = game.by.BYFishPond.instance.globalToLocal(startPoint.x, startPoint.y);
		endPoint = game.by.BYFishPond.instance.globalToLocal(endPoint.x, endPoint.y);
		if(distance == NaN) {
			return;
		}
		var lineNodeCount:number = Math.floor(distance / 50);
		if(this.linsArr.length < lineNodeCount) {
			var createCount:number = lineNodeCount - this.linsArr.length;
			console.log("chuang jian line node : " + createCount);
			for(let i=0;i<createCount;i++) {
				var img:eui.Image = new eui.Image();
				img.source = "lock_line";
				img.anchorOffsetX = 12;
				img.anchorOffsetY = 14;
				this.linsArr.push(img);
				game.by.BYFishPond.instance.addChild(img);
			}
		} else {
			if(this.linsArr.length > lineNodeCount) {
				var destoryCount:number = this.linsArr.length - lineNodeCount;
				for(let i=0;i<destoryCount;i++) {
					var node = this.linsArr[this.linsArr.length - 1];
					if(node &&node.parent) {
						node.parent.removeChild(node);
					}
					console.log("shanchu line node : " + destoryCount);
					this.linsArr.splice(this.linsArr.length - 1, 1);
				}
			}
		}
		for(let i=0;i<this.linsArr.length;i++) {
			this.linsArr[i].x = startPoint.x + i * (endPoint.x - startPoint.x) / lineNodeCount;
			this.linsArr[i].y = startPoint.y + i * (endPoint.y - startPoint.y) / lineNodeCount;
		}
	}

	private onShowChangeBtn() {
		if(this.bindPlayerInfo && this.bindPlayerInfo.playerId == UserService.instance.playerId) {
			this.showChangeBtnWithAnim();
		}
	}

	private changeCanon():void {
		BYRequest.changeCanon((++this.canonIndex) % 10);
		this.changeBtn.visible = false;
		if(this.delayHideId > 0) {
			egret.clearTimeout(this.delayHideId);
		}
	}

	public switchCanon(index:number):void {
		this.canonIndex = index;
		this.gunImg.source = "cannon_gun_" + index.toFixed(0);
		this.showChangeAnim();
		this.refreshCanon();
	}
	public showChangeAnim() {
		this.changeAnim.visible = true;
		this.changeAnim.setAnimScale(5,5);
		this.changeAnim.playerOnce(()=>{
			this.changeAnim.visible = false;
		}, this)
	}

	private getAnimIndex(index:number):string {
		return index < 10 ? "0" + index : index.toFixed(0);
	}

	public refreshCanon() {
		this.fishCanonAnim.changeAnim("paotai" + this.getAnimIndex(this.canonIndex));
		this.gunBg.source = "by_cannon_dizuo1";
	}

	public fire():void {
		this.fishCanonAnim.setLoop(false);
		this.fishCanonAnim.playerOnce(()=>{
			this.fishCanonAnim.setLoop(true);
			this.fishCanonAnim.playAnim("standby")
		}, this, "open fire");
		/*
		egret.Tween.removeTweens(this.gunImg);
		this.gunImg.y = 0;
		egret.Tween.get(this.gunImg).to({y:50},80).call(
			()=>{
				egret.Tween.get(this.gunImg).to({y:0},80);
			}
		)
		*/
	}

	public showWin(winMoney:number) {
		if(this.winGroup.visible) {
			this.beginWinTime = egret.getTimer();
			this.winMoneyLabel.text = winMoney.toFixed(0);
			return;
		}
		this.winGroup.visible = true;
		this.winGroup.alpha = 0;
		this.winMoneyLabel.text = winMoney.toFixed(0);
		egret.Tween.get(this.winGroup).to({alpha:1}, 200);
		this.beginWinTime = egret.getTimer();
		egret.stopTick(this.updateWinRotate, this);
		egret.startTick(this.updateWinRotate, this);
	}

	public stopWin() {
		this.winGroup.visible = false;
		egret.stopTick(this.updateWinRotate, this);
	}

	private updateWinRotate(timestamp:number):boolean {
		this.winCircleImg.rotation += 2;
		if(timestamp > (this.beginWinTime + 3000)) {
			this.stopWin();
		} else {
			let p:number = ((timestamp - this.beginWinTime) % 1000) / 1000;
			if(p < 0.25) {
				this.winFontGroup.rotation = (- 45 * (p / 0.25));
			} else if(p < 0.75){
				this.winFontGroup.rotation = (- 45 + 90 * ((p - 0.25) / 0.5));
			} else {
				this.winFontGroup.rotation = (45 - 45 * ((p - 0.75) / 0.25));
			}
		}
		return false;
	}
}
