module game {

    export class GameRuleItem {
        public gameType:number = 0;
        public gameLevel:number = 0;
        public minMoney:number = 0;
        public maxMoney:number = 0;
        public bottomBet:number = 0;
    }

    export class GameRuleData {
        constructor() {

        }

        private static _instance:GameRuleData;

        public static get Instance():GameRuleData {
            if(!GameRuleData._instance) {
                GameRuleData._instance = new GameRuleData();
            }
            return GameRuleData._instance;
        }

        private gameRuleItems:Array<GameRuleItem> = [];

        public setData(data:any) {
            this.gameRuleItems = [];
            for(let d of data.ruleInfo) {
                let item:GameRuleItem = new GameRuleItem();
                item.gameLevel = d.gameLevel;
                item.gameType = d.gameType;
                item.minMoney = d.minMoney / 1000;
                item.maxMoney = d.maxMoney / 1000;
                item.bottomBet = d.bottomBet;
                this.gameRuleItems.push(item);
            }
        }

        public getGameRuleItems(gameType:ChildGameType):Array<GameRuleItem> {
            let ret = [];
            for(let item of this.gameRuleItems) {
                if(item.gameType == gameType) {
                    ret.push(item);
                }
            }
            return ret;
        }

        public getMinMoney(gameType:game.ChildGameType, gameLevel:number) {
            for(let item of this.gameRuleItems) {
                if(item.gameType == gameType && item.gameLevel == gameLevel) {
                    return item.minMoney;
                }
            }
            return 0;
        }

        public getMaxMoney(gameType:game.ChildGameType, gameLevel:number) {
            for(let item of this.gameRuleItems) {
                if(item.gameType == gameType && item.gameLevel == gameLevel) {
                    return item.maxMoney;
                }
            }
            return 0;
        }
    }
}