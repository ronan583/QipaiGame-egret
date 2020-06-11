module game.by {
	export class BYFishPond extends eui.Component {
        
		private static _instance:BYFishPond;

		public static get instance():BYFishPond {
			return BYFishPond._instance;
		}
		public constructor() {
			super();
			BYFishPond._instance = this;
			this.fishLayer1 = new egret.DisplayObjectContainer();
			this.fishLayer2 = new egret.DisplayObjectContainer();
			this.fishLayer3 = new egret.DisplayObjectContainer();
			this.fishLayer4 = new egret.DisplayObjectContainer();
			this.addChild(this.fishLayer1);
			this.addChild(this.fishLayer2);
			this.addChild(this.fishLayer3);
			this.addChild(this.fishLayer4);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdd, this);
		}

		private refreshTickTime:number = 100;
		private nextRefreshTickTime:number = 0;
		// 所有鱼列表
		private fishArr:Array<NFish|NFishRing> = [];
		// 锁定划线点集合
		private linsArr:Array<eui.Image> = [];
		// 炮列表
		public canonList:Array<BYCanon>;
		// 是否翻转Y
		public isFlip:boolean = false;
		// 鱼群创建开始时间
		private startGroupTime:number;
		private fishGroupIndex:number;

		private bolangMc:egret.MovieClip;
		private tempTimeStart:number;

		private fishLayer1:egret.DisplayObjectContainer;
		private fishLayer2:egret.DisplayObjectContainer;
		private fishLayer3:egret.DisplayObjectContainer;
		public fishLayer4:egret.DisplayObjectContainer;

		private lockImg: eui.Image;

		private attachImgBg:eui.Image;
		private attachImg:eui.Image;

		private fishTideArr:Array<FishTide> = [];
		public bybattlefield:BYBattleUI ;

		private oneCatchEffectArr:Array<CommonDBLoop2> = [];

		private waitToCreateFishes:Array<FishInfo> = [];

		private onAdd():void {
			this.width = this.stage.stageWidth;
            this.height = this.stage.stageHeight;
			this.init();
		}

		public init():void {
			
		}
		private isinit:boolean = false;
		public start(isflip:boolean) {
			if(this.isinit) return;
			this.isinit = true;
			this.isFlip = isflip;
			ScriptCfg.instance.init();
			this.nextRefreshTickTime = egret.getTimer() + this.refreshTickTime;
			egret.startTick(this.update, this);
			// create test fish tide
			// this.createTestFishTide();
			/*
			let trackCfg = NTrackCfgCache.getTrackCfg(1001, egret.lifecycle.stage.stageWidth / 1624, false);
			for(let j=0;j<trackCfg.trackItems.length;j++) {
				let item = trackCfg.trackItems[j];
				let shape = new egret.Shape();
				this.addChild(shape);
				let g = shape.graphics;
				g.clear();
				g.beginFill(0xFFE4B5);
				g.drawCircle(0,0,3);
				g.endFill();
				shape.x = item.x;
				shape.y = item.y;
			}
			let fish = new NFish("1111", 2, 0, 0, 0);
			fish.setTrackCfg(1001, trackCfg);
			this.fishLayer1.addChild(fish);
			fish.startMotion();
			fish.bindFishPond(this);
			this.fishArr.push(fish);
			trackCfg = NTrackCfgCache.getTrackCfg(1001, egret.lifecycle.stage.stageWidth / 1624, true);
			for(let j=0;j<trackCfg.trackItems.length;j++) {
				let item = trackCfg.trackItems[j];
				let shape = new egret.Shape();
				this.addChild(shape);
				let g = shape.graphics;
				g.clear();
				g.beginFill(0xFFffff);
				g.drawCircle(0,0,3);
				g.endFill();
				shape.x = item.x;
				shape.y = item.y;
			}
			let fish2 = new NFish("1111", 2, 0, 0, 0);
			fish2.setTrackCfg(1001, trackCfg);
			this.fishLayer1.addChild(fish2);
			fish2.startMotion();
			fish2.bindFishPond(this);
			this.fishArr.push(fish2);
			*/
		}

		createFishTide(fishTideInfo: FishTideInfo) {
			let fishTide = new FishTide(fishTideInfo);
			this.fishLayer2.addChild(fishTide);
			this.fishTideArr.push(fishTide);
			fishTide.startMotion();
			for(let fish of this.fishArr) {
				fish.speedUp();
			}
			this.fishArr = this.fishArr.concat(fishTide.getAllFishes());
        }

		public createFish(fishInfo:FishInfo) {
			this.waitToCreateFishes.push(fishInfo);
		}

		public createFish0(fishInfo:FishInfo):void {
			let pretime:number = (BYData.instance.servetTime - fishInfo.createTime);
			let trackCfg = NTrackCfgCache.getTrackCfg(fishInfo.fishesPath, egret.lifecycle.stage.stageWidth / 1624, this.isFlip);
			if(!fishInfo.zuHeId || fishInfo.zuHeId <= 0) {
				let fish = new NFish(fishInfo.id, fishInfo.fishesId, fishInfo.offsetX, fishInfo.offsetY, pretime);
				fish.setTrackCfg(fishInfo.fishesPath, trackCfg);
				fish.fishType = fishInfo.type
				// 插入排序sort layer
				let targetIndex = 0;
				for(let i=0;i<this.fishLayer1.numChildren;i++) {
					let f = this.fishLayer1.getChildAt(i);
					if(egret.is(f, "game.by.NFish")) {
						let childFish = <NFish>f;
						if(fish.fishIndex > childFish.fishIndex) {
							targetIndex = i;
							break;
						}
					}
				}
				this.fishLayer1.addChildAt(fish, targetIndex);
				fish.startMotion();
				fish.bindFishPond(this);
				this.fishArr.push(fish);
				if(fishInfo.type == FishType.ONE_CATCH) {
					fish.showOnCatch();
				}
			} else {
				let fish = new NFishRing(fishInfo.id, fishInfo.fishesId, fishInfo.zuHeId, fishInfo.offsetX, fishInfo.offsetY, pretime, fishInfo.childFishesId);
				fish.setTrackCfg(fishInfo.fishesPath, trackCfg);
				fish.fishType = fishInfo.type
				this.fishLayer2.addChild(fish);
				fish.bindFishPond(this);
				fish.setTrackCfg(fishInfo.fishesPath, trackCfg);
				fish.startMotion();
				this.fishArr.push(fish);
			}
		}

		private addFish(fishInfo:FishInfo, fish:NFish):void {
			if(fishInfo.type == FishType.SMALL) {
				this.fishLayer1.addChild(fish);
			} else if(fishInfo.type == FishType.MIDDLE) {
				this.fishLayer2.addChild(fish);
			} else if(fishInfo.type == FishType.BIG) {
				this.fishLayer3.addChild(fish);
			} else if(fishInfo.type == FishType.BOSS) {
				this.fishLayer4.addChild(fish);
			}
		}

		public createFishImm(fishInfo:FishInfo):void {
			this.createFish(fishInfo);
		}

		private checkGroup():void {
			var passTime:number = Math.floor((BYData.instance.servetTime - this.startGroupTime) / 100);
			let flag = 0;
			for(let i=1;i<11;i++) {
				var scriptSummary:ScriptSummary = ScriptCfg.instance.getScriptSummary2(i);
				var index:number = 0;
				for(let scriptItem of scriptSummary.scriptItems) {
					index++;
					var p:number = passTime - (scriptItem.delayTime + (i-1) * 100);
					if(p > 0 && scriptItem.createdIndex != this.fishGroupIndex) {
						scriptItem.createdIndex = this.fishGroupIndex;
						flag++;
						this.createFishByScriptItem(scriptSummary.scriptId + "_" + index, scriptItem, p / 10);
					}
				}
			}

			var index:number = 0;
			var scriptSummary:ScriptSummary = ScriptCfg.instance.getScriptSummary2(11);
			for(let scriptItem of scriptSummary.scriptItems) {
				var p:number = passTime - scriptItem.delayTime;
				index++;
				flag++;
				if(p > 0 && scriptItem.createdIndex != this.fishGroupIndex) {
					scriptItem.createdIndex = this.fishGroupIndex;
					this.createFishByScriptItem(scriptSummary.scriptId + "_" + index, scriptItem, p / 10);
				}
			}
		}

		public update(timestamp:number):boolean {
			if(!this.isinit) return;
			// 从队列里面取一个出来创建
			if(this.waitToCreateFishes.length > 0) {
				let fishInfo = this.waitToCreateFishes[0];
				this.createFish0(fishInfo);
				this.waitToCreateFishes.splice(0, 1);
			}

			for(let fish of this.fishArr) {
				if(!fish['tideOwnerId']) {
					fish.update(timestamp);
					fish.updateMotion(timestamp);
				}
			}
			for(let fishTide of this.fishTideArr) {
				fishTide.update(timestamp);
			}
			/*
			if(this.nextRefreshTickTime > 0 && timestamp > this.nextRefreshTickTime) {
				var second:number = date.getSeconds();
				var minute:number = date.getMinutes();
				var scriptSummary:ScriptSummary = ScriptCfg.instance.getScriptSummary(second);
				if(scriptSummary) {
					var scriptItem:ScriptItem = scriptSummary.getScriptItemByMinute(minute);
					this.createFishByScriptItem(minute+"_" + second, scriptItem, 0);
				}
				var fishGroupInfo:FishGroupInfo = BYData.instance.getLastFishGroupInfo();
				if(fishGroupInfo) {
					if(!fishGroupInfo.hasCreate && BYData.instance.servetTime >= fishGroupInfo.groupCreateTime) {
						this.startGroupTime = 0;
						this.fishGroupIndex = BYData.instance.fishGroupInfoList.length + 1;
						this.startFishGroup(fishGroupInfo.groupCreateTime);
						fishGroupInfo.hasCreate = true;
					}
				}	
				if(this.startGroupTime > 0) {
					this.checkGroup();
				}
				this.nextRefreshTickTime = timestamp + this.refreshTickTime;
			}
			*/
			if(this.canonList &&this.canonList.length >0) {
				for(let canon of this.canonList) {
					if(!canon.bindPlayerInfo || canon.bindPlayerInfo.playerId != game.UserService.instance.playerId) {
						canon.clearLockLine();
						continue;
					}
					// 需要修改锁定之后不自动攻击
					let playerInfo:BYPlayerInfo = BYData.instance.getPlayerInfo(canon.bindPlayerInfo.playerId);
					if(playerInfo.shootInfo) {
						if(playerInfo.shootInfo.isAuto()) {
							if(!canon.isCd()) {
								if(playerInfo.shootInfo.isLock()) {
									let fish:NFish|NFishRing = null;
									let fishLockWorker = this.bybattlefield.fishLockWorker;
									if(playerInfo.shootInfo.lockTargetFishId != "") {
										fish = this.getFishById(playerInfo.shootInfo.lockTargetFishId);
									} 
									if(fish) {
										if(fish['tideOwner']) {
											// 鱼潮不通过这个处理
										} else if(fishLockWorker.isOutOfBounds(fish)) {
											fish = null;
										}
									}
									if(!fish) {
										fish = fishLockWorker.triggerLockAfterFishDeadOrOut();	
										if(!fish) return;
										playerInfo.recordTargetFishId = fish.id;
										BYRequest.sendShootAutoInfo(playerInfo.shootInfo.shootType,playerInfo.recordTargetFishId,playerInfo.recordTargetX,playerInfo.recordTargetY);
									}
									let pos:egret.Point = fish.getPos();
									canon.lastShootTime = egret.getTimer();
									if(BYRequest.sendShootInfo(pos.x, pos.y)){
										this.bybattlefield.playShootSelf(pos.x, pos.y);
									}
								}else {
									if(playerInfo.shootInfo.autoShootTargetX) {
										if(canon.shootAutoDir(playerInfo.shootInfo.autoShootTargetX, playerInfo.shootInfo.autoShootTargetY)) {
											this.bybattlefield.playShootSelf(playerInfo.shootInfo.autoShootTargetX, playerInfo.shootInfo.autoShootTargetY);
										}
									}
								}
							}
						}
						// lock fish
						if(!playerInfo.shootInfo.isLock()) {
							canon.clearLockLine();
							this.clearLock();
						} else {
							let fish:NFish|NFishRing = this.getFishById(playerInfo.shootInfo.lockTargetFishId);
							let fishLockWorker = this.bybattlefield.fishLockWorker;
							if(fish) {
								if(fish['tideOwner']) {
									// 鱼潮不通过这个处理
								} else if(fishLockWorker.isOutOfBounds(fish)) {
									fish = null;
								}
							}
							if(!fish) {
								fish = fishLockWorker.triggerLockAfterFishDeadOrOut();	
								if(fish) {
									playerInfo.recordTargetFishId = fish.id;
									BYRequest.sendShootAutoInfo(playerInfo.shootInfo.shootType,playerInfo.recordTargetFishId,playerInfo.recordTargetX,playerInfo.recordTargetY);
								}
							}
							if(fish) {
								let pos:egret.Point = fish.getPos();
								canon.drawLockLine(canon.getPos(), pos);
								this.showLock(pos);
							} else {
								canon.clearLockLine();
								this.clearLock();
							}
						}
					}
				}
			}			

			return false;
		}

		private autoChangeLockFish(originFish:any):NFish|NFishRing {
			let tempArr:Array<NFish|NFishRing> = []
			for(let f of this.fishArr) {
				if(f != originFish) {
					tempArr.push(f);
				}
			}
			return tempArr[CommonUtil.RandomRangeInt(0,tempArr.length - 1)];
		}

		private showLock(pos:egret.Point):void {
			if(!this.lockImg) {
				this.lockImg = new eui.Image();
				this.lockImg.source = "lock_head";
				this.lockImg.anchorOffsetX = 52;
				this.lockImg.anchorOffsetY = 52;
			}
			this.addChild(this.lockImg);
			pos = this.globalToLocal(pos.x, pos.y);
			this.setChildIndex(this.lockImg, 1000);
			this.lockImg.x = pos.x;
			this.lockImg.y = pos.y;
		}

		private clearLock():void {
			if(this.lockImg && this.lockImg.stage) {
				this.lockImg.parent.removeChild(this.lockImg);
			}
		}

		private createFishByScriptItem(dateStr:string, scriptItem:ScriptItem,pretime:number):void {
			/*
			var fishId:string = dateStr + "_" + scriptItem.fishIndex;
			var fish:NFish = NFishFactory.instance.createFish(fishId,scriptItem.fishIndex, 
				scriptItem.trackId, scriptItem.offsetX, scriptItem.offsetY, pretime);
			this.addChild(fish);
			fish.x = -200;
			fish.y = -200;
			this.fishArr.push(fish);
			CommonUtil.log("====鱼群创建鱼 ：" + scriptItem.fishIndex);
			*/
		}

		public removeFish(fish:NFish|NFishRing):void {
			let index:number = this.fishArr.indexOf(fish);
			if(index >= 0) {
				// 防止异常 
				if(fish.parent) fish.parent.removeChild(fish);
				this.fishArr.splice(index, 1);
			}
		}

		public removeFishTide(fishTide:FishTide):void {
			let index:number = this.fishTideArr.indexOf(fishTide);
			if(index >= 0) {
				this.fishTideArr.splice(index, 1);
			}
			// 需要从数据里面移除鱼
			for(let fish of fishTide.getAllFishes()) {
				let idx = this.fishArr.indexOf(fish);
				this.fishArr.splice(idx, 1);
			}
		}

		public getAllFish():Array<NFish|NFishRing> {
			return this.fishArr;
		}

		public getFishByPos(x:number, y:number):NFish|NFishRing {
			var pos:egret.Point = new egret.Point(x,y);
			for(let fish of this.fishArr) {
				if(fish.isHit(pos)) {
					return fish;
				}
			}
			return null;
		}

		public getFishById(fishid:string):NFish|NFishRing {
			let target = null;
			for(let i=0; i< this.fishArr.length;i++) {
				let fish = this.fishArr[i];
				if(isNaN(fish.x) || isNaN(fish.y) || isNaN(fish.rotation)) {
					// 这条鱼出现问题
					this.fishArr.splice(i, 1);
					i--;
					if(fish.parent) {
						fish.parent.removeChild(fish);
					}
					continue;
				}
				if(fish.id == fishid) {
					target = fish;
				}
			}
			return target;
		}

		public showKillGrid(point:egret.Point, bulletIndex:number, rotation:number) {
			point = this.globalToLocal(point.x, point.y);
			let byhitEffect = game.by.ByConst.getHitGridImg(bulletIndex);
			this.addChild(byhitEffect.display);
			byhitEffect.display.x = point.x;
			byhitEffect.display.y = point.y;
			byhitEffect.display.rotation = rotation;
			byhitEffect.play();
		}

		public stop():void {
			egret.stopTick(this.update, this);
			let fishArrCopy = this.fishArr.concat([]);
			for(let fish of fishArrCopy) {
				if(!fish['tideOwnerId']) {
					fish.destoryImm();
				}
			}
			for(let fishTide of this.fishTideArr) {
				if(fishTide.parent) fishTide.parent.removeChild(fishTide);
			}
			this.fishTideArr = [];
			this.fishArr = [];
			this.isinit = false;
		}
		
		public speedUpAllSmallFish():void {
			for(let fish of this.fishArr) {
				if(fish.fishType == FishType.SMALL) {
					fish.speedUp();
				}
			}
		}

		public checkDeadFish(x:number):void {
			for(let i=0;i< this.fishArr.length;i++) {
				let fish:NFish|NFishRing = this.fishArr[i];
				if(fish.x < x) {
					fish.destoryImm();
					this.fishArr.splice(i,1);
					i--;
				}
			}
		}

		public startFishGroup(time:number):void {
            // 所有小鱼加速完成当前路径
            this.speedUpAllSmallFish();
			//if(bolangShow) {
				// 播放波浪动画
				if(this.bolangMc == null) {
					var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes("bolang_mc_json"), RES.getRes("bolang_tex_png") );
					this.bolangMc = new egret.MovieClip(mcFactory.generateMovieClipData("bolang"));
				}
				this.addChild(this.bolangMc);
				this.bolangMc.play(-1);
				this.bolangMc.x = 0;
				this.bolangMc.scaleX = -1;
				this.bolangMc.y = this.stage.stageHeight / 2;
				egret.startTick(this.checkFishDead, this);
				this.tempTimeStart = time;
				var tw:egret.Tween = egret.Tween.get(this.bolangMc);
				tw.to({x:this.stage.stageWidth},1500).call(this.removeBolang, this);
			//}
        }

        private removeBolang():void {
            if(this.bolangMc && this.bolangMc.stage) {
                this.bolangMc.parent.removeChild(this.bolangMc);
            }
			this.startGroupTime = this.tempTimeStart;
            egret.stopTick(this.checkFishDead, this);
        }

		private checkFishDead(timestamp:number):boolean {
            this.checkDeadFish(this.bolangMc.x);
            return false;
        }

		public setPass(pass:number):void {
			var cursorAdd:number = Math.floor((pass / 1000) * 30 / 4);
			for(let fish of this.fishArr) {
				// fish.setCursor(cursorAdd);
			}
		}

		public getAttachImgBg():eui.Image {
			if(!this.attachImgBg) {
				this.attachImgBg = new eui.Image();
				this.attachImgBg.source = "lock_head_change_bg";
				this.attachImgBg.anchorOffsetX = this.attachImgBg.anchorOffsetY = 68;
			}
			return this.attachImgBg;
		}

		public getAttachFront():eui.Image {
			if(!this.attachImg) {
				this.attachImg = new eui.Image();
				this.attachImg.source = "lock_head_change";
				this.attachImg.anchorOffsetX = this.attachImg.anchorOffsetY = 62;
			}
			return this.attachImg;
		}

		public getMaxFish():NFish | NFishRing{
			let f:NFish|NFishRing;
			for(let fish of this.fishArr) {
				if(!f) {
					f = fish;
					continue;
				}
				if(fish.fishIndex > f.fishIndex) {
					f = fish;
				}
			}
			return f;
		}

		public showOneCatachEffect(fishIdArr:Array<string>) {
			// 找出所有一网打尽的鱼
			let arr:Array<NFish|NFishRing> = [];
			for(let fish of this.fishArr) {
				// if(fishIdArr.indexOf(fish.id) >= 0) {
				if(fish.isOneCatach()) {
					/*
					let p = fish.localToGlobal(0,0);
					if(p.x < 0 || p.x > egret.lifecycle.stage.stageWidth || p.y < 0 || p.y > egret.lifecycle.stage.stageHeight) {
						continue;
					}
					*/
					arr.push(fish);
				}
			}
			for(let f of arr) {
				f.dead(3000);
			}
			let lines:Array<BYLine> = BYLine.genLines(arr);
			
			for(let line of lines) {
				let p = line.getCenterPoint();
				let anim = this.getAnim("shandianliansuo");
				this.fishLayer1.addChild(anim);
				anim.x = p.x;
				anim.y = p.y;
				anim.rotation = line.getRotation();
				anim.scaleX = line.getLength() / 700;
				egret.log("fffffffffffffff " + line.p1.x + " " + line.p1.y + " " + line.p2.x + " "
					+ line.p2.y + "   " + line.getLength()  + "     " + anim.scaleX)
				this.oneCatchEffectArr.push(anim);
			}
			this.bybattlefield.setTimeOut(()=>{
				for(let animEffect of this.oneCatchEffectArr) {
					if(animEffect.parent) {
						animEffect.parent.removeChild(animEffect);
					}
				}
				this.oneCatchEffectArr = [];
			}, 3000);
		}

		getAnim(animInfo:string):CommonDBLoop2 {
            let anim = new game.CommonDBLoop2(animInfo + "_ske_dbbin", animInfo + "_tex_json", animInfo + "_tex_png", "animation", true, true, false);
            anim.touchChildren = anim.touchEnabled = false;
            return anim;
		}

		public clearAllFish() {
			this.waitToCreateFishes = [];
			for(let fish of this.fishArr) {
				fish.stopMotion();
				if(fish.parent) {
					fish.parent.removeChild(fish);
				}
			}
			this.fishArr = [];
		}
		
		public clear() {
			this.isinit = false;
			egret.stopTick(this.update, this);
			this.isFlip = false;
			this.clearAllFish();
		}

	}
}