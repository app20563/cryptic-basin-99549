import React from 'react'
import './App.css';
import axios from 'axios'

const MyTag = () => (
    <div className='my-text'>
      CRA font-end w/ strapi (postgres) on free Heroku dyno test project
    </div>
)

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      stores: []
    }
  }

  componentDidMount() {
    axios.get('https://cryptic-basin-99549.herokuapp.com/stores')
    .then(response => {
      const stores = response.data
      this.setState({ stores })
    })
    .catch(error => console.log(error))
  }

  render() {
    if (this.state.stores.length === 0) {
      return (
        <div className="App">
          <header className="App-header">
            <MyTag />
            <h3><i>Loading...</i></h3>
            <span style={{fontSize: '16px'}}><i>Please allow a minute to wake free Heroku dyno</i></span>
          </header>
        </div>
      )
    } else {
      const retail = this.state.stores.filter(a=>a.store_type.Type === "Retail")
      const restaurant = this.state.stores.filter(a=>a.store_type.Type === "Restaurant")
      return (
        <div className="App">
          <header className="App-header">
            <MyTag />
            <h2 className='my-h-font-override'>Stores</h2>
            <h3 className='my-h-font-override'>Retail</h3>
            {
              retail.map(store => <li style={{fontSize: '16px'}}>{store.Name}</li>)
            }
            <h3 className='my-h-font-override'>Restaurant</h3>
            {
              restaurant.map(store => <li style={{fontSize: '16px'}}>{store.Name}</li>)
            }
          </header>
        </div>
      )
    }
  }
}
