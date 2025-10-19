// 模拟一个“装饰器”函数：给方法添加调用日志
function logDecorator(fn) {
  return function(...args) {
    console.log(`调用方法，参数:`, args);
    return fn.apply(this, args);
  };
}

// 普通类
class Greeter {
  greet(name) {
    return `Hello, ${name}！`;
  }
}

// 手动“装饰”方法：用装饰器包装原方法
const greeter = new Greeter();
greeter.greet = logDecorator(greeter.greet);

// 调用
console.log(greeter.greet('Avalon'));
