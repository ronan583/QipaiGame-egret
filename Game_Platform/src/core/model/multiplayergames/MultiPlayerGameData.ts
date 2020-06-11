class MultiPlayerGameData {
	public constructor() {
	}
	private recordPlayerBetMap:HashMap = new HashMap();
	private recordPlayerTypeBetMap:HashMap = new HashMap();
	private recordTypeBetMap:HashMap = new HashMap();
	private recordDushenTypeBetArr:Array<number> = [0,0,0,0];
	public gameLevel:number = 1;
	// 当前游戏的round 回合编号
	public curGameRound:number = 0;
	// 是否已经播放了结算面板

	private _selfMoney:number = 0;
	public get selfMoney():number{
		return this._selfMoney;
	}
	public set selfMoney(m:number) {
		this._selfMoney = m;
	}
	public addMoney(m:number) {
		this._selfMoney += m;
	}

	public hasPlayedResultPanel:boolean = false;

	public checkAllowExit(gameRound:number):boolean {
		egret.log("checkAllowExit  " + gameRound +"   " + this.curGameRound + "   " + this.hasPlayedResultPanel);
		if(gameRound == this.curGameRound) {
			return this.hasPlayedResultPanel;
		}
		return false;
	}

	public recordResultPanelOpen() {
		this.hasPlayedResultPanel = true;
	}

	//test, delete it when commit!
	public get RecordTypeBetMap(): HashMap{
		return this.recordTypeBetMap;
	}

	public recordPlayerTypeBet(playerId:number, type:number, value:number) {
		let key = "bet_" + playerId + "_" + type;
		if(!this.recordPlayerTypeBetMap.contains(key)) {
			this.recordPlayerTypeBetMap.put(key, value);
		} else {
			this.recordPlayerTypeBetMap.put(key, value + this.recordPlayerTypeBetMap.get(key));
		}
	}

	public getPlayerTypeBet(playerId:number, type:number) {
		let key = "bet_" + playerId + "_" + type;
		if(!this.recordPlayerTypeBetMap.contains(key)) {
			return 0;
		}
		return this.recordPlayerTypeBetMap.get(key);
	}

	public getPlayerTypeBetAllPlayers():Array<number> {
		let keys = [];
		for(let key of this.recordPlayerTypeBetMap.keys()) {
			if(key.indexOf("bet_") >= 0) {
				keys.push(Number(key.split("_")[1]));
			}
		}
		return keys;
	}

	public clearPlayerTypeBet() {
		this.recordPlayerTypeBetMap = new HashMap();
	}

	public recordPlayerBetInfo(playerId:number, bet:number) {
		if(!this.recordPlayerBetMap.contains("bet_" + playerId)) {
			this.recordPlayerBetMap.put("bet_"+playerId, bet);
		} else {
			this.recordPlayerBetMap.put("bet_"+playerId, bet + this.recordPlayerBetMap.get("bet_" + playerId));
		}
	}

	public getRecordPlayerBet(playerId:number):number {
		if(!this.recordPlayerBetMap.contains("bet_" + playerId)) return 0;
		return this.recordPlayerBetMap.get("bet_" + playerId);
	}

	public recordTypeBetInfo(type:number, bet:number) {
		if(!this.recordTypeBetMap.contains("bet_" + type)) {
			this.recordTypeBetMap.put("bet_"+type, bet);
		} else {
			this.recordTypeBetMap.put("bet_"+type, bet + this.recordTypeBetMap.get("bet_" + type));
		}
	}

	public getRecordTypeBet(type:number):number {
		if(!this.recordTypeBetMap.contains("bet_" + type)) return 0;
		return this.recordTypeBetMap.get("bet_" + type);
	}

	public clearRecortTypeBet(){
		this.recordTypeBetMap = new HashMap();
	}

	public recordDushenTypeBet(type:number, betValue:number) {
		this.recordDushenTypeBetArr[type - 1] = betValue;
	}

	public clearDushenTypeBet() {
		this.recordDushenTypeBetArr = [0,0,0,0];
	}

	public getRecordDushenTypeBet(type:number) {
		return this.recordDushenTypeBetArr[type - 1];
	}

}