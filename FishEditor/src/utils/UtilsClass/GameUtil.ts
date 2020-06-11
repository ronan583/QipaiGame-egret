module game {
    export class GameUtil {
        public static getStageWH():egret.Point{
            let p = new egret.Point();
            p.x = Math.min(egret.lifecycle.stage.stageWidth, 1624);
            p.y = egret.lifecycle.stage.stageHeight
            return p;
        }
    }
}