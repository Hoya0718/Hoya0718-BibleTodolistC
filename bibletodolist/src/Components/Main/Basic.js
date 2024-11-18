import React from "react";
import {Outlet} from "react-router-dom"

import Footer from "../../Footer";
const Basic = () => {

    return(
        <>
            <Outlet />
            <Footer />
        </>
    )
}

export default Basic;