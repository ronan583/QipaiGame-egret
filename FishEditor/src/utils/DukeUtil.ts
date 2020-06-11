module dukeutil {
    export class FanGroup extends egret.Shape {
        public unitDrawAngle: number = 0.12;
        public radius: number;
        public constructor(radius: number) {
            super();
            this.radius = radius;
        }
        /**
         * [{label:"",percent:0-1,color:?},....]//total must be 100
         * */
        public init(data: any[]) {
            var len: number = data.length;
            var percent: number;
            var color: number;
            var startAngle: number = 0;
            var endAngle: number = 0;
            var circle: number = Math.PI * 2;
            var item: Object;
            while (len > 0) {
                item = data[len - 1];
                endAngle = startAngle + item["percent"] * circle;
                this.drawFan(startAngle, endAngle, item["color"] !== undefined ? item["color"] : Math.random() * 0xffffff);
                startAngle = endAngle;
                len--;
            }
            this.graphics.endFill();
        }

        public drawFan(startAngle: number, endAngle: number, color: number) {
            var g: egret.Graphics = this.graphics;
            var tx: number;
            var ty: number;
            g.beginFill(color);
            var times: number = Math.ceil((endAngle - startAngle) / this.unitDrawAngle);
            var tempAngle: number = startAngle;

            g.moveTo(this.radius, this.radius);
            tx = this.radius * (1 + Math.cos(startAngle));
            ty = this.radius * (1 - Math.sin(startAngle));
            g.lineTo(tx, ty);

            while (times > 0) {
                if (times != 1) {
                    tx = this.radius * (1 + Math.cos(tempAngle + this.unitDrawAngle));
                    ty = this.radius * (1 - Math.sin(tempAngle + this.unitDrawAngle));
                } else {
                    tx = this.radius * (1 + Math.cos(endAngle));
                    ty = this.radius * (1 - Math.sin(endAngle));
                }
                g.lineTo(tx, ty);

                tempAngle += this.unitDrawAngle;
                times--;
            }
            g.lineTo(this.radius, this.radius);
            g.endFill();
        }
    }
}