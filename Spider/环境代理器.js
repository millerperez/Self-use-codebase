// 代理器封装函数
function getEnvironment(proxyArray) {
    // ANSI颜色代码定义
    const colors = {
        reset: '\x1b[0m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m'
    };

    for (let i = 0; i < proxyArray.length; i++) {
        const objName = proxyArray[i];

        // 创建代理处理器
        const handler = {
            get: function(target, property, receiver) {
		            // if(property == "eval"){debugger}
                console.log(
                    `${colors.green}方法: get${colors.reset}     ` +
                    `${colors.blue}对象: ${objName}${colors.reset}     ` +
                    `${colors.yellow}属性: ${String(property)}${colors.reset}     ` +
                    `${colors.cyan}属性类型: ${typeof property}${colors.reset}     ` +
                    `${colors.magenta}属性值类型: ${typeof target[property]}${colors.reset}`
                );
                return target[property];
            },
            set: function(target, property, value, receiver) {
                console.log(
                    `${colors.green}方法: set${colors.reset}     ` +
                    `${colors.blue}对象: ${objName}${colors.reset}     ` +
                    `${colors.yellow}属性: ${String(property)}${colors.reset}     ` +
                    `${colors.cyan}属性类型: ${typeof property}${colors.reset}     ` +
                    `${colors.magenta}属性值类型: ${typeof target[property]}${colors.reset}`
                );
                return Reflect.set(...arguments);
            }
        };

        try {
            // 尝试获取全局对象
            const globalObj = eval(objName);
            // 创建代理
            eval(`${objName} = new Proxy(globalObj, handler)`);
        } catch (e) {
            // 如果对象不存在，创建空对象并代理
            eval(`${objName} = new Proxy({}, handler)`);
        }
    }
}

// 要代理的对象数组
const proxyArray = ['window', 'document', 'location', 'navigator', 'history', 'screen', 'Object', 'XMLHttpRequest', 'globalThis', 'localStorage'];

// 执行代理 补环境内容在此处
getEnvironment(proxyArray);
