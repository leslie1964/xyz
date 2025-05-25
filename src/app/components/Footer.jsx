import React from 'react';
import Link from 'next/link';

const MicrosoftFooter= () => {
  return (
    <footer
      id="footer"
      data-testid="footer"
      role="contentinfo"
      className="microsoft-footer"
    >
      <div id="footerLinks" className="footer-links ">
        <Link
          id="ftrTerms"
          href="https://www.microsoft.com/en-us/servicesagreement/default.aspx"
          target="_blank"
          rel="noreferrer noopener"
          className="footer-link"
        >
          Terms of use
        </Link>
        <Link
          id="ftrPrivacy"
          href="https://go.microsoft.com/fwlink/?LinkID=521839"
          target="_blank"
          rel="noreferrer noopener"
          className="footer-link"
        >
          Privacy &amp; cookies
        </Link>
      </div>
      <div className="footer-links">
        <div className="footer-content">
          Use private browsing if this is not your device.{' '}
          <Link
            id="learnMoreLink"
            data-testid="learnMoreLink"
            href="https://go.microsoft.com/fwlink/?LinkID=2281649"
            target="_blank"
            rel="noreferrer noopener"
            className="learn-more-link"
          >
            Learn more
          </Link>
        </div>
      </div>

      <style jsx>{`
        .microsoft-footer {
          position: absolute;
          width: 100%;
          left: 0px;
          bottom: 0px;
          overflow-x: visible;
          overflow-y: visible;
          z-index: auto;
          clear: both;
          min-height: 28px;
          background-color: rgba(0, 0, 0, 0.6);
          font-family: "Segoe UI", -apple-system, "Helvetica Neue", "Lucida Grande", Roboto, Ebrima, "Nirmala UI", Gadugi, "Segoe Xbox Symbol", "Segoe UI Symbol", "Meiryo UI", "Khmer UI", Tunga, "Lao UI", Raavi, "Iskoola Pota", Latha, Leelawadee, "Microsoft YaHei UI", "Microsoft JhengHei UI", "Malgun Gothic", "Estrangelo Edessa", "Microsoft Himalaya", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Yi Baiti", "Mongolian Baiti", "MV Boli", "Myanmar Text", "Cambria Math";
          font-size: 0.9375rem;
          line-height: 1.25rem;
          font-weight: 400;
          color: white;
          display: flex;
          flex-direction: column;
          padding: 8px 16px;
          text-align: right;
        }

        .footer-links {
          display: flex;
          text-align: right;
          align-items: center;
          justify-content: flex-end;
          gap: 16px;
          margin-bottom: 4px;
        }

        .footer-links:last-child {
          margin-bottom: 0;
        }

        .footer-link {
          color: white;
          text-decoration: none;
          font-size: 0.9375rem;
          line-height: 1.25rem;
          transition: opacity 0.2s ease;
          text-align: right;
        }

        .footer-link:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        .footer-content {
          color: white;
          font-size: 0.9375rem;
          line-height: 1.25rem;
          text-align: right;
        }

        .learn-more-link {
          color: white;
          text-decoration: underline;
          font-size: 0.9375rem;
          line-height: 1.25rem;
          transition: opacity 0.2s ease;
        }

        .learn-more-link:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .footer-links {
            flex-direction: column;
            align-items: flex-end;
            gap: 8px;
          }
        }
      `}</style>
    </footer>
  );
};

export default MicrosoftFooter;