import React from "react";
import { Badge } from "antd";
import dayjsGenerateConfig from "rc-picker/lib/generate/dayjs";
import generateCalendar from "antd/es/calendar/generateCalendar";
import "antd/es/calendar/style";
import dayjs from "dayjs";

import "../../css/calendar.less";
export const CalendarByDayjs = generateCalendar(dayjsGenerateConfig);

function getListData() {
    let listData;
    switch (1) {
        case 1:
            listData = [{ type: "warning" }];
            break;
        case 10:
            listData = [{ type: "error" }];
            break;

        default:
            listData = [{ type: "success" }];
            break;
    }
    return listData || [];
}
function dateCellRender(value) {
    const listData = getListData(value);
    return (
        <ul className="events">
            {listData.map((item) => (
                <li key={item.content || ""}>
                    <Badge status={item.type} text={""} />
                </li>
            ))}
        </ul>
    );
}

function getMonthData(value) {
    if (value.month() === 8) {
        return 1394;
    }
}

function monthCellRender(value) {
    // const num = getMonthData(value);
    // return num ? (
    //     <div className="notes-month">
    //         <section>{num}</section>
    //         <span>Backlog number</span>
    //     </div>
    // ) : null;
}
export default () => {
    return (
        <div className="calendar_card">
            <CalendarByDayjs
                fullscreen={false}
                // value={dayjs()}
                dateCellRender={dateCellRender}
                monthCellRender={monthCellRender}
            />
        </div>
    );
};
