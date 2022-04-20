import {Component} from 'react'
import {v4 as uniqueNo} from 'uuid'
import './App.css'

const RandomColorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    website: '',
    userName: '',
    password: '',
    isShow: false,
    newPasswordManagerList: [],
  }

  AddNewDetails = event => {
    event.preventDefault()
    const {website, password, userName} = this.state
    const userLogo = website.slice(0, 1).toUpperCase()
    const colorList = RandomColorList[Math.random() * 5]

    const NewValues = {
      id: uniqueNo(),
      userIcon: userLogo,
      websiteName: website,
      user_Name: userName,
      Password: password,
      RandomBgClasses: colorList,
    }
    this.setState(prevState => ({
      newPasswordManagerList: [...prevState.newPasswordManagerList, NewValues],
      website: '',
      userName: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  OnInputChangeWebsite = event => {
    this.setState({website: event.target.value})
    console.log(event.target.value)
  }

  OnInputChangeUserName = event => {
    this.setState({userName: event.target.value})
    console.log(event.target.value)
  }

  OnInputChangePassword = event => {
    this.setState({password: event.target.value})
    console.log(event.target.value)
  }

  OnSearchList = event => {
    this.setState({searchInput: event.target.value})
  }

  OnDeleteItem = id => {
    const {newPasswordManagerList} = this.state
    const newList = newPasswordManagerList.filter(
      eachValue => eachValue.id !== id,
    )
    const caseOf = newList.length !== 0
    this.setState({newPasswordManagerList: newList, isTrue: caseOf})
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  render() {
    const {
      website,
      userName,
      password,
      isShow,
      newPasswordManagerList,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = newPasswordManagerList.filter(eachList =>
      eachList.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-manager-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-logo"
          />
          <form className="form-container">
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="icon"
              />
              <input
                placeholder="Enter Website"
                className="input"
                value={website}
                type="text"
                onChange={this.OnInputChangeWebsite}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="icon"
              />
              <input
                placeholder="Enter Username"
                className="input"
                type="text"
                value={userName}
                onChange={this.OnInputChangeUserName}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="icon"
              />
              <input
                placeholder="Enter Password"
                className="input"
                type="password"
                onChange={this.OnInputChangePassword}
                value={password}
              />
            </div>
            <div className="btn-container">
              <button
                type="submit"
                className="button"
                onClick={this.AddNewDetails}
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="password-container">
          <div className="password-list-container">
            <div className="title-and-search-container">
              <h1 className="title">Your Passwords</h1>
              <p className="counter">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                className="inputEle"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-passwords">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="label-password">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="list-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-img"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="details-container">
              {newList.map(eachList => (
                <li className="list-item" key={eachList.id} id={eachList.id}>
                  <p className={`userLogo ${eachList.RandomBgClasses}`}>
                    {eachList.userIcon}
                  </p>
                  <div className="list-item-container">
                    <p className="website">{eachList.websiteName}</p>
                    <p className="website">{eachList.user_Name}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        className="stars-image"
                        alt="stars"
                      />
                    )}
                    {isShow && <p className="website">{eachList.Password}</p>}
                  </div>
                  <button
                    type="button"
                    testid="delete"
                    className="del-btn"
                    onClick={() => this.OnDeleteItem(eachList.id)}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      className="del-image"
                      alt="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
