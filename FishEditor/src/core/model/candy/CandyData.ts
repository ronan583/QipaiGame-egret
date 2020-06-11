module game.tgpd {
export class GenResult {
		public  constructor(arr:Array<any>,tid:number) {
			this.setNodes(arr);
			this.treasureId = tid;
		}
		public nodes:Array<any>;

		private minX:number = 0;
		private maxX:number = 0;
		public treasureId: number = 0;

		public setNodes(arr:Array<any>):void {
			this.nodes = arr;
			this.minX = this.nodes[0];
			for(let n of this.nodes) {
				if(n.x < this.minX) {
					this.minX = n.x;
				}
			}
			this.maxX = this.nodes[0];
			for(let n of this.nodes) {
				if(n.x > this.maxX) {
					this.maxX = n.x;
				}
			}
		}

		public getMinX():number {

			return this.minX;
		}

		public getMaxX():number {

			return this.maxX;
		}

		public getMinXByY(y: number) {
			let m = -1;
			for(let n of this.nodes) {
				if(n.y != y) continue;
				if(m == -1) {
					m = n.x;
				} else if(n.x < m) {
					m = n.x;
				}
			}
			if(m == -1) return 0;
			return m;
		}
	}

	export enum FindDir {
		NONE,UP,DOWN,LEFT,RIGHT
	}

export class SimpleNodeGenerator {
		private machineData: CandyMachineData;
		private result:Array<egret.Point> = [];
		private getNextPoint(p:egret.Point, findDir:FindDir):any {
			let f:boolean = true;
			let ep:egret.Point = new egret.Point(-1,-1);
			switch (findDir) {
				case game.duobao.FindDir.DOWN:
					ep.x = p.x + 1;
					ep.y = p.y;
					break;
				case game.duobao.FindDir.UP:
					ep.x = p.x - 1;
					ep.y = p.y;
					break;
				case game.duobao.FindDir.LEFT:
					ep.x = p.x;
					ep.y = p.y - 1;
					break;
				case game.duobao.FindDir.RIGHT:
					ep.x = p.x;
					ep.y = p.y + 1;
					break;
			}

			if(ep.x < 0 || ep.y < 0 || ep.x >= this.machineData.curLevelGrids || ep.y >= this.machineData.curLevelGrids) {
				f = false;
			}

			if(this.isExistInArr(this.result, ep.x, ep.y)) {
				f = false;
			}


			if(ep.x == -1) f = false;

			return {isOk:f, point:ep};
		}

		private isExistInArr(arr:Array<egret.Point>, x, y):boolean {
			for(let p of arr) {
				if(p.x == x &&p.y == y) {
					return true;
				}
			}
			return false;
		}

		// 找到附近还有空位的点
		private findAvaliableNext(arr:Array<egret.Point>):any {
			let findDirs:Array<FindDir> = [FindDir.UP, FindDir.DOWN, FindDir.LEFT, FindDir.RIGHT];
			for(let p of arr) {
				for(let dir of findDirs) {
					let np = this.getNextPoint(p, dir);
					if(np.isOk) {
						return np;
					}
				}
			}
			return null;
		}

		public gen(machineData:CandyMachineData, totalCount:number):Array<egret.Point> {
			this.machineData = machineData;
			let findDirs:Array<FindDir> = [FindDir.UP, FindDir.DOWN, FindDir.LEFT, FindDir.RIGHT];
			let beginPoint:egret.Point = new egret.Point(
				CommonUtil.RandomRangeInt(0, machineData.curLevelGrids),
				CommonUtil.RandomRangeInt(0, machineData.curLevelGrids));
			this.result = [];
			this.result.push(beginPoint);
			let findDir:FindDir = CommonUtil.RandomRangeInt(0, findDirs.length);
			let curpoint = beginPoint;
			while(this.result.length < totalCount) {
				let npResult = this.getNextPoint(curpoint, findDir);
				if(npResult.isOk) {
					this.result.push(npResult.point);
					curpoint = npResult.point;
				} else {
					npResult = this.findAvaliableNext(this.result);
					this.result.push(npResult.point);
				}
			}
			/*
			egret.log("begin================");
			for(let p of this.result) {
				egret.log("x:" + p.x + " y:" + p.y);
			}
			egret.log("end================");
			*/

			return this.result;
		}
	}

	export class FillNode {
		public pointList:Array<egret.Point> = [];
		public avaliableIds:Array<number> = [];
		public value:number;
		public excludeFillNodes:Array<FillNode> = [];
		public weakFillNodes:Array<FillNode> = [];

		public isOriginTreasure():boolean {
			return this.pointList.length == 1;
		}

		private getEFilnode(x:number,y :number):FillNode {
			for(let enode of this.excludeFillNodes) {
				if(enode.pointList[0] && enode.pointList[0].x == x && enode.pointList[0].y == y) {
					return enode;
				}
			}
			return null;
		}

		private getWFilnode(x:number,y :number):FillNode {
			for(let enode of this.weakFillNodes) {
				if(enode.pointList[0] && enode.pointList[0].x == x && enode.pointList[0].y == y) {
					return enode;
				}
			}
			return null;
		}

		public addExcludeFillNode(node: FillNode) {
			if(node.value > 0) {
				if(!this.getEFilnode(node.pointList[0].x, node.pointList[0].y)) {
					this.excludeFillNodes.push(node);
				}
			} else{
				if(!this.getWFilnode(node.pointList[0].x, node.pointList[0].y)) {
					this.weakFillNodes.push(node);
				}
			}
		}
	}

	export class CandyEliminateInfo{
		public constructor(eliminateCount:number,candyId:number,money:number) {
			this.eliminateCount = eliminateCount;
			this.candyId = candyId;
			this.money = money;
		}
		public eliminateCount:number = 0;//消除糖果个数
		public candyId:number = 0;//水果id
		public money:number = 0;//添加的金额
	}

	export class CandyMachineData {
		public curLevelGrids = 4;
		public curLevel:number = 1;

		public gridsInfo:Array<Array<number>> = [];
		private downPrepare:Array<Array<number>> = [];

		public resultArr:Array<CandyEliminateInfo> = []

		public nodesList:Array<Array<egret.Point>> = [];

		public setData(eliminateInfos:Array<CandyEliminateInfo>, level:number):void {
			this.resultArr = eliminateInfos;
			console.log("recode treasure id ")
			for(let d of eliminateInfos) {
				console.log(d.candyId);
			}
			console.log("recode treasure id end")
			this.curLevel = level;
			this.curLevelGrids = 4 + this.curLevel - 1;
			for(let i=0;i<10 + this.curLevel * 2;i++) {
				this.gridsInfo[i] = [];
				for(let j=0;j<this.curLevelGrids;j++) {
					this.gridsInfo[i].push(0);
				}
			}
			this.clear();
			this.generate3();
			this.fillOtherTreasures();
		}

		public containsBoom() {
			for(let d of this.resultArr) {
				if(d.candyId % 100 == 6) {
					return true;
				}
			}
			return false;
		}

		public clear():void {
			this.init();
			this.nodesList = [];
		}

		public isNodeValid(p:egret.Point):boolean {
			return p.x >= 0 && p.x < this.curLevelGrids && p.y >= 0 && p.y < this.curLevelGrids && this.gridsInfo[p.x][p.y] == 0;
		}

		public isNodeValidByXY(x:number,y:number):boolean {
			return x >= 0 && x < this.curLevelGrids && y >= 0 && y < this.curLevelGrids && this.gridsInfo[x][y] == 0;
		}

		private init():void {
		}

		private tempGenNodesArr:Array<GenResult> = [];

		private getReward():Array<number>{
			let rarr:Array<number> = [];
			if(!this.resultArr) return rarr;
			for(let r of this.resultArr) {
				if(r.candyId % 100 != 6) {
					rarr.push(r.candyId);
				}
			}
			return rarr;
		}

		public generate3():void {
			this.tempGenNodesArr = [];

			for(let candyResult of this.resultArr) {
				let nds:Array<egret.Point> = new SimpleNodeGenerator().gen(this, candyResult.eliminateCount);
				let copyNodes:Array<any> = [];
				for(let node of nds) {
					copyNodes.push({x:node.x,y:node.y,value:candyResult.candyId});
				}
				let result:GenResult = new GenResult(copyNodes, candyResult.candyId);
				this.tempGenNodesArr.push(result);
			}

			this.tempGenNodesArr.sort((a:GenResult,b:GenResult):number=>{
				return b.getMinX() - a.getMinX();
			});

			var finalNodes:Array<Array<egret.Point>> = [];
			for(let i=0;i<20;i++) {
				this.gridsInfo[i] = [];
				for(let j=0;j<this.curLevelGrids;j++) {
					this.gridsInfo[i][j] = 0;
				}
			}
			for(let genResult of this.tempGenNodesArr) {
				let nds:Array<egret.Point> = [];
				egret.log("begin==================")
				for(let node of genResult.nodes) {
					egret.log("x:" + node.x + " y:" + node.y);
				}
				egret.log("end==================")
				egret.log("fix-begin==================")
				for(let node of genResult.nodes) {
					let needFixCount = node.x;
					let gridylist:Array<number> = [];
					for(let arr of this.gridsInfo) {
						for(let i=0;i<arr.length;i++) {
							if(i == node.y) {
								gridylist.push(arr[i]);
							}
						}
					}
					let flag = 0;
					for(let i=0;i<gridylist.length;i++) {
						
						if(gridylist[i] == 0 || gridylist[i] == genResult.treasureId) {
							needFixCount--;
						}
						if(needFixCount < 0) {
							flag = i;
							break;
						}
					}
					let p:egret.Point = new egret.Point(flag, node.y);
					egret.log("x:" + p.x + " y:" + p.y);

					this.gridsInfo[p.x][p.y] = genResult.treasureId;
					nds.push(p);
				}
				egret.log("end==================")
				finalNodes.push(nds);
			}

			this.nodesList = finalNodes;
		}

		private existInArr(n:egret.Point, arr:Array<egret.Point>):boolean {
			for(let p of arr) {
				if(p.x == n.x && p.y == n.y) return true;
			}
			return false;
		}

		private getMaxXFromNodesList():number {
			let maxx:number = 0;
			for(let narr of this.nodesList) {
				for(let n of narr) {
					if(n.x > maxx) {
						maxx = n.x;
					}
				}
			}
			return maxx;
		}

		private resizeGrid():void {
			let maxX:number = this.getMaxXFromNodesList();
			maxX += 8;
			if(this.gridsInfo.length > maxX) {
				this.gridsInfo.splice(maxX-1, this.gridsInfo.length - maxX);
			} else {
				for(let i=0;i<maxX;i++) {
					if(!this.gridsInfo[i]) {
						this.gridsInfo[i] = [];
						for(let j=0;j<this.curLevelGrids;j++) {
							this.gridsInfo[i][j] = 0;
						}
					}
				}
			}
		}

		public fillOtherTreasures():void {
			this.resizeGrid();
			let handingNodes:Array<FillNode> = [];
			for(let j=0;j<this.curLevelGrids;j++) {
				for(let i=0;i<this.gridsInfo.length;i++) {
					let fillNode:FillNode = new FillNode();
					let initPoint:egret.Point = new egret.Point(i,j);
					fillNode.pointList.push(initPoint);
					fillNode.value = this.gridsInfo[i][j];

					for(let k=0;k<this.tempGenNodesArr.length;k++) {
						let lastPoint:egret.Point = fillNode.pointList[fillNode.pointList.length - 1];
						if(this.existInArr(lastPoint, this.tempGenNodesArr[k].nodes)) {
							// 这个点就是第一阶段要消失的点 不需要计算后续阶段会变成的点
						} else {
							// 生成每个阶段的点
							let count:number = this.findXSameInArr0(lastPoint, this.tempGenNodesArr[k].nodes);
							let nextPoint:egret.Point = new egret.Point(lastPoint.x - count, initPoint.y);
							fillNode.pointList.push(nextPoint);
						}
					}
					handingNodes.push(fillNode);
				}
			}
			/*
			if(!Global.isNative) {
				for (let fillNode of handingNodes) {
					let info = "ff--";
					for(let p of fillNode.pointList) {
						info += "x:" + p.x + " y: " + p.y + " | ";
					}
					console.log(info);
				}
			}

			 */


			function findInHandingNodes(x:number,y:number,stage:number) {
				let result:Array<FillNode> = [];
				for(let fillNode of handingNodes) {
					if(fillNode.pointList[stage] && fillNode.pointList[stage].x == x && fillNode.pointList[stage].y == y) {
						result.push(fillNode);
					}
				}
				return result;
			}
			for (let fillNode of handingNodes) {
				let point: egret.Point = fillNode.pointList[0];
				let roundPoins: Array<egret.Point> = [
					new egret.Point(point.x + 1, point.y),
					new egret.Point(point.x - 1, point.y),
					new egret.Point(point.x, point.y + 1),
					new egret.Point(point.x, point.y - 1)
				]

				for (let p of roundPoins) {
					let nodes: Array<FillNode> = findInHandingNodes(p.x, p.y, 0);
					for(let n of nodes) {
						if (n) {
							fillNode.addExcludeFillNode(n);
						}
					}
				}
			}

			for(let k=1;k<=this.tempGenNodesArr.length;k++) {
				for (let fillNode of handingNodes) {
					let point: egret.Point = fillNode.pointList[k];
					if(!point) continue;
					let roundPoins: Array<egret.Point> = [
						new egret.Point(point.x + 1, point.y),
						new egret.Point(point.x - 1, point.y),
						new egret.Point(point.x, point.y + 1),
						new egret.Point(point.x, point.y - 1)
					]
					for (let p of roundPoins) {
						let nodes: Array<FillNode> = findInHandingNodes(p.x, p.y, k);
						for(let n of nodes) {
							if (n) {
								fillNode.addExcludeFillNode(n);
							}
						}
					}
				}
			}
			/*
			if(!Global.isNative) {
				for (let fillNode of handingNodes) {
					let info = "filenode-----" + fillNode.pointList[0].x + "|" + fillNode.pointList[0].y + "    :";
					for (let p of fillNode.excludeFillNodes) {
						info += "x:" + p.pointList[0].x + " y: " + p.pointList[0].y + " | ";
					}
					info += " weak : "
					for (let p of fillNode.weakFillNodes) {
						info += "x:" + p.pointList[0].x + " y: " + p.pointList[0].y + " | ";
					}
					console.log(info);
				}
			}


			 */

			let candyIds:Array<number>=[];
			if(this.curLevel == 1) {
				candyIds = [101,102,103,104,105];
			} else if(this.curLevel == 2) {
				candyIds = [201,202,203,204,205];
			} else if(this.curLevel == 3) {
				candyIds = [301,302,303,304,305];
			}

			let rewardArr:Array<number> = this.getReward();
			let simulateCount:number = 0;
			if(this.curLevel == 1) {
				if(rewardArr.length == 0) {
					simulateCount = CommonUtil.RandomRangeInt(1,3);
				} else if(rewardArr.length == 1) {
					simulateCount = 1;
				}
			} else if(this.curLevel == 2) {
				if(rewardArr.length == 0) {
					simulateCount = CommonUtil.RandomRangeInt(1,3);
				} else if(rewardArr.length == 1) {
					simulateCount = 1;
				}
			} else if(this.curLevel == 3) {
				if(rewardArr.length == 0) {
					simulateCount = CommonUtil.RandomRangeInt(1,4);
				} else if(rewardArr.length == 1) {
					simulateCount = 2;
				}
			}
			let simulateCandyIds:Array<number> = [];
			for(let candyId of candyIds) {
				if(rewardArr.indexOf(candyId) < 0) {
					simulateCandyIds.push(candyId);
				}
			}

			let simulateCursor:number = 0;
			while (simulateCursor < simulateCount) {
				let avalibaleArr:Array<FillNode> = [];
				for(let fillNode of handingNodes) {
					if(!fillNode.value || fillNode.value == 0) {
						if(fillNode.pointList[0].x < (this.curLevel + 3)) avalibaleArr.push(fillNode);
					}
				}
				let randomIdnex:number = CommonUtil.RandomRangeInt(0, simulateCandyIds.length);
				let selectCandyId:number = simulateCandyIds[randomIdnex];
				simulateCandyIds.splice(randomIdnex, 1);
				let beginNode:FillNode = avalibaleArr[CommonUtil.RandomRangeInt(0, avalibaleArr.length)];
				beginNode.value = selectCandyId;
				if(this.gridsInfo[beginNode.pointList[0].x][beginNode.pointList[0].y] == 0) {
					this.gridsInfo[beginNode.pointList[0].x][beginNode.pointList[0].y] = beginNode.value;
					egret.log("simulate : " + beginNode.pointList[0].x + " " + beginNode.pointList[0].y + "  " + beginNode.value)
				}
				let singleCount:number = 0;
				let targetCount:number = CommonUtil.RandomRangeInt(2,this.curLevel+3);
				while (singleCount < targetCount - 1) {
					let point: egret.Point = beginNode.pointList[0];
					let roundPoins: Array<egret.Point> = [
						new egret.Point(point.x + 1, point.y),
						new egret.Point(point.x - 1, point.y),
						new egret.Point(point.x, point.y + 1),
						new egret.Point(point.x, point.y - 1)
					]
					avalibaleArr = [];
					for (let p of roundPoins) {
						let nodes: Array<FillNode> = findInHandingNodes(p.x, p.y, 0);
						for(let n of nodes) {
							if (n && n.value == 0) {
								avalibaleArr.push(n);
							}
						}
					}
					if(avalibaleArr.length == 0) break;
					beginNode = avalibaleArr[CommonUtil.RandomRangeInt(0, avalibaleArr.length)];
					beginNode.value = selectCandyId;
					if(this.gridsInfo[beginNode.pointList[0].x][beginNode.pointList[0].y] == 0) {
						this.gridsInfo[beginNode.pointList[0].x][beginNode.pointList[0].y] = beginNode.value;
						egret.log("simulate : " + beginNode.pointList[0].x + " " + beginNode.pointList[0].y + "  " + beginNode.value)
					}
					singleCount++;
				}
				simulateCursor++;
			}

			for(let fillNode of handingNodes) {
				if(!fillNode.value || fillNode.value == 0) {
					let newCandyIds:Array<number> = [];
					for(let c of candyIds) {
						newCandyIds.push(c);
					}

					for(let exNode of fillNode.excludeFillNodes) {
						if(exNode.value > 0) {
							let index:number = newCandyIds.indexOf(exNode.value);
							if(index >= 0) {
								newCandyIds.splice(index, 1);
							}
						}
					}
					let weakFilters:Array<number> = [];
					for(let exNode of fillNode.weakFillNodes) {
						if(exNode.value > 0) {
							let index:number = newCandyIds.indexOf(exNode.value);
							if(index >= 0) {
								newCandyIds.splice(index, 1);
								weakFilters.push(exNode.value);
							}
						}
					}
					if(newCandyIds.length == 0) {
						// 这种情况下不过滤weaknodes
						console.log("weakkkkkkkkkkkkkkkkkkkkkk");
						fillNode.value = weakFilters[CommonUtil.RandomRangeInt(0, weakFilters.length - 1)];
					} else {
						fillNode.value = newCandyIds[CommonUtil.RandomRangeInt(0, newCandyIds.length - 1)];
					}
					if(!fillNode.value) {
						let arr:Array<number> = [];
						for(let c of candyIds) {
							let isok:boolean = true;
							for(let genresult of this.tempGenNodesArr) {
								if(c == genresult.treasureId) {
									isok = false;
									break;
								}
							}
							if(isok) arr.push(c);
						}

						fillNode.value =arr[CommonUtil.RandomRangeInt(0, arr.length - 1)];
						console.log("无奈的生成");
					}
				}
				if(this.gridsInfo[fillNode.pointList[0].x][fillNode.pointList[0].y] == 0) {
					this.gridsInfo[fillNode.pointList[0].x][fillNode.pointList[0].y] = fillNode.value;
				}
			}
/*
			for(let i=0;i<this.gridsInfo.length;i++) {
				console.log( i + ":" + this.gridsInfo[i][0] + "|" + this.gridsInfo[i][1] + "|" + this.gridsInfo[i][2] + "|" + this.gridsInfo[i][3])
			}

 */
		}

		private existInTempGen(point:egret.Point):number {
			for(let arr of this.tempGenNodesArr){
				for(let p of arr.nodes) {
					if(p.x == point.x && p.y == point.y) {
						return p.value;
					}
				}
			}
			return 0;
		}

		private getAvaliableCandyIds(x:number,y:number):Array<number> {

			let candyIds:Array<number>=[];
			if(this.curLevel == 1) {
				candyIds = [101,102,103,104,105];
			} else if(this.curLevel == 2) {
				candyIds = [201,202,203,204,205];
			} else if(this.curLevel == 3) {
				candyIds = [301,302,303,304,305];
			}
			let posArr:Array<egret.Point> = [
				new egret.Point(x+1,y),
				new egret.Point(x-1,y),
				new egret.Point(x,y-1),
				new egret.Point(x,y+1)
			];
			for(let pos of posArr) {
				if(pos.x >=0 && pos.x < this.gridsInfo.length && pos.y >= 0 && pos.y < this.curLevelGrids && this.gridsInfo[pos.x][pos.y] > 0) {
					let index = candyIds.indexOf(this.gridsInfo[pos.x][pos.y])
					if(index >= 0)candyIds.splice(index, 1);
				}
			}

			let value:number = this.existInTempGen(new egret.Point(x,y));
			if(value > 0) {
				let index = candyIds.indexOf(value)
				if(index >= 0)candyIds.splice(index, 1);
			}
			
			return candyIds;
		}

		private findXSameInArr(node:egret.Point, nodes: Array<Array<egret.Point>>) :number{
			let sameCount = 0;
			for(let narr of nodes) {
				for(let n of narr) {
					if(n.y == node.y && n.x <= node.x) {
						console.log("samecount ++ : " + n.y + "  x : " + n.x + "  " + node.x);
						sameCount ++;
					}
				}
			}
			return sameCount;
		}

		private findXSameInArr1(node:egret.Point, nodes: Array<GenResult>, cursor:number) :number{
			let sameCount = 0;
			for(let i=0;i<cursor;i++) {
				for(let n of nodes[i].nodes) {
					if(n.y == node.y && n.x <= node.x) {
						sameCount ++;
					}
				}
			}
			return sameCount;
		}

		private findXSameInArr0(node:egret.Point, nodes: Array<egret.Point>) :number{
			let sameCount = 0;
			for(let n of nodes) {
				if(n.y == node.y && n.x < node.x) {
					sameCount ++;
				}
			}
			return sameCount;
		}
	}

	export class CandyData {
		public constructor() {
		}
		private static _instance:CandyData;
		public static get instance():CandyData {
			if(!CandyData._instance) {
				CandyData._instance = new CandyData();
			}
			return CandyData._instance;
		}

		public singleLine:number;
		public enterRoomLevel:number = 0;

		public currentLayer:number = 0;//当前层 1=1层 2=2层 3=3层
		public totalMoney:number = 0;//余额
		public currentPassCount:number = 0;//当前过关图案的数量
		public totalPassCount:number = 0;//总过关图案数量
		public rewardPool:number = 0;//奖池

		private addPassCount:number = 0;

		public betValue:number = 1;
		public lineValue:number = 1;
		public winMoney:number = 0;

		public eliminateInfos:Array<CandyEliminateInfo> = [];

		public candyMachineData:CandyMachineData;

		public duobaoRewardPoint:DuobaoRewardPoint;
		public enterMinMoney:number = 0;
		public gameLevel:number = 0;
		public curWinMoney:number = 0;

		public grand: number = 0;
		public major: number = 0;
		public minor: number = 0;
		public mini: number = 0;

		public getTotalBet():number {
			return this.betValue * this.lineValue;
		}

		public setEnterData(data:any):void {
			this.currentLayer = data.currentLayer;
			if(this.currentLayer > 3){
				this.currentLayer = 1;
			}
			this.totalMoney = data.totalMoney;
			this.currentPassCount = data.currentPassCount;
			this.totalPassCount = data.totalPassCount;
			this.rewardPool = data.rewardPool;
			this.betValue = Number(data.stake);
			this.lineValue = data.line;
			egret.log("收到进入房间 line value " + this.lineValue);
			this.gameLevel = data.gameLevel;
			this.winMoney = data.winMoney;
			if(this.gameLevel == 0) {
				this.enterMinMoney = 0;
			}else if(this.gameLevel == 1) {
				this.enterMinMoney = 10;
			}
			egret.log("setEnterData : " + data.winMoney);
		}		

		public setData(data:any):void {
			let oldLayer = this.currentLayer
			this.currentLayer = data.currentLayer;
			if(this.currentLayer > 3){
				this.currentLayer = 1;
			}			
			this.currentPassCount = data.currentPassCount;
			this.totalPassCount = data.totalPassCount;
			this.addPassCount = data.addPassCount;
			this.totalMoney = data.totalMoney;
			this.winMoney = data.winMoney;
			console.log("current layer : " + this.currentLayer + "   currentPassCount " + this.currentPassCount 
			+ "  totalPassCount " + this.totalPassCount + "  winMoney " + this.winMoney)
			this.eliminateInfos = [];
			let winMoney:number = 0;
			for(let eliminateInfoData of data.eliminateInfos) {
				let eliminateInfo:CandyEliminateInfo = new CandyEliminateInfo(
					eliminateInfoData.eliminateCount,eliminateInfoData.candyId,eliminateInfoData.money
				);
				this.eliminateInfos.push(eliminateInfo);
				winMoney+=eliminateInfo.money;
			}
			this.curWinMoney = winMoney;

			this.candyMachineData = new CandyMachineData();
			this.candyMachineData.clear();
			this.candyMachineData.setData(this.eliminateInfos, this.currentLayer);
			// if(data.rewardPoint) {
			// 	this.setRewardPoint(data.rewardPoint);
			// 	this.totalMoney = this.duobaoRewardPoint.totalMoney;
			// 	// game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_DUOBAO_TOTAL_MONEY, this.totalMoney - winMoney - this.duobaoRewardPoint.getReward());
			// } else {
			// 	this.duobaoRewardPoint = null;
			// 	// game.AppFacade.getInstance().sendNotification(PanelNotify.REFRESH_DUOBAO_TOTAL_MONEY, this.totalMoney - winMoney);
			// }
			// if(oldLayer != this.currentLayer) {
			// 	// game.AppFacade.getInstance().sendNotification(PanelNotify.DUOBAO_SHOW_LEVEL_TIPS);
			// }
		}

		public clear():void {
			this.candyMachineData = null;
			this.eliminateInfos = [];
			this.currentLayer = 1;
			this.totalMoney = 0;
			this.currentPassCount = 0;
			this.totalPassCount = 0;
			this.rewardPool = 0;

			this.betValue = 1;
			this.lineValue = 1;
			this.duobaoRewardPoint = null;
		}

		private init():void {

		}
	}
}