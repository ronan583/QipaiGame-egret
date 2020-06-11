class CardRecord extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardCountList = [
			this.cardCount1, this.cardCount2, this.cardCount3, this.cardCount4, this.cardCount5,
			this.cardCount6, this.cardCount7, this.cardCount8, this.cardCount9, this.cardCount10,
			this.cardCount11, this.cardCount12, this.cardCount13, this.cardCount14, this.cardCount15,
		]
		this.recordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecordBtn, this);
	}

	private onRecordBtn(e: TouchEvent): void {
		this.recordBg.visible = !this.recordBg.visible;
		for (let cardCount of this.cardCountList) {
			cardCount.visible = !cardCount.visible;
		}
	}

	public recordBtn: eui.Button;
	public cardCountList: Array<eui.Label>;
	public cardCount1: eui.Label;
	public cardCount2: eui.Label;
	public cardCount3: eui.Label;
	public cardCount4: eui.Label;
	public cardCount5: eui.Label;
	public cardCount6: eui.Label;
	public cardCount7: eui.Label;
	public cardCount8: eui.Label;
	public cardCount9: eui.Label;
	public cardCount10: eui.Label;
	public cardCount11: eui.Label;
	public cardCount12: eui.Label;
	public cardCount13: eui.Label;
	public cardCount14: eui.Label;
	public cardCount15: eui.Label;
	public recordBg: eui.Image;
	public cardCountGroup: eui.Group;

	public refresh(cardHolder: game.ddz.CardHolder): void {
		for (let i = 0; i < cardHolder.cardCountList.length; i++) {
			let count: number = cardHolder.cardCountList[i].count;
			this.cardCountList[i].text = count.toFixed(0);
			if (count > 0) {
				this.cardCountList[i].textColor = 0x41AD30;
			} else {
				this.cardCountList[i].textColor = 0x828C81;
			}
		}
	}

}

