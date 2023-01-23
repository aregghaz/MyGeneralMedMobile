import React, {useEffect} from 'react'
import {View} from "react-native";


// import s from './backdrop-search.module.scss'

interface IBackDropSearch {
    handlerCloseBackDropSearch?: () => void
    handlerSubmit?: (event: { search: string }) => void
}

const BackDropSearch: React.FC<IBackDropSearch> = () => {


    return (
            <input
                name={'search'}
                value={''}
                type={'text'}
                placeholder={"search"}
                /// onChange={handleChange}

            />

    )
}

export default BackDropSearch
