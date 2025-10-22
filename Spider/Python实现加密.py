import hashlib
import hmac

def md5(text: str) -> str:
    return hashlib.md5(text.encode('utf-8')).hexdigest()

# 示例
print(md5("hello"))  # 输出：5d41402abc4b2a76b9719d911017c592


def sha1(text: str) -> str:
    return hashlib.sha1(text.encode('utf-8')).hexdigest()
def sha256(text: str) -> str:
    return hashlib.sha256(text.encode('utf-8')).hexdigest()

# 示例
print(sha1("hello"))     # 输出：aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d
print(sha256("hello"))   # 输出：2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824


def hmac_md5(key: str, message: str) -> str:
    return hmac.new(key.encode('utf-8'), message.encode('utf-8'), hashlib.md5).hexdigest()
def hmac_sha1(key: str, message: str) -> str:
    return hmac.new(key.encode('utf-8'), message.encode('utf-8'), hashlib.sha1).hexdigest()
def hmac_sha256(key: str, message: str) -> str:
    return hmac.new(key.encode('utf-8'), message.encode('utf-8'), hashlib.sha256).hexdigest()

# 示例
print(hmac_sha256("key", "hello"))  # 输出：9307b3b915efb5171ff14d8cb55fbcc798c6c0ef1456d66ded1a6aa723a58b7b
