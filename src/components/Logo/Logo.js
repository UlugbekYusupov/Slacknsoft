import React from 'react'
import logo from '../../assets/logo.png'
import styles from './Logo.module.css'

function Logo(props) {
    return (
        <div className={styles.Logo} style={{height: props.height}}>
            <img src = {logo} alt="Logo"/>
        </div>
    )
}

export default Logo
