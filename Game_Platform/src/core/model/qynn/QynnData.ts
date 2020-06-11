enum QYNNState {
	playing,
	wait,
	level
}
enum QYNNPlayerState {
	ob = 0,			//观战
	qzing,			//抢庄中
	qzed,			//抢庄结束
	xzing,			//下注中
	yxz,			//已下注
	canCookCard,	//能看牌
	lookedCard		//已看牌
}
class QynnData {
	private static _instance: QynnData;
	public static getInstance(): QynnData {
		if (QynnData._instance == null) {
			QynnData._instance = new QynnData();
		}
		return QynnData._instance;
	}
	public constructor() {
	}
	public qynnPlayers: QynnPlayer[] = new Array<QynnPlayer>();
	public bankerId: number = -1;
	public addPlayer(playerInfo: game.PlayerInfo):QynnPlayer{
		let oriPlayer = this.getPlayerById(playerInfo.playerId);
		if(oriPlayer) {
			return oriPlayer;
		}
		let qynnPlayer = new QynnPlayer();
		qynnPlayer.playerId = Number(playerInfo.playerId);
		this.qynnPlayers.push(qynnPlayer);
		return qynnPlayer;
	}
	public setBanker(playerId: number) {
		this.bankerId = Number(playerId);
		for (let i = 0; i < this.qynnPlayers.length; i++) {
			if (this.qynnPlayers[i].playerId == this.bankerId) {
				this.qynnPlayers[i].isBanker = true;
			}
		}
	}
	public getBankerId() {
		return this.bankerId;
	}
	public getPlayerById(playerId: number) {
		if (this.qynnPlayers == null || this.qynnPlayers.length == 0) return null;
		for (let i = 0; i < this.qynnPlayers.length; i++) {
			if (this.qynnPlayers[i].playerId == playerId) {
				return this.qynnPlayers[i];
			}
		}
		return null;
	}
}
class QynnPlayer {
	public playerId: number;
	public isBanker: boolean = false;
	public bankerMultinum: number = 0;
	public betMultiNum: number = 0;
	public isShowCard: boolean = false;
	public isAlway: boolean = false;
	public groupCards: any = [];
	public value: number = 0;
	public state: QYNNPlayerState = 0;
}