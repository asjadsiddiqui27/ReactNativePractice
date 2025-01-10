
// const Buffer = require("node:buffer")
import { Buffer } from "buffer";
// import { escape } from "querystring";
// import { escape } from "querystring";
var escape = require('escape-html');
global.atob = (b64) => {
    return decodeURIComponent(
      escape(Buffer.from(b64, 'base64').toString('utf8'))
    );
  };
  

export function decodeBase64(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
  console.log("s",base64);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
  
    return bytes;
  }