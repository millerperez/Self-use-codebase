const crypto = require('crypto');

// MD5
function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

// SHA1 / SHA256
function sha1(text) {
    return crypto.createHash('sha1').update(text).digest('hex');
}
function sha256(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

// HMAC (支持 md5, sha1, sha256 等)
function hmac_md5(key, message) {
    return crypto.createHmac('md5', key).update(message).digest('hex');
}
function hmac_sha1(key, message) {
    return crypto.createHmac('sha1', key).update(message).digest('hex');
}
function hmac_sha256(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

// 示例
console.log(md5('hello'));                   // MD5
console.log(sha1('hello'));                  // SHA1
console.log(sha256('hello'));                // SHA256
console.log(hmac_sha256('key', 'hello'));    // HMAC-SHA256


// 引入 crypto-js
var CryptoJS = require('crypto-js');

/**
 * AES 加密（CBC 模式，PKCS7 填充）
 * @param {string} plaintext - 明文
 * @param {string} keyStr - 密钥字符串（16字节，128位）
 * @param {string} ivStr - 初始化向量（16字节）
 * @returns {string} 密文（Base64 格式）
 */
function aesEncrypt(plaintext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);
    var src = CryptoJS.enc.Utf8.parse(plaintext);

    var encrypted = CryptoJS.AES.encrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString(); // 返回 Base64
}

/**
 * AES 解密（CBC 模式，PKCS7 填充）
 * @param {string} ciphertext - 密文（Base64 格式）
 * @param {string} keyStr - 密钥字符串（16字节）
 * @param {string} ivStr - 初始化向量（16字节）
 * @returns {string} 明文
 */
function aesDecrypt(ciphertext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);

    var decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8); // 转回 UTF-8 文本
}

// ============================
// 🧪 示例：使用
// ============================

var text = "I love Avalon!";
var aesKey = "6f726c64f2c2057c";     // 16 字节密钥 (128 bit)
var aesIv =  "0123456789ABCDEF";     // 16 字节 IV

// 加密
var encryptedData = aesEncrypt(text, aesKey, aesIv);
console.log("🔐 加密后 (Base64):", encryptedData);

// 解密
var decryptedData = aesDecrypt(encryptedData, aesKey, aesIv);
console.log("🔓 解密后:", decryptedData);


// 引入 crypto-js
var CryptoJS = require('crypto-js');

/**
 * DES 加密（CBC 模式，PKCS7 填充）
 * @param {string} plaintext - 明文
 * @param {string} keyStr - 密钥，必须是 8 字节（8个字符）
 * @param {string} ivStr - 初始化向量（IV），必须是 8 字节
 * @returns {string} 密文（Base64 格式）
 */
function desEncrypt(plaintext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);  // 8 字节密钥
    var iv = CryptoJS.enc.Utf8.parse(ivStr);    // 8 字节 IV
    var src = CryptoJS.enc.Utf8.parse(plaintext);

    var encrypted = CryptoJS.DES.encrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString(); // Base64
}

/**
 * DES 解密（CBC 模式，PKCS7 填充）
 * @param {string} ciphertext - 密文（Base64 格式）
 * @param {string} keyStr - 密钥，8 字节
 * @param {string} ivStr - 初始化向量，8 字节
 * @returns {string} 明文
 */
function desDecrypt(ciphertext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);

    var decrypted = CryptoJS.DES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8); // UTF-8 字符串
}

// =========================
// 🧪 示例用法
// =========================

var text = "I love Avalon!";
var desKey = "8byte!!";     // 必须是 8 个字符！
var desIv =  "12345678";    // 必须是 8 个字符！

// 加密
var encryptedData = desEncrypt(text, desKey, desIv);
console.log("🔐 DES 加密后 (Base64):", encryptedData);

// 解密
var decryptedData = desDecrypt(encryptedData, desKey, desIv);
console.log("🔓 DES 解密后:", decryptedData);

const JSEncrypt = require('jsencrypt');

// 1. 创建实例
const encryptor = new JSEncrypt();

// 2. 设置公钥（实际项目中应该从后端获取）
const publicKey = '-----BEGIN PUBLIC KEY-----\n你的公钥内容\n-----END PUBLIC KEY-----';

// 3. 加密函数
function encryptData(data) {
  encryptor.setPublicKey(publicKey);
  return encryptor.encrypt(data);
}

// 使用示例
const encrypted = encryptData('要加密的数据');
console.log(encrypted);


// 国密系列
const { sm2, sm3, sm4 } = require('sm-crypto');

class SMCrypto {
  // SM2 加密
  static sm2Encrypt(data, publicKey) {
    return sm2.doEncrypt(data, publicKey);
  }

  // SM2 解密
  static sm2Decrypt(encryptedData, privateKey) {
    return sm2.doDecrypt(encryptedData, privateKey);
  }

  // SM2 签名
  static sm2Sign(data, privateKey) {
    return sm2.doSignature(data, privateKey);
  }

  // SM2 验签
  static sm2Verify(data, signature, publicKey) {
    return sm2.doVerifySignature(data, signature, publicKey);
  }

  // SM3 哈希
  static sm3Hash(data) {
    return sm3(data);
  }

  // SM4 加密
  static sm4Encrypt(data, key, options = {}) {
    return sm4.encrypt(data, key, options);
  }

  // SM4 解密
  static sm4Decrypt(encryptedData, key, options = {}) {
    return sm4.decrypt(encryptedData, key, options);
  }

  // 生成 SM2 密钥对
  static generateSM2KeyPair() {
    return sm2.generateKeyPairHex();
  }
}

// 使用示例
const keyPair = SMCrypto.generateSM2KeyPair();
const message = '国密算法测试';

// SM2 加解密
const encrypted = SMCrypto.sm2Encrypt(message, keyPair.publicKey);
const decrypted = SMCrypto.sm2Decrypt(encrypted, keyPair.privateKey);

// SM3 哈希
const hash = SMCrypto.sm3Hash(message);

console.log('SM2 加解密结果:', decrypted === message);
console.log('SM3 哈希:', hash);

















// 不常用
const NodeRSA = require('node-rsa');

// 1. 生成 RSA 密钥对（默认 2048 位）
const key = new NodeRSA({ b: 2048 }); // 2048-bit key

// 获取公钥和私钥（PEM 格式）
const publicKey = key.exportKey('public');
const privateKey = key.exportKey('private');

console.log('=== 公钥 (Public Key) ===');
console.log(publicKey);
console.log('\n=== 私钥 (Private Key) ===');
console.log(privateKey);

// 2. 要加密的原始数据
const originalData = 'Hello, RSA Encryption with node-rsa!';
console.log('\n🔒 原始数据:', originalData);

// 3. 使用公钥加密数据
const encrypted = key.encrypt(originalData, 'base64'); // 加密为 base64 字符串
console.log('\n🔐 加密后 (Base64):', encrypted);

// 4. 使用私钥解密数据
const decrypted = key.decrypt(encrypted, 'utf8'); // 解密回 utf8 字符串
console.log('\n🔓 解密后:', decrypted);

// 验证解密是否成功
if (decrypted === originalData) {
  console.log('\n✅ 解密成功，数据一致！');
} else {
  console.log('\n❌ 解密失败，数据不一致！');
}
