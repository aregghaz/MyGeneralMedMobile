import * as React from "react"
import Svg, {SvgProps, Path} from "react-native-svg"

const CloseComponent = (props: SvgProps) => (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" width="24px"
     height="24px">
    <g
        fill="currentColor"
        stroke="none"
        strokeWidth="1"
        strokeMiterlimit="10"
        strokeDashoffset="0"
        fontFamily="none"
        fontSize="none"
    ///    style="mix-blend-mode: normal"
    >
        <g transform="scale(5.12,5.12)">
            <path
                d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"/>
        </g>
    </g>
</svg>)
export default CloseComponent