import React from 'react'
import './index.css'

const Footer = () => (
  <footer className="footer fixed-bottom">
    <ul className="mb-0 pl-0">
      <li className="list-inline-item">
        &copy; 2019{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://apps.charitycommission.gov.uk/Showcharity/RegisterOfCharities/CharityFramework.aspx?RegisteredCharityNumber=1174929&SubsidiaryNumber=0"
        >
          Code Your Future
        </a>
        {' |'}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn-floating pl-1"
          href="https://www.facebook.com/codeyourfuture.io"
        >
          <i className="fab fa-facebook-f" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn-floating pl-2"
          href="https://twitter.com/CodeYourFuture_"
        >
          <i className="fab fa-twitter" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn-floating pl-2"
          href="https://www.linkedin.com/company/codeyourfuture"
        >
          <i className="fab fa-linkedin" />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn-floating pl-2"
          href="mailto:contact@codeyourfuture.io"
        >
          <i className="fa fa-envelope" />
        </a>
      </li>
    </ul>
  </footer>
)

export default Footer
