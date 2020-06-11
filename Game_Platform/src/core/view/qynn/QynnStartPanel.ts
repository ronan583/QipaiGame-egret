import ResizePanel = game.ResizePanel;
import ChildGameType = game.ChildGameType;

class QynnStartPanel extends game.RoomUI {
	public constructor() {
		super(ChildGameType.QYNN);
		this.skinName = "resource/eui_skins/qynn/QynnStartPanel.exml";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
		if (partName.indexOf("btn") >= 0) {
			let index = parseInt(partName.replace("btnRoom", ""));
			if (index == 0) {
				instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn0, this);
			} else if (index == 1) {
				instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1, this);
			} else if (index == 2) {
				instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2, this);
			} else if (index == 3) {
				instance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn3, this);
			}
		}
	}

	public _scroller: eui.Scroller;
	public lastClick: number = -1;

	public backBtn: eui.Button;
	public helpBtn: eui.Button;
	public zjcxBtn: eui.Button;
	private contentGroup: eui.Group;
	private goldLabel: eui.BitmapLabel;
	private nameLabel: eui.Label;
	private headImg: eui.Image;
	private goldAddBtn: eui.Button;
	private leftcornerGroup: eui.Group;
	private quickStartGroup: eui.Group;

	private roomItem1: QynnRoomItem;
	private roomItem2: QynnRoomItem;
	private roomItem3: QynnRoomItem;
	private roomItem4: QynnRoomItem;

	private init() {
	}

	private afterAnim() {
	}

	public onZjcxBtn() {
		RoomRequest.sendPlayerRecord(ChildGameType.QYNN);
		//--------------------------------------
		// let result = {
		// 	"gameType": 2,
		// 	"recordInfo": [
		// 		{
		// 			"costMoney": 19000,
		// 			"createTime": "12-10 16:40",
		// 			"gameLevel": 1,
		// 			"playerId": 776,
		// 			"recordInfo": '{"otherResult":[{"cards":[[4,18,30,42,53]],"maxCard":53,"playType":0}, {"cards":[[4,22,11],[22,33]],"maxCard":53,"playType":0}],"isBanker":true,"myResult":{"cards":[[38,41,5],[47,9]],"maxCard":47,"playType":2}}'
		// 		}]
		// }
		// AppFacade.getInstance().sendNotification(PanelNotify.OPEN_ZJCX_UI, result);
		//--------------------------------------
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
		this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.obHelpClick, this);
		this.zjcxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onZjcxBtn, this);
		this.goldAddBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGoldAdd, this);
		this.roomItem1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn0, this);
		this.roomItem2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn1, this);
		this.roomItem3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn2, this);
		this.roomItem4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtn3, this);
		this.quickStartGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuickStart, this);
		this.refreshInfo();
		this.init();
	}

	public refreshPlayerInfo() {
		this.refreshInfo();
	}

	private onQuickStart() {
		game.QuickStart.instance.quickStart(ChildGameType.QYNN);
	}

	private onGoldAdd() {
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.QYNN);
	}

	private refreshInfo() {
		let user = UserService.instance;
		this.nameLabel.text = user.name;
		this.goldLabel.text = CommonUtil.fixMoneyFormat(user.money);
		this.headImg.source = "gp_head_" + (user.headNum + 1);
	}

	private obHelpClick() {
		game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.QYNN);
	}

	protected addToStage(): void {
		super.addToStage();
		this.init();
		this.refreshInfo();
		this._scroller.width = this.width;
		if (this._scroller.horizontalScrollBar) this._scroller.horizontalScrollBar.autoVisibility = false;
		if (this._scroller.horizontalScrollBar) this._scroller.horizontalScrollBar.visible = false;
	}

	public onBtn0(event: egret.TouchEvent) {
		this.onQynnBtnClick(0);
	}

	public onBtn1(event: egret.TouchEvent) {
		this.onQynnBtnClick(1);
	}

	public onBtn2(event: egret.TouchEvent) {
		this.onQynnBtnClick(2);
	}

	public onBtn3(event: egret.TouchEvent) {
		this.onQynnBtnClick(3);
	}

	private onQynnBtnClick(index: number): void {
		if (this.lastClick != -1 && this.lastClick + 2000 > Date.now()) {
			return;
		}

		this.lastClick = Date.now();
		// 发送进入房间协议
		RoomRequest.sendEnterRoomInfo(game.ChildGameType.QYNN, index);
	}



	public onBackHall() {
		egret.Tween.get(this).to({ x: this.width }, 500, egret.Ease.cubicOut);
		game.AppFacade.instance.sendNotification(PanelNotify.BACK_HALL);
		PopUpManager.removePopUp(this);
	}

}