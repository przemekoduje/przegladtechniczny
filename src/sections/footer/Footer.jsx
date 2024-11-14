import React from 'react'
import "./footer.scss"

export default function Footer() {
  return (
    <div className='footer'>
        <div className="texts">
            <h1>przegladtechniczny.online</h1>
            <span className="adres">
                <p>44-121 Gliwice</p>
                <p>ul. Myśliwska</p>
            </span>
            <span className="audytors">
                <div className="audytor_prze">
                    <p>Przemysław Rakotny, tel. 6900029414</p>
                    <p>Nr wpisu 38909 /Centralny Rejestr Charakterystyki Energetycznej Budynku/</p>
                    <p>Uprawnienia budowlane: SLK/2122/OWOK/08</p>
                </div>
                <div className="audytor_mar">
                    <p>Marcin Wróbel</p>
                    <p>Uprawnienia elektryczne</p>
                </div>
            </span>
        </div>
    </div>
  )
}
