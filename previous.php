<?php
    if (isset($_POST['contact'])) {
        extract($_POST);
        $to = 'rohitsahu728@gmail.com';
        $subject = "New Message from site";
        $from= $email;

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

        // Create email headers
        $headers .= 'From: '.$from."\r\n".
              'Reply-To: '.$from."\r\n" .
              'X-Mailer: PHP/' . phpversion();
        $txt = '
            <h2>Name: '.$name.' '.$lname.'</h2><br />
            <h4>Email: '.$email.'</h4><br />
            <p>Message: '.$message.'</p>
        ';
        mail($to,$subject,$txt,$headers);
        echo "<script>alert('Thanks $name, for writing a message for me. :)'); window.location.assign('')</script>";
    }
?>
<!doctype html>
<html lang="en">
<head>
        <title>Rohit | My Professional &amp; Personal Website </title>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="Hello, Welcome to the website. Open this website to view details about Rohit, lives in Guwahati and working as a Web Developer" />
        <meta name="keywords" content="rohit, sahu, rohit sahu, web designer, web developer, guwahati, web development, php developer, codeigniter developer" />
        <meta name="developer" content="Rohit Sahu">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        
        <!-- FAV AND ICONS   -->
        <link rel="shortcut icon" href="assets/images/apple-icon.png">
        <link rel="shortcut icon" sizes="72x72" href="assets/images/apple-icon-72x72.png">
        <link rel="shortcut icon" sizes="114x114" href="assets/images/apple-icon-114x114.png">
        
        <!-- Google Font-->
        <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="assets/icons/font-awesome-4.7.0/css/font-awesome.min.css">
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="assets/plugins/css/bootstrap.min.css">
        <!-- Animate CSS-->
        <link rel="stylesheet" href="assets/plugins/css/animate.css">
        <!-- Owl Carousel CSS-->
        <link rel="stylesheet" href="assets/plugins/css/owl.css">
        <!-- Fancybox-->
        <link rel="stylesheet" href="assets/plugins/css/jquery.fancybox.min.css">
        <!-- Custom CSS-->
        <link rel="stylesheet" href="assets/css/styles.css">
        <link rel="stylesheet" href="assets/css/responsive.css">
    </head>
    <body class="dark-vertion black-bg">
        <!-- Start Loader -->
        <div class="section-loader">
            <div class="loader">
                <div></div>
                <div></div> 
            </div>
        </div>
        <!-- End Loader -->
        
        <!--
        ===================
           NAVIGATION
        ===================
        -->
        <header class="black-bg mh-header mh-fixed-nav nav-scroll mh-xs-mobile-nav wow fadeInUp" id="mh-header">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <nav class="navbar navbar-expand-lg mh-nav nav-btn">
                        <a class="navbar-brand" href="#">
                            <h2>Welcome</h2>
                        </a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon icon"></span>
                        </button>
                    
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav mr-0 ml-auto">
                                <li class="nav-item active">
                                    <a class="nav-link" href="#mh-home">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#mh-about">About</a>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link" href="#mh-skills">Skills</a>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link" href="#mh-experience">Experiences</a>
                                </li>
                                <li class="nav-item">
                                   <a class="nav-link" href="#mh-contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
        
        <!--
        ===================
            HOME 
        ===================
        -->
        <section class="mh-home" id="mh-home">
            <div class="home-ovimg">
                <div class="container">
                    <div class="row xs-column-reverse section-separator vertical-middle-content home-padding">
                        <div class="col-sm-6">
                            <div class="mh-header-info">
                                <div class="mh-promo wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.1s">
                                    <span>Hello I'm</span>
                                </div>
                                
                                <h2 class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">Rohit Sahu</h2>
                                <h4 class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">Web Developer</h4>
                                
                                <ul>
                                    <li class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.4s"><i class="fa fa-envelope"></i><a href="mailto:rohitsahu728@gmail.com">rohitsahu728@gmail.com</a></li>
                                    <li class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.5s"><i class="fa fa-phone"></i><a href="callto:+918402081401">+91 840 208-1401</a></li>
                                    <li class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.6s"><i class="fa fa-map-marker"></i><address>Guwahati, Assam, India</address></li>
                                </ul>
                                
                                <ul class="social-icon wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.7s">
                                    <li><a target="_BLANK" href="//fb.com/rernr"><i class="fa fa-facebook"></i></a></li>
                                    <li><a target="_BLANK" href="https://www.linkedin.com/in/rohit-sahu-62043615a/"><i class="fa fa-linkedin"></i></a></li>
                                    <li><a target="_BLANK" href="https://github.com/rohit52594"><i class="fa fa-github"></i></a></li>
                                    <li><a target="_BLANK" href="http://instagram.com/rohits_1997"><i class="fa fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="hero-img wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.6s">
                                <div class="img-border">
                                    <img src="assets/images/rohit.png" alt=""  class="img-fluid">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>   
        
        <!--
        ==================
            ABOUT
        =================
        -->
        <section class="mh-about" id="mh-about">
            <div class="container">
                <div class="row section-separator">
                    <div class="col-sm-12 col-md-6">
                        <div class="mh-about-img shadow-2 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.4s">
                            <img src="assets/images/ab-img.png" alt="" class="img-fluid">
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="mh-about-inner">
                            <h2 class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.1s">About Me</h2>
                            <p class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">Hello, I’m a Rohit, web-developer based on Guwahati. 
                            I do website design & building 
                            and customization. Also I am good at</p>
                            <div class="mh-about-tag wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">
                                <ul>
                                    <li><span>php</span></li>
                                    <li><span>codeigniter</span></li>
                                    <li><span>ajax</span></li>
                                    <li><span>css</span></li>
                                    <li><span>php</span></li>
                                    <li><span>wordpress</span></li>
                                    <li><span>django</span></li>
                                    <li><span>javascript</span></li>
                                </ul>
                            </div>
                            <a onclick="alert('Opps! This will available soon.');" class="btn btn-fill wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.4s">Download CV <i class="fa fa-download"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!--
        ===================
           SERVICE
        ===================
        -->
        <section class="mh-service">
            <div class="container">
                <div class="row section-separator">
                    <div class="col-sm-12 text-center section-title wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">
                        <h3>What I do</h3>
                    </div>
                    <div class="col-sm-4">
                        <div class="mh-service-item shadow-1 dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">
                            <i class="fa fa-bullseye purple-color"></i>
                            <h3>UI Design</h3>
                            <p>
                                Designing html pages with CSS and Bootstrap with creative design
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="mh-service-item shadow-1 dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.5s">
                            <i class="fa fa-code iron-color"></i>
                            <h3>Web Development</h3>
                            <p>
                                Developing backend anf frontend portals or applications
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="mh-service-item shadow-1 dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.7s">
                            <i class="fa fa-object-ungroup sky-color"></i>
                            <h3>Project</h3>
                            <p>
                                Managing Project, Project Multitasker, Team Worker
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>       
        
        <!--
        ===================
           SKILLS
        ===================
        -->
        <section class="mh-skills" id="mh-skills">
            <div class="container">
                <div class="row section-separator">
                    <div class="section-title text-center col-sm-12">
                        <!--<h2>Skills</h2>-->
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="mh-skills-inner">
                            <div class="mh-professional-skill wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">
                                <h3>Technical Skills</h3>
                                <div class="each-skills">
                                    <div class="candidatos">
                                        <div class="parcial">
                                            <div class="info">
                                                <div class="nome">PHP</div>
                                                <div class="percentagem-num">73%</div>
                                            </div>
                                            <div class="progressBar">
                                                <div class="percentagem" style="width: 73%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="candidatos">
                                        <div class="parcial">
                                            <div class="info">
                                                <div class="nome">MySQL</div>
                                                <div class="percentagem-num">70%</div>
                                            </div>
                                            <div class="progressBar">
                                                <div class="percentagem" style="width: 70%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="candidatos">
                                        <div class="parcial">
                                            <div class="info">
                                                <div class="nome">JavaScript</div>
                                                <div class="percentagem-num">60%</div>
                                            </div>
                                            <div class="progressBar">
                                                <div class="percentagem" style="width: 60%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="candidatos">
                                        <div class="parcial">
                                            <div class="info">
                                                <div class="nome">Codeigniter</div>
                                                <div class="percentagem-num">55%</div>
                                            </div>
                                            <div class="progressBar">
                                                <div class="percentagem" style="width: 55%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="candidatos">
                                        <div class="parcial">
                                            <div class="info">
                                                <div class="nome">Python &amp; Django</div>
                                                <div class="percentagem-num">25%</div>
                                            </div>
                                            <div class="progressBar">
                                                <div class="percentagem" style="width: 25%;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                        <div class="mh-professional-skills wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.5s">
                            <h3>Professional Skills</h3>
                            <ul class="mh-professional-progress">
                                <li>
                                    <div class="mh-progress mh-progress-circle" data-progress="86"></div>
                                    <div class="pr-skill-name">Project Management</div>
                                </li>
                                <li>
                                    <div class="mh-progress mh-progress-circle" data-progress="72"></div>
                                    <div class="pr-skill-name">Creativity</div>
                                </li>
                                <li>
                                    <div class="mh-progress mh-progress-circle" data-progress="70"></div> 
                                    <div class="pr-skill-name">Team Work</div>
                                </li>
                                <li>
                                    <div class="mh-progress mh-progress-circle" data-progress="65"></div>
                                    <div class="pr-skill-name">Communication</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!--
        ===================
           EXPERIENCES
        ===================
        -->
        <section class="mh-experince" id="mh-experience">
            <div class="bolor-overlay">
                <div class="container">
                    <div class="row section-separator">
                        <div class="col-sm-12 col-md-6">
                            <div class="mh-education">
                                 <h3 class="wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">Education</h3>
                                <div class="mh-education-deatils">
                                    <!-- Education Institutes-->
                                    <div class="mh-education-item dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">
                                        <h4>Microsoft Certified Systems Expert <a>ATL Infosys, Guwahati</a></h4>
                                        <div class="mh-eduyear">2018-2019</div>
                                        <p>Learnt about Computer Server, IP Addressing, DHCP, VLAN, Windows Client Services, DNS Configuration, LAN Configuration, Active Directory Installation etc.</p>
                                    </div>
                                    <!-- Education Institutes-->
                                    <div class="mh-education-item dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.5s">
                                        <h4>Information Technology <a href="http://naziracollege.in/">Nazira College</a></h4>
                                        <div class="mh-eduyear">2015-2018</div>
                                        <p>Done my Computer Science Degree, learned many things about computers as a newbie. C, C++, Java, PHP, JavaScript, CSS, Linux OS etc.</p>
                                    </div>
                                    <!-- Education Institutes-->
                                    <div class="mh-education-item dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.6s">
                                        <h4>Junior Web Developer <a>NAASCOM</a></h4>
                                        <div class="mh-eduyear">2015-2016</div>
                                        <p>Got my certificate on completion of NSQF Level 5 examination of Web designing and developing.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6">
                            <div class="mh-work">
                                 <h3>Work Experience</h3>
                                <div class="mh-experience-deatils">
                                    <!-- Education Institutes-->
                                    <div class="mh-work-item dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.4s">
                                        <h4>Web Developer <a href="//otechnix.com">Odometry Technix</a></h4>
                                        <div class="mh-eduyear">2019-Present</div>
                                        <span>Responsibility :</span>
                                        <ul class="work-responsibility">
                                            <li><i class="fa fa-circle"></i>Development</li>
                                            <li><i class="fa fa-circle"></i>Project Management</li>
                                        </ul>
                                    </div>
                                    <!-- Education Institutes-->
                                    <div class="mh-work-item dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.7s">
                                        <h4>Web Development Trainee <a>Zoxola Technologies Pvt. Ltd.</a></h4>
                                        <div class="mh-eduyear">2019-2019</div>
                                        <span>Responsibility :</span>
                                        <ul class="work-responsibility">
                                            <li><i class="fa fa-circle"></i>Designing &amp; Development</li>
                                            <li><i class="fa fa-circle"></i>Trainee</li>
                                        </ul>
                                    </div>
                                    <!-- Education Institutes-->
                                    <div class="mh-work-item dark-bg wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.6s">
                                        <h4>On Job Trainee <a>DiTech Process Solutions Pvt. Ltd.</a></h4>
                                        <div class="mh-eduyear">2018-2019</div>
                                        <span>Responsibility :</span>
                                        <ul class="work-responsibility">
                                            <li><i class="fa fa-circle"></i>EPUB Development</li>
                                            <li><i class="fa fa-circle"></i>Training</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!--
        ===================
           FOOTER 1
        ===================
        -->
        <footer class="mh-footer" id="mh-contact">
            <div class="map-image image-bg">
                <div class="container">
                    <div class="row section-separator">
                        <div class="col-sm-12 section-title wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.2s">
                            <h3>Contact Me</h3>
                        </div>
                        <div class="col-sm-12 mh-footer-address">
                            <div class="row">
                                <div class="col-sm-12 col-md-4">
                                    <div class="mh-address-footer-item dark-bg shadow-1 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">
                                        <div class="each-icon">
                                            <i class="fa fa-location-arrow"></i>
                                        </div>
                                        <div class="each-info">
                                            <h4>Address</h4>
                                            <address>
                                                Guwahati, Assam, India
                                            </address>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <div class="mh-address-footer-item dark-bg shadow-1 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.5s">
                                        <div class="each-icon">
                                            <i class="fa fa-envelope-o"></i>
                                        </div>
                                        <div class="each-info">
                                            <h4>Email</h4>
                                            <a href="mailto:rohitsahu728@email.com">rohitsahu728@email.com</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-12 col-md-4">
                                    <div class="mh-address-footer-item dark-bg shadow-1 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.7s">
                                        <div class="each-icon">
                                            <i class="fa fa-phone"></i>
                                        </div>
                                        <div class="each-info">
                                            <h4>Phone</h4>
                                            <a href="callto:+918402081401">+91 840-208-1401</a><br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">
                            <form class="single-form quate-form wow fadeInUp" method="post">
                                <div id="msgSubmit" class="h3 text-center hidden"></div>
                                <div class="row">
                                    <div class="col-md-6 col-sm-12">
                                        <input name="name" class="contact-name form-control" type="text" placeholder="First Name" required>
                                    </div>
                                    <div class="col-md-6 col-sm-12">
                                        <input name="lname" class="contact-email form-control" type="text" placeholder="Last Name">
                                    </div>
                                    <div class="col-sm-12">
                                        <input name="email" class="contact-subject form-control" type="email" placeholder="Your Email" required>
                                    </div>
                                    <div class="col-sm-12">
                                        <textarea class="contact-message" name="message" rows="6" placeholder="Your Message" required></textarea>
                                    </div>
                                    <!-- Subject Button -->
                                    <div class="btn-form col-sm-12">
                                        <button type="submit" class="btn btn-fill btn-block" name="contact">Send Message</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-12 col-md-6 wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.5s">
                            <div class="mh-map">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229225.54440671628!2d91.56279572644691!3d26.14298086207561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5a287f9133ff%3A0x2bbd1332436bde32!2sGuwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1594128916589!5m2!1sen!2sin" width="600" height="450" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                            </div>
                        </div>
                        <div class="col-sm-12 mh-copyright wow fadeInUp" data-wow-duration="0.8s" data-wow-delay="0.3s">
                            <div class="row">
                                <div class="col-sm-6">
                                    <div class="text-left text-xs-center">
                                        <p>Pempered by <a href="//fb.com/rernr/" target="_BLANK">Rohit</a> @ <?php echo date('Y'); ?></p>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <ul class="social-icon">
                                        <li><a target="_BLANK" href="//fb.com/rernr/"><i class="fa fa-facebook"></i></a></li>
                                        <li><a target="_BLANK" href="//github.com/rohit52594"><i class="fa fa-github"></i></a></li>
                                        <li><a target="_BLANK" href="http://instagram.com/rohits_1997"><i class="fa fa-instagram"></i></a></li>
                                        <li><a target="_BLANK" href="https://www.linkedin.com/in/rohit-sahu-62043615a/"><i class="fa fa-linkedin"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>     
    
    <!--
    ==============
    * JS Files *
    ==============
    -->
    
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    
    <!-- jQuery -->
    <script src="assets/plugins/js/jquery.min.js"></script>
    <!-- popper -->
    <script src="assets/plugins/js/popper.min.js"></script>
    <!-- bootstrap -->
    <script src="assets/plugins/js/bootstrap.min.js"></script>
    <!-- owl carousel -->
    <script src="assets/plugins/js/owl.carousel.js"></script>
    <!-- validator -->
    <script src="assets/plugins/js/validator.min.js"></script>
    <!-- wow -->
    <script src="assets/plugins/js/wow.min.js"></script>
    <!-- mixin js-->
    <script src="assets/plugins/js/jquery.mixitup.min.js"></script>
    <!-- circle progress-->
    <script src="assets/plugins/js/circle-progress.js"></script>
    <!-- jquery nav -->
    <script src="assets/plugins/js/jquery.nav.js"></script>
    <!-- Fancybox js-->
    <script src="assets/plugins/js/jquery.fancybox.min.js"></script>
    <!-- isotope js-->
    <script src="assets/plugins/js/isotope.pkgd.js"></script>
    <script src="assets/plugins/js/packery-mode.pkgd.js"></script>
    <script src="assets/js/custom-scripts.js"></script>
    <!-- <link rel="stylesheet" href="demo/demo.css">
    <script type="text/javascript" src="demo/styleswitcher.js"></script>
    <script type="text/javascript" src="demo/demo.js"></script> -->
</body>
</html>