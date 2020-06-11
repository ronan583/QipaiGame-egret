module game.bcbm {

	export class CarMotion {
		public pathNodeList:Array<CarPathNode> = [];
		private static _instance: CarMotion;
		public static getInstance(): CarMotion{
			if(this._instance == null){
				this._instance = new CarMotion();
			}
			return this._instance;
		}
		public slowDownNode:CarPathNode;
		public finishNode:CarPathNode;

		public runFrame:number = 30;
		private tick:number = 0;
		private startTime:number = 0;
		private passSlowDownCount:number = 0;
		private lastState:number = 0;
		private bcbmCar:BcbmCar;
		public static MAX_SPEED = 2000;
		public static LAST_MOVE_SPEED = 100;
		public static SLOW_PREV_NODES_COUNT = 30;
		public static LAST_MOVE_NODES_COUNT = 4;
		public static PASS_SLOT_DOWN_POINT_COUNT = 3;
		public static ACC_TIME = 500;
		public getCarMotionByData(data:Array<any>):CarMotion{
			for(let d of data) {
				let node = new CarPathNode();
				node.x = d[0];
				node.y = d[1];
				this.pathNodeList.push(node);
				this.init();
			}
			return this;
		}

		public getCarPathNodeByIndex(index: number): CarPathNode{
			return this.pathNodeList[index % this.pathNodeList.length];
		}

		public recordSlowDownNode(node:CarPathNode) :CarPathNode{
			this.finishNode = node;
			for(let i=0;i<CarMotion.SLOW_PREV_NODES_COUNT;i++) {
				node = node.prevCarPathNode;
			}
			this.slowDownNode = node;
			return node;
		}

		private init() {
			for(let i=0;i<this.pathNodeList.length;i++) {
				if(i == 0) {
					this.pathNodeList[0].prevCarPathNode = this.pathNodeList[this.pathNodeList.length - 1];
				} else {
					this.pathNodeList[i].prevCarPathNode = this.pathNodeList[i - 1];
				}
				if(i == this.pathNodeList.length - 1) {
					this.pathNodeList[i].nextCarPathNode = this.pathNodeList[0];
				} else {
					this.pathNodeList[i].nextCarPathNode = this.pathNodeList[i + 1];
				}
				let n = this.pathNodeList[i];
				n.index = i;
				n.judgeDistance = egret.Point.distance(n.getPoint(), n.nextCarPathNode.getPoint());
				let dir = egret.Point.create(n.nextCarPathNode.x - n.x, n.nextCarPathNode.y - n.y);
				dir.normalize(1);
				n.nextDir = dir;
			}
		}

		private moveCompleteFunc:Function;
		private moveCompleteFuncObj:Function;
		private passNodeFunc:Function;
		private passNodeFuncObj:any;
		private resetRunInfo() {
			this.startTime = 0;
			this.passSlowDownCount = 0;
			this.lastState = 0;
		}

		public startMove(car:BcbmCar, func:Function, funcObj:any, passNodeFunc:Function, passNodeFuncObj:any) {
			this.moveCompleteFunc= func;
			this.moveCompleteFuncObj= funcObj;
			this.passNodeFunc = passNodeFunc;
			this.passNodeFuncObj = passNodeFuncObj;
			this.bcbmCar = car;
			car.stopMotion();
			car.hideCarAnim();
			egret.stopTick(this.update0, this);
			this.lastState = 0;
			this.passSlowDownCount = 0;
			let finalNodeIndex = car.getPosByWintype(car.winType);
			let finishNode = this.getCarPathNodeByIndex(finalNodeIndex);
			this.recordSlowDownNode(finishNode);
			car.lastTickTime = egret.getTimer();
			this.startTime = egret.getTimer();
			this.bcbmCar.calcAcc2 = 0;
			egret.startTick(this.update0, this);
		}

		private update0(timestamp:number):boolean {
			if(DEBUG) {
				let multi = Math.floor(egret.lifecycle.stage.frameRate / this.runFrame);
				if(this.tick++ % multi == 0) {
					this.updateCar(timestamp);
				}
			} else {
				this.updateCar(timestamp);
			}
			return false;
		}

		// 抛弃帧的运算 用时间来进行
		public updateCar(timestamp: number): boolean {
			let delta: number = timestamp - this.bcbmCar.lastTickTime;
			let totalPass = timestamp - this.startTime;
			let rundistance = this.bcbmCar.speed * (delta / 1000);
			// egret.log("经过时间：" + delta + "  " + rundistance);
			let nextdistance = egret.Point.distance(new egret.Point(this.bcbmCar.x, this.bcbmCar.y), this.bcbmCar.curPathNode.nextCarPathNode.getPoint());
			let nextNode = this.bcbmCar.curPathNode.nextCarPathNode;
			let passNode = 0;
			while(rundistance > nextdistance) {
				nextdistance += nextNode.judgeDistance;
				nextNode = nextNode.nextCarPathNode;
				passNode++;
				if(nextNode == this.slowDownNode) {
					this.passSlowDownCount++;
				}
				if(this.passNodeFunc) {
					this.passNodeFunc.call(this.passNodeFuncObj, nextNode.index);
				}
				if(this.lastState == 1) {
					if(nextNode == this.finishNode) {
						egret.stopTick(this.update0, this);
						if(this.moveCompleteFunc) {
							this.moveCompleteFunc.call(this.moveCompleteFuncObj);
						}
					}
				}
			}
			let left = nextdistance - rundistance;
			if (passNode > 0) {
				this.bcbmCar.curPathNode = nextNode.prevCarPathNode;
				this.bcbmCar.pointer += passNode;
				let p = nextNode.prevCarPathNode.getPoint();
				let pass = nextNode.prevCarPathNode.judgeDistance - left;
				p = egret.Point.create(p.x + nextNode.prevCarPathNode.nextDir.x * pass, p.y + nextNode.prevCarPathNode.nextDir.y * pass)
				this.bcbmCar.x = p.x;
				this.bcbmCar.y = p.y;
			} else {
				// 朝目标前进
				let moveDir = this.bcbmCar.curPathNode.nextDir;
				this.bcbmCar.x += moveDir.x * (delta / 1000) * this.bcbmCar.speed;
				this.bcbmCar.y += moveDir.y * (delta / 1000) * this.bcbmCar.speed;
			}
			this.bcbmCar.lookAt(this.bcbmCar.curPathNode.nextCarPathNode);
			this.bcbmCar.lastTickTime = timestamp;

			if (totalPass < CarMotion.ACC_TIME) {
				// 0.5 到最大速度
				if (this.bcbmCar.speed < this.bcbmCar.speedMax) {
					this.bcbmCar.speed += (delta / CarMotion.ACC_TIME) * CarMotion.MAX_SPEED;
				} else {
					this.bcbmCar.isMax = true;
				}
			} else if(this.passSlowDownCount >= CarMotion.PASS_SLOT_DOWN_POINT_COUNT) {
				if(this.bcbmCar.calcAcc2 == 0) {
					//减速
					let node = this.slowDownNode;
					// 减速总距离
					let d = 0;
					for(let i = 0;i < CarMotion.SLOW_PREV_NODES_COUNT - CarMotion.LAST_MOVE_NODES_COUNT;i++){
						d += node.judgeDistance;
						node = node.nextCarPathNode;
					}
					let t = d / ((CarMotion.MAX_SPEED - CarMotion.LAST_MOVE_SPEED) / 2);
					let a = CarMotion.MAX_SPEED / t;
					this.bcbmCar.calcAcc2 = -a;
				}
				this.bcbmCar.speed += (delta / 1000) * this.bcbmCar.calcAcc2;
				if(this.bcbmCar.speed <= CarMotion.LAST_MOVE_SPEED) {
					this.bcbmCar.speed = CarMotion.LAST_MOVE_SPEED;
					this.lastState = 1;
				}
			}
			
			return false;
		}

		public stop() {
			egret.stopTick(this.update0, this);
		}
	}

	export class CarPathNode {
		public index:number = 0;
		public x:number;
		public y:number;
		public prevCarPathNode:CarPathNode;
		public nextCarPathNode:CarPathNode;
		public judgeDistance:number = 0;
		public nextDir:egret.Point;
		public getPoint():egret.Point {
			return new egret.Point(this.x, this.y);
		}
	}

	export class BcbmCar extends egret.DisplayObjectContainer {
		public constructor() {
			super();
			this.init();
		}

		private img:eui.Image;
		private carAnim: game.CommonDBLoop2;
		public curPathNode:CarPathNode ;
		public lastTickTime:number;
		public posRandomPlace: number;

		public acc: number = 20;
		public acc2: number = 40;
		public accc: number = 0.4;
		public speedMax:number = 2000;
		public speed: number = 0;
		public calcAcc2:number = 0;

		public prevRotation: number;

		public pointer: number = 0;
		public isMax: boolean = false;
		public isFinal: boolean = false;

		public currentType:number;

		//test 
		public winType: number = 1;
		public prevFinalNode: number = 0;
		public finalNodeNum: number;
		public slowNodeNum: number;

		public init() {
			this.anchorOffsetX = 52;
			this.anchorOffsetY = 24;
			this.img = new eui.Image();
			this.img.source = "bcbm_game_imgcar";
			this.addChild(this.img);
			this.img.x = 0;
			this.img.y = 0;

			this.carAnim = new game.CommonDBLoop2("bcbmcheweiqi_ske_dbbin", "bcbmcheweiqi_tex_json", "bcbmcheweiqi_tex_png", "animation", true, true);
			this.addChild(this.carAnim);
			this.carAnim.x = 43;
			this.carAnim.y = 24;
			this.carAnim.rotation = -90;
		}

		public playCarAnim(){
			this.carAnim.playOnce();
			this.carAnim.visible = true;
			this.img.visible = false;
		}
		public hideCarAnim(){
			this.carAnim.stop();
			this.carAnim.visible = false;
			this.img.visible = true;
		}

		public startMotion(node:CarPathNode) {
			this.finalNodeNum = this.winTypeToNum(this.winType);
			this.slowNodeNum = this.finalNodeNum - 27;
			console.error("wintype is ", this.winType);
			console.warn("final node is ", this.finalNodeNum);
			this.x = node.x;
			this.y = node.y;
			this.curPathNode = node;
		}

		public stopMotion() {
			this.speed = 0;
			this.prevRotation = NaN;
			this.isMax = false;
			this.pointer = 0;
			this.acc2 = 40;
			this.isFinal = false;
		}

		public lookAt(pathnode:CarPathNode) {
			var angle:number = Math.atan(this.scaleY * (pathnode.y - this.y) /(pathnode.x - this.x));

			if(pathnode.x < this.x) {
				angle = angle*180/3.1415926-180;
			} else {
				angle = angle*180/3.1415926;
			}
			if(isNaN(angle)) {
				return false;
			}
			//直接转向
			this.rotation = angle;
		}

		public winTypeToNum(win: number){
			let roundNum = CarMotion.getInstance().pathNodeList.length;
			let num = this.getPosByWintype(win);
			let lastNum = this.prevFinalNode % roundNum;
			let total = roundNum - lastNum + num + roundNum;
			if(total < roundNum * 2){
				total += roundNum;
			}
			return total;
		}

		public numToType(num: number){

		}
		public getPosByWintype(winType: number): number{
			// let ran: number = CommonUtil.RandomRangeInt(0,3);
			let ran: number = this.posRandomPlace;
			let node = BcbmBattleScene.typeToNode[winType - 1][ran];
			return node;
		}
	}
}