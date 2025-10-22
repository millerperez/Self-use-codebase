const fs = require('fs');

// 1. 同步读取本地的 encrypt.wasm 文件，得到 wasm 二进制 Buffer
const wasmCode = fs.readFileSync('encrypt.wasm');

// 2. 定义一个函数，接收一个参数 page
function test(page) {
    // 3. 使用 WebAssembly.instantiate 加载 wasm 二进制代码
    WebAssembly.instantiate(wasmCode, {
        // 4. 提供导入对象，如果 wasm 模块依赖外部环境，需要在这里定义
        // 比如需要的函数、内存等。如果不确定，可以先留空或提供空对象
        "env": {}
    })
    .then(result => {
        const instance = result.instance;
        const exportedFunc = instance.exports;

        // 打印所有导出内容（调试用，可选）
        // console.log(exportedFunc);

        // 5. 调用 wasm 模块中导出的 encrypt 函数
        // 假设它接收两个参数：page 和 timestamp（秒级）
        const timestamp = Math.round(Date.now() / 1000); // 当前时间戳（秒）
        const result = exportedFunc.encrypt(
            parseInt(page, 10),    // 确保 page 是数字
            timestamp              // 当前时间（秒）
        );

        // 6. 打印 wasm 函数的返回值
        console.log('WASM encrypt 函数返回值:', result);
    })
    .catch(err => {
        // 7. 捕获并打印可能的错误，比如 wasm 加载失败、函数不存在等
        console.error('加载或调用 WASM 模块失败:', err);
    });
}

// 8. 从命令行参数中获取第二个参数，作为 page 传入
// 注意：process.argv[2] 是字符串，比如 '70'
test(process.argv[2]);
