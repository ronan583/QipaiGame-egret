module game.lhdz {
	export class LhdzBetButton extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		private _selectedState: boolean;
		public get selectedState() {
			return this._selectedState;
		}
		public betImage: eui.Image;
		public numLabel: eui.Label;

		public betNum: number;
		public type: number;
		public playerId: number;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
		}

		public OnTap() {
			if (!this.selectedState) {

			} else {
				this._selectedState = false;
				this.betImage.filters = [];
			}
		}

		public randomRotation() {
			this.betImage.anchorOffsetX = this.betImage.width / 2;
			this.betImage.anchorOffsetY = this.betImage.height / 2;
			this.betImage.x = this.betImage.width / 2;
			this.betImage.y = this.betImage.width / 2;
			this.betImage.rotation = Math.random() * 360;
		}

		public showLittleButton(gameLevel: number, value: number) {
			if (!this.betImage) {
				// 延迟一帧处理
				CommonUtil.setNextFrameCall(() => {
					this.showLittleButton(gameLevel, value);
				}, this);
			} else {
				this.betImage.width = 60;
				this.betImage.height = 60;
				this.betImage.source = "lhdz_battle_json.level" + gameLevel + "_chip_" + value + "_little";
			}
			this.width = 60;
			this.height = 60;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}

		public showButton(betSource) {
			this.betImage.source = betSource;
		}

		public openLight(index) {
			this._selectedState = true;
			var colorArr = [0xfde178, 0xff994a, 0xe1eb64, 0x98f375, 0x7ef6e5, 0xd28dfb]
			var indexs = index != null ? index : 0
			var color: number = colorArr[indexs];/// 光晕的颜色，十六进制，不包含透明度
			var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
			var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
			var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
			var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
				strength, quality, inner, knockout);
			this.betImage.filters = [glowFilter];
			this.betImage.y = -10;
		}

		public closeLight() {
			this._selectedState = false;
			this.betImage.filters = [];
			this.betImage.y = 0;
		}

		public set canChoose(value: boolean) {
			this.enabled = value;
			if (!value) {
				this.alpha = 0.5;
				this.closeLight();
			} else {
				this.alpha = 1;
			}
			// console.log("按钮状态设置为" + value)
		}
	}
}