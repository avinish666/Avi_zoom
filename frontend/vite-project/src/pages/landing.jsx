import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const navigate = useNavigate();

    const whatsappNumber = "919798878727"; // Include country code
    const whatsappMessage = "Hello Rohit , I saw your website!";
    const youtubeLink = "https://youtube.com/@avinish27";

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>
                        <span style={{ color: "blue" }}> Rohit Kumar  </span> Video
                        <span style={{ color: "red" }}> Call</span>
                    </h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => navigate("/aljk23")}>Join as Guest</p>
                    <p onClick={() => navigate("/auth")}>Register</p>
                    <div onClick={() => navigate("/auth")} role='button'>
                        <p>Login</p>
                    </div>

                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>
                    <p>Cover a distance by <span style={{ color: "#FF9839" }}> Rohit  Kumar</span> video call </p>

                     <div className="social-icons-container">
 
  <a
    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon whatsapp"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp"
      width="40"
      height="40"
    />
  </a>

  {/* YouTube Button */}
  <a
    href={youtubeLink}
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon youtube"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
      alt="YouTube"
      width="40"
      height="40"
    />
  </a>
</div>

                 <br/>
                 <br/>
                    <div role='button'>
                        <Link to={"/auth"}> Call to Rohit click !!!</Link>
                    </div>
                </div>
                <div>
                    <img src="/mobile.png" alt="" />
                </div>
            </div>
        </div>
    )
}
