module game {
	export class BYKillGridFactory {
		private static _instance:BYKillGridFactory;
		public static get instance():BYKillGridFactory {
			if(BYKillGridFactory._instance == null) {
				BYKillGridFactory._instance = new BYKillGridFactory();
			}
			return BYKillGridFactory._instance;
		}

		public createGrid(gridIndex:number):BYKillGrid {
			var poolKey:string = "grid_" + gridIndex.toFixed(0);
			var grid:BYKillGrid = <BYKillGrid>PoolManager.instance.popObj(poolKey);
			if(!grid) {
				grid = new BYKillGrid(gridIndex);
			}
			return grid;
		}

	}

	export class BYKillGrid extends egret.DisplayObjectContainer implements IPool{
		public constructor(gridIndex:number) {
			super();
			this.gridIndex = gridIndex;
			this.gridImg = new eui.Image();
			this.addChild(this.gridImg);
			// this.gridImg.source = "sty_" + this.gridIndex.toFixed(0) + "_net0";
			this.gridImg.source = game.by.ByConst.getHitGridImg(gridIndex);
			this._poolKey = "grid_" + this.gridIndex.toFixed(0);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.bulletCreate, this);
		}

		private bulletCreate():void {
			this.gridImg.x = 0;
			this.gridImg.y = 0;
			this.gridImg.anchorOffsetX = this.gridImg.width / 2;
			this.gridImg.anchorOffsetY = this.gridImg.height / 2;
		}

		private gridIndex:number = 0;
		private gridImg:eui.Image;
		private _free:boolean = false;
		private _poolKey:string = "";

		public startDeadCountdown():void {
			egret.setTimeout(this.dead, this, 1000);
		}

		private dead():void {
			if(this.parent)this.parent.removeChild(this);
			PoolManager.instance.pushObj(this);
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
			
		}

	}
}