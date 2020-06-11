module game.by {
    export class BYLine {
        p1:egret.Point;
        p2:egret.Point;

        getCenterPoint() {
            return new egret.Point((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2);
        }

        getRotation():number{
            let angle:number = Math.atan((this.p2.y - this.p1.y) /(this.p2.x - this.p1.x));
            if(this.p2.x < this.p1.x) {
				angle = angle*180/3.1415926-180;
			} else {
				angle = angle*180/3.1415926;
            }
            return angle;
        }

        getLength() {
            return egret.Point.distance(this.p1, this.p2)
        }

        static genLines(arr:Array<NFish|NFishRing>):Array<BYLine>{
            let ret:Array<BYLine> = [];
            let usedArr:Array<NFish|NFishRing> = [];
            
            for(let j=0;j<arr.length;j++) {
                usedArr.push(arr[j]);
                let b = new egret.Point(arr[j].x, arr[j].y);
                for(let i=0;i<arr.length;i++) {
                    if(usedArr.indexOf(arr[i]) >= 0) {
                        continue;
                    }
                    let line = new BYLine();
                    line.p1 = b;
                    line.p2 = new egret.Point(arr[i].x, arr[i].y);

                    ret.push(line);
                }    
            }

            return ret;
        }
    }


}