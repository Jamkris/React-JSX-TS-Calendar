import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addDays, addMonths, subMonths, isSameMonth, isSameDay, } from 'date-fns';
import './style.css';
var Calendar = function () {
    var _a = useState(new Date()), currentMonth = _a[0], setCurrentMonth = _a[1];
    var renderHeader = function () {
        var dateFormat = 'yyyy MMMM';
        return (_jsxs("div", { className: 'header', children: [_jsx("div", { className: 'icon', onClick: prevMonth, children: "<" }), _jsx("div", { className: 'current-month', children: format(currentMonth, dateFormat) }), _jsx("div", { className: 'icon', onClick: nextMonth, children: ">" })] }));
    };
    var renderDays = function () {
        var days = [];
        var dateFormat = 'EEEEE';
        var startDate = startOfWeek(currentMonth);
        for (var i = 0; i < 7; i++) {
            days.push(_jsx("div", { className: 'day', children: format(addDays(startDate, i), dateFormat) }, i));
        }
        return _jsx("div", { className: 'days', children: days });
    };
    var renderCells = function () {
        var monthStart = startOfMonth(currentMonth);
        var monthEnd = endOfMonth(monthStart);
        var startDate = startOfWeek(monthStart);
        var endDate = endOfWeek(monthEnd);
        var dateFormat = 'd';
        var rows = [];
        var days = [];
        var day = startDate;
        var formattedDate = '';
        while (day <= endDate) {
            var _loop_1 = function (i) {
                formattedDate = format(day, dateFormat);
                var cloneDay = day;
                days.push(_jsx("div", { className: "cell ".concat(!isSameMonth(day, monthStart)
                        ? 'disabled'
                        : isSameDay(day, new Date())
                            ? 'selected'
                            : ''), onClick: function () { return onDateClick(cloneDay); }, children: formattedDate }, day.toString()));
                day = addDays(day, 1);
            };
            for (var i = 0; i < 7; i++) {
                _loop_1(i);
            }
            rows.push(_jsx("div", { className: 'row', children: days }, day.toString()));
            days = [];
        }
        return _jsx("div", { className: 'body', children: rows });
    };
    var onDateClick = function (day) {
        console.log(day);
    };
    var nextMonth = function () {
        setCurrentMonth(addMonths(currentMonth, 1));
    };
    var prevMonth = function () {
        setCurrentMonth(subMonths(currentMonth, 1));
    };
    return (_jsxs("div", { className: 'calendar', children: [renderHeader(), renderDays(), renderCells()] }));
};
export default Calendar;
