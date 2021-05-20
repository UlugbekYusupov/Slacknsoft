import React, { useContext, useState } from 'react'
import Header from '../Header/Header'
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import SideDrawer from '../SideDrawer/SideDrawer';

function Layout(props) {

    const loginCtx = useContext(AuthContext)
    const history = useHistory()
    const [logoState, setLogoState] = useState(false)

    const [showSideDrawer, setShowSideDrawer] = useState(false)

    const logoutHandler = () => {
        loginCtx.logout()
        history.push('/')
    }

    const loginHandler = () => {
        history.push('/login')
    }

    const logoHoverEnterHandler = () => { setLogoState(true) }
    const logoHoverOutHandler = () => { setLogoState(false) }

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer(!showSideDrawer)
    }

    return (
        <React.Fragment>
            <Header
                onLogout={logoutHandler}
                onLogin={loginHandler}
                onHoverEnter={logoHoverEnterHandler}
                onHoverOut={logoHoverOutHandler}
                logoState={logoState}
                loginCtx={loginCtx}
                drawerToggleClicked={sideDrawerToggleHandler}
            />
            <main style={{marginTop: "100px",}}>
                {props.children}
            </main>
            
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerCloseHandler}
            />

        </React.Fragment>
    )
}

export default Layout
