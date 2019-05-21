import React from 'react';
import styled from 'styled-components';
// import moment from 'moment';
// import { createGlobalStyle, ThemeProvider } from 'styled-components';
import dateFns from 'date-fns';
import '../../../public/calendar.css';

// Styled Components
const Icon = styled.div`
	/* @import url(https://fonts.googleapis.com/icon?family=Material+Icons);
	font-family: 'Material Icons', serif;
	font-weight: 400;
	content: 0;
	font-size: 16px;
	height: 100%;
	color: #da3743;
	line-height: 16px;
	font-style: normal;
	display: inline; */
`;

// Calendar
class Calendar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentMonth: new Date(),
			currentDate: new Date(),
			currentDay: new Date()
		};
		this.onDateClick = this.onDateClick.bind(this);
		this.nextMonth = this.nextMonth.bind(this);
		this.prevMonth = this.prevMonth.bind(this);
	}

	renderDays() {
		const day = 'ddd';
		const days = [];
		const firstDate = dateFns.startOfWeek(this.state.currentMonth);
		for (let i = 0; i < 7; i++) {
			days.push(
				<th className="weekday" key={i}>
					{dateFns.format(dateFns.addDays(firstDate, i), day)}
				</th>
			);
		}
		return <tr className="weekdays-header">{days}</tr>;
	}

	currentDay() {
		return dateFns.format(this.state.currentDate, 'D');
	}

	renderCells() {
		const monthStart = dateFns.startOfMonth(this.state.currentMonth);
		const startDate = dateFns.startOfWeek(monthStart);

		const rows = [];

		let days = [];
		let day = startDate;
		let formattedDate = '';

		while (rows.length < 6) {
			for (let i = 0; i < 7; i++) {
				formattedDate = dateFns.format(day, 'D');
				const cloneDay = day;
				let currentDay = '';

				if (
					dateFns.format(this.state.currentMonth, 'MMMM') ===
					dateFns.format(new Date(), 'MMMM')
				) {
					currentDay = formattedDate === this.currentDay() ? 'today' : '';
				}

				let pastMonthStyle = '';
				const prevMonth = dateFns.format(
					dateFns.subMonths(this.state.currentMonth, 1),
					'MMMM'
				);

				if (prevMonth === dateFns.format(day, 'MMMM')) {
					pastMonthStyle = 'pastMonthStyle';
				}

				let futureMonthStyle = '';
				const futureMonth = dateFns.format(
					dateFns.addMonths(this.state.currentMonth, 1),
					'MMMM'
				);

				if (futureMonth === dateFns.format(day, 'MMMM')) {
					futureMonthStyle = 'futureMonthStyle';
				}

				let pastDatesStyle = '';
				if (dateFns.compareDesc(day, dateFns.subDays(new Date(), 1)) === 1) {
					pastDatesStyle = 'pastDatesStyle';
				}

				if (pastDatesStyle) {
					pastMonthStyle = '';
				}
				const classNames = `${pastDatesStyle} ${futureMonthStyle} ${pastMonthStyle} calendar-day ${currentDay}`;

				days.push(
					<td key={i}>
						<div
							className={classNames}
							onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
						>
							{formattedDate}
						</div>
					</td>
				);

				day = dateFns.addDays(day, 1);
			}
			rows.push(<tr key={day}>{days}</tr>);
			days = [];
		}
		return rows;
	}

	onDateClick(day) {
		this.setState({ selectedDate: day });
	}

	nextMonth() {
		this.setState({
			currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
		});
	}

	prevMonth() {
		if (
			dateFns.format(new Date(), 'MMMM YYYY') !==
			dateFns.format(this.state.currentMonth, 'MMMM YYYY')
		) {
			this.setState({
				currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
			});
		}
	}

	render() {
		return (
			<div className="calendar-wrapper">
				<div className="picker-box">
					<div className="calendar-header">
						<div>
							<div className="chevron-left" onClick={this.prevMonth} />
						</div>
						<div className="col-center">
							<div className="picker-month">
								{dateFns.format(this.state.currentMonth, 'MMMM YYYY')}
							</div>
						</div>
						<div>
							<div className="chevron-right" onClick={this.nextMonth} />
						</div>
					</div>
					<table className="calendar-table">
						<thead>{this.renderDays()}</thead>
						<tbody>{this.renderCells()}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default Calendar;
