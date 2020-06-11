module game {
    export class ZjcxUI extends ResizePanel {
        public constructor(gameType: game.ChildGameType) {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            switch (gameType) {
                case game.ChildGameType.BJL:
                    this.skinName = "resource/eui_skins/zjcx/BjlZJ.exml";
                    break;
                case game.ChildGameType.BRNN:
                    this.skinName = "resource/eui_skins/zjcx/BrnnZJ.exml";
                    break;
                case game.ChildGameType.BCBM:
                    this.skinName = "resource/eui_skins/zjcx/BcbmZJ.exml";
                    break;
                case game.ChildGameType.FQZS:
                    this.skinName = "resource/eui_skins/zjcx/FqzsZJ.exml";
                    break;
                case game.ChildGameType.HHDZ:
                    this.skinName = "resource/eui_skins/zjcx/HongHeiZJ.exml";
                    break;
                case game.ChildGameType.LHDZ:
                    this.skinName = "resource/eui_skins/zjcx/LongHuZJ.exml";
                    break;
                case game.ChildGameType.DDZ:
                    this.skinName = "resource/eui_skins/zjcx/DdzZJ.exml";
                    break;
                case game.ChildGameType.DiceBao:
                    this.skinName = "resource/eui_skins/zjcx/TbZJ.exml";
                    break;
                case game.ChildGameType.DZPK:
                    this.skinName = "resource/eui_skins/zjcx/DzpkZJ.exml";
                    break;
                case game.ChildGameType.ERMJ:
                    this.skinName = "resource/eui_skins/zjcx/ErmjZJ.exml";
                    break;
                case game.ChildGameType.PDK:
                    this.skinName = "resource/eui_skins/zjcx/PdkZJ.exml";
                    break;
                case game.ChildGameType.QYNN:
                    this.skinName = "resource/eui_skins/zjcx/QznnZJ.exml";
                    break;
                case game.ChildGameType.ZJH:
                    this.skinName = "resource/eui_skins/zjcx/ZjhZJ.exml";
                    break;
            }
            CommonUtil.bindOtherAreaTouchClose(this);
        }


        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        private closeBtn: IButton;
        private scroller: eui.Scroller;
        public viewport: eui.Group;

        private data: any;

        protected childrenCreated(): void {
            super.childrenCreated();
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            if (this.scroller.horizontalScrollBar != null) {
                this.scroller.horizontalScrollBar.autoVisibility = false;
                this.scroller.horizontalScrollBar.visible = false;
                this.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            if (this.scroller.verticalScrollBar != null) {
                this.scroller.verticalScrollBar.autoVisibility = false;
                this.scroller.verticalScrollBar.visible = false;
            }
            this.scroller.skewX = 0;
        }

        private stageClick(e: egret.TouchEvent) {
            if (!this.hitTestPoint(e.stageX, e.stageY, true)) {
                PopUpManager.removePopUp(this);
            }
        }

        private onClose(): void {
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_ZJCX_UI);
        }

        public showGameZJCX(data): void {
            //-----------
            // data = this.testErmjData;
            //-----------
            var recordInfos = data.recordInfo;
            this.viewport.removeChildren();
            switch (data.gameType) {
                case game.ChildGameType.FRUIT:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar: SgjRecordBar = new SgjRecordBar();
                        recordBar.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar);
                    }
                    break;
                case game.ChildGameType.BCBM:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar16: BcbmRecordBar = new BcbmRecordBar();
                        recordBar16.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar16);
                        this.scroller.skewX = 15;
                        recordBar16.skewX = -15;
                    }
                    break;
                case game.ChildGameType.FQZS:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar17: FqzsRecordBar = new FqzsRecordBar();
                        recordBar17.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar17);
                    }
                    break;
                case game.ChildGameType.BJL:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar1: BjlRecordBar = new BjlRecordBar();
                        recordBar1.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar1);
                    }
                    break;
                case game.ChildGameType.ZJH:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar2: ZjhRecordBar = new ZjhRecordBar();
                        recordBar2.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar2);
                    }
                    break;
                case game.ChildGameType.DZPK:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar21: DzpkRecordBar = new DzpkRecordBar();
                        recordBar21.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar21);
                    }
                    break;
                case game.ChildGameType.QYNN:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar3: QznnRecordBar = new QznnRecordBar();
                        var detail = JSON.parse(recordInfos[i].recordInfo);
                        recordBar3.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar3);
                    }
                    break;
                case game.ChildGameType.DDZ:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar4: DdzRecordBar = new DdzRecordBar();
                        recordBar4.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar4);
                    }
                    break;
                case game.ChildGameType.BRNN:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar5: BrnnRecordBar = new BrnnRecordBar();
                        recordBar5.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar5);
                    }
                    break;
                case game.ChildGameType.LHDZ:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar6: LongHuRecordBar = new LongHuRecordBar();
                        recordBar6.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar6);
                    }
                    break;
                case game.ChildGameType.PDK:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar7: PdkRecordBar = new PdkRecordBar();
                        recordBar7.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar7);
                    }
                    break;
                case game.ChildGameType.ERMJ:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar8: ErmjRecordBar = new ErmjRecordBar();
                        recordBar8.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar8);
                    }
                    break;
                case game.ChildGameType.HHDZ:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar9: HongHeiRecordBar = new HongHeiRecordBar();
                        recordBar9.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar9);
                    }
                    break;
                case game.ChildGameType.TGPD:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar10: TgpdRecordBar = new TgpdRecordBar();
                        recordBar10.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar10);
                    }
                    break;
                case game.ChildGameType.DUOBAO:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar11: LhdbRecordBar = new LhdbRecordBar();
                        recordBar11.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar11);
                    }
                    break;
                case game.ChildGameType.DiceBao:
                    for (var i = 0; i < recordInfos.length; i++) {
                        var recordBar12: TbRecordBar = new TbRecordBar();
                        recordBar12.initData(recordInfos[i]);
                        this.viewport.addChild(recordBar12);
                    }
                    break;
            }
        }

        //-------------------------------------test
        private testQznnData: any = {
            "gameType": 2,
            "recordInfo": [
                {
                    "costMoney": 19000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"otherResult":[{"cards":[[4,18,30,42,53]],"maxCard":53,"playType":0},{"cards":[[10,18,16],[38,40]],"maxCard":40,"playType":9}],"isBanker":true,"myResult":{"cards":[[38,41,5],[47,9]],"maxCard":47,"playType":2}}'
                },
                {
                    "costMoney": -10009000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"otherResult":{"cards":[[40,47,44],[20,30]],"maxCard":47,"playType":2},"isBanker":false,"myResult":{"cards":[[9,33,55],[12,45]],"maxCard":55,"playType":3}}'
                }
            ]
        }
        private testBcbmData: any = {
            "gameType": 16,
            "recordInfo": [
                {
                    "costMoney": -11500,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"resutlType":2,"myStakeMoney":21000,"cosMoney":-11500}'
                },
                {
                    "costMoney": 722950,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":true,"resutlType":6,"allStakeMoney":1566000,"cosMoney":722950}'
                }, {
                    "costMoney": -5730000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":true,"resutlType":3,"allStakeMoney":1920000,"cosMoney":-5730000}'
                }, {
                    "costMoney": 225000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"resutlType":4,"myStakeMoney":1200000,"cosMoney":225000}'
                }
            ]
        }
        private testFqzsData: any = {
            "gameType": 17,
            "recordInfo": [
                {
                    "costMoney": -7000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"resutlType":4,"StakeMoney":140000,"cosMoney":-7000}'
                },
                {
                    "costMoney": -1499000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":true,"resutlType":3,"StakeMoney":2995000,"cosMoney":-1499000}'
                }, {
                    "costMoney": -1146000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"resutlType":5,"StakeMoney":120000,"cosMoney":165000}'
                }, {
                    "costMoney": 165000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"resutlType":4,"myStakeMoney":1200000,"cosMoney":225000}'
                }, {
                    "costMoney": 51000000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 3,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"resutlType":2,"StakeMoney":6000000,"cosMoney":51000000}'
                }
            ]
        }
        private testHhdzData: any = {
            "gameType": 7,
            "recordInfo": [
                {
                    "costMoney": 320100,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"type3":253000,"type2":252000,"heiList":[38,40,44],"heiType":2,"resutlType":2,"hongList":[22,39,42],"hongType":0,"type1":400000}'
                },
                {
                    "costMoney": -25000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":true,"type3":177000,"type2":1400000,"heiList":[33,52,54],"heiType":1,"resutlType":2,"hongList":[11,36,41],"hongType":0,"type1":1552000}'
                }, {
                    "costMoney": -2157000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":true,"type3":660000,"type2":1453000,"heiList":[19,39,59],"heiType":3,"resutlType":2,"hongList":[18,43,45],"hongType":0,"type1":1276000}'
                }, {
                    "costMoney": -1215500,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"type3":1200000,"type2":310000,"heiList":[19,22,38],"heiType":0,"resutlType":1,"hongList":[9,24,25],"hongType":1,"type1":310000}'
                }, {
                    "costMoney": -75000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 3,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"type3":500000,"type2":1500000,"heiList":[8,47,50],"heiType":0,"resutlType":2,"hongList":[9,34,36],"hongType":0,"type1":1000000}'
                }
            ]
        }
        private testBjlData: any = {
            //1.闲 2.庄 3.和 4.闲对 5.庄对
            "gameType": 11,
            "recordInfo": [
                {
                    "costMoney": -35250,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"type5":15000,"zhuangCard":[48,35],"isBanker":false,"type4":10000,"xianCard":[10,7],"type3":5000,"type2":5000,"type1":10000}'
                },
                {
                    "costMoney": -40500,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"type5":10000,"zhuangCard":[19,10],"isBanker":false,"type4":10000,"xianCard":[13,24],"type3":10000,"type2":20000,"type1":10000}'
                }, {
                    "costMoney": 1128600,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"type5":311000,"zhuangCard":[12,48,16],"isBanker":true,"type4":323000,"xianCard":[21,34,4],"type3":85000,"type2":1089000,"type1":1558000}'
                }, {
                    "costMoney": -102500,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"type5":50000,"zhuangCard":[44,14,43],"isBanker":false,"type4":50000,"xianCard":[14,35,42],"type3":0,"type2":50000,"type1":50000}'
                }, {
                    "costMoney": 3740000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 3,
                    "playerId": 776,
                    "recordInfo": '{"type5":200000,"zhuangCard":[15,13,-1],"isBanker":false,"type4":200000,"xianCard":[44,45,9],"type3":600000,"type2":800000,"type1":600000}'
                }
            ]
        }
        private testLhdzData: any = {
            "gameType": 5,
            "recordInfo": [
                {
                    "costMoney": 491150,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":true,"type3":674000,"type2":1103000,"huCard":54,"resutlType":2,"type1":946000,"longCard":32}'
                }, {
                    "costMoney": -110000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"type3":150000,"type2":200000,"huCard":37,"resutlType":2,"type1":150000,"longCard":24}'
                }, {
                    "costMoney": -107500,
                    "createTime": "12-10 16:40",
                    "gameLevel": 3,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"type3":100000,"type2":150000,"huCard":21,"resutlType":2,"type1":150000,"longCard":17}'
                }
            ]
        }
        private testZjhData: any = {
            "gameType": 1,
            "recordInfo": [
                {
                    "costMoney": 2850,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"myType":0,"handCards":[55,35,34],"totalStake":6000,"bottomBet":1000}'
                }, {
                    "costMoney": -15000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"isQi":true",winCardList":[56,32,10],"myType":0,"handCards":[53,36,18],"totalStake":20000,"winType":0}'
                }
            ]
        }
        private testDdzData: any = {
            "gameType": 3,
            "recordInfo": [
                {
                    "costMoney": -600,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"spring":0,"score":3,"isDz":true,"allMultiple":12,"boom":2,"nMMultiple":2,"publicMultiple":6,"bottomBet":50}'
                }, {
                    "costMoney": -100,
                    "createTime": "12-10 16:40",
                    "gameLevel": 3,
                    "playerId": 776,
                    "recordInfo": '{"spring":0,"score":1,"isDz":true,"allMultiple":4,"boom":2,"nMMultiple":2,"publicMultiple":2,"bottomBet":50}'
                }
            ]
        }
        private testPdkData: any = {
            "gameType": 6,
            "recordInfo": [
                {
                    "costMoney": 12350,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"spring":0,"cardNum":5,"boomCount":0,"isBaoPei":false,"bottomBet":1000,"isWin":false}'
                }, {
                    "costMoney": -12350,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"spring":0,"cardNum":5,"boomCount":0,"isBaoPei":true,"bottomBet":1000,"isWin":false}'
                }
            ]
        }
        private testBrnnData: any = {
            "gameType": 4,
            "recordInfo": [
                {
                    "costMoney": 142500,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"isBanker":false,"playerRecord0":{"card1":[24,17,44],"card2":[14,9],"stakeMoney":0,"type":5,"winMoney":0},"playerRecord1":{"card1":[7,10,20,21,36],"card2":[],"stakeMoney":0,"type":0,"winMoney":0},"playerRecord2":{"card1":[27,47,19],"card2":[15,28],"stakeMoney":40000,"type":10,"winMoney":3648000},"playerRecord3":{"card1":[48,55,52],"card2":[32,31],"stakeMoney":30000,"type":5,"winMoney":1225500},"playerRecord4":{"card1":[45,43,49],"card2":[22,13],"stakeMoney":0,"type":8,"winMoney":0}}'
                }
            ]
        }
        private testTbData: any = {
            "gameType": 15,
            "recordInfo": [
                {
                    "costMoney": -750000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 2,
                    "playerId": 776,
                    "recordInfo": '{"result":[2,1,6],"totalStake":400000,"winType":[1,9,21,41,45,49,61,62,66]}'
                }
            ]
        }
        private testErmjData: any = {
            "gameType": 9,
            "recordInfo": [
                {
                    "costMoney": 10450,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"huCard":18,"totalFan":18,"fallCards":[27,27,27,11,11,11],"handCards":[16,16,18,18,18,19,19,19],"bottomBet":5000}'
                },{
                    "costMoney": -11000,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"totalFan":18,"fallCards":[26,26,26,12,12,12],"handCards":[13,14,15,15,17,22,22],"bottomBet":5000}'
                },{
                    "costMoney": 0,
                    "createTime": "12-10 16:40",
                    "gameLevel": 1,
                    "playerId": 776,
                    "recordInfo": '{"totalFan":18,"fallCards":[26,26,26,12,12,12],"handCards":[13,14,15,15,17,22,22],"bottomBet":5000}'
                }
            ]
        }
        //-------------------------------------test
    }
}
