module game.tb {
	export class TbMenu  extends eui.Component implements eui.UIComponent{
		public constructor() {
			super();
			this.skinName='resource/eui_skins/tb/TbMenuSkin.exml';
		}

		protected partAdded(partName:string,instance:any):void
		{
			super.partAdded(partName,instance);
		}

		public menuGroup : eui.Group;
		public bankBtn : IButton;
		public backBtn : IButton;
		public settingBtn : IButton;
		public helpBtn : IButton;
		public musicOnBtn : IButton;
		public musicOffBtn : IButton;
		public effectOnBtn : IButton;
		public effectOffBtn : IButton;
		public upBtn : IButton;
		public downBtn : IButton;
		private status = false;

		private musicOn = true;
		private effectOn = true;

		protected childrenCreated():void
		{
			super.childrenCreated();
			this.downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onPopMenu , this);
			this.upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hideMenu , this);
			this.bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBankBtn , this);
			this.helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHelp , this);
			// this.historyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onHistory , this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onCheckFocus , this);
			this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackHall, this);
			this.settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onSettingTap , this);

		}

		private onSettingTap() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_SETTING_UI, game.ChildGameType.DiceBao);
		}

		private onBackHall()
		{
			if(game.RoomManager.getInstance().curRoomData.status == game.GameStatus.RUNNING) {
					TipsUI.showTips({
						"text" : "您还在游戏中，是否退出房间",
						"callback" : (data:any)=>{
							RoomRequest.leaveRoom(game.ChildGameType.DiceBao);
						},
						"callbackObject" : this,
						"effectType" : 0,
						"tipsType" : TipsType.OkAndCancel
					});
				} else {
					RoomRequest.leaveRoom(game.ChildGameType.DiceBao);
				}
		}

		private onBankBtn() {
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BANK_UI, game.ChildGameType.DiceBao);
		}
		
		public onCheckFocus(event:egret.TouchEvent)
		{
			if(!this.isThis(event.target))
			{
				this.hideMenu(event);
			}
		}

		public isThis(target)
		{
			if(!target) return false;
			if(target == this.stage)
			{
				return false;
			}
			if(target != this)
			{
				return this.isThis(target.parent);
			}else
			{
				return true;
			}
		}

		public onMusicBtn()
		{
			if(SoundMenager.instance.bgOn)
			{
				this.musicOffBtn.visible = true;
				this.musicOnBtn.visible = false;
				SoundMenager.instance.bgOn = false;
				SoundMenager.instance.setBgVolume(0);
			}else
			{
				this.musicOnBtn.visible = true;
				this.musicOffBtn.visible = false;
				SoundMenager.instance.bgOn = true;
				SoundMenager.instance.setBgVolume(1);
			}
		}

		public onEffectBtn()
		{
			if(SoundMenager.instance.effectOn)
			{
				this.effectOffBtn.visible = true;
				this.effectOnBtn.visible = false;
				SoundMenager.instance.effectOn = false;
				SoundMenager.instance.setEffectVolume(0);
			}else
			{
				this.effectOnBtn.visible = true;
				this.effectOffBtn.visible = false;
				SoundMenager.instance.effectOn = true;
				SoundMenager.instance.setEffectVolume(1);
			}
		}

		public onHelp(event)
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_HELP_UI, game.ChildGameType.DiceBao); 
		}
		
		public onHistory(event)
		{
			//
			RoomRequest.reqZJCXInfo(game.ChildGameType.DiceBao);
		}
		public onPopMenu(event)
		{
			
			
			// if(!this.status)
			// {
				// TgpdSoundPlayer.instance.playerButton();
				egret.Tween.get(this.menuGroup).to({y : 81 }, 500);
				this.status = true;
				this.upBtn.visible = true;
				this.downBtn.visible = false;
			// }
		}

		public hideMenu(event)
		{
				// TgpdSoundPlayer.instance.playerButton();
				egret.Tween.get(this.menuGroup).to({y : -this.menuGroup.height}, 500);
				this.status = false;
				this.upBtn.visible = false;
				this.downBtn.visible = true;
		}

	}
}