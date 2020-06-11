module game {

	export class CardCheckResult {
		public cardType:game.ddz.CardType = game.ddz.CardType.ERROR;
		public card:number = 0;
		public count:number = 0;

		public constructor(playType:game.ddz.CardType, card:number, count:number) {
			this.cardType = playType;
			this.card = card;
			this.count = count;
		}

	}

	export class PokerUtil {
		public constructor() {
		}

		private static checkSingle(cardMap:HashMap):number {
			if (cardMap.size() != 1) {
				return 0;
			}
			let count:number = 0;
			let keys = cardMap.keys();
			for (let i=0;i<keys.length;i++) {
				let cardValue:number = cardMap.get(keys[i]);
				count += cardValue;
			}
			if (count != 1) {
				return 0;
			}
			return parseInt(keys[0]);
		}

		private static checkDuad(cardMap:HashMap):number {
			if (cardMap.size() != 1) {
				return 0;
			}
			let count:number = 0;
			let keys = cardMap.keys();
			for (let i=0;i<keys.length;i++) {
				let cardValue:number = cardMap.get(keys[i]);
				count += cardValue;
			}
			if (count != 2) {
				return 0;
			}
			return parseInt(keys[0]);
		}

		public static checkBomb(cardMap:HashMap):number {
			if (cardMap.size() != 1) {
				return 0;
			}
			let keys = cardMap.keys();
			let oldCard:number = parseInt(keys[0]);
			if (cardMap.get(oldCard) == null || cardMap.get(oldCard) != 4) {
				return 0;
			}
			return oldCard;
		}

		public static check3to1(cardMap:HashMap):number {
			if (cardMap.size() != 2) {
				return 0;
			}
			let fisrtCard:number = 0;
			let count:number = 0;
			for (let cardStr of cardMap.keys()) {
				let cardValue:number = cardMap.get(parseInt(cardStr));
				if (cardValue == 3) {
					fisrtCard = parseInt(cardStr);
				}
				count += cardValue;
			}
			if (fisrtCard == 0) {
				return 0;
			}
			if (count != 4) {
				return 0;
			}
			return fisrtCard;
		}

		private static check3to2(cardMap:HashMap):number {
			if (cardMap.size() != 2) {
				return 0;
			}
			let fisrtCard = 0;
			let count = 0;
			for (let cardStr of cardMap.keys()) {
				let cardValue = cardMap.get(parseInt(cardStr));
				if (cardValue == 3) {
					fisrtCard = parseInt(cardStr);
				}
				count += cardValue;
			}
			if (fisrtCard == 0) {
				return 0;
			}
			if (count != 5) {
				return 0;
			}
			return fisrtCard;
		}

		public static check3to0(cardMap:HashMap):number {
			if (cardMap.size() != 1) {
				return 0;
			}
			for (let cardStr of cardMap.keys()) {
				let cardValue = cardMap.get(parseInt(cardStr));
				if (cardValue == 3) {
					return parseInt(cardStr);
				}
			}
			return 0;
		}

		private static check4to1(cardMap:HashMap):number {
			let size:number = cardMap.size();
			if (size == 3 || size == 2) {
				let fisrtCard = 0;
				let count = 0;
				for (let cardStr of cardMap.keys()) {
					let cardValue = cardMap.get(parseInt(cardStr));
					if (cardValue == 4) {
						fisrtCard = parseInt(cardStr);
						count += cardValue;
					} else if(cardValue == 2) {
						count += cardValue;	
					} else {
						return 0;
					}
				}
				if (fisrtCard == 0) {
					return 0;
				}
				if (count != 6) {
					return 0;
				}
				return fisrtCard;
			}
			return 0;
		}

		private static check4to2(cardMap:HashMap):number {
			let size:number = cardMap.size();
			if (size == 3 || size == 2) {
				let fisrtCard = 0;
				let count = 0;
				for (let cardStr of cardMap.keys()) {
					let cardValue = cardMap.get(parseInt(cardStr));
					if (cardValue == 4) {
						fisrtCard = parseInt(cardStr);
						count += cardValue;
					} else if(cardValue == 2) {
						count += cardValue;	
					} else {
						return 0;
					}

				}
				if (fisrtCard == 0) {
					return 0;
				}
				if (count != 8) {
					return 0;
				}
				return fisrtCard;
			}
			return 0;
		}

		private static checkContinuity(cardMap:HashMap):number {
			if (cardMap.size() <= 2) {
				return 0;
			}
			let lastCard = 0;
			let keys:number[] = cardMap.sortIntKeys();
			for (let card of cardMap.sortIntKeys()) {
				let cardValue = cardMap.get(card);
				if (cardValue != 2) {
					return 0;
				}
				if (lastCard != 0 && card != lastCard + 1) {
					return 0;
				}
				lastCard = card;
			}
			return keys[0];
		}

		// 斗地主飞机要么带对子 要么全部是单张
		private static checkPlane(oldCardMap:HashMap, cardCount:number):number {
			let fisrtCard = 0;
			let size = oldCardMap.size();
			let keys:number[] = oldCardMap.sortIntKeys();
			let needDuizi:boolean = false;
			let duiziCount = 0;
			for (let card of keys) {
				let cardValue = oldCardMap.get(card);
				if(cardValue == 3) {
					if (fisrtCard == 0) {
						fisrtCard = card;
					}
				} else if(cardValue == 2) {
					duiziCount++;
				}
			}
			if (fisrtCard == 0) {
				return 0;
			}

			// 三飞
			if (oldCardMap.get(fisrtCard + 1) != null && oldCardMap.get(fisrtCard + 1) == 3 && oldCardMap.get(fisrtCard + 2) != null && oldCardMap.get(fisrtCard + 2) == 3) {
				if (size != 3) {
					return 0;
				}
				if(fisrtCard == 14)return 0;
				return fisrtCard;
			}
			// 二飞
			if (oldCardMap.get(fisrtCard + 1) != null && oldCardMap.get(fisrtCard + 1) == 3) {
				if (cardCount == 10 && duiziCount == 0) {
					return 0;
				}
				if (cardCount != 8 && cardCount != 10 && cardCount != 6) return 0;
				if(fisrtCard == 14) return 0;
				return fisrtCard;
			}
			return 0;
		}

		private static checkShun(cardMap:HashMap):number {
			if (cardMap.size() < 5) {
				return 0;
			}
			let keys:number[] = cardMap.sortIntKeys();
			let fisrtCard = keys[0];
			for (let i = 0; i < keys.length; i++) {
				if (fisrtCard + i >= 15) {
					return 0;
				}
				let value = cardMap.get(fisrtCard + i);
				if (value == null || value != 1) {
					return 0;
				}
			}
			return fisrtCard;
		}

		private static checkKingBomb(cardMap:HashMap):number {
			if (cardMap.size() != 2) {
				return 0;
			}
			let keys:number[] = cardMap.sortIntKeys();
			let fisrtCard = keys[0];
			if(cardMap.get(16) == undefined || cardMap.get(16) != 1) return 0;
			if(cardMap.get(17) == undefined || cardMap.get(17) != 1) return 0;
			return fisrtCard;
		}

		public static checkTruelyType(cardArr:Array<number>):CardCheckResult {
			var cardMap:HashMap = new HashMap();
			for(let i=0;i<cardArr.length;i++) {
				var card:number = cardArr[i];
				if(cardMap.contains(card)) {
					cardMap.put(card, cardMap.get(card) + 1);
				} else {
					cardMap.put(card, 1);
				}
			}
			return PokerUtil.checkType0(cardMap, cardArr);
		}

		public static checkTruelyType2(cardArr:Array<number>):CardCheckResult {
			let newCardArr = [];
			for(let c of cardArr) {
				newCardArr.push(Math.floor(c / 4));
			}
			return PokerUtil.checkTruelyType(cardArr);
		}

		public static checkType(cardArr:Array<number>):CardCheckResult {
			var cardMap:HashMap = new HashMap();
			for(let i=0;i<cardArr.length;i++) {
				var card:number = Math.floor(cardArr[i] / 4);
				if(cardMap.contains(card)) {
					cardMap.put(card, cardMap.get(card) + 1);
				} else {
					cardMap.put(card, 1);
				}
			}
			return PokerUtil.checkType0(cardMap, cardArr);
		}

		private static checkType0(cardMap:HashMap,cardArr:Array<number>) : CardCheckResult {
			// 单个
			var card:number = this.checkSingle(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.SINGLE, card, cardArr.length);
			}
			// 对子
			card = this.checkDuad(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.DUAD, card, cardArr.length);
			}
			// 炸弹
			card = this.checkBomb(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.BOMB, card, cardArr.length);
			}
			// 三带一
			card = this.check3to1(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.THREE_TO_ONE, card, cardArr.length);
			}
			// 三带对
			card = this.check3to2(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.THREE_TO_TWO, card, cardArr.length);
			}
			// 三带0
			card = this.check3to0(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.THREE, card, cardArr.length);
			}
			card = this.check4to1(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.FOUR_TO_TWO, card, cardArr.length);
			}
			// 四带二
			card = this.check4to2(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.FOUR_TO_TWO, card, cardArr.length);
			}

			// 连对
			card = this.checkContinuity(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.MANY_DUAD, card, cardArr.length);
			}
			// 飞机
			card = this.checkPlane(cardMap, cardArr.length);
			if (card > 0) {
				return  new CardCheckResult(game.ddz.CardType.PLANE, card, cardArr.length);
			}
			// 顺子
			card = this.checkShun(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.SHUN_ZI, card, cardArr.length);
			}
			card = this.checkKingBomb(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.ddz.CardType.KING_BOMB, card, cardArr.length);
			}
			return new CardCheckResult(game.ddz.CardType.ERROR, 0, cardArr.length);
		}
	}
}