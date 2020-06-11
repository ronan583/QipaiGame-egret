module game {
	export class SocketProxy {
		public static CONNECT_TIMEOUT = "CONNECT_TIMEOUT";

		private socket:egret.WebSocket;

		public constructor() {
			this.socket = new egret.WebSocket();
			this.socket.type = egret.WebSocket.TYPE_BINARY;
	    }

	    private hasCallConnected:boolean = false;
		private startTime:number;
		private eventBindArr:Array<any> = [];

		public get connected():boolean {
			return this.socket.connected;
		}

		public close() {
			this.socket.close();
		}

		public connectByUrl(url:string) {
			if(this.hasCallConnected) {
				return ;	
			}
			this.socket.connectByUrl(url);
			this.hasCallConnected = true
			if(!Global.isInitConnect) {
				this.startCheck();
			}
		}
		public connect(host:string, port:number) {
			if(this.hasCallConnected) {
				return ;	
			}
			this.socket.connect(host, port);
			this.hasCallConnected = true
			if(!Global.isInitConnect) {
				this.startCheck();
			}
		}

		private startCheck() {
			this.startTime = egret.getTimer();
			egret.startTick(this.updateCheckConnectState, this);
		}

		private updateCheckConnectState(timestamp:number):boolean {
			if(timestamp - this.startTime > 10000) {
				if(!this.socket.connected) {
					// 超出5秒还没连接上
					this.socket.dispatchEvent(new egret.Event(SocketProxy.CONNECT_TIMEOUT));
					this.dispose();
				}
				egret.stopTick(this.updateCheckConnectState, this);
			}
			return false;
		}

		public dispose() {
			this.socket.close();
			for(let e of this.eventBindArr) {
				this.socket.removeEventListener(e.type, e.listener, e.caller);
				egret.log("socket dispose remove event " + e.type);
			}
		}

		public cancelCheck() {
			egret.stopTick(this.updateCheckConnectState, this);
		}

		public addEventListener(type: string, listener: Function, thisObject: any) {
			this.socket.addEventListener(type, listener, thisObject);
			this.eventBindArr.push({type:type, listener:listener, caller:thisObject});
		}

		public writeBytes(bytes: egret.ByteArray, offset?: number, length?: number): void {
			this.socket.writeBytes(bytes, offset, length);
		}

		public readBytes(bytes: egret.ByteArray, offset?: number, length?: number): void {
			this.socket.readBytes(bytes, offset, length);
		}

		public flush() {
			this.socket.flush();
		}
	}
}