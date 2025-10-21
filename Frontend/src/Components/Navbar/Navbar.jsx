//import { CiShoppingCart } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
//import { CiSearch } from "react-icons/ci";
//mport SubNavbar from "./SubNavbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// Import WhatsApp icon
import { FaPhone, FaPhoneAlt, FaPhoneSlash, FaWhatsapp } from "react-icons/fa";

const Navbar = () => {

  // const [userName, setUserName] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  // useEffect(() => {
  //     const token = localStorage.getItem('token');

  //     if (token) {
  //         const user = JSON.parse(localStorage.getItem('user'));
  //         if (user && user.username) {
  //             setUserName(user.username);
  //         }
  //     }
  // }, []);
  // const handleLogout = () => {
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('user');
  //     setUserName(null);
  // };

  //     const button = document.querySelector('#menu-button'); // Hamburger Icon
  //     const menu = document.querySelector('#menu'); // Menu

  //     button.addEventListener('click', () => {
  //       menu.classList.toggle('hidden');

  // });
  const navigation = [
    { name: 'Dummy Tickets', href: '/', current: true },
    { name: 'About Us', href: '/about-us', current: false },
    { name: 'Faq', href: '/faqs', current: false },
    { name: 'Contact Us', href: '/contact-us', current: false },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
    <>
      <div className="navbar-container px-[2%] sm:px-[5.5%] md:px-[5.5%] lg:px-[5.5%] xl:px-[5.5%] py-3 items-center sticky top-0 z-10 bg-white shadow-[0px_2px_10px_rgba(0,0,0,0.1)]">
        <Disclosure as="nav" className="w-[100%]">
          {({ open }) => (
            <>
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-[#ec601d] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ec601d]">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </DisclosureButton>
                </div>
                
                {/* Left side - Logo */}
                <div className="flex items-center">
                  <div className="flex shrink-0 items-center">
                    <Link to="/">
                      <img
                        alt="TripCafe"
                        src="/images/trip-cafe.jpg"
                        className="h-8 md:h-10 w-auto"
                      />
                    </Link>
                  </div>
                </div>
                
                {/* Right side - Navigation and Phone Number */}
                <div className="hidden sm:flex items-center space-x-6">
                  <div className="flex space-x-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? 'page' : undefined}
                        style={{ whiteSpace: 'nowrap' }}
                        className={classNames(
                          item.current ? 'border-b-2 border-b-[#ec601d] text-[#ec601d]' : 'text-black hover:text-[#ec601d] hover:border-b-2 hover:border-b-[#ec601d]',
                          'px-3 py-2 text-sm font-medium',
                        )}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="flex items-center text-[#162856]">
                    <FaPhoneAlt className="text-green-500 h-5 w-5 mr-2" />
                    <span className="font-bold"><a href="tel:+91 9821715233">+91 9821715233</a></span>
                  </div>
                </div>
              </div>

              <DisclosurePanel className="sm:hidden bg-white">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'border-b-2 border-b-[#ec601d] text-[#ec601d]' : 'text-black hover:text-[#ec601d] hover:border-b-2 hover:border-b-[#ec601d]',
                        'block px-3 py-2 text-sm font-medium',
                      )}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                  
                  {/* Mobile view of contact info */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center py-2">
                      <FaPhoneAlt className="text-green-500 h-5 w-5 mr-2" />
                      <span className="font-bold text-[#162856]"><a href="tel:+91 9821715233">+91 9821715233</a></span>
                    </div>
                  </div>
                </div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </div>

      {/* <div className="navbar-container flex justify-between px-[10%] py-[1%] items-center sticky top-0 z-10 bg-white">
                <div className="brand-name-container">
                    <div  className="w-[100px] sm:w-[150px] md:w-[150px] lg:w-[150px] xl:w-[150px]">
                <Link to="/"><img src="images/trip-cafe.jpg" className="w-[100%]" alt="logo"/></Link></div>
                </div>

               <div className="search-container flex items-center border border-slate-500 w-[50%] p-2 rounded-md bg-gray-200">
                    <CiSearch size={25} />
                    <input type="text" placeholder="Search attraction,activities and more" className="w-full border-none outline-none ml-2 bg-gray-200" />
                </div> 

<div className="hidden w-full md:flex md:items-center md:w-auto  absolute sm:static lg:static xl:static inset-x-0 w-[100%]" id="menu">
          <ul
            className="
              text-base text-gray-700
              pt-4
              md:flex
              md:justify-between
              md:pt-0"
          >
            <li>
              <Link className="md:p-4 py-2 block hover:text-purple-400" to="/"
                >Features</Link>
            </li>
            <li>
              <Link className="md:p-4 py-2 block hover:text-purple-400" to="/"
                >Pricing</Link>
            </li>
            <li>
              <Link className="md:p-4 py-2 block hover:text-purple-400" to="/"
                >Customers</Link>
            </li>
            <li>
              <Link className="md:p-4 py-2 block hover:text-purple-400" to="/"
                >Blog</Link>
            </li>
          </ul>
        </div>
             

            </div>  */}
      {/* <hr /> */}
      {/* <SubNavbar /> */}
    </>
  )
}

export default Navbar;