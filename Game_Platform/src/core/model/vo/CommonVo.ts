module game {

    export class CommonVo {
        private _type:number;
        private _info:string;
        public constructor(type:number,info:string ) {
            this._type = type;
            this._info=info;
        }
        get type() : number{
            return this._type;
        }
        get info() : string{
            return this._info;
        }
    }
}