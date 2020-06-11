module game {
	export class BYBulletFactory {
		private static _instance:BYBulletFactory;
		public static get instance():BYBulletFactory {
			if(BYBulletFactory._instance == null) {
				BYBulletFactory._instance = new BYBulletFactory();
			}
			return BYBulletFactory._instance;
		}

		public createBullet(bulletIndex:number):BYBullet {
			var poolKey:string = "bullet_" + bulletIndex.toFixed(0);
			var bullet:BYBullet = <BYBullet>PoolManager.instance.popObj(poolKey);
			if(!bullet) {
				bullet = new BYBullet(bulletIndex);
			} 
			return bullet;
		}

	}

	export class BYBullet extends egret.DisplayObjectContainer implements IPool{
		private startMotionTime: number;
		public constructor(bulletIndex:number) {
			super();
			this.bulletIndex = bulletIndex;
			this.bulletImg = new eui.Image();
			this.addChild(this.bulletImg);
			// this.bulletImg.source = "bullet_sty_" + this.bulletIndex.toFixed(0);
			this.bulletImg.source = game.by.ByConst.getBulletImg(bulletIndex);
			this._poolKey = "bullet_" + this.bulletIndex.toFixed(0);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.bulletCreate, this);
		}

		private bulletCreate():void {
			this.bulletImg.x = 0;
			this.bulletImg.y = 0;
			this.bulletImg.anchorOffsetX = this.bulletImg.width / 2;
			this.bulletImg.anchorOffsetY = this.bulletImg.height / 2;
		}

		private bulletIndex:number = 0;
		private bulletImg:eui.Image;
		private _free:boolean = false;
		private _poolKey:string = "";

		public targetPos:egret.Point;
		private shootDir:egret.Point;
		private lastTickTime:number;
		public speed:number = 1350;

		public lockFish:game.by.BYFish | game.by.BYFishRing;

		public bindPlayerInfo:game.by.BYPlayerInfo;
		public code:string = "";

		private startX:number = 0;
		private startY:number = 0;
		public setTarget(targetPos:egret.Point):void {
			this.targetPos = targetPos;
			this.shootDir = new egret.Point(targetPos.x - this.x, targetPos.y - this.y);
			this.shootDir.normalize(1);
			this.lastTickTime = egret.getTimer();
			this.startMotionTime = egret.getTimer();
			this.startX = this.x;
			this.startY = this.y;
			egret.stopTick(this.update, this);
			egret.startTick(this.update, this);
		}

		private update(timestamp:number):boolean {
			var delta:number = timestamp - this.lastTickTime;
			if(this.lockFish && this.lockFish.stage) {
				let pos:egret.Point = this.lockFish.parent.localToGlobal(this.lockFish.x, this.lockFish.y);
				pos = this.parent.globalToLocal(pos.x, pos.y);
				this.shootDir = new egret.Point(pos.x - this.x, pos.y - this.y);
				this.shootDir.normalize(1);
				this.x += this.shootDir.x * (delta / 1000) * this.speed;
				this.y += this.shootDir.y * (delta / 1000) * this.speed;
			} else {
				this.x += this.shootDir.x * (delta / 1000) * this.speed;
				this.y += this.shootDir.y * (delta / 1000) * this.speed;
			}
			let deltax = this.x - this.startX;
			let deltaY = this.y - this.startY;
			if(Math.sqrt(deltax * deltax + deltaY * deltaY) > 2000) {
				this.destory();
				return false;
			}

			this.lastTickTime = timestamp;

			if(game.by.BYFishPond.instance ) {
				let selfGlobalPoint = this.parent.localToGlobal(this.x, this.y);
				for(let fish of game.by.BYFishPond.instance.getAllFish()) {
					if(this.lockFish) {
						if(fish != this.lockFish) continue;
					}
					if(fish.deadBeginTime > 0) continue;
					if(egret.Point.distance(selfGlobalPoint, fish.getPos()) < 50) {
						if(this.getRect().intersects(fish.getRect())) {
							fish.hurt(this.bulletIndex);
							game.by.BYFishPond.instance.showKillGrid(this.parent.localToGlobal(this.x, this.y), this.bulletIndex).rotation = this.rotation;
							if(this.bindPlayerInfo &&this.bindPlayerInfo.playerId == game.UserService.instance.playerId) {
								// 发送射击信息
								BYRequest.sendShootHitInfo(fish.fishIndex.toFixed(0),fish.id, this.code);
							}
							this.destory();
							return false;
						}
					}
				}
				for(let fish of game.by.BYFishPond.instance.getAllFishRing()) {
					if(this.lockFish) {
						if(fish != this.lockFish) continue;
					}
					if(fish.deadBeginTime > 0) continue;
					if(egret.Point.distance(selfGlobalPoint, fish.getPos()) < 300) {
						for(let rect of fish.getRectArr()) {
							if(this.getRect().intersects(rect)) {
								fish.hurt(this.bulletIndex);
								game.by.BYFishPond.instance.showKillGrid(this.parent.localToGlobal(this.x, this.y), this.bulletIndex).rotation = this.rotation;
								if(this.bindPlayerInfo &&this.bindPlayerInfo.playerId == game.UserService.instance.playerId) {
									// 发送射击信息
									BYRequest.sendShootHitInfo(fish.fishIndex.toFixed(0),fish.id, this.code);
								}
								this.destory();
								return false;
							}
						}
					}
				}
			}
			return false;
		}

		public destory():void {
			egret.stopTick(this.update, this);
			this.parent.removeChild(this);
			this.code = "";
			// PoolManager.instance.pushObj(this);
		}

		public getRect():egret.Rectangle {
			var globalPoint: egret.Point = this.parent.localToGlobal(this.x, this.y);
			return new egret.Rectangle(globalPoint.x - this.bulletImg.width / 2, globalPoint.y - this.bulletImg.height / 2, this.bulletImg.width, this.bulletImg.height);
		}

		public set free(isFree:boolean) {
			this._free=isFree;
		}
		public get free():boolean {
			return this._free;
		}
		public set poolKey(key:string) {
			this._poolKey=key;
		}
		public get poolKey():string {
			return this._poolKey;
		}
		public reset():void{
			egret.stopTick(this.update, this);	
			this.lockFish = null;
		}

	}
}