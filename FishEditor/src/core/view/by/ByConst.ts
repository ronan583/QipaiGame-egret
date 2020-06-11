module game.by {
	export class ByConst {
		public constructor() {
		}

		public static getBulletImg(cannonIndex:number) : string {
			if(cannonIndex == 0) {
				return "by_fire2";
			} else if(cannonIndex == 1) {
				return "by_fire3";
			} else if(cannonIndex == 2) {
				return "by_fire6";
			}
			return ""; 
		}

		public static getHitGridImg(cannonIndex:number) : string {
			if(cannonIndex == 0) {
				return "by_hit_grid2";
			} else if(cannonIndex == 1) {
				return "by_hit_grid2";
			} else if(cannonIndex == 2) {
				return "by_hit_grid3";
			}
			return ""; 
		}
	}
}