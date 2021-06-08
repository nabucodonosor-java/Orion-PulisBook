import React from "react"
import ContentLoader from "react-content-loader"
import { generateList } from "core/utils/list"

const HomeLoader = () => {
    const loaderItems = generateList(3);

    return (
        <>
            {loaderItems.map(item => (
               <ContentLoader 
               key={item}
               speed={2}
               width={2000}
               height={1400}
               viewBox="0 0 1300 460"
               backgroundColor="#ecebeb"
               foregroundColor="#d6d2d2"
             >
                <rect x="13" y="29" rx="2" ry="2" width="140" height="10" /> 
                <rect x="13" y="45" rx="2" ry="2" width="140" height="10" /> 
                <rect x="12" y="73" rx="2" ry="2" width="119" height="9" /> 
                <rect x="12" y="87" rx="2" ry="2" width="119" height="9" /> 
                <rect x="10" y="124" rx="2" ry="2" width="144" height="26" /> 
                <circle cx="258" cy="90" r="66" />
             </ContentLoader> 
            ))}
        </>
    )
}

export default HomeLoader