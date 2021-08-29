import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <main id="main">
            {/* ======= About Us Section ======= */}
            <section id="about" className="about">
              <div className="container">
                <div className="row no-gutters">
                  <div className="col-lg-12 d-flex flex-column justify-content-center about-content">
                    <div className="section-title">
                      <h2>GIỚI THIỆU TTD</h2>
                      <p>Công ty Cổ Phần TTD là một trong những doanh nghiệp dệt may cung cấp sản phẩm và
                       dịch vụ thời trang hàng đầu Việt Nam, chuyên sản xuất vải dệt Jacquard, vải in bông trên công nghệ in digital
                      , vải đơn sắc, vải đa sắc … từ sợi polyester, spandex, visco, …. với công nghệ tiên tiến được chuyển giao từ Nhật Bản và Châu Âu.</p>
                    </div>
                    <div className="icon-box">
                      <div className="icon"><i className="bx bx-fingerprint" /></div>
                      <h4 className="title"><a href>ĐỊNH HƯỚNG</a></h4>
                      <p className="description">Với định hướng sẽ trở thành “Thương hiệu quốc tế cung cấp vải thời trang toàn cầu” cùng sứ mệnh “Tôn vinh vẻ đẹp phụ nữ thông qua sản phẩm thời trang, góp phần xây dựng thương hiệu quốc gia”, TTD đã không ngừng đầu tư, phát triển và ứng dụng các công nghệ tiên tiến nhất vào sản xuất. 
                      Có thể nói, khoa học công nghệ luôn là động lực thúc đẩy cho sự tăng trưởng toàn diện đối với TTD.</p>
                    </div>
                    <div className="icon-box">
                      <div className="icon"><i className="bx bx-gift" /></div>
                      <h4 className="title"><a href>GIẢI THƯỞNG</a></h4>
                      <p className="description">Sản phẩm của TTD được kiểm soát chặt chẽ theo hệ thống quản lý chất lượng quốc tế: ISO 9000, 5S. Trong nhiều năm liền, TTD được vinh danh ở nhiều giải thưởng uy tín: Sao Vàng Đất Việt, Hàng Việt Nam Chất Lượng Cao, Doanh Nghiệp Thương Hiệu Mạnh Việt Nam, …</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>{/* End About Us Section */}
            {/* ======= About Lists Section ======= */}
            <section className="about-lists">
              <div className="container">
                <div className="row no-gutters">
                  <div className="col-lg-6 col-md-6 content-item">
                    <span>01</span>
                    <h4>CHÚNG TÔI LÀ</h4>
                    <p>Công ty Cổ phần TTD là một cung ty chuyên cung cấp chuỗi dịch vụ vải tổng hợp trên toàn Việt Nam. <br/>
                    Trong bối cảnh phát triển ngày càng lớn mạnh của chuỗi dịch vụ vải , nhu cầu liên kết với các đối tác cung cấp dịch vụ vải trên toàn quốc là rất lớn và rất đa dạng.
                     Trong khi đó, các công ty hiện tại chỉ cung cấp một mảng dịch vụ nhất định gây khó khăn cho công tác quản lý tổng thể của khách hàng.
                      Vì vậy, chúng tôi, một đội ngũ lãnh đạo thuộc các công ty cung cấp các dịch vụ khác nhau đã liên minh lại và đồng sáng lập ra TTD nhằm cung cấp tổng hợp các dịch vụ cung cấp vải.
                    </p>
                  </div>
                  <div className="col-lg-6 col-md-6 content-item">
                    <span>02</span>
                    <h4>DỊCH VỤ</h4>
                    <p>- Dịch vụ của công ty TTD mang đến cho khách hàng thỏa mãn lợi ích,
                    đáp ứng nhu cầu ngày càng cao của khách hàng <br/> 
                        - Nâng cao chất lượng dịch vụ với chi phí hợp lý.
                        -chất lượng uy tín được công ty, doanh nghiệp hàng đầu công nhận.<br/>
                        - Với phương châm là " UY TÍN ,CHẤT LƯỢNG, SẢN LƯỢNG HÀNG ĐẦU VIỆT NAM."
                    </p>
                  </div>
                 
                  <div className="col-lg-6 col-md-6 content-item">
                    <span>03</span>
                    <h4>SẢN PHẨM</h4>
                    <p>công ty TTD cung cấp các laoij sản phẩm liên quan đến vải như Bambootex BT1801,Kaki.... với triết lý là
                    chất lượng đạt yêu cầu hàng đầu Việt nam.</p>
                  </div>
                  <div className="col-lg-6 col-md-6 content-item">
                    <span>04</span>
                    <h4>Đội Ngũ</h4>
                    <p>Đội ngũ nhân viên tham gia quá trình sản xuất vải thun của công ty đều là những nhân sự có tay nghề và trình độ cao. Thao tác khi làm việc luôn đảm bảo đúng kỹ thuật, an toàn khi thực hiện.</p>
                  </div>
                  
                </div>
              </div>
            </section>
          </main>
    
        );
    }
}

export default About;