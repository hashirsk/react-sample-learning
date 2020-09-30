import React from 'react'

class Car extends React.Component {
    //first method to call one time
    constructor(props) {
        super(props)
        this.state = {
            brand: props.brand.name,
            model: props.brand.model,
            color: "red",
            year: 1964
          };
    }

    //call before render and when state change
    static getDerivedStateFromProps = (props, state) => {
        const isWhiteColor = state.color === "White"
        return {year: isWhiteColor? 1976 : 1975}
    }

    //call every time
    render = () => {
        return(
            <div>
                <h1>My {this.state.brand}</h1>
                <p>
                    It is a {this.state.color} {this.state.model} from {this.state.year}.
                </p>
                <button
                type = "button"
                onClick = {this.changeColor}
                >Change Color</button>
            </div>
        )
    };

    changeColor = () => this.setState({color : "White"})


    //call after render method one time
    componentDidMount = ()=> {
        setTimeout(() => {
          alert('Car Component Rendered')
        }, 1000)
      }

      //tells to continue referesh component
      //by default true
      shouldComponentUpdate = () => {
          return true
      }

      //prev state and prev props
    //   call along with componentDidUpdate
      getSnapshotBeforeUpdate = (prevProps, prevState) => {
        document.getElementById('div1').innerHTML = 
        "Before the update, the state color was " + prevState.color
    }

      //call along with getSnapshotBeforeUpdate
      componentDidUpdate = () => {
        document.getElementById("div2").innerHTML =
        "The updated favorite is " + this.state.color;
      }

      //call after method componentDidUpdate
      componentWillUnmount = () => {
        alert('Car Component going to remove')
      }
}

export default Car