import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  state = {
    phone_records: []
  }

  updateState  = (data) => {
    this.setState({ phone_records:  data.results })
  }
/*
  componentDidMount() {
    console.log("about to fetch")
    axios.get('http://127.0.0.1:5000/phoneLookup?phoneNumber=+19199066197')
    .then((response) => {
      this.setState({ phone_records:  response.data.results })
      console.log(this.state.phone_records)
    }, (error) => {
      console.log(error);
    });
  }
*/

  render() {
    return (
       <div className="container">
        <p/>
        <Form onSubmit={this.updateState}/>
        <p/>
          <div className="col-xs-12">
            <h1>Phone Information</h1>
            {this.state.phone_records.map((phone_record) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{phone_record.tn}</h5>
                  <table><tbody>
                  {Object.keys(phone_record).map((key) => (
                    <tr>
                      <td>{key}:</td><td className="phone-item">{phone_record[key]}</td>
                    </tr>
                  ))}
                  </tbody></table>
                </div>
              </div>
            ))}
          </div>
       </div>
    );  }
}

class Form extends React.Component {
  state = { phoneNumber: '' };

  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`http://127.0.0.1:5000/phoneLookup?phoneNumber=${this.state.phoneNumber}`);
    this.props.onSubmit(resp.data);
  };

	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
    	  <input 
          type="text" 
          value={this.state.phoneNumber}
          onChange={event => this.setState({ phoneNumber: event.target.value })}
          placeholder="Enter phone number" 
          required 
        />
        <button>Go!</button>
    	</form>
    );
  }
}

export default App;