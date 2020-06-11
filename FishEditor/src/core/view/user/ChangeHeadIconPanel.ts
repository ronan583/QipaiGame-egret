enum changeIconType {
	head = 1,
	frame = 2
}
class ChangeHeadIconPanel extends ResizePanel implements eui.UIComponent {
	public constructor() {
		super();
		this.skinName = "resource/eui_skins/user/ChangeHeadIconPanel.exml";
		this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.createCompleteEvent, this);
	}

	public createCompleteEvent(event: eui.UIEvent): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	private iconType: changeIconType = changeIconType.head;
	public closeBtn: IButton;
	public headScroller: eui.Scroller;

	private headItems: HeadIconSelected[] = new Array();
	private headIconInit: boolean = false;
	public headGroup: eui.Group;
	public headData: Object = {
		0: { vip: 0 },
		1: { vip: 0 },
		2: { vip: 0 },
		3: { vip: 0 },
		4: { vip: 0 },
		5: { vip: 0 },
		6: { vip: 0 },
		7: { vip: 0 }
	};
	private selectedHeadIndex: number = -1;

	// public headShow: HeadShow;
	// public headRadioBtn: eui.RadioButton;
	// public headFrameRadioBtn: eui.RadioButton;
	// public frameScroller: eui.Scroller;
	// public frameGroup: eui.Group;
	// public frameData: Object = {
	// 	0: { vip: 0 },
	// 	1: { vip: 0 },
	// 	2: { vip: 1 },
	// 	3: { vip: 2 },
	// 	4: { vip: 3 },
	// 	5: { vip: 4 },
	// 	6: { vip: 5 },
	// 	7: { vip: 6 },
	// 	8: { vip: 7 },
	// 	9: { vip: 8 },
	// 	10: { vip: 9 },
	// 	11: { vip: 10 },
	// 	12: { vip: 11 },
	// 	13: { vip: 12 },
	// 	14: { vip: 13 },
	// 	15: { vip: 14 },
	// 	16: { vip: 15 }
	// };

	// private frameItems: HeadIconSelected[] = new Array();

	// private frameIconInit: boolean = false;
	// private selectedFrameIndex: number = -1;

	// private headBtn: eui.Button;
	// private headFrameBtn: eui.Button;
	// private headBright: eui.Image;
	// private headFrameBright: eui.Image;
	// private headImg: eui.Image;
	// private headFrameImg: eui.Image;


	// private showType: changeIconType = changeIconType.head;

	private refreshBtnStatus(): void {
		// if (this.showType == changeIconType.head) {
		// 	this.headFrameBright.visible = false;
		// 	this.headFrameImg.visible = false;
		// 	this.headBright.visible = true;
		// 	this.headImg.visible = true;
		// } else {
		// 	this.headBright.visible = false;
		// 	this.headImg.visible = false;
		// 	this.headFrameImg.visible = true;
		// 	this.headFrameBright.visible = true;
		// }

		// if (this.showType == changeIconType.head) {
		// 	this.headScroller.visible = true;
		// 	this.frameScroller.visible = false;
		// } else if (this.showType == changeIconType.frame) {
		// 	this.initIcon();
		// 	this.headScroller.visible = false;
		// 	this.frameScroller.visible = true;
		// }
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClosePanel, this);

		var radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
		// this.addChild(radioGroup);
		// this.headRadioBtn.group = radioGroup;
		// this.headRadioBtn.value = changeIconType.head;
		// this.headRadioBtn.addEventListener(egret.Event.CHANGE, this.onChangeRadio, this)
		// this.headFrameRadioBtn.group = radioGroup;
		// this.headFrameRadioBtn.value = changeIconType.frame;
		// this.headFrameRadioBtn.addEventListener(egret.Event.CHANGE, this.onChangeRadio, this)

		this.headScroller.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedHead, this);
		// this.frameScroller.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectedHead, this);

		// this.headBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadBtnTap, this);
		// this.headFrameBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadFrameBtnTap, this);
		// radioGroup.selectedValue = this.headRadioBtn.value;
		// this.headRadioBtn.selected = true;
		// this.setScroller(this.frameScroller);
		this.setScroller(this.headScroller);
		// this.frameScroller.visible = false;
		// this.headShow.showHead(game.UserService.instance.headNum);
		// this.headShow.showFrame(game.UserService.instance.headFrameNum);

		this.initIcon();

		// this.showType = changeIconType.head;
		this.iconType = changeIconType.head;
		this.refreshBtnStatus();
	}

	private onHeadBtnTap() {
		// this.iconType = this.showType = changeIconType.head;
		this.refreshBtnStatus();
	}

	private onHeadFrameBtnTap() {
		// this.iconType = this.showType = changeIconType.frame;
		this.refreshBtnStatus();
	}

	public initIcon() {
		var iconItem: HeadIconSelected;
		// if (this.showType == changeIconType.head) {
		if (this.headIconInit) {
			return;
		}
		this.headIconInit = true;
		for (var i = 0; i < 12; i++) {
			iconItem = new HeadIconSelected()
			iconItem.init(i, changeIconType.head, 0);
			this.headGroup.addChild(iconItem);
			this.headItems.push(iconItem);
		}
		// } else {
		// 	if (this.frameIconInit) {
		// 		return;
		// 	}
		// 	this.frameIconInit = true;
		// 	for (var i = 0; i < 17; i++) {
		// 		iconItem = new HeadIconSelected()
		// 		iconItem.init(i, changeIconType.frame, this.frameData[i].vip);
		// 		this.frameGroup.addChild(iconItem);
		// 		this.frameItems.push(iconItem);
		// 	}
		// }


	}

	public onSelectedHead(event: egret.TouchEvent) {
		if (egret.is(event.target.parent, "HeadIconSelected")) {
			// console.log(event.target);
			var headIconSelected: HeadIconSelected = event.target.parent;
			var selectedIndex;
			if (headIconSelected.needVIPLevel <= game.UserService.instance.vipLevel) {
				selectedIndex = headIconSelected.iconIndex;
				headIconSelected.selected = true;
				this.updateHeadIcon(selectedIndex, this.iconType);
				var iconArr: HeadIconSelected[];
				if (this.iconType == changeIconType.head) {
					this.selectedHeadIndex = selectedIndex;
					iconArr = this.headItems;
				} else {
					// this.selectedFrameIndex = selectedIndex;
					// iconArr = this.frameItems;
				}
				for (var i = 0; i < iconArr.length; i++) {
					if (headIconSelected != iconArr[i]) {
						iconArr[i].selected = false;
					}
				}
			}
			//@todo 显示tips
		}
	}

	public setScroller(scroller: eui.Scroller) {
		if (scroller.horizontalScrollBar != null) {
			scroller.horizontalScrollBar.autoVisibility = false;
			scroller.horizontalScrollBar.visible = false;
		}
		if (scroller.verticalScrollBar != null) {
			scroller.verticalScrollBar.autoVisibility = false;
			scroller.verticalScrollBar.visible = false;
		}
		scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
	}

	public onChangeRadio(event: egret.Event) {
		var radioButton = <eui.RadioButton>event.target;
		this.iconType = radioButton.value;
		if (this.iconType == changeIconType.head) {
			this.headScroller.visible = true;
			// this.frameScroller.visible = false;
		} else if (this.iconType == changeIconType.frame) {
			this.initIcon();
			this.headScroller.visible = false;
			// this.frameScroller.visible = true;
		}
	}

	public updateHeadIcon(iconIndex, type) {
		if (type == changeIconType.head) {
			// this.headShow.showHead(iconIndex);
		} else if (type == changeIconType.frame) {
			// this.headShow.showFrame(iconIndex);
		}
	}

	public onClosePanel(event: egret.TouchEvent) {
		if (this.selectedHeadIndex >= 0 && this.selectedHeadIndex != game.UserService.instance.headNum) {
			UserRequest.sendUpateHead(<number>changeIconType.head, this.selectedHeadIndex);
		}
		// if (this.selectedFrameIndex >= 0 && this.selectedFrameIndex != game.UserService.instance.headFrameNum) {
		// 	UserRequest.sendUpateHead(<number>changeIconType.frame, this.selectedFrameIndex);
		// }
		PopUpManager.removePopUp(this, 1);
	}
}