class BjlRankItemNew extends eui.Component implements  eui.UIComponent, eui.IItemRenderer {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public headIcon : eui.Image;
	public nameLabel : eui.Label;
	public moneyLabel : eui.Label;
	private dushenFlag:eui.Image;
	private fuhaoFlag:eui.Image;
	private flag:number = -1;
	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	public selected: boolean;
	public itemIndex:number;

	private _data:any;
	public set data(cellData:any) {
		this._data = cellData;
		this.updateView(cellData);
	}

	public get data():any {
		return this._data;
	}

	private updateView(data:any) {
		this.headIcon.source = "gp_head_" + (data.headNum + 1);
		this.nameLabel.text = data.nickName;
		this.moneyLabel.text = CommonUtil.moneyFormatNoDecimal(data.money);
		this.dushenFlag.visible = data['flag'] == 0;
		this.fuhaoFlag.visible = data['flag'] == 1;
	}

	public init(data, flag:number = -1)
	{
		this.flag = flag;
		if(this.headIcon) {
			this.headIcon.source = "gp_head_" + (data.headNum + 1);
			this.nameLabel.text = data.nickName;
			this.moneyLabel.text = CommonUtil.moneyFormatNoDecimal(data.money);
			this.dushenFlag.visible = flag == 0;
			this.fuhaoFlag.visible = flag == 1;
		}
	}
	
}