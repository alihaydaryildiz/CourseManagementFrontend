import { Today } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

const StudentCalendar = () => {
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const daysOfWeek = ['Pazar ', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: Arial, sans-serif;
      }
      #calendar {
       width: fullwidth;
        margin: 0px auto;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      #calendar-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
      }
      #calendar-body {
        padding: 10px;
      }
      #days-of-week {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
      }
      #calendar-days {
        display: flex;
        flex-wrap: wrap;
      }
      .day {
        width: calc(100% / 5);
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ddd;
        box-sizing: border-box;
      }
      .day.empty {
        border: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(<div key={i} className="day">{i}</div>);
    }

    return days;
  };

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta));
    setCurrentDate(newDate);
  };

  return (
    <div id="calendar">
      <div id="calendar-header">
        <button onClick={() => changeMonth(-1)}>Önceki</button>
        <h2 id="month-year">{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h2>
        <button onClick={() => changeMonth(1)}>Sonraki</button>
      </div>
      <div id="calendar-body">
        <div id="days-of-week">
          {daysOfWeek.map((day, index) => <div key={index}>{day}</div>)}
        </div>
        <div id="calendar-days">
          {renderCalendar(currentDate)}
        </div>
      </div>
    </div>
  );
};

export default StudentCalendar;