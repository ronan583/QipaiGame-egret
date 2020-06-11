module game {
	export class TickTimeOut {
		public constructor() {
		}

		private startTime:number = 0;
		private tickTime:number = 0;
		private endTime:number = 0;
		private executeFunc:Function = null;
		private executeCaller:any = null;

		private static allTimeOutList:Array<game.TickTimeOut> = [];
		private static recordPauseTime:number = 0;

		public static SetTimeOut(f:Function, caller:any, time):TickTimeOut{
			if(!f || !caller || time < 0) return;
			let tickTimeout = new TickTimeOut();
			if(!caller['tickTimeOutList']) caller['tickTimeOutList'] = new Array<game.TickTimeOut>();
			tickTimeout.setTimeout(f, caller, time);
			caller['tickTimeOutList'].push(tickTimeout);
			TickTimeOut.allTimeOutList.push(tickTimeout);
			return tickTimeout;
		}

		public setTimeout(f:Function, caller:any, time) {
			if(!f || !caller || time < 0) return;
			this.tickTime = time;
			this.endTime = time + egret.getTimer();
			this.executeCaller = caller;
			this.executeFunc = f;
			egret.startTick(this.update, this);
		}

		private update(timestamp:number) : boolean {
			if(this.endTime == 0) {
				// 无效的结束时间
				egret.stopTick(this.update, this);
			}
			if(timestamp >= this.endTime) {
				this.executeFunc.call(this.executeCaller);
				this.stop();
			}
			return false;
		}

		public stop() {
			egret.stopTick(this.update, this);
			if(this.executeCaller['tickTimeOutList']) {
				let list = <Array<game.TickTimeOut>>this.executeCaller['tickTimeOutList'];
				let index = list.indexOf(this);
				if(index >= 0) {
					list.slice(index, 1);
				}
			}
			let idx = TickTimeOut.allTimeOutList.indexOf(this);
			if(idx >= 0) {
				TickTimeOut.allTimeOutList.slice(idx, 1);
			}
		}
		public static clear(timeout:game.TickTimeOut) {
			timeout.stop();
		}

		public static pauseAll(){
			TickTimeOut.recordPauseTime = egret.getTimer();
		}

		public static resumeAll() {
			let delayPassTime = egret.getTimer() - TickTimeOut.recordPauseTime;
			egret.log("跨越多少时间 继续游戏 ： "  + delayPassTime)
			for(let timeout of TickTimeOut.allTimeOutList) {
				timeout.endTime += delayPassTime;
			}
		}
	}
}