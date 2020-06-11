class xxtea
{
    private constructor(){}
    private static instance: xxtea;
    private _protoBufRoot;
    static getInstance(): xxtea{
        if(!xxtea.instance){
            xxtea.instance = new xxtea();
            xxtea.instance.initInstance();
        }
        return this.instance;
    }
    //init function
    private initInstance(){
    }
    ///////////////////////////////////////////////
    private delta:number = 0x9E3779B9;
    public toUint8Array(v, includeLength) {
        var length = v.length;
        var n = length << 2;
        if (includeLength) {
            var m = v[length - 1];
            n -= 4;
            if ((m < n - 3) || (m > n)) {
                return null;
            }
            n = m;
        }
        var bytes = new Uint8Array(n);
        for (var i = 0; i < n; ++i) {
            bytes[i] = v[i >> 2] >> ((i & 3) << 3);
        }
        return bytes;
    }

    public toUint32Array(bytes, includeLength) {
        var length = bytes.length;
        var n = length >> 2;
        if ((length & 3) !== 0) {
            ++n;
        }
        var v;
        if (includeLength) {
            v = new Uint32Array(n + 1);
            v[n] = length;
        }
        else {
            v = new Uint32Array(n);
        }
        for (var i = 0; i < length; ++i) {
            v[i >> 2] |= bytes[i] << ((i & 3) << 3);
        }
        return v;
    }

    public mx(sum, y, z, p, e, k) {
        return ((z >>> 5 ^ y << 2) + (y >>> 3 ^ z << 4)) ^ ((sum ^ y) + (k[p & 3 ^ e] ^ z));
    }

    public fixk(k) {
        if (k.length < 16) {
            var key = new Uint8Array(16);
            key.set(k);
            k = key;
        }
        return k;
    }

    public encryptUint32Array(v, k) {
        var length = v.length;
        var n = length - 1;
        var y, z, sum, e, p, q;
        z = v[n];
        sum = 0;
        for (q = Math.floor(6 + 52/length) | 0; q > 0; --q) {
            sum += this.delta;
            e = sum >>> 2 & 3;
            for (p = 0; p < n; ++p) {
                y = v[p + 1];
                z = v[p] += this.mx(sum, y, z, p, e, k);
            }
            y = v[0];
            z = v[n] += this.mx(sum, y, z, p, e, k);
        }
        return v;
    }

    public decryptUint32Array(v, k) {
        var length = v.length;
        var n = length - 1;
        var y, z, sum, e, p, q;
        y = v[0];
        q = Math.floor(6 + 52/length);
        for (sum = q * this.delta; sum !== 0; sum -= this.delta) {
            e = sum >>> 2 & 3;
            for (p = n; p > 0; --p) {
                z = v[p - 1];
                y = v[p] -= this.mx(sum, y, z, p, e, k);
            }
            z = v[n];
            y = v[0] -= this.mx(sum, y, z, p, e, k);
        }
        return v;
    }

    public toBytes(str) {
        var n = str.length;
        // A single code unit uses at most 3 bytes.
        // Two code units at most 4.
        var bytes = new Uint8Array(n * 3);
        var length = 0;
        for (var i = 0; i < n; i++) {
            var codeUnit = str.charCodeAt(i);
            if (codeUnit < 0x80) {
                bytes[length++] = codeUnit;
            }
            else if (codeUnit < 0x800) {
                bytes[length++] = 0xC0 | (codeUnit >> 6);
                bytes[length++] = 0x80 | (codeUnit & 0x3F);
            }
            else if (codeUnit < 0xD800 || codeUnit > 0xDFFF) {
                bytes[length++] = 0xE0 | (codeUnit >> 12);
                bytes[length++] = 0x80 | ((codeUnit >> 6) & 0x3F);
                bytes[length++] = 0x80 | (codeUnit & 0x3F);
            }
            else {
                if (i + 1 < n) {
                    var nextCodeUnit = str.charCodeAt(i + 1);
                    if (codeUnit < 0xDC00 && 0xDC00 <= nextCodeUnit && nextCodeUnit <= 0xDFFF) {
                        var rune = (((codeUnit & 0x03FF) << 10) | (nextCodeUnit & 0x03FF)) + 0x010000;
                        bytes[length++] = 0xF0 | (rune >> 18);
                        bytes[length++] = 0x80 | ((rune >> 12) & 0x3F);
                        bytes[length++] = 0x80 | ((rune >> 6) & 0x3F);
                        bytes[length++] = 0x80 | (rune & 0x3F);
                        i++;
                        continue;
                    }
                }
                throw new Error('Malformed string');
            }
        }
        return bytes.subarray(0, length);
    }

    public toShortString(bytes, n) {
        var charCodes = new Uint16Array(n);
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
            var unit = bytes[off++];
            switch (unit >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                charCodes[i] = unit;
                break;
            case 12:
            case 13:
                if (off < len) {
                    charCodes[i] = ((unit & 0x1F) << 6) |
                                    (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 14:
                if (off + 1 < len) {
                    charCodes[i] = ((unit & 0x0F) << 12) |
                                   ((bytes[off++] & 0x3F) << 6) |
                                   (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 15:
                if (off + 2 < len) {
                    var rune = (((unit & 0x07) << 18) |
                                ((bytes[off++] & 0x3F) << 12) |
                                ((bytes[off++] & 0x3F) << 6) |
                                (bytes[off++] & 0x3F)) - 0x10000;
                    if (0 <= rune && rune <= 0xFFFFF) {
                        charCodes[i++] = (((rune >> 10) & 0x03FF) | 0xD800);
                        charCodes[i] = ((rune & 0x03FF) | 0xDC00);
                    }
                    else {
                        throw new Error('Character outside valid Unicode range: 0x' + rune.toString(16));
                    }
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            default:
                throw new Error('Bad UTF-8 encoding 0x' + unit.toString(16));
            }
        }
        if (i < n) {
            charCodes = charCodes.subarray(0, i);
        }
        return String.fromCharCode.apply(String, charCodes);
    }

    public toLongString(bytes, n) {
        var buf = [];
        var charCodes = new Uint16Array(0xFFFF);
        var i = 0, off = 0;
        for (var len = bytes.length; i < n && off < len; i++) {
            var unit = bytes[off++];
            switch (unit >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                charCodes[i] = unit;
                break;
            case 12:
            case 13:
                if (off < len) {
                    charCodes[i] = ((unit & 0x1F) << 6) |
                                    (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 14:
                if (off + 1 < len) {
                    charCodes[i] = ((unit & 0x0F) << 12) |
                                   ((bytes[off++] & 0x3F) << 6) |
                                   (bytes[off++] & 0x3F);
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            case 15:
                if (off + 2 < len) {
                    var rune = (((unit & 0x07) << 18) |
                                ((bytes[off++] & 0x3F) << 12) |
                                ((bytes[off++] & 0x3F) << 6) |
                                (bytes[off++] & 0x3F)) - 0x10000;
                    if (0 <= rune && rune <= 0xFFFFF) {
                        charCodes[i++] = (((rune >> 10) & 0x03FF) | 0xD800);
                        charCodes[i] = ((rune & 0x03FF) | 0xDC00);
                    }
                    else {
                        throw new Error('Character outside valid Unicode range: 0x' + rune.toString(16));
                    }
                }
                else {
                    throw new Error('Unfinished UTF-8 octet sequence');
                }
                break;
            default:
                throw new Error('Bad UTF-8 encoding 0x' + unit.toString(16));
            }
            if (i >= 65534) {
                var size = i + 1;
                buf.push(String.fromCharCode.apply(String, charCodes.subarray(0, size)));
                n -= size;
                i = -1;
            }
        }
        if (i > 0) {
            buf.push(String.fromCharCode.apply(String, charCodes.subarray(0, i)));
        }
        return buf.join('');
    }

    public toString(bytes) {
        var n = bytes.length;
        if (n === 0) return '';
        return ((n < 100000) ?
                this.toShortString(bytes, n) :
                this.toLongString(bytes, n));
    }

    public encrypt(data, key) {
        if (typeof data === 'string') data = this.toBytes(data);
        if (typeof key === 'string') key = this.toBytes(key);
        if (data === undefined || data === null || data.length === 0) {
            return data;
        }
        return this.toUint8Array(this.encryptUint32Array(this.toUint32Array(data, true), this.toUint32Array(this.fixk(key), false)), false);
    }

    public encryptToString(data, key) {
        return this.encrypt(data, key).toString('base64');
    }

    public decrypt(data, key) {
        if (typeof data === 'string') data = data.toString();
        if (typeof key === 'string') key = this.toBytes(key);
        if (data === undefined || data === null || data.length === 0) {
            return data;
        }
        return this.toUint8Array(this.decryptUint32Array(this.toUint32Array(data, false), this.toUint32Array(this.fixk(key), false)), true);
    }

    public decryptToString(data, key) {
        return this.toString(this.decrypt(data, key));
    }
}