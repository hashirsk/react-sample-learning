import React from 'react'
import Car from './Car'

class Garage extends React.Component {
    constructor(){
        super()
        this.state = {
            showCarComponent : true
        }
    }

    toggleCarComponent = () => {
        this.setState({showCarComponent : !this.state.showCarComponent})
    }

    render = () => { 
    
        let car;
        if(this.state.showCarComponent){
            const carinfo = {name: "Ford", model: "Mustang"}
            car = <Car brand={carinfo} />
        }
        return (
            <div>
                <h1>Who lives in my garage?</h1>
                {car}
                <button type="button"
                onClick={this.toggleCarComponent}>
                    toggle
                </button>
            </div>
        )
    }
}

export default Garage