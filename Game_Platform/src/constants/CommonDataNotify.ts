/**
* 公用常用数据变量
* by dily
* (c) copyright 2014 - 2035
* All Rights Reserved. 
*/
class CommonDataNotify {
	public constructor() {

	}
	public static PUSH_BROADCAST : string = "PUSH_BROADCAST";//广播推送
	public static SYNCH_PLAYER_INFO : string = "SYNCH_PLAYER_INFO";//玩家数据同步

	public static UPDATE_ROOM_INFO: string = "UPDATE_ROOM_INFO";//更新房间玩家信息
	public static UPDATE_EXIT_ROOM: string = "UPDATE_EXIT_ROOM";//退出房间
	public static UPDATE_START_BATTLE: string = "UPDATE_START_BATTLE";//开始战斗
	public static UPDATE_PLAY_BATTLE: string = "UPDATE_PLAY_BATTLE";//出牌
	public static UPDATE_CONTINUE_BATTLE: string = "UPDATE_CONTINUE_BATTLE";//继续战斗
	public static UPDATE_WIN_BATTLE: string = "UPDATE_WIN_BATTLE";//战斗结算
	public static UPDATE_EXIT_BATTLE: string = "UPDATE_EXIT_BATTLE";//更新退出房间信息
	public static UPDATE_PLAYER_INFO: string = "UPDATE_PLAYER_INFO";//更新退玩家基本信息
	public static UPDATE_PDK_PLAYER_INFO: string = "UPDATE_PDK_PLAYER_INFO";//更新退玩家基本信息
	public static UPDATE_PDK_BATTLE_FINISH: string = "UPDATE_PDK_BATTLE_FINISH";//更新战斗完成
	public static UPDATE_PDK_BATTLE_CHAT: string = "UPDATE_PDK_BATTLE_CHAT";//跑得快聊天

	public static QUICKSTART_UPDATE_GAME: string = "QUICKSTART_UPDATE_GAME";//大厅快速开始游戏需要更新

	//麻将
	public static UPDATE_MAHJONG_BATTLE: string = "UPDATE_MAHJONG_BATTLE";
	public static OFFLINE_MAHJONG_BATTLE: string = "OFFLINE_MAHJONG_BATTLE";
	public static UPDATE_MAHJONG_BATTLE_PLAY: string = "UPDATE_MAHJONG_BATTLE_PLAY";
	public static UPDATE_MAHJONG_BATTLE_FINISH: string = "UPDATE_MAHJONG_BATTLE_FINISH";
	public static UPDATE_MAHJONG_BATTLE_CHAT: string = "UPDATE_MAHJONG_BATTLE_CHAT";


	//跑胡子
	public static UPDATE_BEARD_BATTLE_START: string = "UPDATE_BEARD_BATTLE_START";
	public static UPDATE_BEARD_BATTLE_STEP: string = "UPDATE_BEARD_BATTLE_STEP";
	public static UPDATE_BEARD_BATTLE_FINISH: string = "UPDATE_BEARD_BATTLE_FINISH";

	//语音设置
	public static UP_SET_UP_VOICE: string = "UP_SET_UP_VOICE";


	// 更新房間內信息
	public static UPDATE_ROOM_PLAYER_INFO:string = "UPDATE_ROOM_PLAYER_INFO";
	public static UPDATE_ZJH_BATTLE_INFO:string = "UPDATE_ZJH_BATTLE_INFO";
	public static ZJH_LOOK_CARDS:string = "ZJH_SHOW_CARDS";
	public static ZJH_SHOW_BRIGHTCARDS:string = "ZJH_SHOW_BRIGHTCARDS";
	public static ZJH_SHOW_CARDS_ON_END:string = "ZJH_SHOW_CARDS_ON_END";
	public static ZJH_PUSHREADY : string = "ZJH_PUSHREADY";

	public static START_ZJH_BATTLE:string = "START_ZJH_BATTLE";
	public static UPDATE_ZJH_BATTLE_INFO_RESTART:string = "UPDATE_ZJH_BATTLE_INFO_RESTART";
	public static ZJH_BATTLE_END:string = "ZJH_BATTLE_END";
	public static ZJH_CLEAR_BATTLE:string = "ZJH_CLEAR_BATTLE";


	public static QYNN_START_BATTLE : string = "START_QYNN_BATTLE";
	public static QYNN_ROBBANKER_RET : string = "QYNN_ROBBANKER_RET";
	public static QYNN_PUSHBANKER : string = "QYNN_PUSHBANKER";
	public static QYNN_ROBSTAKE_RET : string = "QYNN_ROBSTAKE_RET";
	public static QYNN_DEALCARD : string = "QYNN_DEALCARD";
	public static QYNN_LOOKCARD : string = "QYNN_LOOKCARD";
	public static QYNN_BATTLEFINNISH : string = "QYNN_BATTLEFINNISH";
	public static QYNN_RECONNECT : string = "QYNN_RECONNECT";
	public static QYNN_PUSHREADY : string = "QYNN_PUSHREADY";

	public static BRNN_PUSH_BATTLESTATUS : string = "BRNN_PUSH_BATTLESTATUS";
	public static BRNN_BRENSTAKE_RET : string = "BRNN_BRENSTAKE_RET";
	public static BRNN_APPLY_BANKER_RET : string = "BRNN_APPLY_BANKER_RET";
	public static BRNN_PLAYERRANK : string = "BRNN_PLAYERRANK";
	public static BRNN_STARTGAME : string = "BRNN_STARTGAME";
	public static BRNN_ROUND_RESULT : string = "BRNN_ROUND_RESULT";
	public static BRNN_HISTORY : string = "BRNN_HISTORY";
	public static BRNN_DOWN_BANKER : string = "BRNN_DOWN_BANKER";
	public static BRNN_FIRST_ENTERROOM : string = "BRNN_FIRST_ENTERROOM";
	public static BRNN_SINGLE_ROOM : string = "BRNN_SINGLE_ROOM";
	public static BRNN_LIST_ROOM : string = "BRNN_LIST_ROOM";

	//骰宝
	public static TB_PUSH_BATTLESTATUS : string = "TB_PUSH_BATTLESTATUS";
	public static TB_TBSTAKE_RET : string = "TB_TBSTAKE_RET";
	public static TB_PLAYERRANK : string = "TB_PLAYERRANK";
	public static TB_STARTGAME : string = "TB_STARTGAME";
	public static TB_HISTORY : string = "TB_HISTORY";
	public static TB_FIRST_ENTERROOM : string = "TB_FIRST_ENTERROOM";
	public static TB_SINGLE_ROOM : string = "TB_SINGLE_ROOM";
	public static TB_LIST_ROOM : string = "TB_LIST_ROOM";
	public static TB_UP_BANKER : string = "TB_UP_BANKER";
	public static TB_DOWN_BANKER : string = "TB_DOWN_BANKER";

	public static ERMJ_ENTER_ROOM :string = "ERMJ_ENTER_ROOM";
	public static ERMJ_START_BATTLE : string = "ERMJ_START_BATTLE";
	public static ERMJ_PLAY_BATTLE : string = "ERMJ_PLAY_BATTLE";
	public static ERMJ_FINISH_BATTLE : string = "ERMJ_FINISH_BATTLE";
	public static ERMJ_PUSH_BATTLESTEP : string = "ERMJ_PUSH_BATTLESTEP";
	public static ERMJ_CHECK_ROOM : string = "ERMJ_CHECK_ROOM";

	//飞禽走兽
	public static FQZS_FIRST_ENTERROOM : string = "FQZS_FIRST_ENTERROOM";
	public static FQZS_PUSH_BATTLESTATUS : string = "FQZS_PUSH_BATTLESTATUS";
	public static FQZS_STAKE_RET : string = "FQZS_STAKE_RET";
	public static FQZS_PLAYERRANK : string = "FQZS_PLAYERRANK";
	public static FQZS_HISTORY : string = "FQZS_HISTORY";
	public static FQZS_BATTLEFINSH : string = "FQZS_BATTLEFINSH";
	public static FQZS_UPBANKER : string = "FQZS_UPBANKER";
	public static FQZS_DOWNBANKER : string = "FQZS_DOWNBANKER";

	public static LHDZ_PUSH_BATTLESTATUS : string = "LHDZ_PUSH_BATTLESTATUS";
	public static LHDZ_STAKE_RET : string = "LHDZ_STAKE_RET";
	public static LHDZ_PLAYERRANK : string = "LHDZ_PLAYERRANK";
	public static LHDZ_HISTORY : string = "LHDZ_HISTORY";
	public static LHDZ_SHOWCARD : string = "LHDZ_SHOWCARD";
	public static LHDZ_FIRST_ENTERROOM : string = "LHDZ_FIRST_ENTERROOM";
	public static LHDZ_SINGLE_ROOM : string = "LHDZ_SINGLE_ROOM";
	public static LHDZ_LIST_ROOM : string = "LHDZ_LIST_ROOM";
	public static LHDZ_UP_BANKER : string = "LHDZ_UP_BANKER";
	public static LHDZ_DOWN_BANKER : string = "LHDZ_DOWN_BANKER";

	public static HHDZ_PUSH_BATTLESTATUS : string = "HHDZ_PUSH_BATTLESTATUS";
	public static HHDZ_STAKE_RET : string = "HHDZ_STAKE_RET";
	public static HHDZ_PLAYERRANK : string = "HHDZ_PLAYERRANK";
	public static HHDZ_HISTORY : string = "HHDZ_HISTORY";
	public static HHDZ_SHOWCARD : string = "HHDZ_SHOWCARD";
	public static HHDZ_FIRST_ENTERROOM : string = "HHDZ_FIRST_ENTERROOM";
	public static HHDZ_SINGLE_ROOM : string = "HHDZ_SINGLE_ROOM";
	public static HHDZ_LIST_ROOM : string = "HHDZ_LIST_ROOM";
	public static HHDZ_APPLY_BANKER_RET : string = "HHDZ_APPLY_BANKER_RET";
	public static HHDZ_DOWN_BANKER_RET : string = "HHDZ_DOWN_BANKER_RET";

	public static BJL_ROOMLIST_RET : string = "BJL_ROOMLIST_RET";
	public static BJL_STAKE_RET : string = "BJL_STAKE_RET";
	public static BJL_PLAYERRANK : string = "BJL_PLAYERRANK";
	public static BJL_BATTLE_STATUS : string = "BJL_BATTLE_STATUS";
	public static BJL_STARTGAME : string = "BJL_STARTGAME";
	public static BJL_FIRST_ROOM_PUSH : string = "BJL_FIRST_ROOM_PUSH";
	public static BJL_SINGLE_ROOM_PUSH : string = "BJL_SINGLE_ROOM_PUSH";
	public static BJL_History : string = "BJL_History";

	public static TGPD_ENTER_GAME : string = "TGPD_ENTER_GAME";
	public static TGPD_SET_STAKE : string = "TGPD_SET_STAKE";
	public static TGPD_SET_LINE : string = "TGPD_SET_LINE";
	public static TGPD_START_GAME : string = "TGPD_START_GAME";
	public static TGPD_EXIT_GAME : string = "TGPD_EXIT_GAME";

	//奔驰宝马
	public static BCBM_PUSH_BATTLESTATUS : string = "BCBM_PUSH_BATTLESTATUS";
	public static BCBM_STAKE_RET : string = "BCBM_STAKE_RET";
	public static BCBM_ONLINEPLAYER: string = "BCBM_ONLINEPLAYER";
	public static BCBM_HISTORY: string = "BCBM_HISTORY";
	public static BCBM_FIRST_ENTERROOM: string = "BCBM_FIRST_ENTERROOM";
	public static BCBM_PUSH_BATTLEFINISH: string = "BCBM_PUSH_BATTLEFINISH";
	public static BCBM_SHOWCARD: string = "BCBM_SHOWCARD";
	public static BCBM_UPBANKER: string = "BCBM_UPBANKER";
	public static BCBM_DOWNBANKER: string = "BCBM_DOWNBANKER";
}