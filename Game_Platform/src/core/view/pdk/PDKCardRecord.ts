class PDKCardRecord extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.cardCountList = [
			this.cardCount1, this.cardCount2, this.cardCount3,
			this.cardCount4, this.cardCount5, this.cardCount6, this.cardCount7, this.cardCount8,
			this.cardCount9, this.cardCount10, this.cardCount11, this.cardCount12, this.cardCount13,
		]
	}

	public cardCountList: Array<eui.BitmapLabel>;
	public cardCount1: eui.BitmapLabel;
	public cardCount2: eui.BitmapLabel;
	public cardCount3: eui.BitmapLabel;
	public cardCount4: eui.BitmapLabel;
	public cardCount5: eui.BitmapLabel;
	public cardCount6: eui.BitmapLabel;
	public cardCount7: eui.BitmapLabel;
	public cardCount8: eui.BitmapLabel;
	public cardCount9: eui.BitmapLabel;
	public cardCount10: eui.BitmapLabel;
	public cardCount11: eui.BitmapLabel;
	public cardCount12: eui.BitmapLabel;
	public cardCount13: eui.BitmapLabel;
	public recordBg: eui.Image;
	public cardCountGroup: eui.Group;

	public refresh(cardHolder: game.pdk.CardHolder): void {
		for (let i = 0; i < cardHolder.cardCountList.length; i++) {
			let count: number = cardHolder.cardCountList[i].count;
			if (this.cardCountList[i]) this.cardCountList[i].text = count.toFixed(0);
		}
	}

}

