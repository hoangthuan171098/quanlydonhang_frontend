import React, { Component } from 'react';

class News extends Component {
    render() {
        return (
            <div className="blog-single gray-bg">
            <div className="container">
              <div className="row align-items-start">
                <div className="col-lg-8 m-15px-tb">
                  <article className="article">
                    <div className="article-img">
                      <img src="https://chuyenmuavai.com/wp-content/uploads/2021/02/phan-biet-vai-phi-voi-vai-lua.jpg" title alt="" />
                    </div>
                    <div className="article-title">
                      <h6><a href="/">TIN TỨC VẢI</a></h6>
                      <h2>Vải lụa – hai loại vải “thần thánh” vào mùa hè</h2>
                    </div>
                    <div className="article-content">
                      <p>Dạo gần đây, các dòng vải có chất liệu mềm mại, thoáng mát là một trong những lựa chọn hàng đầu của người tiêu dùng. Vậy trên thị trường hiện nay, có những loại vải nào đáp ứng đủ các yếu tố kể trên. Hôm nay, chúng tôi xin giới thiệu cho bạn hai loại vải đang làm mưa làm gió trên thị trường – vải lụa và vải phi lụa. Để tìm hiểu chi tiết hơn về đặc điểm cũng như công dụng của hai loại vải này,
                       mời bạn cùng công ty mua vải tồn kho Nam Hải theo dõi bài viết dưới đây của chúng tôi.</p>
                      
                      <h4>Vải lụa là gì?</h4>
                      <p>Vải lụa là loại vải được dệt từ chất liệu tơ tằm tự nhiên có kết cấu mỏng nhẹ tạo cảm giác thoải mái khi sử dụng. Vải lụa được xem là một loại vải cực kì đắt đỏ, ở thời kì phong kiến, chỉ vua chúa, quan lại trong triều đình mới được sử dụng. Cho đến hiện tại, các loại vải lụa này vẫn có giá rất cao. Vải lụa mềm mại, thanh thoát khi may trang phục vừa tạo sự sang trọng, quý phái vừa thể hiện sự quyến rũ, đầy quyền lực.</p>
                      
                      <h4>Đặc điểm của vải lụa</h4>
                      <p>Vải lụa là một trong những chất liệu được rất nhiều người yêu thích không chỉ bởi thành phần, cấu tạo mà còn bởi những đặc điểm nổi trội của nó. Vậy, vải lụa có đặc điểm như thế nào?</p>
                      
                      <h5>Vải lụa mềm nhẹ, cách nhiệt tốt</h5>
                      <p>Vải lụa được làm từ các loại sợi tự nhiên nên mềm, nhẹ hơn các loại vải nhân tạo. Đặc biệt, vải lụa có khả năng cách nhiệt tốt. Vải lụa khi mặc không gây cảm giác dấp dính, khó chịu cho người sử dụng.</p>
                      
                      <h5>Vải có khả năng hút ẩm thấm hút mồ hôi tốt</h5>
                      <p>Vải lụa có đặc điểm khá mềm, mát, thấm hút mồ hôi tốt lên tới 35%. Vì vậy các loại vải lụa được sử dụng phổ biến trong các trang phục mùa hè. Vải lụa được dùng để may đồ ngủ, váy, đầm, trang phục công sở,…</p>
                      
                      <h5>Vải có khả năng chịu nhiệt cao, dẫn điện kém</h5>
                      <p>Các dòng vải lụa tự nhiên có thể chịu tác động nhiệt cao mà không bị thay đổi hình dạng, cũng như đổi màu. Cho nên, vải lụa được coi là một chất liệu đắt đỏ là vì thế.</p>
                      
                      <h5>Vải lụa an toàn, thân thiện với người sử dụng</h5>
                      <p>Vì được sản xuất từ các loại sợi tơ tằm tự nhiên, không chứa bất kì chất hóa học nào nên vải lụa đặc biệt an toàn, thân thiện với người sử dụng. Các loại vải lụa có thể dùng với nhiều loại da khác nhau, ngay cả những loại da nhạy cảm.
                      Tuy nhiên, các dòng vải lụa cũng có một số hạn chế nhất định. Thứ nhất là các dòng vải lụa thường có độ co giãn không cao, dễ bị đổi màu khi gặp mồ hôi. Việc nhuộm màu lên chất liệu lụa tơ tằm cũng đặc biệt khó khăn, đòi hỏi phải có kĩ thuật cao.</p>
                        
                    </div>
                    <div className="nav tag-cloud">
                      <a href="/">Lụa</a>
                      <a href="/">Phi Lụa</a>
                      <a href="/">Vải niken</a>
                      <a href="/">Vải Kate</a>
                      <a href="/">Vải Mango</a>
                      <a href="/">Vải polyester</a>
                      <a href="/">Vải linen</a>
                    </div>
                  </article>
                  <div className="contact-form article-comment">
                    <h4>COMNENT</h4>
                    <form id="contact-form" method="POST">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input name="Name" id="name" placeholder="Name *" className="form-control" type="text" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input name="Email" id="email" placeholder="Email *" className="form-control" type="email" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea name="message" id="message" placeholder="Your message *" rows={4} className="form-control" defaultValue={""} />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="send">
                            <button className="px-btn theme"><span>Submit</span> <i className="arrow" /></button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 m-15px-tb blog-aside">
                 
                  <div className="widget widget-post">
                    <div className="widget-title">
                      <h3>Xu hướng</h3>
                    </div>
                    <div className="widget-body">
                    </div>
                  </div>
                  <div className="widget widget-latest-post">
                    <div className="widget-title">
                      <h3>Bài viết gần nhất</h3>
                    </div>
                    <div className="widget-body">
                      <div className="latest-post-aside media">
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5><a href="/">Tìm hiểu về loại vải mango – chất vải quyến rũ nhất mọi thời đại</a></h5>
                          </div>
                          <div className="lpa-meta">
                            <a className="name" href="/">
                              Hoàng Thuận
                            </a>
                            <a className="date" href="/">
                              17/04/2021
                            </a>
                          </div>
                        </div>
                        <div className="lpa-right">
                          <a href="/">
                            <img src="https://chuyenmuavai.com/wp-content/uploads/2021/02/vai-mango-nhat.jpg" title alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="latest-post-aside media">
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5><a href="/">Vải polyester là gì? Những điều mà bạn chưa biết về vải polyester?</a></h5>
                          </div>
                          <div className="lpa-meta">
                            <a className="name" href="/">
                              Lê Đình Điệp
                            </a>
                            <a className="date" href="/">
                              15/04/2021
                            </a>
                          </div>
                        </div>
                        <div className="lpa-right">
                          <a href="/">
                            <img src="https://chuyenmuavai.com/wp-content/uploads/2021/02/image005.jpg" title alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="latest-post-aside media">
                        <div className="lpa-left media-body">
                          <div className="lpa-title">
                            <h5><a href="/">Vải linen là gì? Tính chất, công dụng nổi bật của vải linen</a></h5>
                          </div>
                          <div className="lpa-meta">
                            <a className="name" href="/">
                              Phương Thức
                            </a>
                            <a className="date" href="/">
                              12/04/2021
                            </a>
                          </div>
                        </div>
                        <div className="lpa-right">
                          <a href="/">
                            <img src="https://chuyenmuavai.com/wp-content/uploads/2021/02/gas-giuong-lanh.jpg" title alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default News;