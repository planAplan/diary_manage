//import '@babel/polyfill';
//使用@babel.polyfill，对全部js进行兼容性处理
//不是laoder或插件，只需要在入口文件index.js中通过import引入就可以使用了
//
//现使用corejs解决兼容问题

import React from "react";
import ReactDOM from "react-dom";

import "../css/index.scss";
import bgImg from '../images/bg.jpg';

function App() {
    return (
        <>
            <div class='new'></div>
            <img src={bgImg} alt='bgImg' />
        </>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));