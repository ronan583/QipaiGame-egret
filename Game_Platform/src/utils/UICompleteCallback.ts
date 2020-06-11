module game {
    export class UICompleteCallback {
        public funcname:string ;
        public param:any[];
        public constructor(funcname:string, ...params:any[]) {
            this.funcname = funcname;
            this.param = params;
        }

    }
}
