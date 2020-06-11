module game.ddz {
    export class DDZAnimHelper {
        public static getAnim(animInfo:string):DragonAnim {
            let anim = new DragonAnim();
            anim.anim = animInfo;
            anim.aligntype = "middle";
            anim.width = anim.height = 100;
            anim.isTouchByGroup = true;
            anim.touchChildren = anim.touchEnabled = false;
            anim.playOnStage = false;
            anim.isloop = false;
            return anim;
        }
    }
}