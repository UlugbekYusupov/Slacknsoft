import React from 'react'
import styles from './Logo.module.css'

function Logo(props) {
    return (
        <div className={styles.Logo} style={{ height: props.height }}>
            <img onMouseEnter={props.onMouseEnter} onMouseOut={props.onMouseOut} src={props.logo} alt="Logo" />
        </div>
    )
}

export default Logo
