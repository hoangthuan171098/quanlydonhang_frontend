import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Team extends Component {
    render() {
        return (
            <section id="team">
        <div className="container">
          <div className="section-header">
            <h3>Thành viên của nhóm</h3>
            <br/><br/>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 wow fadeInUp" style={{visibility: 'visible', animationName: 'fadeInUp'}}>
              <div className="member"> <img src="assets/img/hoangthuan.jpg" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Hoàng Thuận</h4> <span>Member</span>
                    <div className="social"> <Link to='#'><i className="fa fa-twitter" /></Link> <Link to='#'><i className="fa fa-facebook" /></Link> <Link to='#'><i className="fa fa-google-plus" /></Link> <Link to='#'><i className="fa fa-linkedin" /></Link> </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInUp'}}>
              <div className="member"> <img src="assets/img/dieple.jpg" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Lê Đình Điệp</h4> <span>Member</span>
                    <div className="social"> <Link to='#'><i className="fa fa-twitter" /></Link> <Link to='#'><i className="fa fa-facebook" /></Link> <Link to='#'><i className="fa fa-google-plus" /></Link> <Link to='#'><i className="fa fa-linkedin" /></Link> </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" style={{visibility: 'visible', animationDelay: '0.1s', animationName: 'fadeInUp'}}>
              <div className="member"> <img src="https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/91412025_2788606407925679_8946915853983547392_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=fYz0DVOnae8AX84bmNU&_nc_ht=scontent-hkg4-1.xx&oh=cef96c66e747a9a7fc059075cc54f7e7&oe=60A35C8A" className="img-fluid" alt="" />
                <div className="member-info">
                  <div className="member-info-content">
                    <h4>Huỳnh Phương Thức</h4> <span>Member</span>
                    <div className="social"> <Link to='#'><i className="fa fa-twitter" /></Link> <Link to='#'><i className="fa fa-facebook" /></Link> <Link to='#'><i className="fa fa-google-plus" /></Link> <Link to='#'><i className="fa fa-linkedin" /></Link> </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>
        );
    }
}

export default Team;