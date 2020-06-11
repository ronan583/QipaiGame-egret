class PDKOperTip extends eui.Component implements eui.UIComponent {
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.tipImg.source = "";
	}

	public tipImg: eui.Image;

	public clear(): void {
		this.tipImg.source = "";
	}

	public showScoreTip(score: number) {
		if (score == 0) {
			this.tipImg.source = "ddz_pass_lord";
		} else if (score == 1) {
			this.tipImg.source = "ddz_rate1";
		} else if (score == 2) {
			this.tipImg.source = "ddz_rate2";
		} else if (score == 3) {
			this.tipImg.source = "ddz_rate3";
		}
	}

	public showMultiTip(multi: number) {
		if (multi == 1) {
			this.tipImg.source = "ddz_no_double";
		} else if (multi == 2) {
			this.tipImg.source = "ddz_double";
		}
	}

	public showDonot(): void {
		this.tipImg.source = "pdk_pass_card_tips";
	}

}