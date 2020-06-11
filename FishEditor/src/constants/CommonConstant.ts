class CommonConstant {
	public constructor() {
	}

	public static BATTLE_STATUS_FREE: number = 0;// 空闲
	public static BATTLE_STATUS_IN: number = 1;// 战斗中
	public static BATTLE_PLAY_YES: number = 1;// 出牌 是
	public static BATTLE_PLAY_NO: number = 0;// 不出牌 否
	public static PLAYER_ROOM_STATUS_EXIT: number = 0;// 退出
	public static PLAYER_ROOM_STATUS_OFFLINE: number = 1;// 离线
	public static PLAYER_ROOM_STATUS_DISMISS: number = 2;// 解散
	public static BATTLE_POLICE_NO: number = 0;// 未报警
	public static BATTLE_POLICE_YES: number = 1;// 报警
	public static CARDS_MIN_COUNT: number = 12;// 
	public static CARDS_MAX_COUNT: number = 60;// 
	public static TOTAL_CARDS_COUNT: number = 16;// 
	public static IS_READ_NO: number = 0;// 未准备
	public static IS_READ_OK: number = 1;// 已准备
	public static IS_CREATOR_NO: number = 0;// 不是房主
	public static IS_CREATOR_OK: number = 1;// 是房主
	public static IS_BANKER_NO: number = 0;//不是庄家
	public static IS_BANKER_OK: number = 1;// 是庄家
	public static IS_OFFLINE_NO: number = 0;//未离线
	public static IS_OFFLINE_YES: number = 1;// 离线
	public static IS_BATTLE_END_NO: number = 0;//战斗未结束
	public static IS_BATTLE_END_YES: number = 1;// 战斗结束
}
