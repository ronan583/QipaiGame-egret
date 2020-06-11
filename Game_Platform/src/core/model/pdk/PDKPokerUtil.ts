module game.pdk {

	export class CardCheckResult {
		public cardType:game.pdk.CardType = game.pdk.CardType.ERROR;
		public card:number = 0;

		public constructor(playType:game.pdk.CardType, card:number) {
			this.cardType = playType;
			this.card = card;
		}

	}

	export class PDKPokerUtil {
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
			if (cardMap.size() != 2 && cardMap.size() != 3) {
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
			return 0;
		}

		private static check4to2(cardMap:HashMap):number {
			let size:number = cardMap.size();
			if (size == 2) {
				let fisrtCard = 0;
				let count = 0;
				for (let cardStr of cardMap.keys()) {
					let cardValue = cardMap.get(parseInt(cardStr));
					if (cardValue == 4) {
						fisrtCard = parseInt(cardStr);
					} 
					count += cardValue;	
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

		private static check4to3(cardMap:HashMap):number {
			let size:number = cardMap.size();
			if (size == 3 || size == 2 || size == 4) {
				let fisrtCard = 0;
				let count = 0;
				for (let cardStr of cardMap.keys()) {
					let cardValue = cardMap.get(parseInt(cardStr));
					if (cardValue == 4) {
						fisrtCard = parseInt(cardStr);
					} 
					count += cardValue;	
				}
				if (fisrtCard == 0) {
					return 0;
				}
				if (count != 7) {
					return 0;
				}
				return fisrtCard;
			}
			return 0;
		}

		private static checkContinuity(cardMap:HashMap):number {
			if (cardMap.size() < 2) {
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

		private static checkPlane(oldCardMap:HashMap, cardCount:number):number {
			let fisrtCard = 0;
			let size = oldCardMap.size();
			let keys:number[] = oldCardMap.sortIntKeys();
			for (let card of keys) {
				let cardValue = oldCardMap.get(card);
				if(cardValue == 3) {
					if (fisrtCard == 0) {
						fisrtCard = card;
					}
				} 
			}
			if (fisrtCard == 0) {
				return 0;
			}

			// 三飞
			if (oldCardMap.get(fisrtCard + 1) != null && oldCardMap.get(fisrtCard + 1) == 3 && oldCardMap.get(fisrtCard + 2) != null && oldCardMap.get(fisrtCard + 2) == 3) {
				if (cardCount != 9 && cardCount != 15) {
					return 0;
				}
				if(fisrtCard == 14) return 0;
				return fisrtCard;
			}
			// 二飞
			if (oldCardMap.get(fisrtCard + 1) != null && oldCardMap.get(fisrtCard + 1) == 3) {
				if (cardCount != 6 && cardCount != 10) {
					return 0;
				}
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
			return PDKPokerUtil.checkType0(cardMap, cardArr);
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
			return PDKPokerUtil.checkType0(cardMap, cardArr);
		}

		private static checkType0(cardMap:HashMap, cardArr:Array<number>) : CardCheckResult {
			// 单个
			var card:number = this.checkSingle(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.SINGLE, card);
			}
			// 对子
			card = this.checkDuad(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.DUAD, card);
			}
			// 炸弹
			card = this.checkBomb(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.BOMB, card);
			}
			// 三带一
			card = this.check3to1(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.THREE_TO_ONE, card);
			}
			// 三带对
			card = this.check3to2(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.THREE_TO_TWO, card);
			}
			// 三带0
			card = this.check3to0(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.THREE, card);
			}
			card = this.check4to3(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.FOUR_TO_THREE, card);
			}
			card = this.check4to2(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.FOUR_TO_TWO, card);
			}
			card = this.check4to1(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.FOUR_TO_ONE, card);
			}

			// 连对
			card = this.checkContinuity(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.MANY_DUAD, card);
			}
			// 飞机
			card = this.checkPlane(cardMap, cardArr.length);
			if (card > 0) {
				return  new CardCheckResult(game.pdk.CardType.PLANE, card);
			}
			// 顺子
			card = this.checkShun(cardMap);
			if (card > 0) {
				return new CardCheckResult(game.pdk.CardType.SHUN_ZI, card);
			}
			return new CardCheckResult(game.pdk.CardType.ERROR, 0);
		}
	}
}