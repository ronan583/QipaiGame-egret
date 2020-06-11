module game.by {
	export class ByHitEffect implements IPool{
		free: boolean;
		poolKey: string;
		
		constructor(canonIndex:number) {
			this.canonIndex = canonIndex;
			this.poolKey = "fish_hit_effect_" + canonIndex;
			let s = "paotai" + (canonIndex < 10 ? "0" + canonIndex : canonIndex.toFixed(0)) + "_baozha";
			let dragonFactory = DragonCache.instance.getDragonFactory(s + "_ske_dbbin", s + "_tex_json", s + "_tex_png")
			this.armature = dragonFactory.buildArmature("Armature");
			this.display = this.armature.display;
			this.display.touchEnabled = false;
			this.display.touchChildren = false;
		}
		canonIndex:number = 0;
		armature: dragonBones.Armature;
		display: dragonBones.EgretArmatureDisplay;
		public play() {
			if (!dragonBones.WorldClock.clock.contains(this.armature)) {
				dragonBones.WorldClock.clock.add(this.armature);
			}
			this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAnimComplete, this);
			this.armature.animation.play("baozha");
		}

		private onAnimComplete() {
			if(this.display.parent) {
				this.display.parent.removeChild(this.display);
			}
			this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAnimComplete, this);
			PoolManager.instance.pushObj(this);
		}

		reset(): void {
			dragonBones.WorldClock.clock.remove(this.armature);
			this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.onAnimComplete, this);
		}
	}

	export class ByConst {
		public constructor() {
		}

		public static getBulletImg(cannonIndex:number) : string {
			return "zidan" + (cannonIndex < 10 ? "0" + cannonIndex : cannonIndex.toFixed(0)) + "_png";
		}

		public static getHitGridImg(cannonIndex:number) : ByHitEffect {
			let key = "fish_hit_effect_" + cannonIndex;
			let obj = PoolManager.instance.popObj(key);
			if(!obj) {
				obj = new ByHitEffect(cannonIndex);
			}
			return <ByHitEffect>obj; 
		}
	}
}