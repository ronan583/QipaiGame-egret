class NextDownInfo {
	public index: number;
	public initp: number;
	public count: number;
}
class NextDown {
	public nextDownInfos: Array<egret.Point> = [];
	public nextDownYList: Array<number> = [];
	public getNextDownByIndex(y: number): Array<egret.Point> {
		let arr: Array<egret.Point> = [];
		for (let nd of this.nextDownInfos) {
			if (nd.y == y) {
				arr.push(nd);
			}
		}
		return arr;
	}

	public isExist(x: number, y: number): boolean {
		for (let nd of this.nextDownInfos) {
			if (nd.y == y && nd.x == x) {
				return true;
			}
		}
		return false;
	}

	public addNextDown(x: number, y: number): void {
		if (!this.isExist(x, y)) {
			this.nextDownInfos.push(new egret.Point(x, y));
			if (this.nextDownYList.indexOf(y) < 0) {
				this.nextDownYList.push(y);
			}
		}

	}

	clear() {
		this.nextDownYList = [];
		this.nextDownInfos = [];
	}
}
class CandyMachine extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onToStage, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
	}

	private onToStage(): void {
		this.init();
	}

	public init(): void {

	}

	private candyMachineData: game.tgpd.CandyMachineData;
	private levelLength: number;

	private endFunc: Function = null;
	private endFuncEff: Function = null;
	private endFuncEff2: Function = null;
	private endFuncObj: any = null;

	private candyIconArr: Array<CandyIcon> = [];
	private curDownIndex: number = 0;
	private nextDownMng: NextDown = new NextDown();
	private nextDowntimeoutId: number = 0;

	public showCandys(candyMachineData: game.tgpd.CandyMachineData, endFunc: Function, endFuncEff: Function, endFuncEff2: Function, thisObject: any): void {
		this.clear(true);
		CommonUtil.registerTimeOut(()=>{
			this.candyMachineData = candyMachineData;
			this.endFunc = endFunc;
			this.endFuncEff = endFuncEff;
			this.endFuncEff2 = endFuncEff2;
			this.endFuncObj = thisObject;
			this.levelLength = candyMachineData.curLevel + 3;

			for(let i=0;i<candyMachineData.gridsInfo.length;i++) {
				if(candyMachineData.gridsInfo[i]) {
					for(let j=0;j<candyMachineData.gridsInfo[i].length;j++) {
						if(candyMachineData.gridsInfo[i][j] && candyMachineData.gridsInfo[i][j] > 0) {
							var candyIcon:CandyIcon = <CandyIcon>game.PoolManager.instance.popObj("candyIcon_" + candyMachineData.gridsInfo[i][j]);
							if(!candyIcon) {
								candyIcon = new CandyIcon(candyMachineData.gridsInfo[i][j]);
							}
							candyIcon.reset();
							this.addChild(candyIcon);
							if(candyMachineData.curLevel == 1) {
								candyIcon.x = j * 85 + 85;
							} else if(candyMachineData.curLevel == 2) {
								candyIcon.x = j * 85 + 63;
							} else if(candyMachineData.curLevel == 3) {
								candyIcon.x = j * 85;
							}
							
							candyIcon.y = i * -85 + (-520);
							candyIcon.dataPoint = new egret.Point(i,j);
							this.candyIconArr.push(candyIcon);
							candyIcon.start();
							// candyIcon.visible = false;
						}
					}
				}
			}

			// CommonUtil.registerTimeOut(this.down, this, 800);
			this.down();
		}, this, 600);
	}	

	private down(): void {
		let needDownSound:boolean = false;
		let delay = 0;
		let tempIconArr: Array<CandyIcon> = this.candyIconArr;
		let delayAcc = 50;

		for (let i = 0; i < this.candyIconArr.length; i++) {
			if(i % (this.levelLength - 2) == 0 && i != 0){
				//delayAcc -= 9
				delay += delayAcc;
			}
			CommonUtil.registerTimeOut(()=>{
				if(this.candyIconArr[i]){
					this.candyIconArr[i].setTarget(this.candyIconArr[i].dataPoint.x,this.candyIconArr[i].dataPoint.y);
				}
			}, this, delay);
			needDownSound = true;
		}
		if (game.tgpd.CandyData.instance.candyMachineData.nodesList.length > 0 && this.curDownIndex < game.tgpd.CandyData.instance.candyMachineData.nodesList.length) {
			this.nextDowntimeoutId = egret.setTimeout(this.nextDown, this, 1000);
		} else {
			egret.setTimeout(() => {
				//本局结束
				if(this.endFunc){
					this.endFunc.call(this.endFuncObj);
				}
			}, this, 1500);
		}
	}

	private getCandyIconByXY(x: number, y: number): CandyIcon {
		for (let candyIcon of this.candyIconArr) {
			if (candyIcon.dataPoint.x == x && candyIcon.dataPoint.y == y) {
				return candyIcon;
			}
		}
		return null;
	}

	private getCandyIconsByY(y: number): Array<CandyIcon> {
		let candyIcons: Array<CandyIcon> = [];
		for (let candyIcon of this.candyIconArr) {
			if (candyIcon.dataPoint.y == y) {
				candyIcons.push(candyIcon);
			}
		}
		return candyIcons;
	}

	private nextDown(): void {
		let nodes: Array<egret.Point> = game.tgpd.CandyData.instance.candyMachineData.nodesList[this.curDownIndex];
		if (!nodes) return;
		let needBoomSound:boolean = false;
		let completeCallAlready:boolean = false
		for (let node of nodes) {
			let icon: CandyIcon = this.getCandyIconByXY(node.x, node.y);
			if (icon) {
				let id: number = icon.treasureId;
				let isBoomer:boolean = (id % 100 == 6);				
				icon.boom(this.getTgpdBattleUI().getRewardPosition(), true);
				needBoomSound = true;
			} else {
				return;
			}
			this.nextDownMng.addNextDown(icon.candyGridX, icon.candyGridY);
		}
		egret.setTimeout(this.delayDown, this, 1000);
		game.AppFacade.getInstance().sendNotification(PanelNotify.TGPD_INCREASE_MONDY, game.tgpd.CandyData.instance.candyMachineData.resultArr[this.curDownIndex]);
	}

	private delayDown(): void {
		let needDownSound: boolean = false;
		let delay = 0;
		for (let yIndex of this.nextDownMng.nextDownYList) {
			let candyIcons = this.getCandyIconsByY(yIndex);
			let downInfos = this.nextDownMng.getNextDownByIndex(yIndex);
			if (downInfos.length > 0) {
				needDownSound = true;
				for (let icon of candyIcons) {
					if(icon.candyGridX <= this.levelLength - 1){
						icon.needBounce = false;
					} else {
						let vertical = icon.candyGridX;
						let limit = this.levelLength - 1;
						delay = 120 + (vertical - limit) * 50;
					}					
					
					if (downInfos.length == 1) {
						if (icon.candyGridX > downInfos[0].x) {
							icon.moveDown(icon.candyGridX - 1,yIndex, delay);
						}
					} else {
						for (let j = 0; j < (downInfos.length - 1); j++) {
							if (icon.candyGridX > downInfos[j].x && icon.candyGridX < downInfos[j + 1].x) {
								icon.moveDown(icon.candyGridX - j,yIndex, delay);
							}
						}

						if (icon.candyGridX > downInfos[downInfos.length - 1].x) {
							icon.moveDown(icon.candyGridX - downInfos.length,yIndex, delay);
						}
					}
				}
			}
		}
		this.nextDownMng.clear();
		this.curDownIndex++;

		if (game.tgpd.CandyData.instance.candyMachineData.nodesList.length > 0 && this.curDownIndex < game.tgpd.CandyData.instance.candyMachineData.nodesList.length) {
			egret.setTimeout(this.nextDown, this, 1500);

		} else {
			egret.setTimeout(() => {
				//本局结束
				if(this.endFunc){
					this.endFunc.call(this.endFuncObj);
				}
			}, this, 1000);

		}
	}


	public clear(isTween: boolean = false): void {
		for (let icon of this.candyIconArr) {
			if(isTween){
				icon.boom(new egret.Point(icon.x, icon.y), false);
				// egret.Tween.get(icon.iconImg).to({scaleX:1.2, scaleY:1.2},150).call(()=>{
				// 	egret.Tween.get(icon.iconImg).to({scaleX:0.1, scaleY:0.1},250).call(()=>{
				// 		if(icon.parent){
				// 			icon.parent.removeChild(icon);
				// 		}
				// 	}, this);
				// }, this)
			} else if (icon.parent) {
				icon.parent.removeChild(icon);
			}
		}
		this.candyIconArr = [];
		// game.tgpd.CandyData.instance.clear();
		this.curDownIndex = 0;
		this.nextDownMng = new NextDown();
	}

	public getTgpdBattleUI():game.tgpd.TgpdBattleScene {
		return <game.tgpd.TgpdBattleScene>this.parent.parent;
	}	

	private onRemoveStage():void {
		if(this.nextDowntimeoutId > 0) {
			egret.clearTimeout(this.nextDowntimeoutId);
			this.nextDowntimeoutId = 0;
		}
		CommonUtil.removeTimeout(this);
	}	
}
