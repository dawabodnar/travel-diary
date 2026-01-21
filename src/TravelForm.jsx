import React, { useState, useEffect } from 'react'
import './TravelForm.css'
import './index.css'
import pinLogo from './assets/pin.svg'
import aeroplaneLogo from './assets/aeroplane.svg'
import planeLogo from './assets/plane.svg'
import calendarLogo from './assets/calendar.svg'
import FabMenu from './FabMenu'

function TravelForm() {
  const initialState = {
    country: "",
    city: "",
    startDate: "",
    endDate: "",
  }
  const [formData, setFormData] = useState(initialState);
  const [travels, setTravels] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    year: "",
    searchCity: "",
    sortBy: "newest",
  });
  const [editingID, setEditingID] = useState(null);

  useEffect(() => {
    const savedTravels = localStorage.getItem("myTravels");
    if (savedTravels) {
      setTravels(JSON.parse(savedTravels));
    }
  }, []);

  useEffect(() => {
    if (travels.length > 0) {
      localStorage.setItem("myTravels", JSON.stringify(travels));
    }
  }, [travels]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingID) {
      setTravels(travels.map(t => t.id === editingID ? { ...formData, id: editingID } : t));
      setEditingID(null);
    } else {
      setTravels([...travels, { ...formData, id: Date.now() }])
    }
    setFormData(initialState);
  }

  const handleDelete = (id) => {
    setTravels(travels.filter(travel => travel.id !== id));
  }
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }
  const uniqueCounrties = [...new Set(travels.map(t => t.country).filter(Boolean))];
  const uniqueYears = [...new Set(travels.map(t => t.startDate.slice(0, 4)).filter(Boolean))];

  const filteredTravels = travels
    .filter(travel => {
      return filters.country === "" || travel.country === filters.country;
    })
    .filter(travel => {
      const travelYear = travel.startDate.slice(0, 4);
      return filters.year === "" || travelYear === filters.year
    })
    .filter(travel => {
      return filters.searchCity === "" || travel.city.toLowerCase().includes(filters.searchCity.toLowerCase())
    })
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const handleEdit = (travel) => {
    setFormData({ country: travel.country, city: travel.city, startDate: travel.startDate, endDate: travel.endDate });
    setEditingID(travel.id);
  }

  return (
    <div className='travel-form-wrapper'>
      <div className='travel-form-container'>
        <div className='travel-form-header'>
          <img src={planeLogo} className="logo plane" alt="Plane logo" />
          <h1>Мої подорожі</h1>
          <p>Збережи спогад з кожної поїздки</p>
        </div>
        <form className='travel-form' onSubmit={handleSubmit}>

          <h2> <img src={pinLogo} className="logo pin" alt="Pin logo" />
            Додай нову подорож</h2>
          <label>Країна</label>
          <input type="text" placeholder='Наприклад, Україна' name='country' value={formData.country} onChange={handleChange} />
          <label>Місто</label>
          <input type="text" placeholder='Наприклад, Київ' name='city' value={formData.city} onChange={handleChange} />
          <label>Дата початку</label>
          <input type="date" placeholder='Дата початку' name='startDate' value={formData.startDate} onChange={handleChange} />
          <label>Дата кінця</label>
          <input type="date" placeholder='Дата кінця' name='endDate' value={formData.endDate} onChange={handleChange} />
          <button type='submit' className='travel-form-button'>{editingID ? "Зберегти зміни" : "Додати подорож"}</button>
        </form>
        <div className='travel-list'>
          <h2><img src={calendarLogo} className="logo calendar" alt="Calendar logo" />
            Історія подорожей</h2>
          <div className='filters'>
            <div>
              <label>Країна</label>
              <select name='country' value={filters.country} onChange={handleFilterChange}>
                <option value=''>Всі країни</option>
                {uniqueCounrties.map(country => (
                  <option value={country} key={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Рік</label>
              <select name='year' value={filters.year} onChange={handleFilterChange}>
                <option value=''>Всі роки</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Місто</label>
              <input
                type="text"
                name="searchCity"
                placeholder="Пошук за містом..."
                value={filters.searchCity}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <button
                className='button-clear-filters'
                onClick={() => setFilters({ country: "", year: "", searchCity: "" })}
              >Очистити фільтри</button>
            </div>
          </div>
          {travels.length === 0 ? (
            <div className='list-empty'>
              <img src={aeroplaneLogo} className="logo aeroplane" alt="Aerroplane logo" />
              <p>Поки що немає збережених подорожей</p>
              <span>Додай свою першу подорож вище</span>
            </div>
          ) : filteredTravels.length === 0 ? (
            <div className='list-empty'>
              <img src={aeroplaneLogo} className="logo aeroplane" alt="Aerroplane logo" />
              <p>Немає подорожей, що відповідають вибраним фільтрам</p>
              <span>Спробуй змінити пошук або очистити фільтри</span>
            </div>
          ) : (
            <ul>
              {filteredTravels.map((travel) => (
                <li key={travel.id}>
                  <div className='list-item'>
                    <div className='travel-content'>
                      <div className='travel-country'>
                        <strong> {travel.country}</strong>
                      </div>
                      <p className='travel-city'>{travel.city}</p>
                      <div className='travel-dates'>
                        {travel.startDate} - {travel.endDate}
                      </div>
                    </div>
                    <div className='travel-actions'>
                      <button type="button" className='delete-button' onClick={() => handleEdit(travel)} title='Редагувати'>✏️</button>
                      <button type="button" className='delete-button' onClick={() => handleDelete(travel.id)} title='Вилучити подорож'>❌</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <FabMenu />
    </div>
  )
}
export default TravelForm