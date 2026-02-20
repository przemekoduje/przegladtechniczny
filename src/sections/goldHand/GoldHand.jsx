import React from 'react'
import "./goldHand.scss"
import CallButton from '../../components/CallButton/CallButton'

export default function GoldHand() {
  return (
    <div className='goldHand'>
      <h1>Fachowiec</h1>
      <p>Świadczymy całodobową pomoc w zakresie awarii instalacji elektrycznych, wodno-kanalizacyjnych i centralnego ogrzewania, dbając o szybkie usuwanie usterek i konserwację części wspólnych. Nasze usługi obejmują również drobne naprawy i konserwacje, takie jak wymiana zamków, regulacja drzwi, przegląd instalacji i naprawa oświetlenia. Działamy na indywidualne zlecenie mieszkańców, zapewniając bezpieczeństwo i komfort w każdej sytuacji.</p>
      <div className="buttons">
        <CallButton phoneNumber="690029414" />
      </div>
    </div>

  )
}
