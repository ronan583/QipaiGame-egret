module game {
	export enum TaskExecState {
		WAIT_EXEC,
		RUNNING,
		COMPLETE,
		WAIT_NEXT
	}

	export class BehaviorTask {
		public constructor() {
		}

		// 模拟行为时间
		public simulateTime:number = 0;
		public behaviorFunc:Function;
		public behaviorFuncCaller:any;
		// 下一个任务执行的强制delay
		public nextExecDelay:number = 0;
		// 下一个需要执行的任务
		public nextBehaviorTask:BehaviorTask;
		// 每一个子项不可切割，如果发生时间跳跃，那么需要执行最终状态
		public finalBehaviorFunc:Function;
		public finalBehaviorFuncCaller:Function;

		public execState:TaskExecState = TaskExecState.WAIT_EXEC;
		public execTime:number = 0;
		public completeTime:number = 0;

		private params:any[];
		private finalParams:any[];
		public execTask(beginTime:number) {
			if(this.params) {
				this.behaviorFunc.call(this.behaviorFuncCaller, this.params);
			} else {
				this.behaviorFunc.call(this.behaviorFuncCaller);
			}
			
			this.execTime = beginTime;
	}

		public execFinal() {
			if(this.finalBehaviorFunc) {
				if(this.finalParams) {
					this.finalBehaviorFunc.call(this.finalBehaviorFuncCaller, this.finalParams);
				} else {
					this.finalBehaviorFunc.call(this.finalBehaviorFuncCaller);
				}
				egret.log("exec final -- " + this.finalBehaviorFunc.prototype);
			}
		}

		public bindBehaviorWithParams(f:Function,fCaller?:any, ...params: any[]) {
			this.behaviorFunc = f;
			this.behaviorFuncCaller = fCaller;
			this.params = params;
		}

		public bindFinalBehaviorWithParams(f:Function,fCaller?:any, ...params: any[]) {
			this.finalBehaviorFunc = f;
			this.finalBehaviorFuncCaller = fCaller;
			this.finalParams = params;
		}
	}

	// 行为任务执行器
	export class BehaviorTaskExecutor {
		constructor() {

		}
		private beginTask:BehaviorTask = null;
		private curExecTask:BehaviorTask = null;
		private initPassTime:number = 0;

		private _isRunning = false;

		public get isRunning() {
			return this._isRunning;
		}

		public addTask(simulateTime:number, behaviorFunc:Function, behaviorFuncCaller:any, 
				finalBehaviorFunc:Function, finalBehaviorFuncCaller:any, nextExecDelay:number = 0) {
			let task = new BehaviorTask();
			task.simulateTime = simulateTime;
			task.behaviorFunc = behaviorFunc;
			task.behaviorFuncCaller = behaviorFuncCaller;
			task.finalBehaviorFunc = finalBehaviorFunc;
			task.finalBehaviorFuncCaller = finalBehaviorFuncCaller;
			task.nextExecDelay = nextExecDelay;
			this.addTaskByTask(task);
		}

		public addTaskByTask(task:BehaviorTask) {
			if(!this.beginTask) {
				this.beginTask = task;
			} else {
				this.getLastTask().nextBehaviorTask = task;
			}
		}

		public getLastTask():BehaviorTask {
			let curTask = this.beginTask;
			while(curTask.nextBehaviorTask) {
				curTask = curTask.nextBehaviorTask;
			}
			return curTask;
		}


		public execute(passTime:number = 0) {
			if(!this.beginTask) {
				egret.error("no task need to run");
				return;
			}
			this.curExecTask = this.beginTask;
			if(passTime > 0) {
				// 先把这个时间内的全部执行final
				let t = 0;
				while(t < passTime * 1000) {
					if(!this.curExecTask) return;
					t += this.curExecTask.simulateTime + this.curExecTask.nextExecDelay;
					this.curExecTask.execFinal();
					this.curExecTask = this.curExecTask.nextBehaviorTask;
					egret.log("执行错过的时间");
				}
			}
			this._isRunning = true;
			egret.startTick(this.updateTask, this);
		}
		/**
		 * 强制结束这个任务执行器
		 */
		public stop() {
			this.stopTask();
			this._isRunning = false;
		}

		private updateTask(timestamp:number):boolean {
			if(!this.curExecTask) {
				this.stopTask();
				return;
			}
			if(this.curExecTask.execState == TaskExecState.WAIT_EXEC) {
				this.curExecTask.execState = TaskExecState.RUNNING;
				this.curExecTask.execTask(timestamp);
			} else if(this.curExecTask.execState == TaskExecState.RUNNING) {
				if(this.curExecTask.execTime + this.curExecTask.simulateTime <= timestamp) {
					this.curExecTask.execState = TaskExecState.COMPLETE;
				}
			} else if(this.curExecTask.execState == TaskExecState.COMPLETE) {
				if(this.curExecTask.nextExecDelay <= 0) {
					this.curExecTask = this.curExecTask.nextBehaviorTask;
				} else {
					this.curExecTask.completeTime = timestamp;
					this.curExecTask.execState = TaskExecState.WAIT_NEXT;
				}
			} else if(this.curExecTask.execState == TaskExecState.WAIT_NEXT) {
				if(this.curExecTask.completeTime + this.curExecTask.nextExecDelay <= timestamp) {
					this.curExecTask = this.curExecTask.nextBehaviorTask;
				}
			}
			return false;
		}

		private stopTask() {
			this.curExecTask = null;
			egret.stopTick(this.updateTask, this);
		}
	}

}