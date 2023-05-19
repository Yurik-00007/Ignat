import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import {useSearchParams} from 'react-router-dom'

/*
* 1 - дописать функцию onChangeTextCallback в SuperDebouncedInput
* 2 - дописать функцию sendQuery в HW14
* 3 - дописать функцию onChangeText в HW14
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW14 в HW5/pages/JuniorPlus
* */

const getTechs = (find: string) => {
    return axios
        .get<{ techs: string[] }>(
            'https://samurai.it-incubator.io/api/3.0/homework/test2',
            {params: {find}}
        )
        .catch((e) => {
            alert(e.response?.data?.errorText || e.message)
        })
}

const HW14 = () => {
    //текст введенный в строке input
    const [find, setFind] = useState('')
    //loading
    const [isLoading, setLoading] = useState(false)
        //метод router-dom который позволяет получить или назначить новый query параметр
    const [searchParams, setSearchParams] = useSearchParams()
    //массив который пришел с сервера
    const [techs, setTechs] = useState<string[]>([])

    const sendQuery = (value: string) => {
        setLoading(true)
        getTechs(value)
            .then((res) => {
                //debugger
                // делает студент
                setLoading(false)
                // сохранить пришедшие данные
                if(res) {
                    setTechs(res.data.techs)
                }
                //
            })
    }

    const onChangeText = (value: string) => {
        setFind(value)
        debugger
        // делает студент
        setLoading(true)
        // добавить/заменить значение в квери урла
        // setSearchParams(
        setSearchParams({find:value})
        //
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams)
        sendQuery(params.find || '')
        setFind(params.find || '')
    }, [])

    const mappedTechs = techs.map(t => (
        <div key={t} id={'hw14-tech-' + t} className={s.tech}>
            {t}
        </div>
    ))

    return (
        <div id={'hw14'}>
            <div className={s2.hwTitle}>Homework #14</div>

            <div className={s2.hw}>
                <SuperDebouncedInput
                    id={'hw14-super-debounced-input'}
                    value={find}
                    onChangeText={onChangeText}
                    onDebouncedChange={sendQuery}
                />

                <div id={'hw14-loading'} className={s.loading}>
                    {isLoading ? '...ищем' : <br/>}
                </div>
                {/*добавит новый параметр (age:'36') в адресную строку и сохранит старые query параметры */}
               {/*
               <button onClick={()=>{
                    setSearchParams({...Object.fromEntries(searchParams), age:'36'})
                }}>
                    addAGE
                </button>
                */}

                {mappedTechs}
            </div>
        </div>
    )
}

export default HW14
