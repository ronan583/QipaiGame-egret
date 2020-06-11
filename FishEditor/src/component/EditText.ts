class EditText extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	public tipLabel:eui.Label = null;
	public editInput:eui.EditableText = null;

	public tipContent:string = "";
	public tipFontSize:number = 10;
	public tipFontColor:number = 0;
	public isPassword:boolean = false;
	public bg:eui.Image;
	protected childrenCreated():void
	{
		super.childrenCreated();
		this.tipLabel.text = this.tipContent;
		this.tipLabel.size = this.tipFontSize;
		if(this.tipFontColor > 0) {
			this.tipLabel.textColor = this.tipFontColor;
		}
		this.editInput.size = this.tipFontSize;
		this.editInput.displayAsPassword = this.isPassword;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTiplabel,this);
	}
	
	public resetTipContent(text : string = null)
	{
		if(text == null)
		{
			this.tipLabel.text = this.tipContent;
		}else
		{
			this.tipLabel.text = text;
		}
	}

	private onTiplabel(e:egret.TouchEvent) :void {
		this.tipLabel.visible = false;
	}
}