import React, { useState } from 'react';
import {
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	format,
	addDays,
	addMonths,
	subMonths,
	isSameMonth,
	isSameDay,
} from 'date-fns';
import './style.css';

const Calendar = () => {
	const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

	const renderHeader = (): JSX.Element => {
		const dateFormat = 'yyyy MMMM';

		return (
			<div className='header'>
				<div className='icon' onClick={prevMonth}>
					&lt;
				</div>
				<div className='current-month'>{format(currentMonth, dateFormat)}</div>
				<div className='icon' onClick={nextMonth}>
					&gt;
				</div>
			</div>
		);
	};

	const renderDays = (): JSX.Element => {
		const days: JSX.Element[] = [];
		const dateFormat = 'EEEEE';
		let startDate: Date = startOfWeek(currentMonth);

		for (let i = 0; i < 7; i++) {
			days.push(
				<div className='day' key={i}>
					{format(addDays(startDate, i), dateFormat)}
				</div>
			);
		}

		return <div className='days'>{days}</div>;
	};

	const renderCells = (): JSX.Element => {
		const monthStart: Date = startOfMonth(currentMonth);
		const monthEnd: Date = endOfMonth(monthStart);
		const startDate: Date = startOfWeek(monthStart);
		const endDate: Date = endOfWeek(monthEnd);

		const dateFormat = 'd';
		const rows: JSX.Element[] = [];

		let days: JSX.Element[] = [];
		let day: Date = startDate;
		let formattedDate: string = '';

		while (day <= endDate) {
			for (let i = 0; i < 7; i++) {
				formattedDate = format(day, dateFormat);
				const cloneDay = day;
				days.push(
					<div
						className={`cell ${
							!isSameMonth(day, monthStart)
								? 'disabled'
								: isSameDay(day, new Date())
								? 'selected'
								: ''
						}`}
						key={day.toString()}
						onClick={() => onDateClick(cloneDay)}
					>
						{formattedDate}
					</div>
				);
				day = addDays(day, 1);
			}
			rows.push(
				<div className='row' key={day.toString()}>
					{days}
				</div>
			);
			days = [];
		}
		return <div className='body'>{rows}</div>;
	};

	const onDateClick = (day: Date): void => {
		console.log(day);
	};

	const nextMonth = (): void => {
		setCurrentMonth(addMonths(currentMonth, 1));
	};

	const prevMonth = (): void => {
		setCurrentMonth(subMonths(currentMonth, 1));
	};

	return (
		<div className='calendar'>
			{renderHeader()}
			{renderDays()}
			{renderCells()}
		</div>
	);
};

export default Calendar;
