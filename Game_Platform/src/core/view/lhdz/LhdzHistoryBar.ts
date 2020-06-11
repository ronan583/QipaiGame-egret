module game.lhdz {
	export class LhdzHistoryBar extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public resultGroup: eui.Group;
		public banker: eui.Image;
		public boomAnim: game.CommonDB;
		public gold: eui.Label;
		public playerName: eui.Label;
		public betNum: eui.BitmapLabel;
		public vip: eui.BitmapLabel;
		public upBetBtn: IButton;
		public downBetBtn: IButton;
		public historyBtn: IButton;

		private bankerGroup: eui.Group;
		private isShow:boolean = false;
		public loseTip: eui.Group;
		public winTip: eui.Group;
		public loseTipLabel: eui.Label;
		public winTipLabel: eui.Label;
		private targetPos:eui.Group;
		private _curShowResults:Array<number> = [];

		protected childrenCreated(): void {
			super.childrenCreated();
			this.upBetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpBet, this);
			this.downBetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDownBet, this);
			this.historyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHistory, this);
			this.bankerGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBanker, this);
		}

		public onUpBet() {
			if (LhdzData.selfTotolMoney < LhdzData.bankerUpMoneyLimit) {
				TipsUI.showTips({
					"text": "您的余额不足,无法上庄,上庄条件:" + LhdzData.bankerUpMoneyLimit + "元",
					"callback": () => {
						game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_CHARGE_PANEL);
					},
					"callbackObject": this,
					"okBitmapLabelPath": "bt_charge_now_png",
					"tipsType": TipsType.OnlyOk,
					"effectType": 0
				})
				return;
			}
			if (LhdzData.isSelfBanker()) {
				CommonUtil.noticeMsg("已是庄家，不能上庄！");
				return;
			}

			LhdzRequest.requestUpBanke(1);
		}

		public isDownOper: boolean = false;
		public onDownBet() {
			this.isDownOper = true;
			LhdzRequest.requestDownBanke(1);
		}

		//设置上庄
		public setUpBanker(valuer) {
			this.upBetBtn.visible = valuer;
			this.downBetBtn.visible = !valuer;
		}

		public onHistory() {
			AppFacade.instance.sendNotification(PanelNotify.OPEN_LHDZ_HISTORY_UI);
		}

		public updateBanker(lhdzPlayer) {
			this.vip.text = lhdzPlayer.vipLevel;
			this.gold.text = CommonUtil.fixMoneyFormat(lhdzPlayer.money);
			this.playerName.text = lhdzPlayer.nickName;
		}

		public updateBankerMoney(money:number) {
			this.gold.text = CommonUtil.fixMoneyFormat(money);
		}

		public updateUpBankerNum(valuer) {
			this.betNum.text = valuer + 'r';
		}

		private getLastImg():eui.Image {
			let lastImg = null;
			for(let i=0;i<this.resultGroup.numChildren - 1;i++) {
				if(!this.resultGroup.getChildAt(i).visible) {
					lastImg =  this.resultGroup.getChildAt(i)
				}
			}
			if(!lastImg) lastImg = this.resultGroup.getChildAt(this.resultGroup.numChildren - 1);
			return lastImg;
		}

		public getBoomAnimPos(): egret.Point {
			let img = this.getLastImg();
			return img.localToGlobal(img.width / 2, img.height / 2);
		}

		public showBoomAnim() {
			this.boomAnim = new game.CommonDB("lhd_xdbz_ske_dbbin", "lhd_xdbz_tex_json", "lhd_xdbz_tex_png", "animation", 1500);
			this.addChild(this.boomAnim);
			let p = this.getBoomAnimPos();
			p = this.globalToLocal(p.x, p.y);
			this.boomAnim.x = p.x;
			this.boomAnim.y = p.y;
		}

		public showHistoryNew(data) {
			for(let i=0;i < this.resultGroup.numChildren;i++) {
				this.resultGroup.getChildAt(i).visible = false;
			}
			this._curShowResults = [];
			let startIndex = 0;
			let endIndex = data.winType.length;
			if (data.winType.length > 11) {
				endIndex = data.winType.length;
				startIndex = data.winType.length - 11;
			}
			for (let i = startIndex; i < endIndex; i++) {
				let img = <eui.Image> this.resultGroup.getChildAt(i - startIndex)
				img.visible = true;
				if (data.winType[i] == 1) {
					img.source = "lhdz_battle_json.lhdz_dragon";
				}
				else if (data.winType[i] == 2) {
					img.source = "lhdz_battle_json.lhdz_tiger";
				} else {
					img.source = "lhdz_battle_json.lhdz_draw";
				}
				this._curShowResults.push(data.winType[i]);
			}
		}

		public prepareForResult() {
			if(this._curShowResults.length != 11) return; 
			for(let i=0;i < this.resultGroup.numChildren;i++) {
				this.resultGroup.getChildAt(i).visible = false;
			}
			// 往左边挪一格
			for(let i=1;i<this._curShowResults.length;i++) {
				let img = <eui.Image> this.resultGroup.getChildAt(i - 1)
				img.visible = true;
				if (this._curShowResults[i] == 1) {
					img.source = "lhdz_battle_json.lhdz_dragon";
				}
				else if (this._curShowResults[i] == 2) {
					img.source = "lhdz_battle_json.lhdz_tiger";
				} else {
					img.source = "lhdz_battle_json.lhdz_draw";
				}
			}
		}

		public showHistory(data, play = false) {
			var img: eui.Image;
			this.resultGroup.removeChildren();
			var startIndex = 0;
			var endIndex = data.winType.length;
			if (data.winType.length > 11) {
				endIndex = data.winType.length;
				startIndex = data.winType.length - 10;
			}
			for (var i = startIndex; i < endIndex; i++) {
				img = new eui.Image;
				if (data.winType[i] == 1) {
					img.source = "lhdz_battle_json.lhdz_dragon";
				}
				else if (data.winType[i] == 2) {
					img.source = "lhdz_battle_json.lhdz_tiger";
				} else {
					img.source = "lhdz_battle_json.lhdz_draw";
				}
				this.resultGroup.addChild(img);
			}
		}

		public onBanker() {
			let p = this.banker.localToGlobal(
				this.banker.width,
				this.banker.height)
			let roomData = RoomManager.getInstance().curRoomData;
			game.AppFacade.getInstance().sendNotification(PanelNotify.DESIDE_BANKERLIST_POS, { pos: p, gameType: roomData.gameType });
		}

		public showWin(win: number): void {
			if (this.isShow) return;
			this.isShow = true;
			this.winTip.visible = true;
			this.winTip.y = 0;
			this.winTipLabel.text = "+" + win;
			let tw: egret.Tween = egret.Tween.get(this.winTip);
			let target = this.winTip;
			tw.to({ y: -60 }, 3000, egret.Ease.sineInOut).call(() => {
				target.visible = false;
				this.isShow = false;
			}, this);
		}

		public showLose(lose: number): void {
			if (this.isShow) return;
			this.isShow = true;
			this.loseTip.visible = true;
			this.loseTip.y = 0;
			if (lose > 0) {
				this.loseTipLabel.text = "-" + lose;
			} else {
				this.loseTipLabel.text = lose + '';
			}
			let tw: egret.Tween = egret.Tween.get(this.loseTip);
			let target = this.loseTip;
			tw.to({ y: -60 }, 3000, egret.Ease.sineInOut).call(() => {
				target.visible = false;
				this.isShow = false;
			}, this);
		}
	}
}