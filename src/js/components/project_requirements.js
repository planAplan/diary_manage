import React, { useState } from "react";
import { Badge } from "antd";
import { Card, Typography, Space, Avatar, Tag } from "antd";
import { LaptopOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// dayjs.extend(utc);

const { Paragraph, Text } = Typography;
const { Meta } = Card;
function CardTitle(props) {
    return (
        <div>
            {/* <Avatar size="small" icon={<LaptopOutlined />} />
            {props.title} */}
            <Text strong={false}>
                {dayjs(props.time).format("DD/MM/YYYY HH:mm")}
            </Text>
        </div>
    );
}
function ProjectItem(props) {
    function editText() {}
    function ShowTag() {
        return (
            <>
                <Tag color="success">success</Tag>
                {/* <Tag color="processing">processing</Tag>
                <Tag color="error">error</Tag>
                <Tag color="warning">warning</Tag>
                <Tag color="default">default</Tag> */}
            </>
        );
    }
    return (
        <Card
            hoverable
            size="small"
            title={<CardTitle {...props} />}
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
        >
            <Space direction="vertical">
                <Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={props.title}
                    description={<ShowTag />}
                />
                <Paragraph
                    editable={true}
                    ellipsis={{
                        rows: 1,
                        expandable: false,
                        suffix: false,
                        symbol: "",
                        tooltip: true,
                        onExpand: (event) => {},
                        onEllipsis: (ellipsis) => {},
                    }}
                    onChange={editText}
                >
                    {props.taskDetail}
                </Paragraph>
            </Space>
        </Card>
    );
}
const TestData = [
    {
        title: "基金强制确认流程",
        taskDetail:
            "基金强制确认流程描述基金强制确认流程描述基金强制确认流程描述基金强制确认流程描述基金强制确认流程描述基金强制确认流程描述基金强制确认流程描述基金强制确认流程描述基金强制确认流程描述",
        status: "未完成",
        time: 1614822300000,
        taskId: 1,
    },
    {
        title: "大宗交易改造",
        taskDetail: "大宗交易改造描述",
        status: "未完成",
        time: 1613958300000,
        taskId: 2,
    },
];
export default function ProjectRequirement() {
    const [cradItem, setCardItem] = useState(TestData || []);
    return (
        <Space direction="vertical">
            {cradItem.map((i, d) => {
                return <ProjectItem key={d} {...i} />;
            })}
        </Space>
    );
}
