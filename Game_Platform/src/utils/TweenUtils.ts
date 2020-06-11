/**
  * 动画方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 使用方法如：Global.setCookie()
  */

module TweenUtils {
    export function getMovieClip(fileName: string , clipName : string): egret.MovieClip {
        var data = RES.getRes(fileName + "_mc_json");
        var txtr = RES.getRes(fileName + "_tex_png");
        var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var role: egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(clipName));
        return role;
    }

    export function playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
            // if (isLoop) {
                for (var key in target.items) {
                    target.items[key].props = { loop: isLoop };
                }
            // }
            target.play(0);
    }
    
    export function stopAnimation(target: egret.tween.TweenGroup): void {
            // if (isLoop) {
                for (var key in target.items) {
                    target.items[key].stop();
                }
            // }
            target.play(0);
    }

}