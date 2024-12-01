import React from "react";


const Title = ({title, Number}) => {
    return(
        <div className="Counter">
        <h1> {title} </h1>
        <p>{ Number}</p>
        </div>
    )
}
export default Title