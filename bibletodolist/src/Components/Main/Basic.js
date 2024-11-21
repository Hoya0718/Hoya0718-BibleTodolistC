import React from "react";
import { Outlet } from "react-router-dom"

import Footer from "../../Footer";
const Basic = () => {

    return (
        <>
            <div className="basicFrame">
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Basic;