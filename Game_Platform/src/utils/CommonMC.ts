module game {
	export class CommonMC extends eui.UILayer {
		public constructor(mcData:string, mcTxt:string, mcName:string, width:number, height:number) {
			super();
			this.mcData = mcData;
			this.mcTxt = mcTxt;
			this.mcName = mcName;
			this.customWidth = width;
			this.customHeight = height;
		}

		private mc:egret.MovieClip;
		private mcData:string;
		private mcTxt:string;
		private mcName:string;
		private customWidth:number;
		private customHeight:number;

		protected createChildren(): void {
        	super.createChildren();
			// 添加MovieClip测试
            var data = RES.getRes(this.mcData);
            var txtr = RES.getRes(this.mcTxt);
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
			
            this.mc = new egret.MovieClip(mcFactory.generateMovieClipData(this.mcName));
			this.addChild(this.mc);
            this.mc.gotoAndPlay(1);
			this.mc.play();
			this.mc.addEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);

			this.width = this.customWidth / 2;
			this.mc.y =  this.customHeight / 2;
			// game.ddz.DDZSoundPlayer.instance.playSound(game.ddz.DDZSoundType.BOMB);
		}

		public play():void {
			this.mc.gotoAndPlay(1);
		}
		
		private mcEnterFrame():void {
			if(this.mc.currentFrame >= this.mc.totalFrames) {
				// 停止播放
				this.mc.stop();
				this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);
				// 这个显示对象已经完成使命了
				this.parent.removeChild(this);
			}
		}

	}
}