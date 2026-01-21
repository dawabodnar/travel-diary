import React from "react";
import './Analytics.css'
import './index.css'

function Analytics() {
    const savedTravels = JSON.parse(localStorage.getItem("myTravels")) || [];
    const countCounrties = [... new Set(savedTravels.map(t => t.country).filter(Boolean))];

    const cityCounts = savedTravels.reduce((acc, t) => {
        acc[t.city] = (acc[t.city] || 0) + 1;
        return acc;
    }, {});

    const topCities = Object.entries(cityCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const goal = 10;
    const progress = Math.min((countCounrties.length / goal) * 100, 100);

    const badges = [];

    if (savedTravels.length >= 1) {
        badges.push({ name: "🌟 Перша подорож", description: "Твоя перша подорож!" });
    }

    if (savedTravels.length >= 10) {
        badges.push({ name: "✈️ Часта листівка", description: "10+ поїздок" });
    }

    return (
        <div className="analytics-page">
            <div className="analytics-container">
                <h1> Аналітика подорожей</h1>
                <div className="analytics-stats">
                    <p>Всього поїздок: <strong>{savedTravels.length}</strong></p>
                    <p>Відвідано країн: <strong>{countCounrties.length}</strong></p>
                </div>
                <div className="goal">
                    <h3> Мрія мандрівника</h3>
                    <div className="progress-bar">
                        <div className="progress-fill"
                            style={{ width: `${progress}%` }}>
                            <span className="progress-text">{Math.round(progress)}%</span>
                        </div>

                    </div>
                    <p>Відвідано <strong>{countCounrties.length}</strong> із <strong>{goal}</strong> країн<br />
                        {progress < 100 ?
                            "Ти на шляху до своєї мрії! "
                            :
                            " Вітаємо! Ти досяг(ла) своєї мети!"
                        }
                    </p>
                </div>
                <div className="analytics-section">
                    <h3> Найчастіше відвідувані міста:</h3>
                    {topCities.length === 0 ? (
                        <p>Поки що недостатньо даних</p>
                    ) : (
                        <ul>
                            {topCities.map(([city, count]) =>
                                <li key={city}>{city} - {count} раз(и)</li>
                            )}
                        </ul>
                    )}
                </div>
                <div className="analytics-badges">
                    <h3> Досягнення та бейджі</h3>
                    {badges.length === 0 ? (
                        <p>Ще немає досягнень, вирушай у подорож! </p>
                    ) : (
                        <div className="badges">
                            {badges.map(b =>
                                <div key={b.name} className="badge">
                                    <span className="name-badge">{b.name}</span>
                                    <small className="desc-bage">{b.description}</small>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="back-button-wrapper">
                    <a href="/travel-form" className="back-button">← Назад</a>
                </div>
            </div>
        </div>
    );
}
export default Analytics;