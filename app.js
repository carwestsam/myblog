const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', function(req, res){
  res.redirect('/index');
});

let Readfile = function(url, type){
  return new Promise(function(resolve, reject){
    fs.readFile(url, type, function(err, data){
      if (err) reject(err);
      resolve(data);
    })
  })
}

let listDir = function(path){
  return new Promise(function(resolve, reject){
    fs.readdir(path, function(err, items){
      if (err) reject(err);
      else resolve(items);
    })
  })
}

app.get('/blog/:blogname', async function(req, res, next){
  let x = await Readfile(process.cwd() + '/blogs/' +  req.params.blogname + '.json', 'utf-8');
  console.log(x);
  res.set('Content-Type', 'application/json').send(x);
});

app.get('/index', async function(req, res, next){
  let items = await listDir(process.cwd() + '/blogs');
  console.log(items);
  let result = "";
  items.forEach((item)=>{
    let id = item.split(".")[0]
    result += `<a target="_blank" href="/blog/${id}">${id}</a>`
  })
  console.log(result);
  res.send(result);
})

app.listen(3000, function() {
});