import {useState, useEffect} from "react";
import {Dimensions} from "react-native";

type TypeScreenSize = {
    width: number,
    height: number,
}

const useDeviceSize:Function = ():TypeScreenSize => {
    const [size, setSize] = useState<TypeScreenSize>({
        width: -1,
        height: -1,
    })

    useEffect(() => {
        setSize({
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
        })
    }, [Dimensions.get("window")])

    return size

}

export default useDeviceSize