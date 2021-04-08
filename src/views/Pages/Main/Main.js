import React, { Component } from 'react';
import "../../../styles/main_styles.css";
import "../../../styles/responsive.css";
import services from "../../../images/services.jpg";
import mirror from "../../../images/mirror.svg" ;
import index from "../../../images/index.jpg";
import index1 from "../../../images/index1.png";
import Header from "./Header";
import facial from "../../../images/facial-mask.svg";
import makeup from "../../../images/makeup.svg";
import cream from "../../../images/cream.svg";
import makeup2 from "../../../images/make-up.svg";
import testimonial from "../../../images/testimonials.jpg";
import testimonial2 from "../../../images/testimonials2.jpg";
import placeholder from "../../../images/placeholder.svg";
import phone from "../../../images/phone-call.svg";
import message from "../../../images/message.svg";
import footer from "../../../images/footer.jpg";
import author_1 from "../../../images/test1.jpg";
import author_2 from "../../../images/test2.jpg";
import author_3 from "../../../images/test3.jpg";
import wallpaper1 from "../../../images/wallpaper1.png";
import wallpaper2 from "../../../images/wallpaper2.jpg";
import wallpaper4 from "../../../images/wallpaper4.jpg";
import wallpaper5 from "../../../images/wallpaper5.jpg";


class Main extends Component {
    constructor(props){
        super(props);
        this.state={
            large: false,
            
        }
    }
    
    componentDidMount=()=>{
        const script = document.createElement("script");
        script.src = "../../../js/custom.js";
        script.async = true;
        document.body.appendChild(script);
    }





    
    render() { 
        return ( <div className="  divelement super_container">
	

     
     <Header/>
        
        <div className="divelement menu1">
            <nav className="menu_nav">
                <ul className="d-flex flex-column align-items-start justify-content-start">
                    <li className="active"><a href="index.html">Home</a></li>
                    <li><a href="https://spemai.com/">About Us</a></li>
                    <li><a href="/#/main#services">Services</a></li>
                    <li><a href="articles.html">Articles</a></li>
                    <li><a href="https://spemai.com/contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>


    
       <div className="desktop">
       <p>This is phone</p>
       </div>

              <div className="phone">
       <p>This is desktop</p>
       </div>
       
       
        <div className="divelement home">
    
      
            <div className="divelement home_slider_container">
                <div className="divelement owl-carousel owl-theme home_slider">
                    
                   
                     <div className="divelement owl-item home_slide">
                        <div className=" divelement background_image" style={{backgroundImage:`url(${wallpaper1})`}}></div>
                        <div className="divelement slide_text" data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                            {/* <div className="divelement slide_title">Our best offers</div>
                            <div className="divelement slide_subtitle">Lorem ipsum dolor sit amet, consectetur</div> */}
                        </div>
                        <div className="divelement slide_container">
                            <div className="divelement container">
                                <div className="divelement row">
                                    <div className="divelement col-lg-11">
                                        <div className="divelement slide_content" data-animation-in="fadeInRight" data-animation-out="animate-out fadeOut">
                                            <div className="divelement home_title"><h1 className="h1">The <span>Best</span> Reservation system</h1></div><br></br>
                                            <div className="divelement home_text">
                                                <p>Schedule appointments as your wish.</p>
                                            </div>
                                            {/* <div className="divelement home_link"><a href="#">View our offers</a></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
    




                  
                    <div className="divelement owl-item home_slide">
                        <div className="divelement background_image" style={{backgroundImage:`url(${wallpaper2})`}}></div>
                        <div className="divelement slide_text" data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                            {/* <div className="divelement slide_title">Our best offers</div>
                            <div className="divelement slide_subtitle">Lorem ipsum dolor sit amet, consectetur</div> */}
                        </div>
                        <div className="divelement slide_container">
                            <div className="divelement container">
                                <div className="divelement row">
                                    <div className="divelement col-lg-11">
                                        <div className="divelement slide_content" data-animation-in="fadeInRight" data-animation-out="animate-out fadeOut">
                                            <div className="divelement home_title"><h1 className="h1">Convinient <span>Appointment</span> Management</h1></div><br></br>
                                            <div className="divelement home_text">
                                                <p>The most effective and user friendly approach to manage your appointments.</p>
                                            </div>
                                            {/* <div className="divelement home_link"><a href="#">View our offers</a></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
    
             



                    <div className="divelement owl-item home_slide">
                        <div className="divelement background_image" style={{backgroundImage:`url(${index1})`}}></div>
                        <div className="divelement slide_text" data-animation-in="fadeIn" data-animation-out="animate-out fadeOut">
                            {/* <div className="divelement slide_title">Our best offers</div>
                            <div className="divelement slide_subtitle">Lorem ipsum dolor sit amet, consectetur</div> */}
                        </div>
                        <div className="divelement slide_container">
                            <div className="divelement container">
                                <div className="divelement row">
                                    <div className="divelement col-lg-11">
                                        <div className="divelement slide_content" data-animation-in="fadeInRight" data-animation-out="animate-out fadeOut">
                                            
                                            <div className="divelement home_text">
                                            <div className="divelement home_title"><h1 className="h1">Responsive <span>Web</span> Design</h1></div>
                                                
                                            </div>
                                            {/* <div className="divelement home_link"><a href="#">View our offers</a></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
    
        
            <div className="divelement scroll_down scroll_to d-flex flex-column align-items-center justify-content-center" data-scroll-to="#services">
                <div className="divelement scroll_icon"></div>
                <div className="divelement">Scroll Down</div>
            </div>
    
            
            <div className="divelement slide_progress">
                <div className="divelement slide_num">01.</div>
                <div className="divelement slide_bar"><div></div></div>
            </div>
        </div>
    
        
    
        <div className="divelement services" id="services">
            <div className="divelement parallax_background" data-image-src={wallpaper4}></div>
            <div className="divelement container">
                <div className="divelement row">
                    <div className="divelement col-lg-9">
                        <div className="divelement section_title_container">
                            <div className="divelement section_title"><h1 className="h1">Our Services</h1></div>
                            <p>Our service is to provide the best reservation facility for your company.</p>
                        </div>
                    </div>
                </div>
                <div className="divelement row services_row">
                    <div className="divelement col">
                        <div className="divelement section_expander">
    
                            <div className="divelement services_slider_container">
                                <div className="divelement owl-carousel owl-theme services_slider">
                                    
                                   
                                    <div className="divelement owl-item">
    
                                        
                                        <div className="divelement service d-flex flex-row align-items-center justify-content-start trans_200">
                                            <div className="divelement service_icon"><div><img src={mirror} className="svg" alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement service_content">
                                                <div className="divelement service_title trans_200">Appointment management</div>
                                                <div className="divelement service_text trans_200">
                                                    <p>Provide appointment management facility with multiple display views including monthly, weekly, daily and employee wise.</p>
                                                </div>
                                            </div>
                                        </div>
    
                                       
                                        <div className="divelement service d-flex flex-row align-items-center justify-content-start trans_200">
                                            <div className="divelement service_icon"><div><img src={facial} className="svg" alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement service_content">
                                                <div className="divelement service_title trans_200">Staff management</div>
                                                <div className="divelement service_text trans_200">
                                                    <p>Provides facility to add your staff members to the system and assign them to appointments.</p>
                                                </div>
                                            </div>
                                        </div>
    
                                    </div>
    
                                
                                    <div className="divelement owl-item">
                                        
                                    
                                        <div className="divelement service d-flex flex-row align-items-center justify-content-start trans_200">
                                            <div className="divelement service_icon"><div><img src={makeup} className="svg" alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement service_content">
                                                <div className="divelement service_title trans_200">Client management</div>
                                                <div className="divelement service_text trans_200">
                                                    <p>Add your clients to the system and manage them so you can identify your regular clients.</p>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div className="divelement service d-flex flex-row align-items-center justify-content-start trans_200">
                                            <div className="divelement service_icon service_icon_2"><div><img src={cream} className="svg" alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement service_content">
                                                <div className="divelement service_title trans_200">Report generation</div>
                                                <div className="divelement service_text trans_200">
                                                    <p>Generate reports to get an idea about the appointments you had for a period of time.</p>
                                                </div>
                                            </div>
                                        </div>
    
                                    </div>
    
                                  
                                    <div className="divelement owl-item">
                                        
                                      
                                        <div className="divelement service d-flex flex-row align-items-center justify-content-start trans_200">
                                            <div className="divelement service_icon service_icon_flip"><div><img src={makeup2} className="svg" alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement service_content">
                                                <div className="divelement service_title trans_200">Provide system user accessibility</div>
                                                <div className="divelement service_text trans_200">
                                                    <p>The facility to assign multiple admins and co-workers to handle the system with various levels of authentication.</p>
                                                </div>
                                            </div>
                                        </div>
    
                                       
                                        <div className="divelement service d-flex flex-row align-items-center justify-content-start trans_200">
                                            <div className="divelement service_icon service_icon_3"><div><img src={cream} className="svg" alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement service_content">
                                                <div className="divelement service_title trans_200">SMS services</div>
                                                <div className="divelement service_text trans_200">
                                                    <p>Provides SMS facility for notification purposes before the respective appointments for your clients.</p>
                                                </div>
                                            </div>
                                        </div>
    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    
    
        <div className="divelement testimonials">
            <div className="divelement parallax_background" data-image-src={testimonial2}></div>
            <div className="divelement container">
                <div className="divelement row">
                    <div className="divelement col-lg-9">
                        <div className="divelement section_title_container">
                            <div className="divelement section_title"><h1 className="h1">Benefits</h1></div>
                            <p>Assuring the best for business.</p>
                        </div>
                    </div>
                </div>
                <div className="divelement row testimonials_row">
                    <div className="divelement col">
                        <div className="divelement section_expander">
                            
                         
                            <div className="divelement testimonials_slider_container">
                                <div className="divelement owl-carousel owl-theme testimonials_slider">
                                    
                                   
                                    <div className="divelement owl-item">
                                        <div className="divelement testimonial_container">
                                            <div className="divelement testimonial d-flex flex-column align-items-center justify-content-center text-center trans_200">
                                                <div className="divelement testimonial_image"><img src={author_1} alt="img"></img></div>
                                                <div className="divelement testimonial_title">Reservation notification system</div>
                                                <div className="divelement testimonial_text">
                                                    <p>It really helps to keep track of the reservation with the reseration reminders.</p>
                                                </div>
                                                <div className="divelement testimonial_author"></div>
                                            </div>
                                        </div>
                                    </div>
    
                                  
                                    <div className="divelement owl-item">
                                        <div className="divelement testimonial_container">
                                            <div className="divelement testimonial d-flex flex-column align-items-center justify-content-center text-center trans_200">
                                                <div className="divelement testimonial_image"><img src={author_2} alt="img"></img></div>
                                                <div className="divelement testimonial_title">Convinient to handle appointments</div>
                                                <div className="divelement testimonial_text">
                                                    <p>The calendar system helps to handle appointments without any difficulty.</p>
                                                </div>
                                                <div className="divelement testimonial_author"></div>
                                            </div>
                                        </div>
                                    </div>
    
                                   
                                    <div className="divelement owl-item">
                                        <div className="divelement testimonial_container">
                                            <div className="divelement testimonial d-flex flex-column align-items-center justify-content-center text-center trans_200">
                                                <div className="divelement testimonial_image"><img src={author_3} alt="img"></img></div>
                                                <div className="divelement testimonial_title">Efficient to handle reservations</div>
                                                <div className="divelement testimonial_text">
                                                    <p>The client and admin side dual method of handling reservations makes the process of handling reservations efficient.</p>
                                                </div>
                                                <div className="divelement testimonial_author"></div>
                                            </div>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                            <div className="divelement testimonials_more">
                                <div className="divelement testimonials_more_button ml-auto mr-auto trans_200"><a href="#">load more</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  
   
    
        <footer className="footer">
            <div className="divelement parallax_background" data-image-src={wallpaper5}></div>
  
            <div className="divelement footer_container">
                <div className="divelement container">
                    <div className="divelement row">
                        <div className="divelement col">
                            <div className="divelement section_title_container">
                                <div className="divelement section_title"><h1 className="h1">Get in touch</h1></div>
                                <p>Contact us to clarify your doubts.</p>
                            </div>
                        </div>
                    </div>
                    <div className=" row footer_row">

           
         
          <div className="divelement col-lg-3 footer_col">
            <div className="divelement footer_title pb-5">Pages</div>
       

            <ul>
                                        <li className=" d-flex flex-row align-items-start justify-content-start pb-3">
                                            <a href="https://spemai.com/" className="divelement contact_info_content">Company</a>
                                        </li>
                                        <li className="d-flex flex-row align-items-center justify-content-start pb-3">
                                            <a href="https://www.onepay.lk/"  className="divelement contact_info_content">Other products</a>
                                        </li>
                                        <li className=" d-flex flex-row align-items-center justify-content-start">
                                                           <a href="https://spemai.com/contact.html"  className="divelement contact_info_content">Contact us</a>

                                        </li>
                                    </ul>
          </div>
          
<div className="divelement col-lg-5 footer_col">
<div className="divelement footer_title">A name you can trust</div>
<div className="divelement contact_info_list">
 <ul>
 <li className=" d-flex flex-row align-items-start justify-content-start">
<div className="divelement contact_info_content">
We provide high quality customer service experience
</div>
 </li>
</ul>
</div>
</div>
                        <div className="divelement col-lg-4 footer_col">
                            <div className="divelement contact_info">
                                <div className="divelement footer_title">Contact Info</div>
                                <div className="divelement contact_info_list">
                                    <ul>
                                        <li className=" d-flex flex-row align-items-start justify-content-start">
                                            <div className="divelement"><div className="divelement contact_info_icon"><img src={placeholder} alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement contact_info_content">410, 22 Galle Rd, colpittiya 00300</div>
                                        </li>
                                        <li className="d-flex flex-row align-items-center justify-content-start">
                                            <div className="divelement"><div className="divelement contact_info_icon"><img src={phone} alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement contact_info_content">+94 117 021 540</div>
                                        </li>
                                        <li className=" d-flex flex-row align-items-center justify-content-start">
                                            <div><div className="divelement contact_info_icon"><img src={message} alt="https://www.flaticon.com/authors/freepik"></img></div></div>
                                            <div className="divelement contact_info_content">info@spemai.com</div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="divelement social">
                                    <ul className="d-flex flex-row align-items-center justify-content-start">
                                        {/* <li><a href="#"><i className="fa fa-pinterest" aria-hidden="true"></i></a></li> */}
                                        <li><a href="https://www.facebook.com/SPEMAIcom"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
                                        <li><a href="https://twitter.com/we_spemai"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
                                        {/* <li><a href="#"><i className="fa fa-dribbble" aria-hidden="true"></i></a></li>
                                        <li><a href="#"><i className="fa fa-behance" aria-hidden="true"></i></a></li> */}
                                        <li><a href="https://www.instagram.com/spemaicom/"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* <div className="divelement col-lg-8">
                            <div className="divelement footer_title">Leave a comment</div>
                            <div className="divelement contact_form_container">
                                <form action="#" id="contact_form" className="contact_form">
                                    <div>
                                        <div className="divelement row">
                                            <div className="divelement col-lg-6">
                                                <input type="text" placeholder="Name" className="contact_input" required="required"></input>
                                            </div>
                                            <div className="divelement col-lg-6">
                                                <input type="email" placeholder="E-mail" className="contact_input" required="required"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="divelement"><input type="text" placeholder="Subject" className="contact_input"></input></div>
                                    <div className="divelement"><textarea className="contact_input contact_textarea" placeholder="Message" required="required"></textarea></div>
                                    <button className="contact_form_button">send message</button>
                                </form>
                            </div>
                        </div> */}
               
                    </div>
                </div>
            </div>
            <div className="divelement footer_bar d-flex flex-row align-items-center justify-content-start">
                <div className="divelement copyright">
    Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | developed <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://spemai.com/" target="_blank">Spemai</a>
   </div>
            </div>
        </footer>
    </div>
     );
    }
}
 
export default Main;