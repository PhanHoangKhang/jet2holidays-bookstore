import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#263650] text-[#f5f3c1] mt-20">
      <div className="footer-content flex justify-between flex-wrap my-0 mx-auto py-11.25 px-22.5">
        <div className="logo-title">
          <a className="flex items-center gap-3.75 decoration-none" href="#">
            <img
              className="rounded-[10px]"
              src="/assets/logo.png"
              width="60"
              height="60"
              alt="Jet2Holidays Logo"
            />
            <p id="title-name" className="text-xl font-bold">
              Jet2Holidays <br /> Book store
            </p>
          </a>
        </div>

        <div className="contact min-w-55">
          <h2 className="contact-title mb-3 text-2xl font-bold">Contact</h2>
          <p className="my-1 text-white">
            <strong>Email: </strong>jet2holidaysbook@gmail.com
          </p>
          <p className="my-1 text-white">
            <strong>Address: </strong>702 Nguyen Van Linh, District 7, Ho Chi
            Minh city
          </p>
          <p className="my-1 text-white">
            <strong>Phone: </strong>0123456789
          </p>
        </div>

        <div className="menu min-w-55 flex flex-col">
          <h2 className="menu-title mb-3 text-2xl font-bold">Menu</h2>
          <p className="my-1 text-white hover:underline">
            <a href="/">
              <strong>Home</strong>
            </a>
          </p>
          <p className="my-1 text-white hover:underline">
            <a href="/shopping">
              <strong>Books</strong>
            </a>
          </p>
          <p className="my-1 text-white hover:underline">
            <a href="/forum">
              <strong>Discussion</strong>
            </a>
          </p>
          <p className="my-1 text-white hover:underline">
            <a href="/sitemap">
              <strong>Sitemap</strong>
            </a>
          </p>
        </div>

        <div className="follow">
          <p className="text-center text-2xl font-bold mb-4">Follow Us</p>
          <ul className="follow-list flex justify-center mb-2 gap-3">
            <li>
              <a href="#">
                <img
                  className="w-14 h-14 ease transition-all duration-200 hover:scale-120"
                  src="/assets/fb.png"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  className="w-14 h-14 ease transition-all duration-200 hover:scale-120"
                  src="/assets/tiktok.png"
                />
              </a>
            </li>
            <li>
              <a href="#">
                <img
                  className="w-14 h-14 ease transition-all duration-200 hover:scale-120"
                  src="/assets/instagram.png"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="copyright text-center p-3">
        <p className="text-white">
          © 2025 Jet2Holidays Bookstore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
