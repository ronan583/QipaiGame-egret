class IToggleSwitch extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}
	private startX : number = 0;
	private endX : number = 0;
	public toggleButton : IButton;
	public effectRadio : eui.RadioButton;
	private _selected : boolean = false;
	public set selected(value : boolean)
	{
		this._selected = value;
		this.onSelected();
	}
	public get selected() :boolean
	{
		return this._selected;
	}

	protected childrenCreated():void
	{
		super.childrenCreated();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onTapToggle, this);
		this.addEventListener(eui.UIEvent.CHANGE , this.onSelected , this);
		this.startX = this.effectRadio.x - this.toggleButton.width/2;
		this.endX = this.effectRadio.width - this.toggleButton.width/2;
		this.onSelected();
	}
	
	public onTapToggle()
	{
		this.selected = !this._selected;
	}

	public onSelected()
	{
		this.effectRadio.selected = this.selected;
		if(this.selected)
		{
			this.toggleButton.x = this.endX;
		}else
		{
			this.toggleButton.x = this.startX;
		}
	}
}