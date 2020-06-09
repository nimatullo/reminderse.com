import React from "react";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";
import frontpage from "../styles/vectors/frontpage.svg";
import logo from "../styles/vectors/logo.svg";
import add from "../styles/vectors/add.png";
import mailbox from "../styles/vectors/mail.png";

const Homepage = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className="home" id="home">
            <svg className="blob1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F1F3F5" d="M34.2,-50C47.2,-37.6,62.8,-31.5,68.5,-20.7C74.2,-9.8,70,5.8,66,22.6C62.1,39.4,58.4,57.3,47.4,61.1C36.5,64.8,18.2,54.3,0,54.2C-18.1,54.2,-36.3,64.6,-45.8,60.4C-55.4,56.2,-56.4,37.4,-59.4,21C-62.4,4.6,-67.4,-9.5,-62.6,-19.2C-57.9,-28.9,-43.3,-34.3,-31.3,-47C-19.2,-59.7,-9.6,-79.8,0.5,-80.5C10.6,-81.2,21.1,-62.4,34.2,-50Z" transform="translate(100 100)" />
            </svg>
            <svg className="blob2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F1F3F5" d="M41.8,-60.5C51.3,-50.7,54.1,-34.6,55.3,-20.5C56.4,-6.3,56,5.8,54.9,20.5C53.8,35.2,52.1,52.3,42.9,64.7C33.7,77,16.8,84.6,2.7,80.9C-11.5,77.3,-23,62.4,-37.6,51.7C-52.2,41.1,-69.8,34.8,-79.6,21.8C-89.4,8.9,-91.3,-10.7,-82,-22.7C-72.7,-34.7,-52.2,-39.2,-36.6,-47C-21.1,-54.8,-10.6,-66,2.8,-69.9C16.2,-73.7,32.3,-70.2,41.8,-60.5Z" transform="translate(100 100)" />
            </svg>
            <nav>
                <div className="brand">
                    <Link to="/" className="brand-link">
                        <img src={logo} alt="Reminderse" />
                    </Link>
                </div>
                <ul>
                    <li id='nav-link'><a href="#about">About</a></li>
                    <li id='nav-link'><a href="#contact">Contact</a></li>
                    <li id='nav-link'><Link to="/login">Log In</Link></li>
                </ul>
            </nav>
            <main>
                <div className="frontpage">
                    <div className="info">
                        <div className="text">
                            <h1>Never forget the things you know.</h1>
                            <h3>Reminderse reminds you about the links, articles and other media that you’ve consumed surfing the internet.</h3>
                        </div>
                        <div className="buttons">
                            <button id="join">JOIN NOW</button>
                            <button id="login">LOG IN</button>
                        </div>
                    </div>
                    <img src={frontpage} alt="Reminderse" />
                </div>
            </main>
            <div className="about" id="about">
                <header>
                    <h2>Reminderse allows you to passively learn and recall information you've consumed browsing the internet.</h2>
                </header>
                <div className="boxes">
                    <div className="add-entry box">
                        <h2>Make an entry</h2>
                        <img src={add} alt="Add An Entry." />
                    </div>
                    <div className="reminded box">
                        <h2>Get Reminded Later</h2>
                        <img src={mailbox} alt="Get it emailed to you later." />
                    </div>
                </div>
            </div>
            <footer id='contact'>
                <div class="links">
                    <div class="site-links">
                        <ul>
                            <li>
                                <h2>Navigate</h2>
                            </li>
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div class="contact-info">
                        <ul>
                            <li>
                                <h2>Contact Links</h2>
                            </li>
                            <li><a href="mailto:sherzodnimatullo@turtle.nyc">sherzodnimatullo@turtle.nyc</a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="https://instagram.com/sherzodnimatullo">Instagram</a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/mmvvpp123">Twitter</a></li>
                        </ul>
                    </div>
                    <div class="extras">
                        <ul>
                            <li>
                                <h2>Extras</h2>
                            </li>
                            <li>
                                Made by <a target="_blank" rel="noopener noreferrer" href="https://mmvvpp123.tk">Sherzod Nimatullo</a>
                            </li>
                            <li>
                                A <a target="_blank" rel="noopener noreferrer" href="https://turtle.nyc">Turtle Enterprises</a> Service
                    </li>
                        </ul>
                    </div>
                </div>
                <div class="text">
                    <small>&copy; {currentYear} Turtle Enterprises. All Rights Reserved</small>
                </div>
            </footer>
        </div>
    )
}

export default Homepage;