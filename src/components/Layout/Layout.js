import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SideDrawer from '../SideDrawer/SideDrawer';

function Layout(props) {

    const loginCtx = useContext(AuthContext)
    const history = useHistory()
    const [logoState, setLogoState] = useState(false)

    const [sideBarState, setSideBarState] = useState(false)

    const logoutHandler = () => {
        loginCtx.logout()
        history.push('/')
    }

    const logoHoverEnterHandler = () => { setLogoState(true) }
    const logoHoverOutHandler = () => { setLogoState(false) }

    return (
        <React.Fragment>
            <Header
                onLogout={logoutHandler}
                onHoverEnter={logoHoverEnterHandler}
                onHoverOut={logoHoverOutHandler}
                logoState={logoState}
                loginCtx={loginCtx}
            />
            <SideDrawer open={false} closed={true} />
            <main>{props.children}</main>
        </React.Fragment>
    )
}

export default Layout
