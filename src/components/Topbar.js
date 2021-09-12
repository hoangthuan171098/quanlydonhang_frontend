import React, { Component } from 'react';

class Topbar extends Component {
    render() {
        return (
            <div className="Topbar d-flex">
            <div className="contact-info mr-auto">
              <i className="icofont-envelope" /><a href="mailto:contact@example.com">contact@example.com</a>
              <i className="icofont-phone" /> +1 5589 55488 55
            </div>
            <div className="social-links">
              <a href="twitter.com" className="twitter"><i className="icofont-twitter" /></a>
              <a href="facebook.com" className="facebook"><i className="icofont-facebook" /></a>
              <a href="instagram.com" className="instagram"><i className="icofont-instagram" /></a>
              <a href="skype.com" className="skype"><i className="icofont-skype" /></a>
              <a href="linkedin.com" className="linkedin"><i className="icofont-linkedin" /></a>
            </div>
          </div>
        );
    }
}

export default Topbar;