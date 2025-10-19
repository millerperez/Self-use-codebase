# 解决默认编码冲突问题 gbk/utf-8
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs
