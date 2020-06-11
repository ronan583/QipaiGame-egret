module game.bcbm {
	export class BcbmBetButton extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/bcbm/BcbmBetButton.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		private _selectedState: boolean;
		public get selectedState():boolean{
			return this._selectedState;
		}
		public betImage: eui.Image;
		public numLabel: eui.Label;

		public value: number;
		public type: number;
		public playerId: number;

		private cachePosX: number;
		private cachePosY: number;

		public defaultY: number;

		private colorArr: number[];

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
			this.colorArr = [0xF2A63E, 0xC43E3E, 0xC629C4, 0xE820DC, 0xC33CE0, 0x8C26C9];
		}

		public onTap(){
			console.error("---------onTap this.selectstate is ", this._selectedState);
			if(!this._selectedState){
				console.warn(1);
			}
			else{			
				console.warn(2);
				this._selectedState = false;
				this.betImage.filters = [];
			}
		}

		public showButton(betSource: string){
			this.betImage.source = betSource;
		}

		public cachePosition(){
			this.cachePosX = this.x;
			this.cachePosY = this.y;
		}

		public clearPostion(){
			this.cachePosX = NaN;
			this.cachePosY = NaN;
		}

		public setPosToCache(){
			this.x = this.cachePosX;
			this.y = this.cachePosY;
		}

		public randomRotation() {
			this.betImage.anchorOffsetX = this.betImage.width / 2;
			this.betImage.anchorOffsetY = this.betImage.height / 2;
			this.betImage.x = this.betImage.width / 2;
			this.betImage.y = this.betImage.width / 2;
			this.betImage.rotation = Math.random() * 360;
		}
		
		public openLight(index: number){
			egret.Tween.removeTweens(this);
			this._selectedState = true;
			let color: number = this.colorArr[index];
			let alpha: number = 0.8;
			let blurX: number = 35;
			let blurY: number = 35;
			var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
			var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
			var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
			var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
			let glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
			this.betImage.filters = [glowFilter];
			egret.Tween.get(this).to({y: this.defaultY - 7}, 100);
		}
		public closeLight(){
			egret.Tween.removeTweens(this);
			this._selectedState = false;
			this.betImage.filters = [];
			egret.Tween.get(this).to({y: this.defaultY}, 100);
		}
		public set canChoose(value: boolean){
			this.enabled = value;
			if(!value){
				this.alpha = 0.5;
				this.closeLight();
			}else{
				this.alpha = 1;
			}
		}
	}
}