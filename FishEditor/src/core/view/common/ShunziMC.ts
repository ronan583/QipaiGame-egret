module game {
	export class ShunziMC extends eui.UILayer {
		private childGameType:ChildGameType;
		public constructor(childGameType:ChildGameType) {
			super();
			this.childGameType = childGameType;
		}

		private mc:egret.MovieClip;

		protected createChildren(): void {
        	super.createChildren();
			// 添加MovieClip测试
			let mcJosnStr:string = "shunzi_mc_json";
			let texPngStr:string = "shunzi_tex_png"; 
			if(this.childGameType == ChildGameType.PDK) {
				mcJosnStr = "shunzi_mc_json";
				texPngStr = "shunzi_tex_png";
			}
            var data = RES.getRes(mcJosnStr);
            var txtr = RES.getRes(texPngStr);
            var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
			
			this.mc = new egret.MovieClip(mcFactory.generateMovieClipData("shunzi"));
			this.mc.gotoAndPlay(1);
			this.mc.play();
			this.addChild(this.mc);
			this.width = 300;
			this.mc.y = 110;

			this.mc.addEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);

		}
		
		private mcEnterFrame():void {
			if(this.mc.currentFrame >= 17) {
				// 停止播放
				this.mc.stop();
				this.mc.removeEventListener(egret.Event.ENTER_FRAME, this.mcEnterFrame, this);
				// 这个显示对象已经完成使命了
				this.parent.removeChild(this);
			}
		}

	}
}