//使用@babel.polyfill，对全部js进行兼容性处理
//不是laoder或插件，只需要在入口文件index.js中通过import引入就可以使用了
//import '@babel/polyfill';
//
//现使用corejs解决兼容问题

import "./index.scss";

function add (x, y) {
    return x + y;
}

console.log(add(1, 2))