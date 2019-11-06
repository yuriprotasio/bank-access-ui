import React, {Component} from 'react'

class BankAccess extends Component {
  constructor () {
    super()
    this.state = {
      yourPassword:  Math.floor(Math.random() * (99999 - 10000) + 10000).toString(),
      password: [],
      showMessage: false,
      showErrorMessage: false
    }
    this.randomNumbers = this.shuffleNumbers()
  }

  shuffleNumbers () {
    let allNumbers = [0,1,2,3,4,5,6,7,8,9]
    let numbersSize
    let shuffledNumbers = []
    let packedNumbers = []
    let count = 0
    for (allNumbers, numbersSize = allNumbers.length; numbersSize--; ) {
      let random = allNumbers.splice(Math.floor(Math.random() * (numbersSize + 1)), 1)[0]
      packedNumbers.push(random)
      count += 1
      if(count === 2) {
        shuffledNumbers.push(packedNumbers)
        packedNumbers = []
        count = 0
      }
    }
    return shuffledNumbers
  }

  numberClicked (numbers) {
    this.setState({
      password: this.getNumbers(numbers)
    })
    console.log(this.state.password)
  }

  getNumbers (numbers) {
    const values =  numbers.map((number) => {
      return number
    })
    let password = this.state.password
    password.push(values)
    return password
  }

  access () {
    let findCount = 0
    for(let i = 0; i < this.state.password.length; i++) {
      this.state.password[i].find((item) => {
        findCount += item.toString() === this.state.yourPassword.charAt(i) ? 1 : 0
      })
    }
    if (findCount === 5) {
      this.setState({
        password: [],
        showMessage: true,
        showErrorMessage: false
      })
      return
    }
    this.setState({
      yourPassword: Math.floor(Math.random() * (99999 - 10000) + 10000).toString(),
      password: [],
      showMessage: false,
      showErrorMessage: true

    })
  }

  render () {
    return (
      <div>
        <div className="container">
          <h3>Bank Access</h3>
          <p>Your Password is: <b>{this.state.yourPassword}</b></p>
          <p>Password typed: {this.state.password.map((item, index) => {return <b key={index}>*</b>})}</p>
          <hr/>
          <div className="row">
            {this.randomNumbers.map((numbers, numbersIndex) => {
            return <div key={numbersIndex} className="col-2">
            {numbers.map((number, numberIndex) => {
              return <span key={numberIndex}>{number} {numberIndex === 0 ? ' or ' : ''} </span>})}
              <br/>
              <button className="password-btn" onClick={() => this.numberClicked(numbers)}>PRESS</button>
            </div>})}
          </div>
          <br/>
          <div><button onClick={() => this.access()}>Entrar</button></div>
          <div>{this.state.showMessage ? <b>PARABENS! TA CERTO!</b> : ''} {this.state.showErrorMessage ? <b>PUXA VIDA! TA ERRADO!</b> : ''}</div>
        </div>
      </div>
    )
  }
}

export default BankAccess
