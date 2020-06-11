module game.hhdz {
	export class HhdzBetButton extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/hhdz/HhdzBetButtonSkin.exml";
		}

		public betImage: eui.Image;
		public lightImg: eui.Image;
		public darkImg: eui.Image;
		private _betMoney: number = 0;
		private _isCleck: boolean = true;
		public gameLevel:number = 0;
		public index:number = 0;

		public defaultY:number ;

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated() {
			super.childrenCreated();
			this.defaultY = this.betImage.y;
		}

		//设置筹码数量
		public updateBetImg(gameLevel: number, bet: number): void {
			this.betImage.source = "hhdz_bet_max_" + gameLevel + "_" + this.name;
			this._betMoney = bet;
		}

		//设置是否选择 true 选择 fasle 未选中
		public updateSelectImg(isSelect: boolean): void {
			this.lightImg.visible = isSelect;
		}

		//设置是否可以点击 true 不可以 fasle 可以
		public updateDarkImg(isDark: boolean): void {
			this.darkImg.visible = isDark;
			this._isCleck = !isDark;
		}

		private _canChoose = true;
		public set canChoose(value:boolean) {
			this.enabled = value;
			this.updateDarkImg(!value);
			if(!value) {
				this.recovery();
			}
		}

		public get canChoose():boolean {
			return this._canChoose;
		}

		get betMoney() {
			return this._betMoney;
		}
		get isCleck() {
			return this._isCleck;
		}
		get type() {
			return Number(this.name);
		}

		public recovery() {
			CommonUtil.removeTimeout(this);
			egret.Tween.removeTweens(this.betImage);
			egret.log("恢复到位置 ： " + this.defaultY)
			egret.Tween.get(this.betImage).to({y:this.defaultY},150);
			CommonUtil.registerTimeOut(()=>{
				this.closeLight();
			}, this, 75);
		}

		public lightMove() {
			CommonUtil.removeTimeout(this);
			egret.Tween.removeTweens(this.betImage);
			egret.Tween.get(this.betImage).to({y:this.defaultY - 10},150);
			CommonUtil.registerTimeOut(()=>{
				this.openLight();
			}, this, 75);
		}

		public openLight()
		{
			var color:number = game.GameConst.getHhdzChipFilterColor(this.index);//0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
			var alpha:number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
			var blurX:number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
			var blurY:number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
			var strength:number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			var quality:number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			var inner:boolean = false;            /// 指定发光是否为内侧发光，暂未实现
			var knockout:boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
			var glowFilter:egret.GlowFilter = new egret.GlowFilter( color, alpha, blurX, blurY,
				strength, quality, inner, knockout );
			this.betImage.filters = [glowFilter];
		}

		public closeLight()
		{
			this.betImage.filters = [];
		}
	}
}