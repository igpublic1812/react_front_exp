import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://github.com/igpublic1812/react_front_exp" className="navbar-brand">Building List App(github)</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
