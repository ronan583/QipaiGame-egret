module game {
	export class GameServerInfo {
		public constructor() {
		}

		private static _instance:GameServerInfo;
		public static get instance():GameServerInfo {
			if(!GameServerInfo._instance) {
				GameServerInfo._instance = new GameServerInfo();
			}
			return GameServerInfo._instance;
		}

		private infos:Array<string> = [
			"wss://g-api.xsaqzf.com","wss://g-api.xsaqzf.com"
		];
		private cursor:number = 0;
		public setServerInfo(infos:Array<string>) {
			this.infos = infos;
			egret.log("set server info complete");
		}

		public setServerInfoInner(infos:Array<any>) {
			this.infos = [];
			for(let i of infos) {
				this.infos.push(i.url);
			}
			egret.log("set server info complete");
		}

		public moveNext():string {
			this.cursor++;
			this.cursor = this.cursor % this.infos.length;
			let apiUrl:string = this.getCurApi();
			return this.getCurApi();
		}

		public getCurApi():string {
			if(this.cursor >= 0 && this.cursor < this.infos.length) {
				return this.infos[this.cursor];
			} else {
				this.cursor = 0;
				return this.infos[this.cursor];
			}
		}



	}
}