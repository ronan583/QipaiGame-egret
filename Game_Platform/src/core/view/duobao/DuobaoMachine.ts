import DuoBaoBattleUI = game.duobao.DuoBaoBattleUI;

class DBNextDownInfo {
	public index:number;
	public initp:number;
	public count:number;
}
class DBNextDown {
	public nextDownInfos:Array<egret.Point> = [];
	public nextDownYList:Array<number> = [];
	public getNextDownByIndex(y:number):Array<egret.Point> {
		let arr:Array<egret.Point> = [];
		for(let nd of this.nextDownInfos) {
			if(nd.y == y) {
				arr.push(nd);
			}
		}
		return arr;
	}

	public isExist(x:number, y:number):boolean {
		for(let nd of this.nextDownInfos) {
			if(nd.y == y && nd.x == x) {
				return true;
			}
		}
		return false;
	}

	public addNextDown(x:number, y:number):void {
		if(!this.isExist(x,y)) {
			this.nextDownInfos.push(new egret.Point(x,y));
			if(this.nextDownYList.indexOf(y) < 0) {
				this.nextDownYList.push(y);
			}
		}

	}

	clear() {
		this.nextDownYList = [];
		this.nextDownInfos = [];
	}
}

class DuobaoMachine extends eui.UILayer{
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
	}

	private onToStage():void {
		this.init();
	}

	public init():void {
		
	}

	private candyIconArr:Array<DuobaoIcon>= [];
	private curDownIndex:number = 0;
	private nextDownMng:DBNextDown = new DBNextDown();
	private duobaoMachineData:game.duobao.TreasureMachineData;
	private levelLength: number;
	private nextDowntimeoutId:number = 0;

	private endFunc:Function = null;
	private endFuncEff:Function = null;
	private endFuncEff2:Function = null;
	private endFuncObj:any = null;

	public blastCandys(duobaoMachineData:game.duobao.TreasureMachineData){
		let newIcons: Array<DuobaoIcon> = [];
		for(let icon of this.candyIconArr){
			if(icon && icon.parent && icon.candyGridX < this.levelLength){
				newIcons.push(icon);
				//console.error(icon.candyGridY, icon.candyGridX, icon.treasureId);
				//console.error(icon.parent);
				icon.besselFly();
			}else{
				if(icon.parent){
					icon.parent.removeChild(icon);
				}
			}
		}
	}

	public showCandys(duobaoMachineData:game.duobao.TreasureMachineData, endFunc:Function, endFuncEff:Function, endFuncEff2:Function, thisObject:any):void {
		this.clear(true);
		CommonUtil.registerTimeOut(()=>{
			this.duobaoMachineData = duobaoMachineData;
			this.endFunc = endFunc;
			this.endFuncEff = endFuncEff;
			this.endFuncEff2 = endFuncEff2;
			this.endFuncObj = thisObject;
			this.levelLength = duobaoMachineData.curLevel + 3;
			if(this.endFuncEff2){
				endFuncEff2.call(this.endFuncObj);
			}
			for(let i=0;i<duobaoMachineData.gridsInfo.length;i++) {
				if(duobaoMachineData.gridsInfo[i]) {
					for(let j=0;j<duobaoMachineData.gridsInfo[i].length;j++) {
						if(duobaoMachineData.gridsInfo[i][j] && duobaoMachineData.gridsInfo[i][j] > 0) {
							var duobaoIcon:DuobaoIcon = <DuobaoIcon>game.PoolManager.instance.popObj("duobaoIcon_" + duobaoMachineData.gridsInfo[i][j]);
							if(!duobaoIcon) {
								duobaoIcon = new DuobaoIcon(duobaoMachineData.gridsInfo[i][j]);
							}
							duobaoIcon.reset();
							this.addChild(duobaoIcon);
	//						duobaoIcon.showTreasure(duobaoMachineData.gridsInfo[i][j]);
							if(duobaoMachineData.curLevel == 1) {
								duobaoIcon.x = j * 75 + 110;
							} else if(duobaoMachineData.curLevel == 2) {
								duobaoIcon.x = j * 75 + 105;
							} else if(duobaoMachineData.curLevel == 3) {
								duobaoIcon.x = j * 75 + 30;
							}
							
							duobaoIcon.y = i * -75 + (-1020);
							duobaoIcon.levelLength = this.levelLength;
							duobaoIcon.dataPoint = new egret.Point(i,j);
							this.candyIconArr.push(duobaoIcon);
							duobaoIcon.start();
							// duobaoIcon.visible = false;
						}
					}
				}
			}

			// CommonUtil.registerTimeOut(this.down, this, 800);
			this.down();
		}, this, 600);
	}

	private down():void {
		let delay = 0;
		let tempIconArr: Array<DuobaoIcon> = this.candyIconArr;
		// let delayAcc = 80;
		let delayAcc = 50;
		for(let i=0;i<this.candyIconArr.length;i++) {
			if(i % (this.levelLength - 2) == 0 && i != 0){
				//delayAcc -= 9
				// delay += delayAcc;
				delay += delayAcc;
			}
			if (i < (this.levelLength)*(this.levelLength)) {
				this.candyIconArr[i].downSound = true;
			}
			CommonUtil.registerTimeOut(()=>{
				this.candyIconArr[i].setTarget(this.candyIconArr[i].dataPoint.x,this.candyIconArr[i].dataPoint.y);
			}, this, delay);
		}
		if(this.duobaoMachineData.nodesList.length > 0 && this.curDownIndex < this.duobaoMachineData.nodesList.length) {
			CommonUtil.registerTimeOut(this.nextDown, this, 1000);
		} else {
			//------treasureMotionEnd
			CommonUtil.registerTimeOut(()=>{
				if(this.endFunc) {
					this.endFunc.call(this.endFuncObj);
				}
			}, this, 1200);
		
			
		}
	}

	private getCandyIconByXY(x:number,y:number):DuobaoIcon {
		for(let candyIcon of this.candyIconArr) {
			if(candyIcon.dataPoint.x == x && candyIcon.dataPoint.y == y) {
				return candyIcon;
			}
		}
		return null;
	}

	private onRemoveStage():void {
		if(this.nextDowntimeoutId > 0) {
			egret.clearTimeout(this.nextDowntimeoutId);
			this.nextDowntimeoutId = 0;
		}
		CommonUtil.removeTimeout(this);
	}

	private getCandyIconsByY(y:number):Array<DuobaoIcon> {
		let candyIcons:Array<DuobaoIcon> = [];
		for(let candyIcon of this.candyIconArr) {
			if(candyIcon.dataPoint.y == y) {
				candyIcons.push(candyIcon);
			}
		}
		return candyIcons;
	}

	private nextDown():void {
		let nodes:Array<egret.Point> = this.duobaoMachineData.nodesList[this.curDownIndex];
		if(!nodes) return;
		let needBoomSound:boolean = false;
		// let boomSoundPlayed: boolean = false;
		let completeCallAlready:boolean = false;
		for(let node of nodes) {
			let icon:DuobaoIcon = this.getCandyIconByXY(node.x, node.y);
			if(icon) {
				let id: number = icon.treasureId;
				let isBoomer:boolean = (id == 106 || id == 206 || id ==306);
				needBoomSound = true;
				// icon.boomSound = needBoomSound&&(!boomSoundPlayed);
				// boomSoundPlayed = true;
				if(!completeCallAlready) {
					let eliminateInfos = game.duobao.DuobaoData.instance.eliminateInfos;
					let money:number = eliminateInfos[this.curDownIndex].money;
					let count: number = eliminateInfos[this.curDownIndex].eliminateCount;
					let isComplete:boolean = this.curDownIndex >= (this.duobaoMachineData.nodesList.length - 1);
					icon.boom(this.getDuobaoBattleUI().getRewardPosition(), isBoomer, true, ()=>{
						game.AppFacade.getInstance().sendNotification(PanelNotify.DUOBAO_ADD_MONEY,
							{money:money, isComplete:isComplete, treasureId:icon.treasureId, eliminateCount: count});
					}, this);
					completeCallAlready = true;
				} else {
					icon.boom(this.getDuobaoBattleUI().getRewardPosition(), isBoomer, true);
				}
			} else {
				return ;
			}
			this.nextDownMng.addNextDown(icon.candyGridX, icon.candyGridY);
		}
		if(needBoomSound) {
			game.duobao.DuobaoSoundPlayer.instance.playSound(game.duobao.DuobaoSoundType.GEM_DESTORY);
		}
		CommonUtil.registerTimeOut(this.delayDown, this, 900);
	}

	private delayDown():void {
		let delay = 0;
		for(let yIndex of this.nextDownMng.nextDownYList) {
			let candyIcons = this.getCandyIconsByY(yIndex);
			let downInfos  = this.nextDownMng.getNextDownByIndex(yIndex);
			if(downInfos.length > 0) {
				for(let icon of candyIcons) {
					if(icon.candyGridX <= this.levelLength - 1){
						icon.needBounce = false;
					} else {
						let vertical = icon.candyGridX;
						let limit = this.levelLength - 1;
						delay = 120 + (vertical - limit) * 50;
					}
					if(downInfos.length == 1) {
						if(icon.candyGridX > downInfos[0].x) {
							icon.moveDown(icon.candyGridX - 1,yIndex, delay);
						}
					} else {
						for(let j=0;j<(downInfos.length-1);j++) {
							if(icon.candyGridX > downInfos[j].x && icon.candyGridX < downInfos[j + 1].x) {
								icon.moveDown(icon.candyGridX - j,yIndex, delay);
							}
						}
						if(icon.candyGridX > downInfos[downInfos.length-1].x) {
							icon.moveDown(icon.candyGridX - downInfos.length,yIndex, delay);
						}
					}
				}
			}
		}
		this.nextDownMng.clear();
		this.curDownIndex++;
		let duobaoMachineData:game.duobao.TreasureMachineData = game.duobao.DuobaoData.instance.duobaoMachineData;
		if(!duobaoMachineData) return;
		if(duobaoMachineData.nodesList.length > 0 && this.curDownIndex <duobaoMachineData.nodesList.length) {
			CommonUtil.registerTimeOut(this.nextDown, this, 600);
		} else {
			CommonUtil.registerTimeOut(()=>{if(this.endFunc) {
				this.endFunc.call(this.endFuncObj);
			}},this,1200);
			//------showRoundWin
			CommonUtil.registerTimeOut(()=>{
				if(this.endFuncEff) {
					console.error("-------------showRoundWin")
					this.endFuncEff.call(this.endFuncObj);
				}
			}, this, 500);				
		}
	}

	public clear(isTween: boolean = false):void {
		for(let icon of this.candyIconArr) {
			if(isTween){
				icon.boom(new egret.Point(icon.x, icon.y), false, false);
				// egret.Tween.get(icon.iconImg).to({scaleX:1.2, scaleY:1.2},150).call(()=>{
				// 	egret.Tween.get(icon.iconImg).to({scaleX:0.1, scaleY:0.1},250).call(()=>{
				// 		if(icon.parent){
				// 			icon.parent.removeChild(icon);
				// 		}
				// 	}, this);
				// }, this)
			} else {
				if(icon.parent) {
					icon.parent.removeChild(icon);
				}
			}
		}
		this.candyIconArr = [];
		this.curDownIndex = 0;
		this.nextDownMng = new DBNextDown();
	}

	public getDuobaoBattleUI():DuoBaoBattleUI {
		return <DuoBaoBattleUI>this.parent.parent.parent;
	}

}
