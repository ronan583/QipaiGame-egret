module game {

    export class HeaderInfoVo {
        private _id: number;
        private _name: string;
        private _ip: string;
        private _texture: egret.Texture;
        public constructor(id: number, name: string, ip: string,texture: egret.Texture) {
            this._id = id;
            this._name = name;
            this._ip = ip;
            this._texture = texture;
        }
        get id(): number {
            return this._id;
        }
        get name(): string {
            return this._name;
        }
        get ip(): string {
            return this._ip;
        }
        get texture(): egret.Texture {
            return this._texture;
        }
        set texture(value: egret.Texture) {
            this._texture = value;
        }
    }
}