module game.ddz {
    export class DDZLordAnim {
        constructor(anim:DragonAnim, ddzBattleUI:DDZBattleUI) {
            this.anim = anim;
            this.ddzBattleUI = ddzBattleUI;
        }

        private anim:DragonAnim;
        private ddzBattleUI:DDZBattleUI;

        public hide() {
            this.anim.stop();
            this.anim.visible = false;
            egret.Tween.removeTweens(this.anim);
        }

        public playAnim(target:egret.DisplayObject, f:Function, fc:any) {
            this.anim.visible = true;
            let maxWidth = Math.min(egret.lifecycle.stage.stageWidth, 1624) / 2;
            let p = this.anim.parent.globalToLocal(maxWidth, egret.lifecycle.stage.stageHeight / 2)
            this.anim.x = p.x - this.anim.width / 2;
            this.anim.y = p.y - this.anim.height / 2 - 200;
            this.anim.setLoop(false);
            this.anim.playerOnce(()=>{
                // 飞向目标点
                this.anim.setLoop(true);
                this.anim.playerTimes(null, null, 0, "idle");
                let tp:egret.Point = target.parent.localToGlobal(target.x, target.y);
                tp = this.anim.parent.globalToLocal(tp.x, tp.y);
                egret.Tween.get(this.anim).to({
                    x: tp.x, y: tp.y
                }, 500).call(()=>{
                    if(f) {
                        f.call(fc);
                    }
                }, this.ddzBattleUI)
            }, this, "start");
        }
    }
}