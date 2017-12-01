let express = require('express');
let app = express();
app.listen(3000);
app.use(express.static(__dirname));
let sliders = require('./sliders');
let bodyParser = require('body-parser');
app.use(bodyParser.json());
let fs = require('fs');
function read(cb) { //用来读取数据的
  fs.readFile('./book.json','utf8',function (err,data) {
    if(err || data.length === 0){
      cb([]); // 如果有错误 或者文件没长度 就是空数组
    }else{
      cb(JSON.parse(data)); // 将读出来的内容转化成对象
    }
  })
}

function write(data,cb) { // 写入内容
  fs.writeFile('./book.json',JSON.stringify(data),cb)
}
let pageSize = 5;// 每页显示五个
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();
});

app.get('/page',function (req,res) {
  let offset = parseInt(req.query.offset) || 0; //拿到当前前端传递的值
  read(function (books) {
    // 每次偏移量 在偏移的基础上增加五条
    let result = books.reverse().slice(offset,offset+pageSize); //数据倒序
    let hasMore = true; //默认有更多
    if(books.length<=offset+pageSize){ // 已经显示的数目 大于了总共条数
      hasMore = false;
    }
    res.json({hasMore,books:result});
  });
});
app.get('/sliders',function (req,res) {
  console.log('ok')
    res.json(sliders);
})

app.get('/hot',function (req,res) {
    read(function (books) {
      let hot = books.reverse().slice(0,6);
      res.json(hot);
    });
});


app.get('/book',function (req,res) {
  let id = parseInt(req.query.id);
  if(!isNaN(id)){ // 查询一个
    read(function (books) {
      let book = books.find(item=>item.bookId===id);
      if(!book) book = {}; // 如果没找到则是undefined
      res.json(book);
    });
  }else{ // 获取所有图书
    read(function (books) {
     res.json(books.reverse());
    })
  }
})
app.post('/book',function (req,res) {
  let book = req.body;
  read(function (books) { // 添加id
    book.bookId = books.length?books[books.length-1].bookId+1:1;
    books.push(book); //将数据放到books中 ，books在内存中
    write(books,function () {
      res.json(book);
    });
  });
})
app.delete('/book',function (req,res) {
  let id = parseInt(req.query.id);
  read(function (books) {
    books = books.filter(item=>item.bookId !== id);
    write(books,function () {
      res.end(JSON.stringify({})); // 删除返回空对象
    });
  });
})
app.put('/book',function (req,res) {
  let id = parseInt(req.query.id);
  let book = req.body;
  read(function (books) {
    books = books.map(item=>{
      if(item.bookId === id){ // 找到id相同的那一本书
        return book
      }
      return item; // 其他书正常返回即可
    });
    write(books,function () { // 将数据写回json中
      res.end(JSON.stringify(book));
    })
  });
})
app.all('*',function (req,res) {
  res.sendFile('./index.html',{root:__dirname})
})
