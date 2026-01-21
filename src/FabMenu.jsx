import React, { useState } from "react";
import './FabMenu.css'

function FabMenu() {

    const [open, setOpen] = useState(false);

    return (
        <div className="fab-container">
            <div className={`fab-menu ${open ? "open" : ""}`}>
                <button onClick={() => window.location.href = '/'}>Головна</button>
                <button onClick={() => window.location.href = '/travel-calendar'}>Календар подорожей</button>
                <button onClick={() => window.location.href = '/analytics'}>Аналітика</button>
                <button onClick={() => window.location.href = '/gallery'}>Фотоальбом</button>
            </div>
            <button className="fab-main" onClick={() => setOpen(!open)}>
                {open ? "✖️" : "➕"}
            </button>
        </div>
    )
}
export default FabMenu;