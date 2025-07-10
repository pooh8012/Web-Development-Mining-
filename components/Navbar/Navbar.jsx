import React from "react";

function Navbar() {
  return (
    <nav className="bg-white border shadow-md border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            Flowbite
          </span>
        </a>

        <div className=" w-full md:block md:w-auto">
          {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li>
              <h4
                className="block py-2 px-3 text-black  rounded-sm md:bg-transparent"
                aria-current="page"
              >
                Home
              </h4>
            </li>
            <li>
              <h4 className="block py-2 px-3 text-black  rounded-sm md:bg-transparent">
                Services
              </h4>
            </li>
            <li>
              <h4 className="block py-2 px-3 text-black  rounded-sm md:bg-transparent">
                Pricing
              </h4>
            </li>
            <li>
              <a className="block py-2 px-3 text-black  rounded-sm md:bg-transparent">
                Contact
              </a>
            </li>
          </ul> */}
          <button className="border-2 border-blue rounded-full px-5 py-2 hover:bg-black hover:text-white text-black font-semibold cursor-pointer transition-colors duration-300">
            QUERTY
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
