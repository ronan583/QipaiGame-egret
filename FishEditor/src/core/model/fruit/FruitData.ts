module game.sgj {
	export class FruitsInfo {
		public position:number;
		public fruitIndex:number;
	}

	export class WinLineInfo {
		public winLine:number;
		public postion:Array<number>;
	}

	export class WinFruitInfo {
		public configId:number;
		public count:number;
	}

	export class FruitGameResult {
		public fruitsInfos:Array<FruitsInfo> = [];
		public addMoney:number;
		public totalMoney:number;
		public winLines:Array<WinLineInfo> = [];
		public roomPoolMoney:number;
		public type:number;
		public winResult:Array<WinFruitInfo> = [];

		public getTargetFruitArr(index:number):Array<number> {
			var arr:Array<number> = [];
			arr[0] = this.fruitsInfos[index].fruitIndex;
			arr[1] = this.fruitsInfos[index + 5].fruitIndex;
			arr[2] = this.fruitsInfos[index + 10].fruitIndex;
			return arr;
		}

		public setData(data:any):void {	
			this.addMoney = data.addMoney / 1000;
			this.roomPoolMoney = data.roomPoolMoney / 1000;
			this.totalMoney = data.totalMoney / 1000;
			this.type = data.type;
			for(let d of data.fruitsInfos) {
				let fruitInfo:FruitsInfo = new FruitsInfo();
				fruitInfo.fruitIndex = d.number;
				fruitInfo.position = d.postion;
				this.fruitsInfos.push(fruitInfo);
				// console.log(fruitInfo.position + "-----" + fruitInfo.fruitIndex);
			}
			for(let line of data.winInfos) {
				let winLineInfo = new WinLineInfo();
				winLineInfo.postion = line.postion;
				winLineInfo.winLine = line.winLine;
				this.winLines.push(winLineInfo);
			}
			for(let d of data.winResult) {
				let winFruitInfo = new WinFruitInfo();
				winFruitInfo.configId = d.configId;
				winFruitInfo.count = d.count;
				this.winResult.push(winFruitInfo);
			}
			this.fruitsInfos.sort((f1 : FruitsInfo , f2 : FruitsInfo )=>
			{
					return f1.position - f2.position;
			})
		}
	}


	export class FruitData {
		public constructor() {
		}
		private static _instance;
		public static get instance():FruitData {
			if(FruitData._instance == null) {
				FruitData._instance = new FruitData();
			}
			return FruitData._instance;
		}
		public enterRoomLevel:number = 0;

		public isRollingReward:boolean = false;

		public yaxian:number = 9;
		public bottomBet:number = 0;
		public poolMoney:number = 0;
		public isReward:boolean = false;
		public lineValue:number = 9;
		public winMoney:number = 0;
		public crazyArr:Array<number> = [5,10,15];
		public getTotalBet():number  {
			return this.bottomBet * this.lineValue / 1000;
		}

		public setData(data:any):void {
			
		}
	}
}