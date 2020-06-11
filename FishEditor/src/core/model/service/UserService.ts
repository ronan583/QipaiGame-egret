module game {

    export class UserService {
        private static _instance: UserService;

        static get instance(): UserService {
            if (!this._instance) {
                this._instance = new UserService();
            }
            return this._instance;
        }

        public static resetInstance() {
            this._instance = null;
        }
        public lat: string = "0";
        public lng: string = "0";
        public clientIp: string = "";
        public static curGuestLoginDeviceId: string;

        //性别
        private _sex: boolean = true; //true == n男 false 女
        get sex() {
            return this._sex;
        }
        set sex(val: boolean) {
            this._sex = val;
        }

        //帐号puid
        private _puid: string = "";
        get puid() {
            return this._puid;
        }
        set puid(val: string) {
            this._puid = val;
        }
        //积分
        private _integral: number = 0;
        get integral() {
            return this._integral;
        }
        private _onlineCount: number = 0;
        get onlineCount() {
            return this._onlineCount;
        }

        private _ip: string = "";
        get ip() {
            return this._ip;
        }

        private _gpsInfo: string = "";
        get gpsInfo() {
            return this._gpsInfo;
        }
        set gpsInfo(value: any) {
            this._gpsInfo = value;
        }

        private _gameType: number = null;
        get gameType() {
            return this._gameType;
        }
        set gameType(value: number) {
            this._gameType = value;
        }


        //玩家名
        private _name: string = "";
        get name() {
            return this._name;
        }

        //是否有俱乐部
        private _isHaveClub: boolean = false;
        get isHaveClub() {
            return this._isHaveClub;
        }
        //玩家ID
        private _playerId: number = 0;
        get playerId() {
            return this._playerId;
        }
        //玩家ID
        private _userId: string = "";
        get userId() {
            return this._userId;
        }


        private _vipLevel: number = 0;
        get vipLevel() {
            return this._vipLevel;
        }

        public exchangeMoney: number = 0;

        private _money: number = 0;
        get money() {
            return this._money;
        }
        set money(value: number) {
            this._money = Number(value);

        }
        private _bankMoney: number = 0;
        get bankMoney() {
            return this._bankMoney;
        }
        private _level: number = 0;
        get level() {
            return this._level;
        }
        private _exp: number = 0;
        get exp() {
            return this._exp;
        }
        private _totalExp: number = 0;
        get totalExp() {
            return this._totalExp;
        }

        private _vipExp: number = 0;
        get vipExp() {
            return this._vipExp;
        }
        private _vipTotlExp: number = 0;
        get vipTotlExp() {
            return this._vipTotlExp;
        }
        private _headNum: number = 0;
        get headNum() {
            return this._headNum;
        }
        private _headFrameNum: number = 0;
        get headFrameNum() {
            return this._headFrameNum;
        }
        private _mobile: string = "";
        get mobile() {
            return this._mobile;
        }

        private _tempPassword: string = "";
        set tempPassword(value) {
            this._tempPassword = value;
        }
        get tempPassword() {
            return this._tempPassword;
        }

        private _password: string = "";
        get password() {
            return this._password;
        }
        private _code: number = 0;
        get code() {
            return this._code;
        }
        private _isFormal: boolean = false;
        get isFormal() {
            return this._isFormal;
        }
        private _isUpdateName: boolean = false;
        get isUpdateName() {
            return this._isUpdateName;
        }
        private _userAccount: string = "";
        get userAccount() {
            return this._userAccount;
        }

        //--------------------------old
        //房卡数量
        private _roomCardCount: number = 0;
        get roomCardCount() {
            return this._roomCardCount;
        }
        set roomCardCount(value: number) {
            this._roomCardCount = value;
        }

        //是否准备
        private _roomReady: boolean = false;
        get roomReady() {
            return this._roomReady;
        }
        set roomReady(value: boolean) {
            this._roomReady = value;
        }

        //当前房间id
        public static roomId: number = 0;

        private _roomOrder: number = 0;
        get roomOrder() {
            return this._roomOrder;
        }
        set roomOrder(value: number) {
            this._roomOrder = value;
        }


        //当前房间状态 true战斗中  false空闲中
        private _roomStatus: boolean = false;
        get roomStatus() {
            return this._roomStatus;
        }
        set roomStatus(value: boolean) {
            this._roomStatus = value;
        }
        //是否为房主
        private _isBanker: boolean = false;
        get isBanker() {
            return this._isBanker;
        }
        set isBanker(value: boolean) {
            this._isBanker = value;
        }

        //是否重连
        private _reconnectStatus: boolean = false;
        get reconnectStatus() {
            return this._reconnectStatus;
        }
        set reconnectStatus(value: boolean) {
            this._reconnectStatus = value;
        }

        //玩家头像
        private _headImg: string = "";
        get headImg() {
            return this._headImg;
        }

        //app url传过来的值
        private _urlInfo: string = "0";
        get urlInfo() {
            return this._urlInfo;
        }
        set urlInfo(value: string) {
            this._urlInfo = value;
        }

        //app wifi电量信息
        private _wifiInfo: string = "1_31";
        get wifiInfo() {
            return this._wifiInfo;
        }
        set wifiInfo(value: string) {
            this._wifiInfo = value;
        }

        //是否绑定银行卡
        private _bindingBank: string = null;
        get bindingBank() {
            return this._bindingBank;
        }
        set bindingBank(value: string) {
            this._bindingBank = value;
        }
        //是否绑定支付宝
        private _bindingAlipay: string = null;
        get bindingAlipay() {
            return this._bindingAlipay;
        }
        set bindingAlipay(value: string) {
            this._bindingAlipay = value;
        }

        //下一次请求验证码的时间
        public nextReqCodeTime: number = 0;

        public setNewUserInfo(data: any) {
            this._playerId = Number(data.playerId);
            this._userId = data.userId;
            this._name = data.nickName;
            this._vipLevel = data.vipLevel;
            this._money = data.money / 1000;
            this._bankMoney = data.bankMoney / 1000;
            this._level = data.level;
            this._exp = data.exp;
            this._totalExp = data.totalExp;
            this._vipExp = data.vipExp;
            this._vipTotlExp = data.vipTotlExp;
            this._headNum = data.headNum;
            this._headFrameNum = data.headFrameNum;
            this._isFormal = data.isFormal;
            this._isUpdateName = data.isUpateName;
            this._userAccount = data.userAccount;
            this._bindingBank = data.bindingBank;
            this._bindingAlipay = data.bindingAlipay;

            //性别
            if (this._headNum > 5) {
                this.sex = false;
            } else {
                this._sex = true;
            }

            if (Global.isNative) {
                var mc: string = data.macAddress;
                var mcs: string[] = mc.split("#");
                NativeApi.setLocalData("user_login_account", data.userAccount);
                NativeApi.setLocalData("user_login_password", data.password);
                NativeApi.setLocalData("user_login_deviceid", mcs[0]);

                //正式用户账号信息
                if (data.isFormal) {
                    NativeApi.setLocalData("user_login_account_formal", data.userAccount);
                    NativeApi.setLocalData("user_login_password_formal", data.password);
                }
            }
        }

        public syncPlayerInfo(data: any) {
            this._money = data.money / 1000;
            this._bankMoney = data.bankMoney / 1000;
            this._vipLevel = data.vipLevel;
            this._level = data.level;
            this._exp = data.exp;
            this._totalExp = data.totalExp;
        }

        public setRegistAccount(data: any) {
            this._mobile = data.mobile;
            this._isFormal = true;
            this._userAccount = data.mobile;
        }

        public updateCode(data: any) {
            this._code = data.result;
        }

        public updateHeadNum(data: any) {
            if (data.type == 1) {
                this._headNum = data.number;
            } else if (data.type == 2) {
                this._headFrameNum = data.number;
            } else {
                console.log("[error]OPUpateHeadRet type .");
            }
        }

        public updateNikename(data: any) {
            this._name = data.nickName;
        }

        public updatePassword(data: any) {
            this._password = data.password;
        }

        public updateMoney(data: any) {
            this._money = data;
        }

        public updateBankMoney(data: any) {
            this._bankMoney = data;
        }

        private _playerHeardInfoMap: HashMap = new HashMap();
        get playerHeardInfoMap() {
            return this._playerHeardInfoMap;
        }
        public putrHeardInfoMap(playerId: number, headerInfoVo: game.HeaderInfoVo): void {
            this._playerHeardInfoMap.put(playerId, headerInfoVo);
        }

        public getHeardInfoMap(playerId: number): game.HeaderInfoVo {
            return this._playerHeardInfoMap.get(playerId);
        }


        /***语音信息 */
        private _musicTypeMap: HashMap = new HashMap();
        public putMusicTypeMap(playerId: number, value: any): void {
            this._musicTypeMap.put(playerId, value);
        }

        public musicTypeMap(playerId: number): any {
            return this._musicTypeMap.get(playerId);
        }

        public cleanMusicTypeMap(): void {
            this._musicTypeMap.clear();
        }

        //房间位置
        private postionMap: HashMap = new HashMap();
        public putPostionMap(playerId: number, postion: number): void {
            this.postionMap.put(playerId, postion);
        }
        public getPostionMap(playerId: number): number {
            return this.postionMap.get(playerId);
        }

    }
}