import * as crypto from 'node:crypto';
import * as zlib from 'node:zlib';

export const base64url = {
  unescape(str: string): string {
    return (str + Array(5 - (str.length % 4))).replace(/_/g, '=').replace(/-/g, '/').replace(/\*/g, '+');
  },

  escape(str: string): string {
    return str.replace(/\+/g, '*').replace(/\//g, '-').replace(/=/g, '_');
  },

  encode(str: string): string {
    return this.escape(Buffer.from(str).toString('base64'));
  },

  decode(str: string): string {
    return Buffer.from(this.unescape(str), 'base64').toString();
  },
};

export function base64encode(str: string): string {
  return Buffer.from(str).toString('base64');
}

export function base64decode(str: string): string {
  return Buffer.from(str, 'base64').toString();
}

export class TLSSigAPI {
  private readonly sdkappid: number;

  private readonly key: string;

  constructor(sdkappid: number, key: string) {
    this.sdkappid = sdkappid;
    this.key = key;
  }

  /**
   * 通过传入参数生成 base64 的 hmac 值
   * @param identifier
   * @param currTime
   * @param expire
   * @param base64UserBuf
   * @returns {string}
   * @private
   */
  private hmacsha256(identifier: string, currTime: number, expire: number, base64UserBuf?: string): string {
    let contentToBeSigned = `TLS.identifier:${identifier}\n`;
    contentToBeSigned += `TLS.sdkappid:${this.sdkappid}\n`;
    contentToBeSigned += `TLS.time:${currTime}\n`;
    contentToBeSigned += `TLS.expire:${expire}\n`;
    if (base64UserBuf) {
      contentToBeSigned += `TLS.userbuf:${base64UserBuf}\n`;
    }
    const hmac = crypto.createHmac('sha256', this.key);
    return hmac.update(contentToBeSigned).digest('base64');
  }

  /**
   * 生成签名
   * @param userid
   * @param expire
   * @param userBuf
   */
  genSig(userid: string, expire: number, userBuf?: string): string {
    const currTime = Math.floor(Date.now() / 1000);

    const sigDoc = {
      'TLS.ver': '2.0',
      'TLS.identifier': `${userid}`,
      'TLS.sdkappid': Number(this.sdkappid),
      'TLS.time': Number(currTime),
      'TLS.expire': Number(expire),
      'TLS.userbuf': '',
      'TLS.sig': '',
    };

    let sig = '';
    if (userBuf) {
      const base64UserBuf = base64encode(userBuf);
      sigDoc['TLS.userbuf'] = base64UserBuf;
      sig = this.hmacsha256(userid, currTime, expire, base64UserBuf);
    } else {
      sig = this.hmacsha256(userid, currTime, expire, undefined);
    }
    sigDoc['TLS.sig'] = sig;

    const compressed = zlib.deflateSync(Buffer.from(JSON.stringify(sigDoc))).toString('base64');
    return base64url.escape(compressed);
  }

  /**
   * 生成 user sig
   *
   * @param userid
   * @param expire
   * @returns {string}
   */
  genUserSig(userid: string, expire: number): string {
    return this.genSig(userid, expire);
  }
}
