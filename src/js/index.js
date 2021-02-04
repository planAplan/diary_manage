//import '@babel/polyfill';
//使用@babel.polyfill，对全部js进行兼容性处理
//不是laoder或插件，只需要在入口文件index.js中通过import引入就可以使用了
//
//现使用corejs解决兼容问题

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import DynamicAntdTheme from "dynamic-antd-theme";
import { Button, Space } from "antd";

import "../css/index.less";
import bgImg from "../images/bg.jpg";
import Column from "antd/lib/table/Column";
function App() {
    return (
        <>
            <div className="theme-container">
                <span>Change antd theme: </span>
                <DynamicAntdTheme primaryColor="#F8D57E"/>
            </div>
            <Space direction="vertical">
                <Button type="primary">Primary Button</Button>
                <Button>Default Button</Button>
                <Button type="dashed">Dashed Button</Button>
                {/* <br />
                <Button type="text">Text Button</Button>
                <Button type="link">Link Button</Button> */}
            </Space>
            <div class="new"></div>
            {/* <img src={bgImg} alt="bgImg" /> */}
        </>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));
