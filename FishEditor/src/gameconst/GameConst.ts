module game {

	export enum CardDirection {
		FRONT, // 正面
		BACK   // 背面
	}

	export enum CardSuit {
		DIAMOND, //方块
		CLUB, // 草花
		HEART, //红桃
		SPADE, //黑桃
	}


	export enum ChildGameType {
		NONE = 0,
		ZJH = 1,
		QYNN = 2,
		DDZ = 3,
		BRNN = 4,
		LHDZ = 5,
		PDK = 6,
		HHDZ = 7,
		DZPK = 8,
		ERMJ = 9,
		BY = 10,
		BJL = 11,
		FRUIT = 12,
		TGPD = 13,
		DUOBAO = 14,
		DiceBao = 15,
		BCBM = 16,
		FQZS = 17,
	}

	export class GameIconInfo {
		public gameType:ChildGameType;
		public gameTypeRes:string;
		public showName:string;
		public constructor(gameType:ChildGameType, gameTypeRes:string, showName:string) {
			this.gameType = gameType;
			this.gameTypeRes = gameTypeRes;
			this.showName = showName;
		}
	}

	export class GameConst {
		public constructor() {
		}

		private static byHurtFilter:egret.ColorMatrixFilter ;

		public static getByHurtFilter():egret.ColorMatrixFilter {
			if(!GameConst.byHurtFilter) {
				GameConst.byHurtFilter = new egret.ColorMatrixFilter([
					2,0,0,0,50,
					0,0.4,0,0,0,
					0,0,0.4,0,0,
					0,0,0,1,0
				]);
			}

			return GameConst.byHurtFilter;
		}

		public static GAME_DUOREN:Array<ChildGameType> = [ChildGameType.BRNN, ChildGameType.BJL, ChildGameType.HHDZ, ChildGameType.LHDZ];
		public static GAME_JIEJI:Array<ChildGameType> = [ChildGameType.FRUIT, ChildGameType.TGPD, ChildGameType.BY, ChildGameType.DUOBAO];
		public static GAME_QIPAI:Array<ChildGameType> = [ChildGameType.DDZ, ChildGameType.PDK, ChildGameType.QYNN, ChildGameType.DZPK, ChildGameType.ERMJ, ChildGameType.ZJH];
		public static COMMON_HELP:Array<ChildGameType> = [ChildGameType.BRNN, ChildGameType.BJL, ChildGameType.HHDZ,
			ChildGameType.LHDZ,ChildGameType.DZPK, ChildGameType.QYNN, ChildGameType.ZJH];

		public static fishOffset:{[key: number]: any} = {
			0 : {ox:0, oy:-18, w:36,h:64},
			1 : {ox:0, oy:-8, w:37,h:60},
			2 : {ox:0, oy:-18, w:45,h:64},
			3 : {ox:0, oy:-12, w:52,h:63},
			4 : {ox:0, oy:-15, w:51,h:75},
			5 : {ox:0, oy:-6, w:68,h:65},
			6 : {ox:0, oy:-15, w:106,h:126},
			7 : {ox:0, oy:-16, w:70,h:82},
			8 : {ox:0, oy:0, w:109,h:119},
			9 : {ox:0, oy:0, w:127,h:109},
			10 : {ox:0, oy:-18, w:151,h:120},
			11 : {ox:0, oy:-23, w:90,h:108},
			12 : {ox:0, oy:-48, w:93,h:165},
			13 : {ox:0, oy:0, w:71,h:118},
			14 : {ox:0, oy:-40, w:125,h:166},
			15 : {ox:0, oy:-22, w:112,h:177},
			16 : {ox:0, oy:-34, w:172,h:143},
			17 : {ox:0, oy:-46, w:140,h:255},
			18 : {ox:0, oy:-64, w:165,h:296},
			19 : {ox:0, oy:0, w:127,h:109},
			21 : {ox:0, oy:-42, w:177,h:287},
			23 : {ox:0, oy:-54, w:231,h:325},
			25 : {ox:0, oy:-42, w:275,h:251},
			26 : {ox:0, oy:-44, w:227,h:399},
			27 : {ox:0, oy:0, w:278,h:287},
			29 : {ox:24, oy:-6, w:273,h:360},
			30 : {ox:0, oy:0, w:215,h:244},
			31 : {ox:-8, oy:-40, w:163,h:485},
			32 : {ox:0, oy:-32, w:168,h:426},
		}

		public static betConfig:{ [key: number]: number} = {
			100: 1,
			101: 3,
			102: 5,
			103: 8,
			104: 10,
			200: 5,
			201: 15,
			202: 25,
			203: 40,
			204: 50,
			300: 10,
			301: 30,
			302: 50,
			303: 80,
			304: 100,
			400: 20,
			401: 60,
			402: 100,
			403: 160,
			404: 200,
		}

		public static treasureIconMap:{ [key: number]: number} = {
			101: 0,
			102: 1,
			103: 2,
			104: 3,
			105: 4,
			201: 5,
			202: 6,
			203: 7,
			204: 8,
			205: 9,
			301: 10,
			302: 11,
			303: 12,
			304: 13,
			305: 14,
			// 401: 15,
			106: 15,
			206: 15,
			306: 15,
		}

		public static gameIconResConfigs:Array<GameIconInfo> = [];
		private static initGame() {
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.ZJH, "gp_icon_zjh", "炸金花"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.QYNN, "gp_icon_qznn", "抢庄牛牛"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.DDZ, "gp_icon_ddz", "斗地主"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.BRNN, "gp_icon_brnn", "百人牛牛"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.LHDZ, "gp_icon_lhdz", "龙虎斗"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.PDK, "gp_icon_pdk", "跑得快"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.HHDZ, "gp_icon_hhdz", "红黑大战"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.DZPK, "gp_icon_dzpk", "德州扑克"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.ERMJ, "gp_icon_ermj", "二人雀神"));
			// GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.CSD, "icon_lhj"));
			// GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.YQCM, "icon_zq"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.BY, "gp_icon_by", "捕鱼"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.BJL, "gp_icon_bjl", "百家乐"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.FRUIT, "gp_icon_sgj", "超级水果机"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.TGPD, "gp_icon_tgly", "糖果派对"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.DUOBAO, "gp_icon_duobao", "连环夺宝"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.DiceBao, "gp_icon_hlsb", "欢乐骰宝"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.BCBM, "gp_icon_hlsb", "奔驰宝马"));
			GameConst.gameIconResConfigs.push(new GameIconInfo(game.ChildGameType.FQZS, "gp_icon_hlsb", "飞禽走兽"));
		}

		public static getGameName(gameType:game.ChildGameType):string {
			if(GameConst.gameIconResConfigs.length == 0) {
				GameConst.initGame();
			}
			for(let gameIconInfo of GameConst.gameIconResConfigs) {
				if(gameIconInfo.gameType == gameType) {
					return gameIconInfo.showName;
				}
			}
			return "";
		}

		public static getGameIconRes(gameType:game.ChildGameType):string {
			if(GameConst.gameIconResConfigs.length == 0) {
				GameConst.initGame();
			}
			for(let gameIconInfo of GameConst.gameIconResConfigs) {
				if(gameIconInfo.gameType == gameType) {
					return gameIconInfo.gameTypeRes;
				}
			}
			return "";
		}

		public static getCurBet(index:number):number {
			let level = game.RoomManager.getInstance().curRoomData.gameLevel;
		    if(level == 0) level = 2;
            return game.GameConst.betConfig[level * 100 + index];
		}

		public static getTreasureIconIndex(index:number):number {
			return game.GameConst.treasureIconMap[index];
		}

		public static getCurMaxBet():number {
			let level = game.RoomManager.getInstance().curRoomData.gameLevel;
		    if(level == 0) level = 2;
            return game.GameConst.betConfig[level * 100 + 4];
		}

		public static getSuitSource(cardSuit:game.CardSuit):string {
			switch(cardSuit) {
				case game.CardSuit.CLUB:
					return "shape_club";
				case game.CardSuit.DIAMOND:
					return "shape_diamond";
				case game.CardSuit.HEART:
					return "shape_heart";
				case game.CardSuit.SPADE:
					return "shape_spade";
			}
			return "";
		}

		public static getDDZSuitSource(cardSuit:game.CardSuit):string {
			switch(cardSuit) {
				case game.CardSuit.CLUB:
					return "ddz_card_club";
				case game.CardSuit.DIAMOND:
					return "ddz_card_diamond";
				case game.CardSuit.HEART:
					return "ddz_card_heart";
				case game.CardSuit.SPADE:
					return "ddz_card_spade";
			}
			return "";
		}

		public static getPDKSuitSource(cardSuit:game.CardSuit):string {
			switch(cardSuit) {
				case game.CardSuit.CLUB:
					return "pdk_card_club";
				case game.CardSuit.DIAMOND:
					return "pdk_card_diamond";
				case game.CardSuit.HEART:
					return "pdk_card_heart";
				case game.CardSuit.SPADE:
					return "pdk_card_spade";
			}
			return "";
		}

		public static getDZPKSuitSource(cardSuit:game.CardSuit):string {
			switch(cardSuit) {
				case game.CardSuit.CLUB:
					return "dzpk_card_club";
				case game.CardSuit.DIAMOND:
					return "dzpk_card_diamond";
				case game.CardSuit.HEART:
					return "dzpk_card_heart";
				case game.CardSuit.SPADE:
					return "dzpk_card_spade";
			}
			return "";
		}

		public static getTypeText(type:number):string {
			if(type == 0) {
				return "单张";
			} else if(type == 1) {
				return "对子";
			}else if(type == 2) {
				return "顺子";
			}else if(type == 3) {
				return "同花";
			}else if(type == 4) {
				return "同花顺";
			}else if(type == 5) {
				return "豹子";
			}
			return "";
		}

		public static getTypeImgName(type:number):string {
			if(type == 0) {
				return "zjh_single_card";
			} else if(type == 1) {
				return "pairs";
			}else if(type == 2) {
				return "straight";
			}else if(type == 3) {
				return "gold_flower";
			}else if(type == 4) {
				return "straight_gold";
			}else if(type == 5) {
				return "panther";
			}
			return "";
		}

		public static CHIP_VALUES :Array<number> = [
			1,2,5,10,50
		]

		public static CHIP_IMG_MAP:any = {
			"1" : "chip_b",
			"2" : "chip_g",
			"5" : "chip_p",
			"10" : "chip_r",
			"50" : "chip_y"
		}

        static getRoomLabel():string {
			let roomData:RoomData = RoomManager.getInstance().curRoomData;
			if(!roomData) return "";
			if(roomData.gameLevel == 0) {
				return "体验场";
			} else if(roomData.gameLevel == 1) {
				return "初级场";
			}  else if(roomData.gameLevel == 2) {
				return "中级场";
			}  else if(roomData.gameLevel == 3) {
				return "高级场";
			}  else if(roomData.gameLevel == 4) {
				return "富豪场";
			}
            return "";
        }

		public static getPDKGameLevelLimit(gameLevel:number) {
			if(gameLevel == 1) {
				return 50;
			} else if(gameLevel == 2) {
				return 250;
			} else if(gameLevel == 3) {
				return 500;
			} else if(gameLevel == 4) {
				return 1000;
			}
			return 0;
		}
		public static getDDZGameLevelLimit(gameLevel:number) {
			if(gameLevel == 1) {
				return 1;
			} else if(gameLevel == 2) {
				return 10;
			} else if(gameLevel == 3) {
				return 20;
			} 
			return 0;
		}

		private static contentArr:Array<string> = [
					"下次对决时，我也不会是今天的我",
					"岁月是把杀猪刀，紫了葡萄，黑了木耳，软了香蕉",
					"晚一步不如早一步，问题您来了！",
					"拼一拼 草房变洋房。再拼一拼，夏利变宾利",
					"只要思想不滑坡，办法总比困难多！",
					"玩是高尚娱乐，博是低级趣味",
					"输赢都不走，能做一把手",
					"错不了，就是你，你就是我一辈子的劲敌！",
					"打多打少全凭一个缘字，打多打少别声张",
					"只有一条路不能选择——那就是放弃的路",
					"冲动是魔鬼，心态好，运气自然来",
					"不是无路可走的时候，最好不要起手就全压",
					"现在的一切美好事物，无一不是创新的结果",
					"唯一比凶猛的对手更可怕的是你的错误打法",
					"一想到有你这样的牌友，就觉得不枉选了这条路",
					"需要两个实力相当的凑在一起，才能够达到神乎其技！",
					"世界上最漂亮的花，是杠上花",
					"世界上最美的湖，是碰碰湖",
					"一样的游戏，不一样的体验",
					"爱拼才会赢，敢下就会红！要想富，下重注！",
					"只要你活的比对手时间长你就赢了",
					"虽然保守不是最好的策略，但是冲动只会让你结束的更快",
					"哪家小孩天天哭，哪个牌友天天输？",
					"尊重对手就是尊重自己的钱包",
					"每个牌局好似人生，该出手时就出手，不因为错过而后悔",
					"人生在世无非是让别人笑笑，偶尔笑笑别人",
					"尊重对手的加注，尤其是反加",
					"你还记得大明湖畔的夏雨荷吗",
					"打鱼靠技术，心态不能急，手不能抖！",
					"敢于下注，赢家永远属于您！",
					"搏一搏，单车变摩托，再搏一搏，路虎变航母",
					"弃牌是最常见的策略，牌不好就等下一次机会",
					"只要你不是最大的牌，你就要想对手下重注的理由",
					"胜者才有资格往上爬！",
					"大牌要你命，小牌能救命",
					"小输十把没关系，大赢一把就OK",
					"针对不同的对手要有不同的打法",
					"输了不投降，竞争意识强",
					"游戏开始后的感觉就像回家一样，so sweet",
					"中国的老话，软的怕硬的，硬的怕不要命的",
					"永不言败，推倒再来",
					"人生只有走出来的精彩，没有等出来的辉煌",
					"人生如麻将，一见钟情叫天胡"
				]

		public static getTipsLabel():string {
			return GameConst.contentArr[CommonUtil.RandomRangeInt(0, GameConst.contentArr.length)];
		}

		private static contentArr2:Array<string> = [
					"提示：要进行存款和取款操作需要点击“银行”按钮哦",
					"提示：点击个人信息-选择头像即可更换头像",
					"提示：充值完成后需要在银行领取哦"
					]
		public static getTipsLabel2():string {
			return GameConst.contentArr2[CommonUtil.RandomRangeInt(0, GameConst.contentArr2.length)];
		}

		private static brnnChipFilterColorMap:{ [index: string]: string; } = {
			"1_1":"0xe7a13a",
			"1_2":"0xff8f33",
			"1_3":"0xec4646",
			"1_4":"0xff266c",
			"1_5":"0xd400d4",
			"1_6":"0x9e6aff",
			"2_1":"0xe7a13a",
			"2_2":"0xff8f33",
			"2_3":"0xec4646",
			"2_4":"0xff266c",
			"2_5":"0xd400d4",
			"2_6":"0x9e6aff",
			"3_1":"0xe7a13a",
			"3_2":"0xff8f33",
			"3_3":"0xec4646",
			"3_4":"0xff266c",
			"3_5":"0xd400d4",
			"3_6":"0x9e6aff"
		};

		private static bjlChipFilterColorMap:{ [index: string]: string; } = {
			"bet_1":"0x51d0ff","bet_2":"0x5c7afc","bet_3":"0xb47dff",
			"bet_4":"0xd84bfb","bet_5":"0xf5337a"
		};

		private static hhdzChipFilterColorMap:{ [index: string]: string; } = {
			"bet_1":"0xf4faac","bet_2":"0xb6effa","bet_3":"0xdeaaec",
			"bet_4":"0xfff368","bet_5":"0xff4534","bet_6":"0xffffff"
		};

		private static tbChipFIlterColorMap:{[index:string]:string;} = {
			"bet_1":"0x75d8f3","bet_2":"0xbc8fff","bet_3":"0xe94485",
			"bet_4":"ec4646","bet_5":"0xfcdf6a","bet_6":"0xffffff"
		}

		private static fruitNodeColorMap:{[index:number]:number;} = {
			1:0xf6fc5e,
			2:0xa7fc57,
			3:0xf6fc40,
			4:0x75ffff,
			5:0xf6c4f5,
			6:0x65fbf5,
			7:0xf6c9f5,
			8:0xf6fb2d,
			9:0xfdb5b6
		}

		private static tbBetValue:{[index:number]:number;} = {
			1: 1,
			2: 1,
			3: 24,
			4: 50,
			5: 18,
			6: 14,
			7: 12,
			8: 8 ,
			9: 6 ,
			10: 6,
			11: 6,
			12: 6,
			13: 8,
			14: 12,
			15: 14,
			16: 18,
			17: 50,
			21: 1 ,
			22: 1 ,
			23: 8 ,
			24: 8 ,
			25: 8 ,
			26: 8 ,
			27: 8 ,
			28: 8 ,
			31: 150,
			32: 150,
			33: 150,
			34: 150,
			35: 150,
			36: 150,
			41: 5,
			42: 5,
			43: 5,
			44: 5,
			45: 5,
			46: 5,
			47: 5,
			48: 5,
			49: 5,
			50: 5,
			51: 5,
			52: 5,
			53: 5,
			54: 5,
			55: 5,
			61: 1,
			62: 1,
			63: 1,
			64: 1,
			65: 1,
			66: 1
		}

		public static getBrnnChipFilterColor(gameLevel, betIndex):number{
			let s = GameConst.brnnChipFilterColorMap[gameLevel + "_" + betIndex];
			return parseInt(s, 16);
		}

		public static getBjlBetColor(betIndex):number {
			let s = GameConst.bjlChipFilterColorMap["bet_" + betIndex];
			return parseInt(s, 16);
		}

		public static getTbBetColor(betIndex):number {
			let s = GameConst.tbChipFIlterColorMap["bet_" + betIndex];
			return parseInt(s, 16);
		}

		public static getHhdzChipFilterColor(betIndex):number{
			let s = GameConst.hhdzChipFilterColorMap["bet_" + betIndex];
			return parseInt(s, 16);
		}

		public static getTbValueMulti(betValue:number):number {
			return GameConst.tbBetValue[betValue];
		}

		public static getFruitColorFilter(index:number):number {
			return GameConst.fruitNodeColorMap[index];
		}

		public static getBrnnMultiValueByNiu(niuValue):number {
			if(niuValue >= 0 && niuValue <= 6) return 1; 
			if(niuValue >= 7 && niuValue <= 9) return 2;
			if(niuValue >= 11 && niuValue <= 12) return 4;
			if(niuValue == 10) return 4;
		}

		public static getBjlMulti(type:number):number {
			if(type == 1 || type == 2) {
				return 1;
			}
			if(type == 3) {
				return 8;
			}
			if(type == 4 || type == 5) {
				return 11;
			}
			return 0;
		}

		public static getHhdzMulti(type:game.hhdz.HhdzCardType):number {
			if(type == game.hhdz.HhdzCardType.danzhang) {
				return 1;
			}
			if(type == game.hhdz.HhdzCardType.duizi) {
				return 1;
			}
			if(type == game.hhdz.HhdzCardType.shunzi) {
				return 2;
			}
			if(type == game.hhdz.HhdzCardType.tonghua) {
				return 3;
			}
			if(type == game.hhdz.HhdzCardType.tonghuashun) {
				return 5;
			}
			if(type == game.hhdz.HhdzCardType.baozi) {
				return 10;
			}
			return 1;
		}
    }
}

