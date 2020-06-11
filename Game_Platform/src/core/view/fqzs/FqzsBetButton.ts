module game.fqzs {
	export class FqzsBetButton extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		public static COLOR_DEFINE:Array<number> = [0xedb963, 0xffd288, 0xc9de36, 0x6bcf10, 0x16b760, 0x13daf1]

		private _selectedState: boolean;
		public get selectedState() {
			return this._selectedState;
		}
		public betImage: eui.Image;
		public numLabel: eui.Label;

		public betNum: number;
		public type: number;
		public playerId: number;
		public defaultY:number;
		public index:number = 0;

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTap, this);
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
				this.betImage.width = 42;
				this.betImage.height = 44;
				this.betImage.source = "fqzs_battle_json.level" + gameLevel + "_chip_" + value + "_little";

			}
			this.width = 42;
			this.height = 44;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}

		public OnTap() {
			if (!this.selectedState) {

			} else {
				this._selectedState = false;
				this.betImage.filters = [];
			}
		}

		public showButton(betSource) {
			this.betImage.source = betSource;
		}

		public openLight() {
			this._selectedState = true;
			var color: number = FqzsBetButton.COLOR_DEFINE[this.index - 1];/// 光晕的颜色，十六进制，不包含透明度
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

		private _canChoose = false;
		public set canChoose(value:boolean) {
			this.enabled = value;
			if(!value) {
				this.alpha = 0.5;
				this.recovery();
			} else {
				this.alpha = 1;
			}
			this._canChoose = value;
		}

		public get canChoose():boolean {
			return this._canChoose;
		}
		public recovery() {
			CommonUtil.removeTimeout(this);
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({y:this.defaultY},150);
			CommonUtil.registerTimeOut(()=>{
				this.closeLight();
			}, this, 75);
		}

		public lightMove() {
			CommonUtil.removeTimeout(this);
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({y:this.defaultY - 10},150);
			CommonUtil.registerTimeOut(()=>{
				this.openLight();
			}, this, 75);
		}
	}
}