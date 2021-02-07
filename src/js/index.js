//import '@babel/polyfill';
//使用@babel.polyfill，对全部js进行兼容性处理
//不是laoder或插件，只需要在入口文件index.js中通过import引入就可以使用了
//
//现使用corejs解决兼容问题

import React from "react";
import ReactDOM from "react-dom";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import { ConfigProvider, Layout, Button } from "antd";

import NewTask from "./components/new_task";
import Calender from "./components/calendar";
import ProjectRequirement from "./components/project_requirements";
// import WeeklyPinned from "./components/weekly_pinned";
// import "antd/dist/antd.less";
import "../css/index.less";
// import bgImg from "../images/bg.jpg";
// import Column from "antd/lib/table/Column";

import zhCN from "antd/lib/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

const { Header, Footer, Sider, Content } = Layout;
function App() {
    return (
        <Layout className="app-layout" style={{ width: "1440px" }}>
            <Sider theme="light" width="477">
                <Layout>
                    <Header><NewTask /></Header>
                    <Content>
                        <ProjectRequirement />
                    </Content>
                    <Footer>
                        <Calender />
                    </Footer>
                </Layout>
            </Sider>
            <Content>
                <Layout>
                    <Content>Main</Content>
                </Layout>
            </Content>
            <Content>
                <Layout>
                    <Content>second</Content>
                </Layout>
            </Content>
        </Layout>
    );
}

const Main = () => (
    <ConfigProvider direction="ltr" locale={zhCN}>
        <App />
    </ConfigProvider>
);

ReactDOM.render(<Main />, document.getElementById("app"));
