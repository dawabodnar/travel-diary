import React, { useState } from 'react'
import './TravelCalendar.css'
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function TravelCalendar() {

    const savedTravels = JSON.parse(localStorage.getItem("myTravels")) || [];
    const [selectedDate, setSelectedDate] = useState(null);

    const travelMap = {};
    savedTravels.forEach(travel => {
        const start = new Date(travel.startDate);
        const end = new Date(travel.endDate);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const formatted = d.toLocaleDateString('en-CA')
            travelMap[formatted] = travel;
        }
    });

    const tripDates = Object.keys(travelMap);

    const handleDayClick = (date) => {
        const formatted = date.toLocaleDateString('en-CA')
        setSelectedDate(travelMap[formatted] || null);
    }

    return (
        <div className="calendar-container">
            <div className="calendar-content">
                <h1>🗓 Календар моїх подорожей</h1>
                <p className='subtitle'>Переглянь свої дні пригод</p>
            </div>
            <div className='calendar-wrapper'>
                <Calendar locale="uk-UA"
                    className="calendar"
                    onClickDay={handleDayClick}
                    tileClassName={({ date }) => {
                        const formatted = date.toLocaleDateString('en-CA');
                        return tripDates.includes(formatted) ? "trip-day" : null;
                    }} />
                <div className='date-info'>
                    {
                        selectedDate ? (
                            <div className='trip-info'>
                                <h1>{selectedDate.city}</h1>
                                <p><strong>Початок:</strong>{selectedDate.startDate}</p>
                                <p><strong>Кінець:</strong>{selectedDate.endDate}</p>
                            </div>
                        ) : (
                            <div className='trip-placeholder'>
                                <p>←  Натисни на день, щоб побачити деталі подорожі</p>
                            </div>
                        )}
                </div>
                <a href="/travel-form" className="back-button">← Назад</a>
            </div>
        </div>
    )



}
export default TravelCalendar;