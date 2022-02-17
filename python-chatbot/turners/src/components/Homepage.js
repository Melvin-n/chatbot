import React from 'react'
import '../css/homepage.css'

export default function Homepage() {
  return (
    <div>
      <div id='topnav'>
          <ul id='contact-details-nav'>
            <li className='contact-details-nav-item'>Phone: 0800 887 637</li>
            <li className='contact-details-nav-item'>Email: Turners@turners.com</li>
          </ul>
          <ul id='page-links-nav'>
              <li className='page-links-nav-item'>Find a car</li>
              <li className='page-links-nav-item'>Sell a car</li>
              <li className='page-links-nav-item'>Live auctions</li>
          </ul>
      </div>

      <div id='homepage-main'>
        <div id='left-side-main'>
          <h1 id='homepage-title'>Turners Cars</h1>
          <p>Turners Cars is the largest used car network in New Zealand with 19 car dealer locations nationwide. 
          With a huge range of around 3,000 cars for sale (and 1,500 being made ready for sale at any one time) 
          there is truly something for everyone. We’ve been helping Kiwis buy and sell used cars for over 50 years.
           And if you want car finance or car insurance, we can sort that out for you as well.</p>
        </div>
        <div id='right-side-main'>
          <form id="find-form">
              <label for="customsearch">Custom Search</label>
              <input type="text" name="customsearch" />
              <label for="make-dropdown">Make</label>
              <select id="make-dropdown" name="make-dropdown">
                  <option value="bmw">BMW</option>
                  <option value="lamborghini">Lamborghini</option>
                  <option value="ferrari">Ferrari</option>
                  <option value="tesla">Tesla</option>
                  <option value="bugatti">Bugatti</option>
                  <option value="rolls-royce">Rolls Royce</option>
              </select>
              <label for="model-dropdown">Model</label>
              <select id="model-option" name="model-dropdown">
                  <option value="all">All</option>
              </select>
              <input type="submit" value="Search" />
            </form>
          </div>
        </div>
      </div>
  )
}
