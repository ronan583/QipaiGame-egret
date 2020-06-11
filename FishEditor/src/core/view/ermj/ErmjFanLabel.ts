module game.ermj {
	export enum MJHuType {
		unknow = 0,			//未知
		//88番
		dasixi = 101,		//大四喜 88
		dasanyuan = 102,	//大三元 88
		jiulianbd = 103,	//九莲宝灯
		sigang = 104,		//四杠
		qiliandui = 105,	//七连对
		tianhu = 106,		//天胡
		dihu = 107,			//地胡
		renhu = 108,		//人胡
		baiwanshi = 109,	//百万石
		//64番
		xiaosixi = 110,		//小四喜
		xiaosanyuan = 111,	//小三元
		ziyise = 112,		//字一色
		sianke = 113,		//四暗刻
		yiseshuanglh = 114,	//一色双龙会
		//48番
		yisesitongshun = 115,//一色四同顺
		yisesijiegao = 116,	//一色四节高
		//32番
		yisesibugao = 117,	//一色四步高
		sangang = 118,		//三杠
		hunjiuyao = 119,	//混九幺
		//24番
		qidui = 120, 		//七对
		qingyise = 121,		//清一色
		yisesantongshun = 122,	//一色三同顺
		yisesanjiegao = 123,//一色三节高
		//16番
		qinglong = 124,		//青龙
		yisesanbugao = 125,	//一色三步高
		sananke = 126,		//三暗刻
		tianting = 127,		//天听
		//12番
		dayuwu = 128,		//大于五
		xiaoyuwu = 129,		//小于五
		sanfengke = 130,	//三风刻
		//8番
		miaoshouhuichun = 131,	//妙手回春
		haidilaoyue = 132,	//海底捞月
		gangshangkaihua = 133,	//杠上开花
		qiangganghu = 134,	//抢杠胡
		//6番
		pengpenghu = 135,	//碰碰胡
		hunyise = 136,		//混一色
		quanqiuren = 137,	//全求人
		shuangangang = 138,	//双暗杠
		shuangjianke = 139,	//双箭刻
		//4番
		quandaiyao = 140,	//全带幺
		buqiuren = 141,		//不求人
		shuangminggang = 142,//双明杠
		hujuezhang = 143,	//胡绝张
		lizhi = 144,		//立直
		//2番
		jianke = 145,		//箭刻
		quanfengke = 146,	//圈风刻
		menqianqing = 147,	//门前清
		pinghu = 148,		//平胡
		sigui = 149,		//四归一
		shuanganke = 150,	//双暗刻
		angang = 151,		//暗杠
		duanyao = 152,		//断幺
		//1番
		erwubajiang = 153,	//二五八将
		yaojiutou = 154,	//幺九头
		baoting = 155,		//报听
		yibangao = 156,		//一般高
		lianliu = 157,		//连六
		laoshaofu = 158,	//老少副
		yaojiuke = 159,		//幺九刻
		minggang = 160,		//明杠
		bianzhang = 161,	//边张
		kanzhang = 162,		//坎张
		dandiaojiang = 163,	//单调将
		zimo = 164,			//自摸

	}
	export class ErmjFanLabel extends eui.Component implements eui.UIComponent {
		public constructor() {
			super();
			this.skinName = "resource/eui_skins/ermj/ErmjFanLabel.exml";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		public fanName: eui.Image;
		public fanNum: eui.BitmapLabel;

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public showLabel(fanType, winPlayerId) {
			var img = '';
			if (Number(winPlayerId) == UserService.instance.playerId) {
				this.fanNum.font = "ermj_win_times_fnt";
				img = 'ermj_battle_json.win_type_';
			} else {
				this.fanNum.font = "ermj_lose_times_fnt";
				img = 'ermj_battle_json.lose_type_';
			}
			this.fanNum.text = fanType.fan + "f";
			this.fanName.source = img + fanType.huType + '';
		}

		private getFanName(type) {
			switch (type) {
				case <number>MJHuType.unknow:
					return "返回为0";
				case <number>MJHuType.dasixi:
					return "大四喜";
				case <number>MJHuType.dasanyuan:
					return "大三元";
				case <number>MJHuType.jiulianbd:
					return "九莲宝灯";
				case <number>MJHuType.sigang:
					return "四杠";
				case <number>MJHuType.qiliandui:
					return "七连对";
				case <number>MJHuType.tianhu:
					return "天胡";
				case <number>MJHuType.dihu:
					return "地胡";
				case <number>MJHuType.renhu:
					return "人胡";
				case <number>MJHuType.baiwanshi:
					return "百万石";
				case <number>MJHuType.xiaosixi:
					return "小四喜";
				case <number>MJHuType.xiaosanyuan:
					return "小三元";
				case <number>MJHuType.ziyise:
					return "字一色";
				case <number>MJHuType.sianke:
					return "四暗刻";
				case <number>MJHuType.yiseshuanglh:
					return "一色双龙会";
				case <number>MJHuType.yisesitongshun:
					return "一色四同顺";
				case <number>MJHuType.yisesijiegao:
					return "一色四节高";
				case <number>MJHuType.yisesibugao:
					return "一色四步高";
				case <number>MJHuType.sangang:
					return "三杠";
				case <number>MJHuType.hunjiuyao:
					return "混九幺";
				case <number>MJHuType.qidui:
					return "七对";
				case <number>MJHuType.qingyise:
					return "清一色";
				case <number>MJHuType.yisesantongshun:
					return "一色三同顺";
				case <number>MJHuType.yisesanjiegao:
					return "一色三节高";
				case <number>MJHuType.qinglong:
					return "清龙";
				case <number>MJHuType.yisesanbugao:
					return "一色三步高";
				case <number>MJHuType.sananke:
					return "三暗刻";
				case <number>MJHuType.tianting:
					return "天听";
				case <number>MJHuType.dayuwu:
					return "大于五";
				case <number>MJHuType.xiaoyuwu:
					return "小于五";
				case <number>MJHuType.sanfengke:
					return "三风刻";
				case <number>MJHuType.miaoshouhuichun:
					return "妙手回春";
				case <number>MJHuType.haidilaoyue:
					return "海底捞月";
				case <number>MJHuType.gangshangkaihua:
					return "杠上开花";
				case <number>MJHuType.qiangganghu:
					return "抢杠胡";
				case <number>MJHuType.pengpenghu:
					return "碰碰胡";
				case <number>MJHuType.hunyise:
					return "混一色";
				case <number>MJHuType.quanqiuren:
					return "全求人";
				case <number>MJHuType.shuangangang:
					return "双暗杠";
				case <number>MJHuType.shuangjianke:
					return "双箭刻";
				case <number>MJHuType.quandaiyao:
					return "全带幺";
				case <number>MJHuType.buqiuren:
					return "不求人";
				case <number>MJHuType.shuangminggang:
					return "双明杠";
				case <number>MJHuType.hujuezhang:
					return "胡绝张";
				case <number>MJHuType.lizhi:
					return "立直";
				case <number>MJHuType.jianke:
					return "箭刻";
				case <number>MJHuType.quanfengke:
					return "圈风刻";
				case <number>MJHuType.menqianqing:
					return "门前清";
				case <number>MJHuType.pinghu:
					return "平胡";
				case <number>MJHuType.sigui:
					return "四归一";
				case <number>MJHuType.shuanganke:
					return "双暗刻";
				case <number>MJHuType.angang:
					return "暗杠";
				case <number>MJHuType.duanyao:
					return "断幺";
				case <number>MJHuType.erwubajiang:
					return "二五八将";
				case <number>MJHuType.yaojiutou:
					return "幺九头";
				case <number>MJHuType.baoting:
					return "报听";
				case <number>MJHuType.yibangao:
					return "一般高";
				case <number>MJHuType.lianliu:
					return "连六";
				case <number>MJHuType.laoshaofu:
					return "老少副";
				case <number>MJHuType.yaojiuke:
					return "幺九刻";
				case <number>MJHuType.minggang:
					return "明杠";
				case <number>MJHuType.bianzhang:
					return "边张";
				case <number>MJHuType.kanzhang:
					return "坎张";
				case <number>MJHuType.dandiaojiang:
					return "单调将";
				case <number>MJHuType.zimo:
					return "自摸";
				default:
					console.error("hu type error : " + type);
					break;
			}
		}
	}
}