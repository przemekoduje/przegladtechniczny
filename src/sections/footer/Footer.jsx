import React from 'react'
import "./footer.scss"

export default function Footer() {
  return (
    <div className='footer'>
        <div className="texts">
            <h1>przeglady-domu.online</h1>
            <span className="adres">
                
            </span>
            <span className="audytors">
                <div className="audytor_prze">
                    <p>Przemysław Rakotny, tel. 690 029 414</p>
                    
                    <p style={{fontStyle: "italic"}}>Uprawnienia budowlane: SLK/2122/OWOK/08</p>
                    <p style={{fontStyle: "italic"}}>Nr wpisu 38909 /Centralny Rejestr Charakterystyki Energetycznej Budynku/</p>
                </div>
                <div className="audytor_mar">
                    <p>Marcin Wróbel, tel. 502 212 512</p>
                    <p style={{fontStyle: "italic"}}>Uprawnienia elektryczne: <br/>Nr E-1/1276/691/22, D-1/1277/691/22</p>
                </div>
            </span>
        </div>
    </div>
  )
}
