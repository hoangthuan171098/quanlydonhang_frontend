import React, { Component } from 'react';

class Service extends Component {
    render() {
        return (
            <section id="services" className="bg-light pt-100 pb-70">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <h2 className="title"> <span>DỊCH VỤ </span> 
              CỦA CHÚNG TÔI
              </h2>
              <p className=" mt-3 ">TTD là một trong những doanh nghiệp đứng đầu về việc kinh donah vải.
                TTD sẽ cam kết mang lại cho khách hàng những giá trị nổi trội thông qua các dịch vụ 
                hoàn hảo nhất với phương châm thành công của khách hàng là sự thành công của TTD<br/><br/>

                Với mục tiêu cung cấp nhiều  sản phẩm phong phú về mẫu mã và chất lượng được đảm bảo 
                được nhà nước và nhiều công ty chứng nhận.</p>
              <a className="btn btn-primary my-5" href="/">More Info </a>
            </div>
            <div className="col-lg-7">
              <div className="row card-items">
                <div className="col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <i className="bi-bag-fill" />
                      <h5 className="card-title">Sản phẩm</h5>
                      <p className="card-text">Sản phẩm của chúng tôi đa dạng về mẫu mã, đảm bảo chất lượng hàng đầu Việt Nam.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <i className="bi bi-truck" />
                      <h5 className="card-title">Vận Chuyển</h5>
                      <p className="card-text">Dịch vụ vận chuyển của chúng tôi sẽ giao hàng tận nơi một cách nhanh chóng.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <i className="bi bi-person-fill" />
                      <h5 className="card-title"> Thành Viên</h5>
                      <p className="card-text">Bạn sẽ trở thành thành viên của chúng tôi để nhận những ưu đãi đối với khách hàng thân thiết.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="card">
                    <div className="card-body">
                      <i className="bi bi-phone" />
                      <h5 className="card-title"> Liên Hệ</h5>
                      <p className="card-text">Dịch vụ liên hệ, nếu bạn có có bất kỳ thắc mắc nào có thể liên với chúng tôi để giải đáp.</p>
                    </div>
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

export default Service;