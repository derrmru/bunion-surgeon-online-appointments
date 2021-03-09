import { useState } from 'react'
import style from './SelectTime.module.css'
import { methods } from '../objects/methods'

interface Props {
    availability: [],
    setStage: (n: number) => void,
    setSelectedTime: (s: [date: string, time: string]) => void
}

const SelectTime = ({availability, setStage, setSelectedTime}: Props) => {
    //reduce availability to collection of dates
    const times = availability.reduce((times, cur: string) => {
        const date = cur.split(',')[0];
        const time = cur.split(', ')[1]
        if (times[date]) times[date].unshift(time)
        if (!times[date]) times[date] = [time]
        return times;
    }, {})

    //filter dates and times in sections of five
    const [inc, setInc] = useState<number>(5)
    const keys = Object.keys(times).filter((cur, idx) => idx < inc && idx >= inc - 5)

    //handle appointment select
    const select = (date: string, time: string) => {
        setSelectedTime([date, time])
        setStage(2)
    }

    return (
        <div>
            <div className={style.dates}>
                <div
                    className={style.navigate}
                    >
                        <div 
                            className={style.arrow}
                            onClick={() => (inc > 5) && setInc(inc - 5)}
                            >
                                &#8678;
                        </div>
                        <div className={style.dateRange}>
                            {methods.readDate(new Date(keys[0]))} - {methods.readDate(new Date(keys[4]))}
                        </div>
                        <div 
                            className={style.arrow}
                            onClick={() => (inc > 0 && inc <= keys.length) && setInc(inc + 5)}
                            >
                                &#8680;
                        </div>
                </div>
                {keys.map((date, i) => {
                    const d = new Date(date)
                    return <div
                        key={'date' + i}
                        className={style.dateColumn}
                        >
                            <div className={style.dateHead}>{methods.readDate(d)}</div>
                            <hr />
                            {
                                times[date].map((time: string, j: number) => {
                                    return <div
                                        key={'time' + j}
                                        className={style.time}
                                        onClick={() => select(date, time)}
                                        >
                                        {time.replace(':00 ', ' ')}
                                    </div>
                                })
                            }
                    </div>
                })}
            </div>
            <button
                className={style.stageButton}
                onClick={() => setStage(0)}
                >
                    Go Back
            </button>
        </div>
    )
}

export default SelectTime