import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
          <div className="container">
          
          <div id="map-container-google-1" className="z-depth-1-half map-container" style={{height: '500px'}}>
            <iframe src="https://maps.google.com/maps?q=/Đại+học+Bách+Khoa+(cổng+3)&t=&z=13&ie=UTF8&iwloc=&output=embed" 
            title="My Location" frameBorder={0} style={{border: 0}} allowFullScreen />
          </div>
          <div className="jumbotron jumbotron-fluid">
            <div className="container">
              <h1 className="display-2" style={{textAlign: 'center'}}>CONTACT</h1>
              <hr className="my-2" />
              <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-6">
                  <div className="form-outline">
                    <label htmlFor="validationCustom01" className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="validationCustom01" required />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-outline">
                    <label htmlFor="validationCustom02" className="form-label">Your Email</label>
                    <input type="text" className="form-control" id="validationCustom02" required />
                    <div className="valid-feedback">Looks good!</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-outline">
                    <label htmlFor="validationCustom03" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="validationCustom03" required />
                    <div className="invalid-feedback">Please provide a valid Suject.</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-outline">
                    <label htmlFor="validationCustom05" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="validationCustom05" required />
                    <div className="invalid-feedback">Please provide a valid Phone.</div>
                  </div>
                </div>
                <div className="col-md">
                  <div className="form-outline">
                    <label htmlFor="validationCustom03" className="form-label">Message</label>
                    <textarea className="form-control" id="validationCustom06" rows={4} required defaultValue={""} />
                    <div className="invalid-feedback">Please provide a valid message.</div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck" required />
                    <label className="form-check-label" htmlFor="invalidCheck">
                      Agree to terms and conditions
                    </label>
                    <div className="invalid-feedback">You must agree before submitting.</div>
                  </div>
                </div>
                <div className="col-12" style={{textAlign: 'center'}}>
                  <button className="btn btn-primary" type="submit" style={{width: '150px', height: '40px', borderRadius: '10px'}}>Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        );
    }
}

export default Contact;