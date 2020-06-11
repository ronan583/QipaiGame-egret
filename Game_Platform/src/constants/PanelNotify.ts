/**
* 弹窗消息
* by dily
* (c) copyright 2014 - 2035
* All Rights Reserved. 
*/
class PanelNotify {


	public constructor() {

	}

	//打开帮助
	public static OPEN_NOTICE: string = "PANELNOTIFY_OPEN_NOTICE";
	//关闭帮助
	public static CLOSE_NOTICE: string = "PANELNOTIFY_CLOSE_NOTICE";
	public static OPEN_GAME_LOAD: string = "OPEN_GAME_LOAD"
	public static CLOSE_GAME_LOAD: string = "CLOSE_GAME_LOAD"

	//-------------------------------------主大厅
	public static OPEN_REGISTER_PANEL: string = "OPEN_REGISTER_PANEL";
	public static CLOSE_REGISTER_PANEL: string = "CLOSE_REGISTER_PANEL";

	//-------------------------------------炸金花
	public static OPEN_ZJH_ROOM_UI: string = "OPEN_ZJH_ROOM_UI";
	public static CLOSE_ZJH_ROOM_UI: string = "CLOSE_ZJH_ROOM_UI";

	public static OPEN_ZJH_BATTLE_UI: string = "OPEN_ZJH_BATTLE_UI";
	public static CLOSE_ZJH_BATTLE_UI: string = "CLOSE_ZJH_BATTLE_UI";
	public static ZJH_HEAD_CLOCK: string = "ZJH_HEAD_CLOCK";
	public static REFRESH_ZJH_OPERATION: string = "REFRESH_ZJH_OPERATION";
	public static REFRESH_ZJH_TOTALBET: string = "REFRESH_ZJH_TOTALBET";

	public static OPEN_COMPARE: string = "OPEN_COMPARE";
	public static CLOSE_COMPARE: string = "CLOSE_COMPARE";
	public static CLOSE_COMPARE_CHOOSE: string = "CLOSE_COMPARE_CHOOSE";
	public static BET_ANIM: string = "BET_ANIM";
	public static ZJH_SHOW_TIPS: string = "ZJH_SHOW_TIPS";
	public static ZJH_SHOW_CMP_ANIM: string = "ZJH_SHOW_CMP_ANIM";
	public static ZJH_FOLD_CARDS: string = "ZJH_FOLD_CARDS";
	
	public static ZJH_CLEAR_BATTLE: string = "ZJH_CLEAR_BATTLE";

	public static OPEN_QYNN_BATTLE_UI: string = "OPEN_QYNN_BATTLE_UI";
	public static CLOSE_QYNN_BATTLE_UI: string = "CLOSE_QYNN_BATTLE_UI";

	public static OPEN_BRNN_BATTLE_UI: string = "OPEN_BRNN_BATTLE_UI";
	public static CLOSE_BRNN_BATTLE_UI: string = "CLOSE_BRNN_BATTLE_UI";
	public static OPEN_BRNN_START_UI: string = "OPEN_BRNN_START_UI";
	public static CLOSE_BRNN_START_UI: string = "CLOSE_BRNN_START_UI";
	public static UPDATE_BRNN_RADIO_UI: string = "UPDATE_BRNN_RADIO_UI";

	public static INNER_GAME_MONEY_CHANGE: string = "INNER_GAME_MONEY_CHANGE";

	//飞禽走兽
	public static OPEN_FQZS_START_UI: string = "OPEN_FQZS_START_UI";
	public static CLOSE_FQZS_START_UI: string = "CLOSE_FQZS_START_UI";
	public static OPEN_FQZS_BATTLE_UI: string = "OPEN_FQZS_BATTLE_UI";
	public static CLOSE_FQZS_BATTLE_UI: string = "CLOSE_FQZS_BATTLE_UI";
	public static UPDATE_FQZS_RADIO_UI: string = "UPDATE_FQZS_RADIO_UI";

	//骰宝
	public static OPEN_TB_BATTLE_UI: string = "OPEN_TB_BATTLE_UI";
	public static CLOSE_TB_BATTLE_UI: string = "CLOSE_TB_BATTLE_UI";
	public static OPEN_TB_START_UI: string = "OPEN_TB_START_UI";
	public static CLOSE_TB_START_UI: string = "CLOSE_TB_START_UI";
	public static UPDATE_TB_RADIO_UI: string = "UPDATE_TB_RADIO_UI";

	public static OPEN_LHDZ_BATTLE_UI: string = "OPEN_LHDZ_BATTLE_UI";
	public static CLOSE_LHDZ_BATTLE_UI: string = "CLOSE_LHDZ_BATTLE_UI";
	public static OPEN_LHDZ_HISTORY_UI: string = "OPEN_LHDZ_HISTORY_UI";
	public static OPEN_LHDZ_START_UI: string = "OPEN_LHDZ_START_UI";
	public static CLOSE_LHDZ_START_UI: string = "CLOSE_LHDZ_START_UI";
	public static UPDATE_LHDZ_RADIO_UI: string = "UPDATE_LHDZ_RADIO_UI";


	public static OPEN_HHDZ_BATTLE_UI: string = "OPEN_HHDZ_BATTLE_UI";
	public static CLOSE_HHDZ_BATTLE_UI: string = "CLOSE_HHDZ_BATTLE_UI";
	public static OPEN_HHDZ_START_UI: string = "OPEN_HHDZ_START_UI";
	public static CLOSE_HHDZ_START_UI: string = "CLOSE_HHDZ_START_UI";
	public static OPEN_HHDZ_HISTORY_UI: string = "OPEN_HHDZ_HISTORY_UI";
	public static UPDATE_HHDZ_RADIO_UI: string = "UPDATE_HHDZ_RADIO_UI";

	public static OPEN_ERMJ_BATTLE_UI: string = "OPEN_ERMJ_BATTLE_UI";
	public static CLOSE_ERMJ_BATTLE_UI: string = "CLOSE_ERMJ_BATTLE_UI";


	public static BACK_HALL: string = "BACK_HALL";

	public static HIDE_MAINUI_AND_ROOM: string = "HIDE_MAINUI_AND_ROOM";

	//------------------斗地主
	public static OPEN_DDZ_ROOM_UI: string = "OPEN_DDZ_ROOM_UI";
	public static CLOSE_DDZ_ROOM_UI: string = "CLOSE_DDZ_ROOM_UI";
	public static CARD_SEND_RULE_ERROR: string = "CARD_SEND_RULE_ERROR";
	public static OPEN_DDZ_BATTLE_UI: string = "OPEN_DDZ_BATTLE_UI";
	public static CLOSE_DDZ_BATTLE_UI: string = "CLOSE_DDZ_BATTLE_UI";
	public static CLEAR_DDZ_BATTLE_UI: string = "CLEAR_DDZ_BATTLE_UI";
	public static CLEAR_DDZ_BATTLE_UI_WITHOUT_CARDS: string = "CLEAR_DDZ_BATTLE_UI_WITHOUT_CARDS";
	public static DDZ_REFRESH_ON_START: string = "DDZ_REFRESH_ON_START";
	public static DDZ_REFRESH_ON_RECONNECT: string = "DDZ_REFRESH_ON_RECONNECT";
	public static DDZ_REFRESH_ON_CALLSCORE: string = "DDZ_REFRESH_ON_CALLSCORE";
	public static DDZ_REFRESH_ON_MULTI: string = "DDZ_REFRESH_ON_MULTI";
	public static DDZ_REFRESH_ON_FIGHT: string = "DDZ_REFRESH_ON_FIGHT";
	public static DDZ_CLEAR_SCORE_OR_MULTI_SHOW:string = "DDZ_CLEAR_SCORE_OR_MULTI_SHOW"
	public static DDZ_PLAY_CARD: string = "DDZ_PLAY_CARD";
	public static REMOVE_PLAY_CARDS: string = "REMOVE_PLAY_CARDS";
	public static SELF_PLAY_CARDS: string = "SELF_PLAY_CARDS";
	public static SHOW_TABLE_CARDS: string = "SHOW_TABLE_CARDS";
	public static SHOW_LEFT_CARDS: string = "SHOW_LEFT_CARDS";
	public static SHOW_TIPS_ON_SCORE: string = "SHOW_TIPS_ON_SCORE";
	public static SHOW_TIPS_ON_MULTI: string = "SHOW_TIPS_ON_MULTI";
	public static SHOW_TIPS_ON_DONOT: string = "SHOW_TIPS_ON_DONOT";
	public static REFRESH_HAND_CARDS: string = "REFRESH_HAND_CARDS";
	public static DDZ_BATTLE_END: string = "DDZ_BATTLE_END";
	public static DDZ_PLAY_CARD_TIPS: string = "DDZ_PLAY_CARD_TIPS";
	public static DDZ_REFRESH_MULTI: string = "DDZ_REFRESH_MULTI";
	public static CHANGE_TRUSTEESHIP_STATE: string = "CHANGE_TRUSTEESHIP_STATE";
	public static JIABEI_COMPLETE: string = "JIABEI_COMPLETE";
	public static DDZ_REFRESH_MONEY: string = "DDZ_REFRESH_MONEY";
	public static DDZ_PLAY_CLEAR_ALL_CHOOSE: string = "DDZ_PLAY_CLEAR_ALL_CHOOSE";
	public static DDZ_OTHERS_PLAY:string = "DDZ_OTHERS_PLAY"
	public static DDZ_REFRESH_MULTI_DETAIL:string = "DDZ_REFRESH_MULTI_DETAIL"
	//----------- 跑得快
	public static OPEN_PDK_ROOM_UI: string = "OPEN_PDK_ROOM_UI";
	public static CLOSE_PDK_BATTLE_UI: string = "CLOSE_PDK_BATTLE_UI";
	public static OPEN_PDK_BATTLE_UI: string = "OPEN_PDK_BATTLE_UI";
	public static CLOSE_PDK_ROOM_UI: string = "CLOSE_PDK_ROOM_UI";
	public static CLEAR_PDK_BATTLE_UI: string = "CLEAR_PDK_BATTLE_UI";
	public static PDK_REFRESH_ON_START: string = "PDK_REFRESH_ON_START";
	public static PDK_REFRESH_ON_FIGHT: string = "PDK_REFRESH_ON_FIGHT";
	public static PDK_BATTLE_END: string = "PDK_BATTLE_END";
	public static PDK_REFRESH_MONEY: string = "PDK_REFRESH_MONEY";
	public static PDK_REFRESH_ON_RECONNECT: string = "PDK_REFRESH_ON_RECONNECT";
	public static PDK_PLAY_CARD_TIPS: string = "PDK_PLAY_CARD_TIPS";
	public static PDK_PLAY_CARD: string = "PDK_PLAY_CARD";
	public static PDK_BOMB_SCORE: string = "PDK_BOMB_SCORE";
	public static PDK_CLEAR_LAST_TIP: string = "PDK_CLEAR_LAST_TIP";
	public static PDK_SELF_PLAY_CARDS: string = "PDK_SELF_PLAY_CARDS";
	public static PDK_OTHERS_PLAY: string = "PDK_OTHERS_PLAY";
	//----------- 德州扑克
	public static OPEN_DZPK_ROOM_UI: string = "OPEN_DZPK_ROOM_UI";
	public static CLOSE_DZPK_ROOM_UI: string = "CLOSE_DZPK_ROOM_UI";
	public static OPEN_DZPK_BATTLE_UI: string = "OPEN_DZPK_BATTLE_UI";
	public static CLOSE_DZPK_BATTLE_UI: string = "CLOSE_DZPK_BATTLE_UI";
	public static DZPK_REFRESH_ON_START: string = "DZPK_REFRESH_ON_START";
	public static DZPK_REFRESH_ON_ENTER: string = "DZPK_REFRESH_ON_ENTER";
	public static DZPK_REFRESH_BET_ON_INIT: string = "DZPK_REFRESH_BET_ON_INIT";
	public static DZPK_SHOW_SINGLE_BET: string = "DZPK_SHOW_SINGLE_BET";
	public static DZPK_PLAY_PASS_ANIM: string = "DZPK_PLAY_PASS_ANIM";
	public static DZPK_REFRESH_OPERATION_BAR: string = "DZPK_REFRESH_OPERATION_BAR";
	public static DZPK_SHOW_PUBLIC_CARDS: string = "DZPK_SHOW_PUBLIC_CARDS";
	public static DZPK_BATTLE_END: string = "DZPK_BATTLE_END";
	public static DZPK_SHOW_CARD_TYPE: string = "DZPK_SHOW_CARD_TYPE";
	public static DZPK_SHOW_BET: string = "DZPK_SHOW_BET";
	public static SHOW_CHIP_COLLECT_ANIM: string = "SHOW_CHIP_COLLECT_ANIM";
	public static REFRESH_CHIPS: string = "REFRESH_CHIPS";
	public static DZPK_REFRESH_PLAYER_MONEY: string = "DZPK_REFRESH_PLAYER_MONEY";
	public static DZPK_REFRESH_TOTAL_BET: string = "DZPK_REFRESH_TOTAL_BET";
	public static DZPK_CHANGE_CLOCK: string = "DZPK_CHANGE_CLOCK";
	public static DZPK_AUTO_RESET: string = "DZPK_AUTO_RESET";
	public static DZPK_CLEAR_PLAYER_OPER: string = "DZPK_CLEAR_PLAYER_OPER";
	public static DZPK_SELF_CARDS_DROP:string = "DZPK_SELF_CARDS_DROP"
	public static DZPK_OTHERS_CARDS_DROP:string = "DZPK_OTHERS_CARDS_DROP"
	//-------------------------------------用户信息
	public static OPEN_USERINFO_PANEL: string = "OPEN_USERINFO_PANEL";
	public static CLOSE_USERINFO_PANEL: string = "CLOSE_USERINFO_PANEL";

	public static OPEN_RESETPASSWORD_PANEL: string = "OPEN_RESETPASSWORD_PANEL";
	public static CLOSE_RESETPASSWORD_PANEL: string = "CLOSE_RESETPASSWORD_PANEL";
	public static OPEN_ACCOUNTLOGIN_PANEL: string = "OPEN_ACCOUNTLOGIN_PANEL";
	public static CLOSE_ACCOUNTLOGIN_PANEL: string = "CLOSE_ACCOUNTLOGIN_PANEL";
	public static OPEN_CHANGEACCOUNT_PANEL: string = "OPEN_CHANGEACCOUNT_PANEL";
	public static CLOSE_CHANGEACCOUNT_PANEL: string = "CLOSE_CHANGEACCOUNT_PANEL";
	public static OPEN_BANK_PANEL: string = "OPEN_BANK_PANEL";
	public static OPEN_BANK_DEPOSIT_PANEL: string = "OPEN_BANK_DEPOSIT_PANEL";
	public static OPEN_BANK_WITHDRAW_PANEL: string = "OPEN_BANK_WITHDRAW_PANEL";
	public static OPEN_EXCHANGE_PANEL: string = "OPEN_EXCHANGE_PANEL";
	public static OPEN_CHARGE_PANEL: string = "OPEN_CHARGE_PANEL";
	public static OPEN_RANK_PANEL: string = "OPEN_RANK_PANEL";
	public static OPEN_VIP_PANEL: string = "OPEN_VIP_PANEL";
	public static OPEN_BULLETIN_PANEL: string = "OPEN_BULLETIN_PANEL";
	public static CLOSE_BULLETIN_PANEL: string = "CLOSE_BULLETIN_PANEL";

	public static OPEN_WAITLOADING_PANEL: string = "OPEN_WAITLOADING_PANEL";
	public static CLOSE_WAITLOADING_PANEL: string = "CLOSE_WAITLOADING_PANEL";

	public static SOCKET_RECONNECT:string = "SOCKET_RECONNECT";
	public static OPEN_GAME:string = "OPEN_GAME";
	public static OPEN_GAME_ON_RES_COMPLETE:string = "OPEN_GAME_ON_RES_COMPLETE";
	public static REFRESH_HALL_GAME_ICON:string = "REFRESH_HALL_GAME_ICON";
	public static UPDATE_GAME_STATUS:string = "UPDATE_GAME_STATUS";
	public static SHOW_WAIT_DOWNLOAD_STATE:string = "SHOW_WAIT_DOWNLOAD_STATE";

	// 捕鱼
	public static OPEN_BY_BATTLE: string = "OPEN_BY_BATTLE";
	public static REFRESH_BY_PLAYERS: string = "REFRESH_BY_PLAYERS";
	public static BY_SHOOT: string = "BY_SHOOT";
	public static BY_FISH_DEAD: string = "BY_FISH_DEAD";
	public static SHOW_BULLET_MONEY: string = "SHOW_BULLET_MONEY";
	public static REFRESH_SHOOT_TYPE: string = "REFRESH_SHOOT_TYPE";
	public static CLOSE_BY_BATTLE_UI: string = "CLOSE_BY_BATTLE_UI";
	public static OPEN_BY_ROOM_UI: string = "OPEN_BY_ROOM_UI";
	public static CLOSE_BY_ROOM_UI: string = "CLOSE_BY_ROOM_UI";
	public static CREATE_FISHS: string = "CREATE_FISHS";
	public static CREATE_SINGLE_FISH: string = "CREATE_SINGLE_FISH";
	public static OPEN_CHANGE_CANON_PANEL: string = "OPEN_CHANGE_CANON_PANEL";
	public static CLOSE_CHANGE_CANON_PANEL: string = "CLOSE_CHANGE_CANON_PANEL";
	public static SWITCH_CANON: string = "SWITCH_CANON";
	public static OPEN_FISH_BAIKE_PANEL: string = "OPEN_FISH_BAIKE_PANEL";
	public static CLOSE_FISH_BAIKE_PANEL: string = "CLOSE_FISH_BAIKE_PANEL";
	public static SHOW_BY_ADD_MONEY: string = "SHOW_BY_ADD_MONEY";
	public static SHOW_BOSS_NOTICE: string = "SHOW_BOSS_NOTICE";
	public static OPEN_BY_TRACK_UI: string = "OPEN_BY_TRACK_UI";
	public static CREATE_FISH_TIDE:string = "CREATE_FISH_TIDE";
	// 捕鱼end
	public static OPEN_BJL_BATTLE_UI: string = "OPEN_BJL_BATTLE_UI";
	public static CLOSE_BJL_BATTLE_UI: string = "CLOSE_BJL_BATTLE_UI";
	public static OPEN_BJL_START_UI: string = "OPEN_BJL_START_UI";
	public static CLOSE_BJL_START_UI: string = "CLOSE_BJL_START_UI";
	public static OPEN_BJL_CHANGE_UI: string = "OPEN_BJL_CHANGE_UI";
	public static CLOSE_BJL_CHANGE_UI: string = "CLOSE_BJL_CHANGE_UI";
	public static OPEN_BJL_HISTORY_UI: string = "OPEN_BJL_HISTORY_UI";
	public static UPDATE_BJL_RADIOCHANGE_UI: string = "UPDATE_BJL_RADIOCHANGE_UI";
	public static OPEN_BJL_FINISH_UI: string = "OPEN_BJL_FINISH_UI";
	public static OPEN_BJL_APPLY_BANKER: string = "OPEN_BJL_APPLY_BANKER"
	public static OPEN_BJL_DOWN_BANKER: string = "OPEN_BJL_DOWN_BANKER"
	//糖果派对
	public static OPEN_TGPD_ROOM_UI: string = "OPEN_TGPD_ROOM_UI";
	public static CLOSE_TGPD_ROOM_UI: string = "CLOSE_TGPD_ROOM_UI";
	public static OPEN_TGPD_ROOM_CURTAIN: string = "OPEN_TGPD_ROOM_CURTAIN";
	public static OPEN_TGPD_BATTLE_UI: string = "OPEN_TGPD_BATTLE_UI";
	public static CLOSE_TGPD_BATTLE_UI: string = "CLOSE_TGPD_BATTLE_UI";
	public static TGPD_INCREASE_MONDY: string = "TGPD_INCREASE_MONDY";
	public static TGPD_GAMEOVER: string = "TGPD_GAMEOVER";
	public static REFRESH_CANDY_REWARD_POOL: string = "REFRESH_CANDY_REWARD_POOL";

	public static RESUME_APP: string = "RESUME_APP";
	public static PAUSE_APP: string = "PAUSE_APP";

	public static REFRESH_FRUIT_POOL: string = "REFRESH_FRUIT_POOL";
	public static OPEN_SGJ_ROOM_UI: string = "OPEN_SGJ_ROOM_UI";
	public static CLOSE_SGJ_ROOM_UI: string = "CLOSE_SGJ_ROOM_UI";
	public static OPEN_FRUIT_BATTLE_UI: string = "OPEN_FRUIT_BATTLE_UI";
	public static CLOSE_FRUIT_BATTLE_UI: string = "CLOSE_FRUIT_BATTLE_UI";
	public static FRUIT_REFRESH_BET_MONEY: string = "FRUIT_REFRESH_BET_MONEY";

	public static FRUIT_GAME_RESULT: string = "FRUIT_GAME_RESULT";
	public static UPDATE_ROLL_END: string = "UPDATE_ROLL_END";
	public static SHOW_FRUIT_HELP_UI: string = "SHOW_FRUIT_HELP_UI";
	public static CLOSE_FRUIT_HELP_UI: string = "CLOSE_FRUIT_HELP_UI";


	public static REFRESH_FRUIT_POOL_IN_ROOM: string = "REFRESH_FRUIT_POOL_IN_ROOM";
	public static SHOW_FRUIT_CRAZY_UI: string = "SHOW_FRUIT_CRAZY_UI";
	public static CLOSE_FRUIT_CRAZY_UI: string = "CLOSE_FRUIT_CRAZY_UI";
	public static UPDATE_FRUIT_CRAZY_REWARD: string = "UPDATE_FRUIT_CRAZY_REWARD";
	public static UPDATE_FRUIT_CRAZY_BOOM: string = "UPDATE_FRUIT_CRAZY_BOOM";
	public static REFRESH_FRUIT_LINE: string = "REFRESH_FRUIT_LINE";
	public static REFRESH_FRUIT_ROOM_INFO: string = "REFRESH_FRUIT_ROOM_INFO";

	public static OPEN_DUOBAO_BATTLE: string = "OPEN_DUOBAO_BATTLE";
	public static CLOSE_DUOBAO_BATTLE: string = "CLOSE_DUOBAO_BATTLE";
	public static OPEN_DUOBAO_ROOM_UI: string = "OPEN_DUOBAO_ROOM_UI";
	public static CLOSE_DUOBAO_ROOM_UI: string = "CLOSE_DUOBAO_ROOM_UI";
	public static DUOBAO_RFRESH_STAKE_VALUE: string = "DUOBAO_RFRESH_STAKE_VALUE";
	public static DUOBAO_RFRESH_LINE_VALUE: string = "DUOBAO_RFRESH_LINE_VALUE";
	public static DUOBAO_START: string = "DUOBAO_START";
	public static SHOW_DUOBAO_HELP_UI: string = "SHOW_DUOBAO_HELP_UI";
	public static CLOSE_DUOBAO_HELP_UI: string = "CLOSE_DUOBAO_HELP_UI";
	public static SHOW_DUOBAO_EXIT_UI: string = "SHOW_DUOBAO_EXIT_UI";
	public static CLOSE_DUOBAO_EXIT_UI: string = "CLOSE_DUOBAO_EXIT_UI";
	public static DUOBAO_ADD_MONEY: string = "DUOBAO_ADD_MONEY";
	public static REFRESH_DUOBAO_REWARD_POOL: string = "REFRESH_DUOBAO_REWARD_POOL";
	public static SHOW_DUOBAO_BALL_COMPLETE: string = "SHOW_DUOBAO_BALL_COMPLETE";
	public static SHOW_DUOBAO_SETTING: string = "SHOW_DUOBAO_SETTING";
	public static OPEN_DUOBAO_FINAL: string = "OPEN_DUOBAO_FINAL";
	public static DUOBAO_OPEN_OTHRES: string = "DUOBAO_OPEN_OTHRES";
	public static UPDATE_DUOBAO_BATTLE: string = "UPDATE_DUOBAO_BATTLE"

	public static REFRESH_DUOBAO_TOTAL_MONEY: string = "REFRESH_DUOBAO_TOTAL_MONEY";
	public static DUOBAO_SHOW_LEVEL_TIPS: string = "DUOBAO_SHOW_LEVEL_TIPS";
	public static KICK_FROM_SERVER: string = "KICK_FROM_SERVER";
	public static OPEN_HELP_UI: string = "OPEN_HELP_UI";
	public static CLOSE_HELP_UI: string = "CLOSE_HELP_UI";
	public static BACK_HHDZ:string = "BACK_HHDZ";

		//奔驰宝马
	public static OPEN_BCBM_ROOM_UI:string = "OPEN_BCBM_ROOM_UI";
	public static OPEN_BCBM_BATTLE_UI : string = "OPEN_BCBM_BATTLE_UI";
	public static CLOSE_BCBM_BATTLE_UI : string = "CLOSE_BCBM_BATTLE_UI";
	public static OPEN_BCBM_HISTORY_UI : string = "OPEN_BCBM_HISTORY_UI";
	public static CLOSE_BCBM_ROOM_UI: string = "CLOSE_BCBM_START_UI";
	



	//战绩查询界面
	public static OPEN_ZJCX_UI: string = "OPEN_ZJCX_UI";
	public static CLOSE_ZJCX_UI: string = "CLOSE_ZJCX_UI";

	//玩家历史纪录界面
	public static OPEN_PLAYER_RECORD: string = "OPEN_PLAYER_RECORD";

	public static CANCEL_MAIN_GAME_ICON_TOUCH: string = "CANCEL_MAIN_GAME_ICON_TOUCH";

	public static REFRESH_GAME_ICONS: string = "REFRESH_GAME_ICONS";
	public static DESTORY_ONE_BOX: string = "DESTORY_ONE_BOX";
	public static ADD_DUOBAO_REWARD: string = "ADD_DUOBAO_REWARD"

	public static MOENY_NOT_ENOUGH: string = "MOENY_NOT_ENOUGH";
	public static NO_MONEY_CHARGE_CANCEL: string = "NO_MONEY_CHARGE_CANCEL";

	public static OPEN_BANK_UI: string = "OPEN_BANK_UI";
	public static OPEN_SETTING_UI: string = "OPEN_SETTING_UI";

	public static DESIDE_BANKERLIST_POS:string = "DESIDE_BANKERLIST_POS";
	public static SHOW_BANKERLIST_DATA:string = "SHOW_BANKERLIST_DATA";
	public static CLOSE_BANKERLIST:string = "CLOSE_BANKERLIST";
}