/**
  * 系统消息协议号
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
class ProtocolConstant {
  public constructor() {

  }

  public static OPSYNCH_PLAYER_INFO : number = 10002;
  public static OPPushBroadcast : number = 10003; 
  
  //登录
  public static OPCODE_PLAYER_LOGIN: number = 20001;
  public static OPCODE_HEART_BEAT: number = 20002;
  public static OPCODE_REGISTER_ACCOUNT: number = 20003;
  public static OPCODE_GET_CODE: number = 20004;
  public static OPCODE_UPATE_HEAD: number = 20005;
  public static OPCODE_UPATE_NICK_NAME: number = 20006;
  public static OPCODE_UPATE_PASSWORD: number = 20007;
  public static OPCODE_OFFLINE: number = 20008;
  public static OPCODE_OPERATOR_MONEY: number = 20009;
  public static OPCODE_NOTICE_LIST: number = 20010;
  public static OPCODE_NOTICE_DETAIL: number = 20011;
  public static OPCODE_CUSTOMER_SERVICE: number = 20012;
  public static OPCODE_RANKING: number = 20013;
  public static OPCODE_SETUP_BANK: number = 20014;
  public static OPCODE_EXCHANGE_RECORD: number = 20015;
  public static OPCODE_EXCHANGE_MONEY: number = 20016;
  public static OPCODE_UPDATE_GPS_INFO: number = 20019;

  //房间模块
  public static OPCODE_ROOM_MODLE:number   = 30000; 
	//进入房间
	public static OPCODE_ENTER_ROOM:number   = 30001;
  // 离开房间
  public static OPCODE_ROOM_EXIT:number = 30004;
  // 托管
  public static OPCODE_TRUSTEESHIP:number = 30005;
	//聊天
	public static OPCODE_CHAT_INFO:number    = 30002;

  public static OPCODE_SEE_HEAD:number   = 30006;

  public static OPCODE_REQ_GAME_RULE:number = 30008;

  public static OPCODE_ROOM_BANKER_LIST:number = 30010;
	//准备
  public static OPCODE_ROOM_READY:number = 30011;
  //战绩查询
  public static OPCODE_ZJCX_RECORD:number   = 30007;
  //玩家的历史记录
  public static OPCODE_ROOM_PLAYER_RECORD:number   = 30012;

  // 平三张
  public static OPCODE_THREE_START_GAME:number = 70001;
  public static OPCODE_THREE_BETS:number = 70002;
  public static OPCODE_THREE_LOOK_CARD:number = 70003;
  public static OPCODE_THREE_DISCARDCARD:number = 70004;
  public static OPCODE_THREE_ALWAYSSET:number = 70005;
  public static OPCODE_THREE_COMPARISON_CARD:number = 70006;
  public static OPCODE_THREE_BRIGHT_CARD:number  = 70008; 
  
  //抢压牛牛
  public static OPCODE_QYNN_ROBBANKER : number = 100001; 
  public static OPCODE_QYNN_ROBSTAKE : number = 100003; 
  public static OPCODE_QYNN_ROBLOOKCARD : number = 100005
  public static OPCODE_QYNN_FIRSTROOM : number = 100008;
  
  //百人牛牛
  public static OPCODE_BRNN_BRENSTAKE : number = 90002; 
  public static OPCODE_BRNN_APLLYBANKER : number = 90003; 
  public static OPCODE_BRNN_PLAYERRANK : number = 90004; 
  public static OPCODE_BRNN_HISTORY : number = 90006; 
  public static OPCODE_BRNN_DOWNBANKER : number = 90007; 
  public static OPCODE_FIRST_ROOM_PUSH : number = 90009;
  public static OPCODE_BRNN_SINGLE : number = 90010; 
  public static OPCODE_BRNN_ROOMLIST : number = 90011;

  //骰宝
  public static OPCODE_DICEBAO_MODLE : number = 190000; 
  public static OPCODE_DICEBAO_STATUS : number = 190001; 
  public static OPCODE_DICEBAO_STAKE : number = 190002; 
  public static OPCODE_DICEBAO_START_GAME : number = 190003; 
  public static OPCODE_DICEBAO_PLAYER_RANK : number = 190004; 
  public static OPCODE_DICEBAO_WIN_FAIL : number = 190005; 
  public static OPCODE_DICEBAO_FIRST_ROOM_PUSH : number = 190006; 
  public static OPCODE_DICEBAO_ROOM_SINGLE : number = 190007; 
  public static OPCODE_DICEBAO_ROOM_LIST : number = 190008;
  public static OPCODE_DICEBAO_UP_BANKER : number = 190009;
  public static OPCODE_DICEBAO_DOWN_BANKER : number = 190010;
  public static OPCODE_DICEBAO_CONTINUE_STAKE : number = 190011;

  //飞禽走兽
  public static OPCODE_FQZS_STAKE : number = 210002;
  public static OPCODE_FQZS_PLAYERRANK : number = 210004; 
  public static OPCODE_FQZS_HISTORY : number = 210005; 
  public static OPCODE_FQZS_UPBANKER : number = 210009;
  public static OPCODE_FQZS_DOWNBANKER : number = 210010;

  //龙虎大战
  public static OPCODE_LHDZ_STAKE : number = 80002;
  public static OPCODE_LHDZ_PLAYERRANK : number = 80003; 
  public static OPCODE_LHDZ_HISTORY : number = 80004; 
  public static OPCODE_LHDZ_FIRSTROOM : number = 80006; 
  public static OPCODE_LHDZ_ROOM_SINGLE : number = 80007;
  public static OPCODE_LHDZ_ROOM_LIST : number = 80008;
  public static OPCODE_LHDZ_UP_BANKER : number = 80009;
  public static OPCODE_LHDZ_DOWN_BANKER : number = 80010;

  //红黑大战
  public static OPCODE_HHDZ_STAKE : number = 130002;
  public static OPCODE_HHDZ_PLAYERRANK : number = 130003; 
  public static OPCODE_HHDZ_HISTORY : number = 130004; 
  public static OPCODE_HHDZ_FIRSTROOM : number = 130006;
  public static OPCODE_HHDZ_ROOM_SINGLE : number = 130007;
  public static OPCODE_HHDZ_ROOM_LIST : number = 130008;
	//申请上庄
	public static OPCODE_REDBLACK_UP_BANKER : number   = 130009; 
	//申请下庄
	public static OPCODE_REDBLACK_DOWN_BANKER : number   = 130010; 

  //百家乐
  public static OPCODE_BJL_ROOMLIST : number = 140001;
  public static OPCODE_BJL_STAKE : number = 140002;
  public static OPCODE_BJL_PLAYERRANK : number = 140003; 
  public static OPCODE_BJL_FIRST_ROOM_PUSH : number = 140006;
  public static OPCODE_BJL_SINGLEROOM : number = 140007; 
  public static OPCODE_BJL_HISTORY : number = 140008; 
  //申请上庄
	public static OPCODE_BACCARA_UP_BANKER:number   = 140009; 
	//申请下庄
	public static OPCODE_BACCARA_DOWN_BANKER:number   = 140010; 

  //糖果派对
  public static OPCODE_TGPD_ENTERGAME : number = 170001;
  public static OPCODE_TGPD_STAKE : number = 170002;
  public static OPCODE_TGPD_LINE : number = 170003; 
  public static OPCODE_TGPD_STARTGAME : number = 170004; 
  public static OPCODE_TGPD_EXIT : number = 170005; 
  

  //二人麻将
  public static OPCODE_ERMJ_PLAYBATTLE : number = 40002; 
  public static OPCODE_ERMJ_CHECKROOM : number = 40005; 

  //战斗结束
	public static OPCODE_THREE_BATTLE_FINSH:number  = 70009; 
	//玩家状态推送
	public static OPCODE_THREE_PLAYER_STATUS:number  = 70010; 

  //====================斗地主==============
  	//开始战斗
	public static OPCODE_DDZ_START_BATTLE   :number  =  60001;
	//叫分
	public static OPCODE_DDZ_CALL_SCORE   :number  =  60002;
	//加倍
	public static OPCODE_DDZ_DOUBLE   :number  =  60003;
	//出牌
	public static OPCODE_DDZ_STEP_BATTLE   :number  =  60005;
	//战斗完成
	public static OPCODE_DDZ_FINISH_BATTLE   :number  =  60006;
	//玩家重连
  public static OPCODE_DDZ_RECONNECT  :number  =  60007; 
  
  public static OPCODE_DDZ_REQ_MULTI : number = 60008;
  //====================斗地主END==============

  //====================跑得快==============
  	//开始战斗
	public static OPCODE_PDK_START_BATTLE   :number  =  50001;
	//出牌
	public static OPCODE_PDK_STEP_BATTLE   :number  =  50002;
	//战斗完成
	public static OPCODE_PDK_FINISH_BATTLE   :number  =  50003;
	//玩家重连
	public static OPCODE_PDK_RECONNECT  :number  =  50004; 

  //=====================德州扑克=================
  	//开始游戏
	public static OPCODE_TEXASPOKER_STARTGAME  :number   = 110001; 
	//操作
	public static OPCODE_TEXASPOKER_STEP  :number   = 110002; 
	//发牌
	public static OPCODE_TEXASPOKER_DEALCARD   :number  = 110003; 
	//完成
	public static OPCODE_TEXASPOKER_FINISH  :number  = 110004; 
	//第一次进入游戏
	public static OPCODE_TEXASPOKER_FISRT  :number  = 110005; 

  public static OPCODE_TEXASPOKER_AUTOSET : number = 110006;  
  //=====================德州扑克END=================
  //====================捕鱼==============
  // 进入房间 游戏开始
	//首次进入房间
	public static OPCODE_FISHES_FIRST_ROOM_PUSH: number   = 150001; 
	public static OPCODE_FISHES_BATTLE_STEP: number   = 150002; //射击
	//死亡
	public static OPCODE_FISHES_DEAD_PUSH: number   = 150003; 
	//设置子弹
	public static OPCODE_FISHES_SET_MONEY: number   = 150004; 
	//射击方式
	public static OPCODE_FISHES_CHANGE_SHOOT: number   = 150005; 
  public static OPCODE_GENERATE_FISHES_PUSH: number = 150006;
  public static OPCODE_FISHES_OUT: number = 150007;
  public static OPCODE_FISHES_BATTLE_HIT: number = 150008;
  // 鱼群创建时间
  public static OPCODE_FISHES_GROUP_CREATE: number = 150009;
  public static OPCODE_FISHES_CHANGE_CANON:number = 150010;
  //====================捕鱼end==============
  //====================水果机==============
  public static OPCODE_FRUITS_MODLE : number  = 160000; 
	//设置金额
	public static OPCODE_FRUITS_SET_MONEY : number  = 160001; 
	//开始游戏
	public static OPCODE_FRUITS_START_GAME : number  = 160002; 
	//获取所有房间坚持信息
	public static OPCODE_FRUITS_ALL_ROOM_POOL : number  = 160003; 
	//房间奖池推送
	public static OPCODE_FRUITS_ROOM_POOL_PUSH : number  = 160004;
    //水果大战推送
    public static OPCODE_FRUITS_WAR_PUSH : number  = 160005;
    //水果大战 设置线路
    public static OPCODE_FRUITS_SET_LINE : number  = 160006;
    // 获取房间信息
    public static OPCODE_FRUITS_GET_ROOM: number = 160007;
    //====================水果机end==============
   //====================夺宝==============
  //进入游戏
	public static OPCODE_TREASURE_ENTER_GAME : number  = 180001; 
	//设置下注
	public static OPCODE_TREASURE_SET_STAKE : number  = 180002; 
	//设置线数
	public static OPCODE_TREASURE_SET_LINE : number  = 180003; 
	//开始游戏
	public static OPCODE_TREASURE_START_GAME : number  = 180004; 
	//退出游戏
  public static	OPCODE_TREASURE_EXIT_GAME : number  = 180005; 
  //====================夺宝end==============
  public static ERROR_INFO_UPLOAD: number = 20017;

  //=========================奔驰宝马=======================
  //下注
  public static OPCODE_BENZBMW_STAKE: number = 200002;
  //在线玩家
  public static OPCODE_BENZBMW_PLAYER_RANK:number = 200004;
  //历史结果
  public static OPCODE_BENZBMW_WIN_FAIL: number = 200005;
  //申请上庄
  public static OPCODE_BENZBMW_UP_BANKER: number = 200009;
  //申请下庄
  public static OPCODE_BENZBMW_DOWN_BANKER: number = 200010;

}



