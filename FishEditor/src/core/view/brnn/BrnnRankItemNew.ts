class BrnnRankItemNew extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private data:any;
	public headIcon : eui.Image;
	public nameLabel : eui.Label;
	public moneyLabel : eui.Label;
	private dushenFlag:eui.Image;
	private fuhaoFlag:eui.Image;
	private flag:number = -1;
	protected childrenCreated():void
	{
		super.childrenCreated();
		if(this.data) {
			this.init(this.data, this.flag);
		}
	}

	public init(data, flag:number = -1)
	{
		this.data = data;
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