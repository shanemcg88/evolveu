import React from 'react'
import AccountComponent from './AccountComponent'
import AccountController from './accountCtrl'
import AccountListComp from './AccountListComp'
import AccountSummariesComp from './AccountSummariesComp'
import AccountCreatorComp from './AccountCreatorComp'
import './stylingAccounts.css'

class AccountContainer extends React.Component {
  constructor(){
    super()
      this.objAccountCtrl = new AccountController()

      this.style = {
        border: this.objAccountCtrl.accountArr.length > 0 ? '1px solid black' : 'none'
      }

      this.state = {
        display: false,
        displayAccountList: false,
        displayAccountComp: false,
        accountsIdState:'',
        counter: -1,
      }
  }

//WHEN CLICKING 'NEW ACCOUNT BUTTON', IT WILL DISPLAY 'CREATE ACCOUNT' BOX
    clickDisplay = () => {
      this.setState({display: true})
    }
    clickHideDisplay = () => {
      this.setState({display: false})
    }

//WHEN CREATE ACCOUNT BUTTON IS PRESSED
    createNewAccount = (event) => {

      let x = document.getElementById
              ('inputAccountName').value

      let y = Number(document.getElementById
              ('inputAccountBalance').value)

      if (x === '' || y === 0){
          alert('please enter inputs')
        return;
      } else {
          this.objAccountCtrl.accountArr =
          this.objAccountCtrl.createAccount(x,y)
          this.setState({
            display: false,
            counter: this.state.counter + 1,
            displayAccountList: true,
          })
      }
  }

  //WHEN EDIT BUTTON IS CLICKED
  accountWindow = (event) => {
    let x = event.target.id
    let accountId = this.objAccountCtrl.accountArr[x].accountId
    this.setState({
      accountsIdState: x,
      displayAccountComp: true,
    })
  }

  //WHEN DELETE BUTTON IS CLICKED
  deleteAccount = (event) => {
    let x = event.target.id
    let accountId = this.objAccountCtrl.accountArr[x].accountId
    this.objAccountCtrl.deleteAccount(accountId)
    this.closeDisplay()
  }

  //CLOSING ACCOUNT COMP WINDOW
  closeDisplay = () => {
    this.setState({displayAccountComp: false})
  }

  render() {

    return (
      <div className = 'container'>
        <h1 className = 'containerHeader'>Accounts</h1>

        <button
          className = 'newAccountBtn'
          type = 'button'
          onClick = {this.clickDisplay}>
          New Account
        </button>

  {/*IF NEW ACCOUNT BUTTON IS CLICKED, THEN DISPLAY THE FOLLOWING*/}
        {this.state.display ?
          <div className = 'newAccountDiv'>
          <AccountCreatorComp
            passClickHideDisplay = {this.clickHideDisplay}
            passCreateAccount = {this.createNewAccount} />
          </div>
           : null}

{/*ACCOUNTS LIST */}

          {this.state.displayAccountList ?
          <div className = 'accountsList' style = {this.style}>
            <AccountListComp
              passArray = {this.objAccountCtrl.accountArr}
              obj = {this.objAccountCtrl}
              passAccountWindow = {this.accountWindow}
              passDeleteAccount = {this.deleteAccount}
              passAccountsIdState = {this.state.accountsIdState}
              passCloseDisplay = {this.closeDisplay}
              passDisplayAccountComp = {this.state.displayAccountComp}/>
          </div>
          : null }


{/*INDIVIDUAL ACCOUNT*/}
      {this.state.displayAccountComp ?
          <AccountComponent
            objCtrl = {this.objAccountCtrl}
            passObj = {this.objAccountCtrl.accountArr}
            passId = {this.state.accountsIdState}
            passDisplay = {this.closeDisplay} />
      : null}

{/*ACCOUNTS SUMMARIES*/}
      <div className = 'accountSummaries'>
        <AccountSummariesComp passObj = {this.objAccountCtrl}/>
      </div>
    </div>
    )
  }
}

export default AccountContainer
