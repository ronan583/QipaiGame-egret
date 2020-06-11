module game {
	class InnerUpdateData {
		public constructor() {
		}
	}


	export class UpdateInfo {
		public updateVersion:string;
		public updateUrl:string;
		public constructor() {
		}
	}

	export class UpdateTotalInfo {
		public constructor() {
			}
		public updateInfoList:Array<string> = [];

		private static _instance:UpdateTotalInfo;

		public static getUpdateTotalInfo():UpdateTotalInfo {
			if(!UpdateTotalInfo._instance) {
				UpdateTotalInfo._instance = new UpdateTotalInfo();
				let us = NativeApi.getLocalData("UpdateTotalInfo");
				egret.log("UpdateTotalInfo:" + us);
				if(us && us != "") {
					let d = JSON.parse(us);
					for(let dd of d.updateInfoList) {
						UpdateTotalInfo._instance.updateInfoList.push(dd);
					}
				} 
			}
			return UpdateTotalInfo._instance;
		}

		public hasUpdated(updateVersion:string):boolean {
			return this.updateInfoList.indexOf(updateVersion) >= 0;
		}

		public saveUpdated(updateVersion:string):void {
			this.updateInfoList.push(updateVersion);
			NativeApi.setLocalData("UpdateTotalInfo", JSON.stringify(this));
		}

	}
}