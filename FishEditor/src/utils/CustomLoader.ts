class CustomLoader {
	public constructor() {
	}
	private group:string = "";
	private complete:Function ;
	private completeCaller:any;
	private errorFunc:Function ;
	private errorCaller:any ;
	private loadingUI:any = null;
	// private loadingUI:LoadingUI|ResLoading = null;
	private funcparams:string;
	public loadGroupAndRes(config:string, group:string, complete:Function, completeCaller:any, 
		funcparams:any = null, loadingUI:any = null, errorFunc:Function = null, errorCaller:any) {
		// funcparams:any = null, loadingUI:LoadingUI|ResLoading = null, errorFunc:Function = null, errorCaller:any) {
		RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this ); 
		RES.addEventListener( RES.ResourceEvent.CONFIG_LOAD_ERROR, this.onConfigLoadErr, this );
		this.group = group;
		this.complete = complete;
		this.completeCaller = completeCaller;
		this.loadingUI = loadingUI;
		this.funcparams = funcparams;
		this.errorFunc = errorFunc;
		this.errorCaller = errorCaller;
		RES.loadConfig(config, "resource/");

	}

	private onConfigLoadErr():void {
		egret.log("onConfigLoadErr")
		if(this.errorFunc && this.errorCaller) {
			this.errorFunc.call(this.errorCaller);
		}
	}

	private onConfigComplete():void {
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
		RES.loadGroup(this.group);
	}

	/**
	 * preload资源组加载完成
	 */
	private onResourceLoadComplete(event: RES.ResourceEvent) {
		if (event.groupName == this.group) {
			// if(this.loadingUI && this.loadingUI.stage) this.loadingUI.parent.removeChild(this.loadingUI);
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
			RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

			if(this.complete && this.completeCaller) {
				if(this.funcparams) {
					this.complete.call(this.completeCaller, this.funcparams);
				}else {
					this.complete.call(this.completeCaller);
				}
			}
		}
	}

	/**
	 * 资源组加载出错
	 */
	private onItemLoadError(event: RES.ResourceEvent) {
		console.warn("Url:" + event.resItem.url + " has failed to load");
	}

	/**
	 * 资源组加载出错
	 */
	private onResourceLoadError(event: RES.ResourceEvent) {
		console.warn("Group:" + event.groupName + " has failed to load");
		//忽略加载失败的项目
		if(this.errorFunc && this.errorCaller) {
			this.errorFunc.call(this.errorCaller);
		}
	}

	/**
	 * preload资源组加载进度
	 */
	private onResourceProgress(event: RES.ResourceEvent) {
		if (event.groupName == this.group) {
			if(this.loadingUI && this.loadingUI.stage && this.loadingUI.onProgress) this.loadingUI.onProgress(event.itemsLoaded, event.itemsTotal);
		}
	}
}