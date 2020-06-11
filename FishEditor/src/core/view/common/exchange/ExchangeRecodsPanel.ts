class ExchangeRecodsPanel extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}


	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	
	public recordGroup : eui.Group;
	public lastPageBtn : IButton;
	public nextPageBtn : IButton;
	public closeBtn : IButton;
	private currPage : number = 1;
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closePanel , this);
		this.lastPageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onLastPage , this);
		this.nextPageBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onNextPage , this);
	}

	public requestPage()
	{
		this.currPage = 1;
		 UserRequest.sendExchangeRecord(this.currPage);
	}

	public onLastPage()
	{
		if(this.currPage <= 1)
		{
			return;
		}
		UserRequest.sendExchangeRecord(this.currPage-1);
	}

	public onNextPage()
	{
		UserRequest.sendExchangeRecord(this.currPage+1);
	}
	
	public UpdatePage(data)
	{
		var recordBar : ExchangeRecordBar;
		var recordInfos = data.recordInfoInfo;
		while(this.recordGroup.numChildren > 0)
		{
			this.recordGroup.removeChildAt(0);
		}
		for(var i  = 0 ; i < recordInfos.length ; i++)
		{
			recordBar = new ExchangeRecordBar();
			recordBar.initData(i ,recordInfos[i]);
			this.recordGroup.addChild(recordBar);
		}
		this.currPage = data.page;
		if(this.currPage == 1)
		{
			this.lastPageBtn.enabled = false;
		}else
		{
			this.lastPageBtn.enabled = true;
		}
	}

	private closePanel()
	{
		PopUpManager.removePopUp(this);
	}
}