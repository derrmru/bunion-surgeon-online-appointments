import aTypes from '../objects/appointment_types'
import Link from 'next/link'
import style from './AppointmentType.module.css'

interface Props {
  selectType: (type: string, length: number) => void
}

const AppointmentType = (props: Props) => {
    return (
        <div className={style.appointments}>
            {
              Object.keys(aTypes).map((type, i) => {
                return (
                  <Link
                    key={'type' + i}
                    href={type === 'KN-VIRTUAL' ? '/virtual-appointments' : '/'}
                    >
                    <div
                      className={style.appointmentCard}
                      onClick={() => props.selectType(type, aTypes[type]['length'])}
                      >
                      <h2>{aTypes[type]['type']}</h2>
                      <hr style={{backgroundColor: 'var(--the-black)'}} />
                      <h3><strong>Consultant:</strong> {aTypes[type]['consultant']}</h3>
                      <h4><strong>Price:</strong> £{aTypes[type]['price']}</h4>
                      <h4>Private Medical Insurance Is Accepted.</h4>
                      <h5>{aTypes[type]['description']}</h5>
                    </div>
                  </Link>
                )
              })
            }
        </div>
    )
}

export default AppointmentType