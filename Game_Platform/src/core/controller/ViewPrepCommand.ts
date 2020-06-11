/**
  * 注册mediator
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module game {

	export class ViewPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand {

		public constructor() {
			super();
		}
		public execute(notification: puremvc.INotification): void {
			var main = GameLayerManager.gameLayer().panelLayer;
			egret.log("ViewPrepCommand begin");
			this.facade.registerMediator(new NHallMediator())
			this.facade.registerMediator(new GameLoadMediator());
			this.facade.registerMediator(new WaitLoadingMediator());
			this.facade.registerMediator(new RegisterMediator());
			this.facade.registerMediator(new ZjhRoomMediator());
			this.facade.registerMediator(new ddz.DDZRoomMediator());
			this.facade.registerMediator(new ddz.DDZBattleMediator());
			this.facade.registerMediator(new pdk.PDKRoomMediator());
			this.facade.registerMediator(new pdk.PDKBattleMediator());
			this.facade.registerMediator(new ZjhBattleMediator());
			this.facade.registerMediator(new NoticeMediator());
			this.facade.registerMediator(new BulletinMediator());
			this.facade.registerMediator(new QynnBattleMediator());
			this.facade.registerMediator(new brnn.BrnnBattleMediator());
			this.facade.registerMediator(new dzpk.DZPKRoomMediator());
			this.facade.registerMediator(new dzpk.DZPKBattleMediator());
			this.facade.registerMediator(new game.BYBattleMediator());
			this.facade.registerMediator(new BYTestMediator());
			this.facade.registerMediator(new game.by.ByRoomMediator())
			this.facade.registerMediator(new game.by.BYChangeCanonMediator());
			this.facade.registerMediator(new game.by.BYFishBaikeMediator());
			this.facade.registerMediator(new game.sgj.SgjRoomMediator());
			this.facade.registerMediator(new game.sgj.FruitBattleMediator());
			this.facade.registerMediator(new game.sgj.FruitHelpMediator());
			this.facade.registerMediator(new game.duobao.DuoBaoBattleMediator());
			this.facade.registerMediator(new game.duobao.DBFinalMediator())
			this.facade.registerMediator(new game.duobao.DuobaoRoomMediator());
			this.facade.registerMediator(new game.duobao.DuobaoExitMediator());
			this.facade.registerMediator(new game.HelpMediator());
			this.facade.registerMediator(new game.ZjcxMediator());
			this.facade.registerMediator(new BankMediator());
			this.facade.registerMediator(new SettingMediator());
			this.facade.registerMediator(new game.tb.TbBattleMediator());
			this.facade.registerMediator(new game.tb.TbStartPanelMediator());
			this.facade.registerMediator(new BankerListMediator());
			egret.log("ViewPrepCommand end");
		}
	}
}


