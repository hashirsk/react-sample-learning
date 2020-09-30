import React from 'react'

class MyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
             username: '',
             age: null, 
             errormessage: '',
             mycar: 'Volvo',
            description: 'The content of a textarea goes in the value attribute'}
    }
    
    myChangeHandler = (event) => {
        let nam = event.target.name
        let val = event.target.value
        let err = ''
        if(val && nam === 'age' && !Number(val)) {
            err = <strong>Your age must be a number</strong>
        } 
        this.setState({[nam]: val, 
        errormessage : err})
    }

    mySubmitHandler = (event) => {
        event.preventDefault()
        alert('You are submittin '+this.state.username)
    }

    render = () => {
        let welcome 
        if(this.state.username){
            welcome = <h1>Hello {this.state.username} {this.state.age}</h1>
        } else welcome = ''
        return (<form onSubmit={this.mySubmitHandler}>
            {welcome}
            <p>Enter your name: </p>
            <input type='text' 
            name = 'username'
            onChange = {this.myChangeHandler}/>
            <p>Enter your age:</p>
            <input type='text' 
            name = 'age'
            onChange = {this.myChangeHandler}/>
            {this.state.errormessage}
            <textarea value={this.state.description} />
            <select value={this.state.mycar}>
                <option value="Ford">Ford</option>
                <option value="Volvo">Volvo</option>
                <option value="Fiat">Fiat</option>
            </select>
            <input type='submit' />
        </form>)
    }
}

export default MyForm