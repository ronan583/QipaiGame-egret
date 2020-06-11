class DDZGameMulti extends eui.Component implements  eui.UIComponent {
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
		this.summaryGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSummaryTouch, this);
	}
	private totalLabel:eui.BitmapLabel;
	private nameLabel:eui.Label;
	private commonLabel:eui.Label;
	private nongmingLabel:eui.Label;
	private totalLabel1:eui.Label;

	private jiaofenLabel:eui.Label;
	private zhadanLabel:eui.Label;
	private mingbaiLabel:eui.Label;
	private chuntianLabel:eui.Label;

	private jiaofenHolder:eui.Image;
	private zhandanHolder:eui.Image;
	private mingpaiHolder:eui.Image;
	private chuntianHolder:eui.Image;

	private multiGroup:eui.Group;
	private summaryGroup:eui.Group;

	private onSummaryTouch() {
		this.multiGroup.visible = !this.multiGroup.visible;
		if(this.multiGroup.visible) {
			this.onDetailShow();
		} else {
			this.onDetailHide();
		}
	}

	private onDetailShow() {
		egret.setTimeout(this.check, this, 200);
	}

	private onDetailHide() {
		if(this.stage.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
		}
	}

	private check() {
		if(this.stage.hasEventListener(egret.TouchEvent.TOUCH_TAP)) {
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
		}
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
	}

	private onstageclick(e:egret.TouchEvent) {
		if(!this.multiGroup.hitTestPoint(e.stageX, e.stageY)) {
			this.onSummaryTouch();
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onstageclick, this);
		}
	}

	public showDefault() {
		this.multiGroup.visible = false;
		this.jiaofenHolder.visible = true;
		this.jiaofenLabel.visible = false;

		this.zhandanHolder.visible = true;
		this.zhadanLabel.visible = false;

		this.mingpaiHolder.visible = false;
		this.mingbaiLabel.visible = false;

		this.chuntianHolder.visible = true;
		this.chuntianLabel.visible = false;
		this.totalLabel.text = "1"
		this.totalLabel1.text = "X1"

		this.nameLabel.text = CommonUtil.limitName(UserService.instance.name, 4);
		this.nongmingLabel.text = "X1";
	}

	public showTotal(total:number) {
		this.totalLabel.text = total.toFixed(0);
		this.totalLabel1.text = "X" + total.toFixed(0);
	}

	public showDetail(detail:game.ddz.DdzMultipleDetail) {
		// this.multiGroup.visible = true;
		this.showTotal(detail.total);
		if(detail.bomb && detail.bomb > 0) {
			this.zhadanLabel.text = "X" + detail.bomb.toFixed(0);
			this.zhadanLabel.visible = true;
			this.zhandanHolder.visible = false;
		} else {
			this.zhadanLabel.visible = false;
			this.zhandanHolder.visible = true;
		}
		if(detail.common && detail.common > 0) {
			this.commonLabel.text = "X" + detail.common.toFixed(0);
		}
		if(detail.rob && detail.rob > 0) {
			this.jiaofenLabel.text = "X" + detail.rob.toFixed(0);
			this.jiaofenLabel.visible = true;
			this.jiaofenHolder.visible = false;
		} else {
			this.jiaofenLabel.visible = false;
			this.jiaofenHolder.visible = true;
		}
		if(detail.spring && detail.spring > 0) {
			this.chuntianLabel.text = "X" + detail.spring.toFixed(0);
			this.chuntianLabel.visible = true;
			this.chuntianHolder.visible = false;
		} else {
			this.chuntianLabel.visible = false;
			this.chuntianHolder.visible = true;
		}
		this.mingbaiLabel.visible = false;
		this.mingpaiHolder.visible = false;

		if(detail.jiabei && detail.jiabei > 0) {
			this.nongmingLabel.text = "X" + detail.jiabei.toFixed(0);
		}
	}

}