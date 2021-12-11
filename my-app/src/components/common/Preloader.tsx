import React from 'react'
import loaderImage from '../../Image/loader.svg';
const Preloader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <img src={`${loaderImage}`} alt=""/>
        </div>
    )
}

export default Preloader
