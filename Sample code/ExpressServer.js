const express = require('express');
const app = express();
const port = 3000;

// =========================
// 中间件：解析不同格式的请求体
// =========================

// 1. 解析 JSON 格式的请求体（比如前端传来的 { name: 'Avalon' }）
app.use(express.json()); // 内置于 Express 4.16+

// 2. 解析 application/x-www-form-urlencoded 格式的表单数据（比如表单提交的 key=value）
app.use(express.urlencoded({ extended: true })); // extended: true 支持嵌套对象

// =====================================
// 路由：接收 JSON 载荷（比如前端 AJAX POST { name: 'Avalon' }）
// =====================================
app.post('/api/json-payload', (req, res) => {
  const data = req.body; // 自动解析 JSON 请求体
  console.log('收到 JSON 载荷:', data);
  res.json({
    message: 'JSON 载荷接收成功',
    receivedData: data
  });
});

// =====================================
// 路由：接收表单数据（x-www-form-urlencoded，比如表单字段 name=Avalon）
// =====================================
app.post('/api/form-data', (req, res) => {
  const formData = req.body; // 自动解析 application/x-www-form-urlencoded
  console.log('收到表单数据:', formData);
  res.json({
    message: '表单数据接收成功',
    receivedData: formData
  });
});

// =====================================
// 启动服务
// =====================================
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});
