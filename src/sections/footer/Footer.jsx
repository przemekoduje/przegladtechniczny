import React from 'react'
import "./footer.scss"

export default function Footer() {
  return (
    <div className='footer'>
        <div className="texts">
            <h1>przeglad.online</h1>
            <span className="adres">
                
            </span>
            <span className="audytors">
                <div className="audytor_prze">
                    <p>Przemysław Rakotny, tel. 6900029414</p>
                    
                    <p style={{fontStyle: "italic"}}>Uprawnienia budowlane: SLK/2122/OWOK/08</p>
                    <p style={{fontStyle: "italic"}}>Nr wpisu 38909 /Centralny Rejestr Charakterystyki Energetycznej Budynku/</p>
                </div>
                <div className="audytor_mar">
                    <p>Marcin Wróbel</p>
                    <p style={{fontStyle: "italic"}}>Uprawnienia elektryczne</p>
                </div>
            </span>
        </div>
    </div>
  )
}
