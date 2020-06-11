module game.zjh {
	export enum ZJHSoundType {
		FOLLOW,
		ADD,
		DROP,
		FAIL,
		COMP,
		ALL_IN,
		SEE

	}
	export class ZJHSoundPlayer {
		private static _instance:ZJHSoundPlayer;
		public static get instance():ZJHSoundPlayer {
			if(ZJHSoundPlayer._instance == null) {
				ZJHSoundPlayer._instance = new ZJHSoundPlayer();
			}
			return ZJHSoundPlayer._instance;
		}
		public constructor() {
		}

		public playZjhBg():void {
			SoundMenager.instance.playBg("bg_mp3");
		}

		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playSound(playerId:number, soundType:ZJHSoundType) {
			let player:PlayerInfo = RoomManager.getInstance().curRoomData.getPlayerInfo(playerId);
			if(player == null) return;
			let sexStr:string = player.headNum % 2 == 0 ? "girl_" : "boy_";
			let soundStr:string = "";
			if(soundType == ZJHSoundType.FOLLOW) {
				soundStr = "follow_" + sexStr + CommonUtil.RandomRangeInt(1,4).toFixed(0) + "_mp3";
			}else if(soundType == ZJHSoundType.ALL_IN) {
				soundStr = "all_" + sexStr + CommonUtil.RandomRangeInt(1,4).toFixed(0) + "_mp3";
			}else if(soundType == ZJHSoundType.ADD) {
				soundStr = "add_" + sexStr + CommonUtil.RandomRangeInt(1,4).toFixed(0) + "_mp3";
			}else if(soundType == ZJHSoundType.DROP) {
				soundStr = "drop_" + sexStr + CommonUtil.RandomRangeInt(1,4).toFixed(0) + "_mp3";
			}else if(soundType == ZJHSoundType.FAIL) {
				soundStr = "fail_" + sexStr + CommonUtil.RandomRangeInt(1,4).toFixed(0) + "_mp3";
			}else if(soundType == ZJHSoundType.COMP) {
				soundStr = "cmp_" + sexStr + CommonUtil.RandomRangeInt(1,4).toFixed(0) + "_mp3";
			}else if(soundType == ZJHSoundType.SEE) {
				soundStr = "see_" + sexStr + CommonUtil.RandomRangeInt(1,4).toFixed(0) + "_mp3";
			}
			if(soundStr != "") {
				SoundMenager.instance.playEffect(soundStr);
			}
		}

	}
}