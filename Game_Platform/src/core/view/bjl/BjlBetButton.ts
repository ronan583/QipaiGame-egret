module game.bjl {
	export class BjlBetButton extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}


		private _selectedState : boolean;
		public get selectedState()
		{
			return this._selectedState;
		}
		public betImage : eui.Image;
		public numLabel : eui.Label;

		public value : number;
		public type : number;
		public playerId : number;
		public index:number;

		private flagImg:eui.Image;
		public defaultY:number;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.addEventListener(egret.TouchEvent.TOUCH_TAP , this.OnTap , this);
		}

		public bindFlagImg(img:eui.Image) {
			this.flagImg = img;
		}

		public randomRotation() {
			this.betImage.anchorOffsetX = this.betImage.width / 2;
			this.betImage.anchorOffsetY = this.betImage.height / 2;
			this.betImage.x = this.betImage.width / 2;
			this.betImage.y = this.betImage.width / 2;
			this.betImage.rotation = Math.random() * 360;
		}

		public showButton(gameLevel : number , value : number)
		{
			if(gameLevel == 0)
			{
				gameLevel = 2;
			}
			this.betImage.source = "bjlGame_json.level" + gameLevel + "_chip_" + value;
		}
		public showButtonLittle(gameLevel : number , value : number)
		{
			if(!this.betImage) {
				// 延迟一帧处理
				CommonUtil.setNextFrameCall(()=>{
					this.showButtonLittle(gameLevel, value);
				}, this);
			} else {
				if(gameLevel == 0)
				{
					gameLevel = 2;
				}
				this.betImage.width = 47;
				this.betImage.height = 47;
				this.betImage.source = "level" + gameLevel + "_chip_" + value + "_little_n";
			}
			this.width =47;
			this.height = 47;
			this.anchorOffsetX = this.width / 2;
			this.anchorOffsetY = this.height / 2;
		}

		public OnTap()
		{
			if(!this.selectedState)
			{
				
			}else
			{
				this._selectedState = false;
				this.betImage.filters = [];
			}
		}

		public openLight()
		{
			this._selectedState = true;
			var color:number = GameConst.getBjlBetColor(this.index);        /// 光晕的颜色，十六进制，不包含透明度
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

		public recovery() {
			CommonUtil.removeTimeout(this);
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({y:this.defaultY},150);
			CommonUtil.registerTimeOut(()=>{
				this.closeLight();
				// this.flagImg.visible = false;
			}, this, 75);
		}

		public lightMove() {
			CommonUtil.removeTimeout(this);
			egret.Tween.removeTweens(this);
			egret.Tween.get(this).to({y:this.defaultY - 10},150);
			CommonUtil.registerTimeOut(()=>{
				this.openLight();
				// this.flagImg.visible = true;
			}, this, 75);
		}

		public closeLight()
		{
			this._selectedState = false;
			this.betImage.filters = [];
		}

		// public enable
		public cloneBet(betBtn : BjlBetButton)
		{
				// betBtn.parent.addChild(this);
				this.enabled = betBtn.enabled;
				this.scaleX = betBtn.scaleX;
				this.scaleY = betBtn.scaleY;
				// this.x = betBtn.x;
				// this.y = betBtn.y;
				this.currentState = betBtn.currentState;
				this.anchorOffsetX = betBtn.anchorOffsetX;
				this.anchorOffsetY = betBtn.anchorOffsetY;
				this.value = betBtn.value;
				this.type = betBtn.type;
				this.playerId = betBtn.playerId;

				this.openLight();
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
	}
}