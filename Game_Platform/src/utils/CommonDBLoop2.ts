module game {
	export class CommonDBLoop2 extends eui.UILayer {
		public constructor(dragonbonesData: string, textureData: string, texture: string,
			anim: string, isloop: boolean = true, playOnStage: boolean = true, isTouch:boolean = true) {
			super();
			this.dragonbonesData = dragonbonesData;
			this.textureData = textureData;
			this.texture = texture;
			this.anim = anim;
			this.isloop = isloop;
			this.playOnStage = playOnStage;
			this.isTouch = isTouch;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addToStage, this);

		}

		public armature: dragonBones.Armature;
		private dragonbonesData: string;
		private textureData: string;
		private texture: string;
		private startTime: number = 0;
		private anim: string;
		private isTouch:boolean = true;
		public isloop: boolean = false;

		public playOnStage: boolean = true;
		public animDisplay:dragonBones.EgretArmatureDisplay;

		protected createChildren(): void {
			super.createChildren();
			let factory = DragonCache.instance.getDragonFactory(this.dragonbonesData, this.textureData, this.texture);
			this.armature = factory.buildArmature("Armature");
			let display: dragonBones.EgretArmatureDisplay = this.armature.display;
			this.addChild(display);
			this.animDisplay = display;
			this.animDisplay.touchEnabled = this.isTouch;
			this.animDisplay.touchChildren = this.isTouch;
			if (this.playOnStage) {
				this.armature.animation.play(this.anim, this.isloop ? 0 : 1);
			}
			this.startTime = egret.getTimer();
		}

		public playOnce(cont: number = 1) {
			if (!dragonBones.WorldClock.clock.contains(this.armature)) {
				dragonBones.WorldClock.clock.add(this.armature);
			}
			this.armature.animation.play(this.anim, this.isloop ? 0 : cont);
		}

		public play() {
			if(!dragonBones.WorldClock.clock.contains(this.armature)) {
				dragonBones.WorldClock.clock.add(this.armature)
			}
			this.armature.animation.play(this.anim, this.isloop ? 0 : 1);
		}

		public playerAnimOnce(anim: string, cont: number = 1) {
			if(!dragonBones.WorldClock.clock.contains(this.armature)) {
				dragonBones.WorldClock.clock.add(this.armature)
			}
			egret.log("播放================" + anim + "  " +this.isloop);
			this.armature.animation.play(anim, this.isloop ? 0 : cont);
		}

		public playAnim(anim:string) {
			if(!dragonBones.WorldClock.clock.contains(this.armature)) {
				dragonBones.WorldClock.clock.add(this.armature)
			}
			this.armature.animation.play(anim, 0);
		}

		public showFrame(anim:string, frame:number) {
			this.armature.animation.gotoAndStopByFrame(anim, frame);
		}

		public playFromFrame(frame:number) {
			this.armature.animation.gotoAndStopByFrame(this.anim, frame);
			this.armature.animation.play(this.anim, 1);
		}

		public playFromProgress(progress:number) {
			this.armature.animation.gotoAndPlayByProgress(this.anim, progress, 1);
		}
		public showProgress(progress:number, anim:string = "") {
			if(anim == "") {
				this.armature.animation.gotoAndStopByProgress(this.anim, progress);
			} else {
				this.armature.animation.gotoAndStopByProgress(anim, progress);
			}
		}

		private addToStage() {
			dragonBones.WorldClock.clock.add(this.armature);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		}

		private removeStage() {
			dragonBones.WorldClock.clock.remove(this.armature);
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
		}

		/**
         * 替换插槽图片。
         * @param slotName - 插槽名称。
         * @param textureName - 素材名称。
         */
		public setNewSlot(slotName: string, textureName: string) {
			//方法1
			var slot: dragonBones.Slot = this.armature.getSlot(slotName);
			var b: egret.Bitmap = new egret.Bitmap();
			b.texture = RES.getRes(textureName);
			b.x = slot.display.x;
			b.y = slot.display.y;
			b.anchorOffsetX = b.width / 2;
			b.anchorOffsetY = b.height / 2;
			slot.setDisplay(b);
		}

		public stop() {
			dragonBones.WorldClock.clock.remove(this.armature);
		}
	}
}