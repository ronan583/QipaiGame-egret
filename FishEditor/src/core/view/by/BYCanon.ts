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
		this.canonAnim1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowChangeBtn, this);
		this.canonAnim2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowChangeBtn, this);
		this.canonAnim3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowChangeBtn, this);
		this.canonIndex = 0;
		this.refreshCanon();
	}

	public gun:eui.Group;
	private gunImg:eui.Image;
	public firePoint:eui.Group;
	public gunBg:eui.Image;
	private targetX:number = 0;
	private targetY:number = 0;
	public lastShootTime:number = 0;
	private shootCd:number = 500;
	private lastTargetX:number = 0;
	private lastTargetY:number = 0;

	public curTargetFish:game.by.BYFish = null;

	public shootInfo:game.by.ShootInfo;

	public bindPlayerInfo:game.by.BYPlayerInfo;

	private linsArr:Array<eui.Image> = [];
	private changeBtn:eui.Button;
	private canonIndex:number = 0;
	private canonAnim1:DragonAnim;
	private canonAnim2:DragonAnim;
	private canonAnim3:DragonAnim;

	private curCannonAnim:DragonAnim;

	public bindPlayer(playerInfo:game.by.BYPlayerInfo):void {
		if(playerInfo.playerId == game.UserService.instance.playerId) {
			this.changeBtn.visible = true;
		} else {
			this.changeBtn.visible = false;
		}
	}

	private onAdd():void {
		if(this.bindPlayerInfo) {
			this.bindPlayer(this.bindPlayerInfo);
			this.canonIndex = this.bindPlayerInfo.canonIndex;
			this.refreshCanon();
		}
		this.showChangeBtn();
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

	public shootAutoDir(tx:number, ty:number):void {
		if(this.isCd()) return;
		this.lastShootTime = egret.getTimer();
		BYRequest.sendShootInfo(tx,ty);
		// this.shootToTargetPoint(tx, ty, "");
	}

	public shootToTargetPoint(targetX:number, targetY:number, code:string, lockFish:game.by.BYFish|game.by.BYFishRing = null):void {
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
		if(!this.changeBtn.visible) {
			this.showChangeBtn();
		}
	}

	private changeCanon():void {
		// game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHANGE_CANON_PANEL);
		BYRequest.changeCanon((++this.canonIndex) % 3);
		this.changeBtn.visible = false;
	}

	private showChangeBtn():void {
		this.changeBtn.visible = true;
		egret.setTimeout(()=>{
			this.changeBtn.visible = false;
		}, this, 3000);
	}

	public switchCanon(index:number):void {
		this.canonIndex = index;
		this.gunImg.source = "cannon_gun_" + index.toFixed(0);
		/*
		this.gun.width = this.gunImg.width;
		this.gun.height = this.gunImg.height;
		this.gun.anchorOffsetX = this.gunImg.width / 2;
		this.gun.anchorOffsetY = this.gunImg.height / 2;
		*/
		this.refreshCanon();
	}

	public refreshCanon() {
		this.canonAnim1.visible = this.canonAnim2.visible = this.canonAnim3.visible = false;
		if(this.canonIndex == 0) {
			this.curCannonAnim = this.canonAnim1;
		} else if(this.canonIndex == 1) {
			this.curCannonAnim = this.canonAnim2;
		} else if(this.canonIndex == 2) {
			this.curCannonAnim = this.canonAnim3;
		} 
		this.curCannonAnim.visible = true;
		this.gunBg.source = "by_cannon_dizuo" + (this.canonIndex + 1).toFixed(0);
	}

	public fire():void {
		this.curCannonAnim.playerOnce();
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
}
