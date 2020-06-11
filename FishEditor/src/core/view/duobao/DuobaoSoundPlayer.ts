module game.duobao {
	export enum DuobaoSoundType {
		DUOBAO_BACKGROUND,
		BIG_WIN,
		BOX_DESTORY,
		BOX_EFFECT,
		GEM_DESTORY,
		GEM_FALL,
		ROUND_OVER,
		JUMP,
		ZUAN_DESTORY	
	}

	export class DuobaoSoundPlayer {
		private static _instance:DuobaoSoundPlayer;
		public static get instance():DuobaoSoundPlayer {
			if(DuobaoSoundPlayer._instance == null) {
				DuobaoSoundPlayer._instance = new DuobaoSoundPlayer();
			}
			return DuobaoSoundPlayer._instance;
		}

		private soundMap:{[key:number]: string;} = {}

		public constructor() {
			this.soundMap[DuobaoSoundType.DUOBAO_BACKGROUND] = "duobao_background_mp3";
			this.soundMap[DuobaoSoundType.BIG_WIN] = "duobao_big_win_mp3";
			this.soundMap[DuobaoSoundType.BOX_DESTORY] = "duobao_box_destory_mp3";
			this.soundMap[DuobaoSoundType.BOX_EFFECT] = "duobao_box_effect_mp3";
			this.soundMap[DuobaoSoundType.GEM_DESTORY] = "duobao_gem_destory_mp3";
			this.soundMap[DuobaoSoundType.GEM_FALL] = "duobao_gem_fall_mp3";
			this.soundMap[DuobaoSoundType.ROUND_OVER] = "duobao_round_over_mp3";
			this.soundMap[DuobaoSoundType.JUMP] = "duobao_jump_mp3";
			this.soundMap[DuobaoSoundType.ZUAN_DESTORY] = "duobao_zuan_destory_mp3";
		}

		public playBg():void {
			SoundMenager.instance.playBg("duobao_background_mp3");
		}

		public backToMainBg():void {
			SoundMenager.instance.playBg("hallBG_mp3");
		}

		public playSound(soundType:DuobaoSoundType) {
			let ddzMediator:game.duobao.DuoBaoBattleMediator = AppFacade.instance.retrieveMediator(game.duobao.DuoBaoBattleMediator.NAME) as game.duobao.DuoBaoBattleMediator;
			if(ddzMediator == null || !ddzMediator.isUIShow()) {
				return;
			}
			let soundStr:string = this.soundMap[soundType];
			if(soundStr != undefined && soundStr != "") {
				SoundMenager.instance.playEffect(soundStr);
			}
		}

	}
}
