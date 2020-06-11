module game {
	export class PlayerInfoPanel extends eui.Component {
		private static  _instance:PlayerInfoPanel;
		public static get Instance(): PlayerInfoPanel{
			if(PlayerInfoPanel._instance == null) {
				PlayerInfoPanel._instance = new PlayerInfoPanel();
			}
			return PlayerInfoPanel._instance;
		}

        public constructor() {
            super();
            
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "resource/eui_skins/mainPage/PlayerInfo.exml";
        }

		public headIconImg:eui.Image;
		public headFrameImg:eui.Image;
		public playerName:eui.Label;
		public location:eui.Label;
		public level:eui.Label;
		public gold:eui.BitmapLabel;
		public vipLevel:eui.BitmapLabel;

		private showParent:egret.DisplayObjectContainer;
		private arrow:number;

		private hideTimeOutId:number= 0 ;

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

		public showPlayer(data:any):void {
			if(this.hideTimeOutId > 0) egret.clearTimeout(this.hideTimeOutId);
			if(this.parent != null) this.parent.removeChild(this);
			this.headIconImg.source = "icon_" + data.headNum + "_png";
			this.headFrameImg.source = "frame_" + data.headFrameNum + "_png";
			this.playerName.text = data.nickName;
			this.vipLevel.text = data.vipLevel.toFixed(0);
			this.level.text = "Lv." + data.level.toFixed(0);
			this.gold.text = data.money.toFixed(2);
			this.location.text = data.city;
			this.showParent.addChild(this);
			if(this.arrow < 0) {
				this.left = 150;
				this.right = undefined;
			} else {
				this.right = 150;
				this.left = undefined;
			}
			this.hideTimeOutId = egret.setTimeout(()=>{
				if(this.parent != null) this.parent.removeChild(this);
				this.hideTimeOutId = 0;
            }, this, 2000);
		}

		public showPlayerInfo(playerId:number,parent:egret.DisplayObjectContainer,arrow:number):void {
			
			RoomRequest.reqPlayerInfo(playerId);
			this.showParent = parent;
			this.arrow = arrow;
		}
	}
}