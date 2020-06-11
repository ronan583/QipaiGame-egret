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
		private roomCreateTime:number = 1547712301;
		// 所有鱼列表
		private fishArr:Array<BYFish> = [];
		private fishRingArr:Array<BYFishRing> = [];
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
		private fishLayer4:egret.DisplayObjectContainer;

		private lockImg: eui.Image;

		private attachImgBg:eui.Image;
		private attachImg:eui.Image;

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
			
			// 倒推20s 创建所有鱼
			//this.createInit();
			// this.startGroupTime = egret.getTimer();
			/*
			var fish:BYFish = BYFishFactory.instance.createFish("1",23, 
				130400, 0, 0, 0);
				
			this.addChild(fish);
			fish = BYFishFactory.instance.createFish("1",23, 
				10111, 0, 0, 0);
				this.addChild(fish);
			*/
		}

		public createFish(fishInfo:FishInfo):void {
			var pretime:number = Math.floor((BYData.instance.servetTime - fishInfo.createTime) / 1000);
			this.createFish0(fishInfo, pretime);
		}

		private addFish(fishInfo:FishInfo, fish:BYFish):void {
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
			this.createFish0(fishInfo, 0);
		}

		private createFish0(fishInfo:FishInfo,pretime:number):void {
			/*
			// if(this.fishLayer1.numChildren > 0) return;
			if(fishInfo.fishesId == 19 || fishInfo.fishesId == 20 || fishInfo.fishesId == 22|| fishInfo.fishesId == 24) {
				// 组合鱼
				var fishRing:BYFishRing = BYFishFactory.instance.createFishRing(fishInfo.id,fishInfo.fishesId, 
				fishInfo.fishesPath, fishInfo.offsetX, fishInfo.offsetY, pretime);
				this.fishLayer3.addChild(fishRing);
				fishRing.x = -200;
				fishRing.y = -200;
				fishRing.fishType = fishInfo.type;
				this.fishRingArr.push(fishRing);
			} else {
				var fish:BYFish = BYFishFactory.instance.createFish(fishInfo.id,fishInfo.fishesId, 
					fishInfo.fishesPath, fishInfo.offsetX, fishInfo.offsetY, pretime);
				if(!fish.isCopy) {
					fish.x = -200;
					fish.y = -200;
				} else{
					fish.start();
				}
				this.addFish(fishInfo, fish);
				
				fish.fishType = fishInfo.type;
				this.fishArr.push(fish);
				if(fishInfo.type == FishType.BOSS) {
					fish.addBossBg();
					game.AppFacade.getInstance().sendNotification(PanelNotify.SHOW_BOSS_NOTICE);
				}
			}
			*/
		}

		public createInit():void {
			var createDur:number = 20;
			var date:Date = new Date()
			var curSecond:number = date.getSeconds();
			var curMinute:number = date.getMinutes();
			while(createDur > 0) {
				var scriptSummary:ScriptSummary = ScriptCfg.instance.getScriptSummary(curSecond);
				if(scriptSummary) {
					var scriptItem:ScriptItem = scriptSummary.getScriptItemByMinute(curMinute);
					this.createFishByScriptItem(curMinute +"_" + curSecond, scriptItem, (20 - createDur));
				}
				createDur--;
				curSecond = curSecond - 1;
				if(curSecond < 0) {
					curSecond = 56;
					if(curMinute == 0) {
						curMinute = 59;
					} else {
						curMinute--;
					}
				}
			}
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
			var date:Date = new Date();
			for(let fish of this.fishArr) {
				fish.updateMotion(timestamp);
			}
			// egret.log("fish cost : " + (new Date().getTime() - date.getTime()));
			if(this.nextRefreshTickTime > 0 && timestamp > this.nextRefreshTickTime) {
				/*
				var second:number = date.getSeconds();
				var minute:number = date.getMinutes();
				var scriptSummary:ScriptSummary = ScriptCfg.instance.getScriptSummary(second);
				if(scriptSummary) {
					var scriptItem:ScriptItem = scriptSummary.getScriptItemByMinute(minute);
					this.createFishByScriptItem(minute+"_" + second, scriptItem, 0);
				}
				*/
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

			if(this.canonList &&this.canonList.length >0) {
				for(let canon of this.canonList) {
					if(!canon.bindPlayerInfo || canon.bindPlayerInfo.playerId != game.UserService.instance.playerId) continue;
					var playerInfo:BYPlayerInfo = BYData.instance.getPlayerInfo(canon.bindPlayerInfo.playerId);
					if(playerInfo.shootInfo) {
						if(playerInfo.shootInfo.isAuto() || playerInfo.shootInfo.isLock()) {
							if(!canon.isCd()) {
								if(playerInfo.shootInfo.isLock()) {
									if(playerInfo.shootInfo.lockTargetFishId != "") {
										var fish:BYFish|BYFishRing = this.getFishById(playerInfo.shootInfo.lockTargetFishId);
										if(!fish) {
											fish = this.autoChangeLockFish(null);	
											if(!fish) return;
											playerInfo.recordTargetFishId = fish.id;
											BYRequest.sendShootAutoInfo(playerInfo.shootInfo.shootType,playerInfo.recordTargetFishId,playerInfo.recordTargetX,playerInfo.recordTargetY);
										}
										var pos:egret.Point = fish.getPos();
										canon.lastShootTime = egret.getTimer();
										BYRequest.sendShootInfo(pos.x, pos.y);
										(<BYBattleUI>this.parent.parent).playShootSelf(pos.x, pos.y);
									} else {
										let fish:BYFish|BYFishRing = this.getMaxFish();
										if(fish) {
											playerInfo.recordTargetFishId = fish.id;
											BYRequest.sendShootAutoInfo(playerInfo.shootInfo.shootType,playerInfo.recordTargetFishId,playerInfo.recordTargetX,playerInfo.recordTargetY);
										}
										let pos:egret.Point = fish.getPos();
										canon.lastShootTime = egret.getTimer();
										BYRequest.sendShootInfo(pos.x, pos.y);
										(<BYBattleUI>this.parent.parent).playShootSelf(pos.x, pos.y);
									}
								}else {
									if(playerInfo.shootInfo.autoShootTargetX > 0) {
										canon.shootAutoDir(playerInfo.shootInfo.autoShootTargetX, playerInfo.shootInfo.autoShootTargetY);
									}
								}
							}
						}

						if(!playerInfo.shootInfo.isLock()) {
							canon.clearLockLine();
						} else {
							var fish:BYFish|BYFishRing = this.getFishById(playerInfo.shootInfo.lockTargetFishId);
							if(fish) {
								var pos:egret.Point = fish.getPos();
								if(pos.x < 0 || pos.y > Global.designRect.x || pos.y < 0 || pos.y > Global.designRect.y) {
									/*
									canon.clearLockLine();
									this.clearLock();
									playerInfo.recordTargetFishId = "";
									*/
									fish = this.autoChangeLockFish(null);
									playerInfo.recordTargetFishId = fish.id;
									BYRequest.sendShootAutoInfo(playerInfo.shootInfo.shootType,playerInfo.recordTargetFishId,playerInfo.recordTargetX,playerInfo.recordTargetY);
								} else {
									canon.drawLockLine(canon.getPos(), pos);
									this.showLock(pos);
								}
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

		private autoChangeLockFish(originFish:any):BYFish {
			let tempArr:Array<BYFish> = []
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
				this.lockImg.anchorOffsetX = 62;
				this.lockImg.anchorOffsetY = 54;
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
			var fish:BYFish = BYFishFactory.instance.createFish(fishId,scriptItem.fishIndex, 
				scriptItem.trackId, scriptItem.offsetX, scriptItem.offsetY, pretime);
			this.addChild(fish);
			fish.x = -200;
			fish.y = -200;
			this.fishArr.push(fish);
			CommonUtil.log("====鱼群创建鱼 ：" + scriptItem.fishIndex);
			*/
		}

		public removeFish(fish:BYFish):void {
			var index:number = this.fishArr.indexOf(fish);
			if(index >= 0) {
				let len:number = this.fishArr.length;
				this.fishArr.splice(index, 1);
				// console.log("remove fish by motoin end : " + len + "   " + this.fishArr.length);
			}
		}

		public getAllFish():Array<BYFish> {
			return this.fishArr;
		}

		public getAllFishRing():Array<BYFishRing> {
			return this.fishRingArr;
		}

		public getFishByPos(x:number, y:number):BYFish|BYFishRing {
			var pos:egret.Point = new egret.Point(x,y);
			for(let fish of this.fishArr) {
				if(fish.isHit(pos)) {
					return fish;
				}
			}
			for(let fish of this.fishRingArr) {
				if(fish.isHit(pos)) {
					return fish;
				}
			}
			return null;
		}

		public getFishById(fishid:string):BYFish|BYFishRing {
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
			for(let i=0; i< this.fishRingArr.length;i++) {
				let fish = this.fishRingArr[i];
				if(isNaN(fish.x) || isNaN(fish.y) || isNaN(fish.rotation)) {
					// 这条鱼出现问题
					this.fishRingArr.splice(i, 1);
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

		public showKillGrid(point:egret.Point, bulletIndex:number):BYKillGrid {
			point = this.globalToLocal(point.x, point.y);
			var grid:BYKillGrid = BYKillGridFactory.instance.createGrid(bulletIndex);
			this.addChild(grid);
			grid.x = point.x;
			grid.y = point.y;
			grid.startDeadCountdown();
			return grid;
		}

		public stop():void {
			egret.stopTick(this.update, this);
			for(let fish of this.fishArr) {
				fish.destoryImm();
			}
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
				let fish:BYFish = this.fishArr[i];
				if(fish.x < x) {
					fish.destoryImm();
					this.fishArr.splice(i,1);
					i--;
				}
			}

			for(let i=0;i< this.fishRingArr.length;i++) {
				let fish:BYFishRing = this.fishRingArr[i];
				if(fish.x < x) {
					fish.destoryImm();
					this.fishRingArr.splice(i,1);
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
				fish.setCursor(cursorAdd);
			}
		}

		public removeFishRing(fish:BYFishRing):void {
			var index:number = this.fishRingArr.indexOf(fish);
			if(index >= 0) {
				this.fishRingArr.splice(index, 1);
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

		public getMaxFish():BYFish | BYFishRing{
			let f = null;
			if(this.fishRingArr.length > 0) {
				return this.fishRingArr[0];
			}
			for(let fish of this.fishArr) {
				if(!f){
					f = fish
				} else {
					if(fish.fishIndex > f.fishIndex) {
						f = fish;
					}
				}
			}
			return f;
		}

		private fishList:Array<NFish> = [];

		public createFishTest() {
			let fishIds = [26,27,15,3,1,10,6,0,29,13,7,14,23,25,11,2,17,18,8,9,16,4,12,21];
		}

		public startFishMotion() {
			egret.startTick(this.updateNFishes, this);
		}

		private updateNFishes(timestamp:number):boolean {
			for(let fish of this.fishList) {
				fish.update(timestamp);
			}
			return false;
		}
	}
}