const crypto = require('crypto');
const CryptoJS = require('crypto-js');
const JSEncrypt = require('jsencrypt');
const { sm2, sm3, sm4 } = require('sm-crypto');
const NodeRSA = require('node-rsa');

// MD5加密
function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

// SHA1加密
function sha1(text) {
    return crypto.createHash('sha1').update(text).digest('hex');
}

// SHA256加密
function sha256(text) {
    return crypto.createHash('sha256').update(text).digest('hex');
}

// HMAC-MD5加密
function hmac_md5(key, message) {
    return crypto.createHmac('md5', key).update(message).digest('hex');
}

// HMAC-SHA1加密
function hmac_sha1(key, message) {
    return crypto.createHmac('sha1', key).update(message).digest('hex');
}

// HMAC-SHA256加密
function hmac_sha256(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

// AES加密
function aesEncrypt(plaintext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);
    var src = CryptoJS.enc.Utf8.parse(plaintext);
    var encrypted = CryptoJS.AES.encrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// AES解密
function aesDecrypt(ciphertext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);
    var decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// DES加密
function desEncrypt(plaintext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);
    var src = CryptoJS.enc.Utf8.parse(plaintext);
    var encrypted = CryptoJS.DES.encrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// DES解密
function desDecrypt(ciphertext, keyStr, ivStr) {
    var key = CryptoJS.enc.Utf8.parse(keyStr);
    var iv = CryptoJS.enc.Utf8.parse(ivStr);
    var decrypted = CryptoJS.DES.decrypt(ciphertext, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// RSA加密
function rsaEncrypt(data, publicKey) {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(publicKey);
    return encryptor.encrypt(data);
}

// 国密算法类
class SMCrypto {
    static sm2Encrypt(data, publicKey) {
        return sm2.doEncrypt(data, publicKey);
    }
    static sm2Decrypt(encryptedData, privateKey) {
        return sm2.doDecrypt(encryptedData, privateKey);
    }
    static sm2Sign(data, privateKey) {
        return sm2.doSignature(data, privateKey);
    }
    static sm2Verify(data, signature, publicKey) {
        return sm2.doVerifySignature(data, signature, publicKey);
    }
    static sm3Hash(data) {
        return sm3(data);
    }
    static sm4Encrypt(data, key, options = {}) {
        return sm4.encrypt(data, key, options);
    }
    static sm4Decrypt(encryptedData, key, options = {}) {
        return sm4.decrypt(encryptedData, key, options);
    }
    static generateSM2KeyPair() {
        return sm2.generateKeyPairHex();
    }
}

// RSA密钥生成
function generateRSAKeyPair() {
    const key = new NodeRSA({ b: 2048 });
    return {
        publicKey: key.exportKey('public'),
        privateKey: key.exportKey('private')
    };
}
