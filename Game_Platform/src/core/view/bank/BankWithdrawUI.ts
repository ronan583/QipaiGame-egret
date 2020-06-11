module game {
    export class BankWithdrawUI extends ResizePanel {
        public constructor(gameType: game.ChildGameType) {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.gameType = gameType;
            switch (gameType) {
                case game.ChildGameType.FRUIT:
                    this.skinName = "resource/eui_skins/bank/FruitBankUI.exml";
                    break;
                case game.ChildGameType.BJL:
                    this.skinName = "resource/eui_skins/bank/BjlBankUI.exml";
                    break;
                case game.ChildGameType.ZJH:
                    this.skinName = "resource/eui_skins/bank/ZjhBankUI.exml";
                    break;
                case game.ChildGameType.QYNN:
                    this.skinName = "resource/eui_skins/bank/QznnBankUI.exml";
                    break;
                case game.ChildGameType.DDZ:
                    this.skinName = "resource/eui_skins/bank/DdzBankUI.exml";
                    break;
                case game.ChildGameType.BRNN:
                    this.skinName = "resource/eui_skins/bank/BrnnBankUI.exml";
                    break;
                case game.ChildGameType.LHDZ:
                    this.skinName = "resource/eui_skins/bank/LhdzBankUI.exml";
                    break;
                case game.ChildGameType.PDK:
                    this.skinName = "resource/eui_skins/bank/PdkBankUI.exml";
                    break;
                case game.ChildGameType.ERMJ:
                    this.skinName = "resource/eui_skins/bank/ErmjBankUI.exml";
                    break;
                case game.ChildGameType.HHDZ:
                    this.skinName = "resource/eui_skins/bank/HhdzBankUI.exml";
                    break;
                case game.ChildGameType.TGPD:
                    this.skinName = "resource/eui_skins/bank/TgpdBankUI.exml";
                    break;
                case game.ChildGameType.DUOBAO:
                    this.skinName = "resource/eui_skins/bank/DUOBAOBankUI.exml";
                    break;
                case game.ChildGameType.DZPK:
                    this.skinName = "resource/eui_skins/bank/DzpkBankUI.exml";
                    break;
                case game.ChildGameType.DiceBao:
                    this.skinName = "resource/eui_skins/bank/HlsbBankUI.exml";
                    break;
                case game.ChildGameType.BCBM:
                    this.skinName = "resource/eui_skins/bank/BcbmBankUI.exml";
                    break;
                case game.ChildGameType.FQZS:
                    this.skinName = "resource/eui_skins/bank/FqzsBankUI.exml";
                    break;
                case game.ChildGameType.BY:
                    this.skinName = "resource/eui_skins/bank/ByBankUI.exml";
                    break;
            }
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closebtn: eui.Image;
        private slider: eui.HSlider;
        private progressbar: eui.ProgressBar;
        private drawBtn: eui.Button;
        private bankMoney: eui.Label;
        private curMoney: eui.Label;
        private drawMoneyLabel: eui.EditableText;
        private maxBtn: eui.Button;
        private data: any;

        private gameType: game.ChildGameType;

        protected childrenCreated(): void {
            super.childrenCreated();
            this.closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.maxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMax, this);
            this.drawBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDraw, this);
            this.slider.addEventListener(eui.UIEvent.CHANGE, this.onSliderChange, this);
            this.slider.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSliderChange, this);
            this.drawMoneyLabel.addEventListener(egret.TouchEvent.CHANGE, this.onInputChange, this)
        }

        protected addToStage() {
            super.addToStage();
            this.refresh();
            egret.setTimeout(() => {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
            }, this, 100);
        }

        private removeFromStage() {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageClick, this);
        }

        private stageClick(e: egret.TouchEvent) {
            if (!this.hitTestPoint(e.stageX, e.stageY, true)) {
                PopUpManager.removePopUp(this);
            }
        }

        private onMax() {
            this.drawMoneyLabel.text = this.slider.maximum.toFixed(0);
            this.progressbar.value = this.slider.value = Number(this.drawMoneyLabel.text);
        }

        private onSliderChange() {
            this.progressbar.value = this.slider.value;
            this.drawMoneyLabel.text = this.slider.value.toFixed(0);
        }

        private onInputChange(event: eui.UIEvent) {
            var changeNum = Number(this.drawMoneyLabel.text);
            this.drawMoneyLabel.text = changeNum.toString();
            if (changeNum <= 0) {
                this.drawMoneyLabel.text = "0";
                return;
            }
            if (!RegUtils.isNumber(this.drawMoneyLabel.text)) {
                this.drawMoneyLabel.text = "0";
                return;
            }

            if (changeNum > game.UserService.instance.bankMoney) {
                changeNum = Math.floor(game.UserService.instance.bankMoney);
                this.drawMoneyLabel.text = changeNum.toString();
            }

            this.progressbar.value = this.slider.value = Number(this.drawMoneyLabel.text);
        }

        private onDraw() {
            var opratorNum = Number(this.drawMoneyLabel.text);
            if (opratorNum == 0) {
                return;
            }
            // 先判断游戏类型 有些游戏需要特殊处理
            if (this.gameType == game.ChildGameType.DZPK) {
                let battleData = game.dzpk.TexasBattleData.getInstance();
                if (battleData && battleData.isStart) {
                    let player = battleData.getPlayer(UserService.instance.playerId);
                    if (player && player.playType != game.dzpk.PlayType.WATCH) {
                        TipsUtils.showTipsFromCenter("游戏过程中无法取款，请在本局游戏结束后取款");
                        return;
                    }
                    if (player) {
                        let maxMoney = game.GameRuleData.Instance.getMaxMoney(ChildGameType.DZPK, RoomManager.getInstance().curRoomData.gameLevel);
                        if (maxMoney < (player.money + opratorNum)) {
                            // 金额超出
                            opratorNum = maxMoney - player.money;
                        }
                        if (opratorNum < 0) {
                            TipsUtils.showTipsFromCenter("携带金额已经超出限制，无法进行取款");
                            return;
                        }
                    }
                }
            }
            if (this.gameType == game.ChildGameType.DDZ) {
                let battleData = game.ddz.DDZBattleData.getInstance();
                if (battleData && battleData.isInbattle) {
                    TipsUtils.showTipsFromCenter("游戏过程中无法取款，请在本局游戏结束后取款");
                    return;
                }
            }
            if (this.gameType == game.ChildGameType.PDK) {
                let battleData = game.pdk.PDKBattleData.getInstance();
                if (battleData && battleData.isInbattle) {
                    TipsUtils.showTipsFromCenter("游戏过程中无法取款，请在本局游戏结束后取款");
                    return;
                }
            }
            if (this.gameType == game.ChildGameType.ERMJ) {
                let curRoomData: RoomData = RoomManager.getInstance().curRoomData;
                if (curRoomData.status == GameStatus.RUNNING) {
                    TipsUtils.showTipsFromCenter("游戏过程中无法取款，请在本局游戏结束后取款");
                    return;
                }
            }
            console.error("opratorNum is ", opratorNum);
            UserRequest.sendOperatorMoney(BankType.get, opratorNum);
            PopUpManager.removePopUp(this);
        }

        public refresh() {
            let user = UserService.instance;
            this.bankMoney.text = user.bankMoney.toFixed(2);
            this.curMoney.text = user.money.toFixed(2);
            this.progressbar.minimum = this.slider.minimum = 0;
            this.progressbar.maximum = this.slider.maximum = user.bankMoney;
            this.slider.value = this.progressbar.value = 0;
            this.drawMoneyLabel.text = "0";
        }

        private onClose() {
            PopUpManager.removePopUp(this);
        }

    }
}
