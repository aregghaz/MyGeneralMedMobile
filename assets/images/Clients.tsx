import * as React from "react"
import Svg, {SvgProps, Path} from "react-native-svg"

const ClientComponent = (props: SvgProps) => (
    <Svg
       /// xmlns="http://www.w3.org/2000/svg"
        width={24} height={24}
        fill={'#D63D3D'}
        {...props}
    >
        <Path
          //  stroke="currentColor"
            strokeWidth={1}
            fill={'#D63D3D'}
            //strokeLinecap="round"
           // strokeLinejoin="round"
            // style={{
            //     stroke: "none",
            //     fillRule: "nonzero",
            //     fill: "currentColor",
            //     fillOpacity: 1,
            // }}
            d="M24 18.75A3.749 3.749 0 0 0 20.25 15H9.75A3.749 3.749 0 0 0 6 18.75v3.75h18v-3.75Zm-19.5.75H0v-3.75A3.749 3.749 0 0 1 3.75 12h6.055c.328.563.742 1.07 1.226 1.5H9.75a5.251 5.251 0 0 0-5.25 5.25ZM15 4.5a4.501 4.501 0 0 1 0 9 4.501 4.501 0 0 1 0-9Zm-5.813 5.996c-.062.004-.124.004-.187.004a4.501 4.501 0 0 1 0-9c1.54 0 2.898.773 3.71 1.953a6.004 6.004 0 0 0-3.523 7.043Zm0 0"
        />
    </Svg>
)

export default ClientComponent
