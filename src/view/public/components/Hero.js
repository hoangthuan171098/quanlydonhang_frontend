import React, { Component } from 'react';

class Hero extends Component {
    render() {
        return (
            <div id="heroCarousel" className="carousel slide carousel-fade" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
              {/* Slide 1 */}
              <div className="carousel-item active" style={{backgroundImage: 'url(assets/img/slide/slide-1.jpg)'}}>
                <div className="carousel-container">
                  <div className="carousel-content animate__animated animate__fadeInUp">
                    <h2>Chào mừng tới <span>TTD</span></h2>
                    <p style={{color:'white'}}>Công ty Cổ Phần TTD là một trong những doanh nghiệp dệt may cung cấp sản phẩm và
                       dịch vụ thời trang hàng đầu Việt Nam, chuyên sản xuất vải dệt Jacquard, vải in bông trên công nghệ in digital
                      , vải đơn sắc, vải đa sắc … từ sợi polyester, spandex, visco, …. với công nghệ tiên tiến được chuyển giao từ Nhật Bản và Châu Âu.</p>
                    <div className="text-center"><a href='/' className="btn-get-started">Thêm</a></div>
                  </div>
                </div>
              </div>
              {/* Slide 2 */}
              <div className="carousel-item" style={{backgroundImage: 'url(assets/img/slide/slide-2.jpg)'}}>
                <div className="carousel-container">
                  <div className="carousel-content animate__animated animate__fadeInUp">
                    <h2>TTD</h2>
                    <p style={{color:'white'}}>Công ty Cổ Phần TTD là một trong những doanh nghiệp dệt may cung cấp sản phẩm và
                       dịch vụ thời trang hàng đầu Việt Nam, chuyên sản xuất vải dệt Jacquard, vải in bông trên công nghệ in digital
                      , vải đơn sắc, vải đa sắc … từ sợi polyester, spandex, visco, …. với công nghệ tiên tiến được chuyển giao từ Nhật Bản và Châu Âu.</p>
                    <div className="text-center"><a href='/' className="btn-get-started">Read More</a></div>
                  </div>
                </div>
              </div>
              {/* Slide 3 */}
              <div className="carousel-item" style={{backgroundImage: 'url(assets/img/slide/slide-3.jpg)'}}>
                <div className="carousel-container">
                  <div className="carousel-content animate__animated animate__fadeInUp">
                    <h2>TTD</h2>
                    <p style={{color:'white'}}>Công ty Cổ Phần TTD là một trong những doanh nghiệp dệt may cung cấp sản phẩm và
                       dịch vụ thời trang hàng đầu Việt Nam, chuyên sản xuất vải dệt Jacquard, vải in bông trên công nghệ in digital
                      , vải đơn sắc, vải đa sắc … từ sợi polyester, spandex, visco, …. với công nghệ tiên tiến được chuyển giao từ Nhật Bản và Châu Âu.</p>
                    <div className="text-center"><a href='/' className="btn-get-started">Read More</a></div>
                  </div>
                </div>
              </div>
            </div>
            <a className="carousel-control-prev" href="#heroCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon bx bx-left-arrow" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#heroCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon bx bx-right-arrow" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
            <ol className="carousel-indicators" id="hero-carousel-indicators" />
          </div>
        );
    }
}

export default Hero;