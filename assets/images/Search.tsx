import * as React from "react"
import Svg, {SvgProps, Path} from "react-native-svg"

const SearchComponent = (props: SvgProps) => (
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
            // style="mix-blend-mode: normal"
        >
            <g transform="scale(5.12,5.12)">
                <path
                    d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"/>
            </g>
        </g>
    </svg>
)

export default SearchComponent