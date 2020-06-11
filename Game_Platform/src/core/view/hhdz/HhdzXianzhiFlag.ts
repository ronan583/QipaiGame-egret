class HhdzXianzhiFlag extends eui.Component implements  eui.UIComponent {
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
		this.shensuanziAnim.visible = false;
	}

	private shensuanziAnim:DragonAnim;
	private _hasFlagDuShen:boolean = false;
	public set hasFlagDuShen(v:boolean) {
		this._hasFlagDuShen = v;
	}
	public get hasFlagDuShen():boolean {
		return this._hasFlagDuShen;
	}	

	public getShensuanziPos():egret.Point {
		if(this.shensuanziAnim) {
			return this.shensuanziAnim.localToGlobal(this.shensuanziAnim.width / 2, this.shensuanziAnim.height / 2);
		}
		return null;
	}

	public showShensuanziAnim() {
		this.shensuanziAnim.visible = true;
		this.shensuanziAnim.playerOnce();
	}

	public reset() {
		this.shensuanziAnim.visible = false;
		this._hasFlagDuShen = false;
	}
}