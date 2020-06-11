class SingleLineLabel extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.content.mask = this.rectMask;
		if(this._text) {
			this.content.text = this._text;
		}
	}

	private content:eui.Label;
	private rectMask:eui.Rect;

	private _text:string;

	public set text(value:string) {
		this._text = value;
		if(this.content) {
			this.content.text = this._text;
		}
	}

	public get text():string {
		return this._text;
	}

	
	
}