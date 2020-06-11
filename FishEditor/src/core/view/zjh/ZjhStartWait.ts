module game.zjh {
	export class ZjhStartWait {
		public constructor(waitForOtherPlayer:eui.Image,
							waitNextStart:eui.Image,
							waitDot1:eui.Image,
							waitDot2:eui.Image,
							waitDot3:eui.Image) {
			this.waitNextStart = waitNextStart;
			this.waitForOtherPlayer = waitForOtherPlayer;
		}
        public waitForOtherPlayer:eui.Image;
        public waitNextStart:eui.Image;
		private hideAll():void {
			this.waitForOtherPlayer.visible = false;
			this.waitNextStart.visible = false;

		}

		public showWaitNextStart():void {
			this.hideAll();
			this.waitNextStart.visible = true;
		}

		public showWaitOtherPlayer():void {
			this.hideAll();
			this.waitForOtherPlayer.visible = true;
		}

	}
}