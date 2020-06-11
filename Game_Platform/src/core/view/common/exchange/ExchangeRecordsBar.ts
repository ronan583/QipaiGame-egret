class ExchangeRecordsBar extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/common/exchange/ExchangeRecordsBar.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	public bgImage: eui.Image;
	public exchangeId: eui.Label;
	public exchangeType: eui.Label;
	public exchangeMoney: eui.Label;
	public exchangeTime: eui.Label;
	public exchangeState: eui.Label;

	private isInit: boolean = false;
	private data: any;
	private index: number;
	protected childrenCreated(): void {
		super.childrenCreated();
		if (!this.isInit) {
			this.isInit = true;
			if (this.data != null)
				this.initBar(this.index, this.data.no, this.data.type, this.data.money, this.data.dataTime, this.data.status)
		}
	}

	public initData(index: number, data: any) {
		this.index = index;
		this.data = data;
		if (this.isInit) {
			this.initBar(this.index, this.data.no, this.data.type, this.data.money, this.data.dataTime, this.data.status)
		}
	}

	public initBar(index: number, exchangeId: string, type: number, money: number, dataTime: string, status: number) {
		// if(index % 2 == 0)
		// {
		// 	this.bgImage.source = "layer_detail_bg_png";
		// }else
		// {
		// 	this.bgImage.source = "layer_detail_bg_dark_png";
		// }
		this.exchangeId.text = exchangeId;
		this.exchangeType.text = (type == 1 ? "支付宝" : "银行卡");
		this.exchangeMoney.text = money.toString();
		this.exchangeTime.text = dataTime;
		this.exchangeState.text = status == 1 ? "兑换中" : "已完成";
		this.width = 920;
		this.height = 45;
	}

}