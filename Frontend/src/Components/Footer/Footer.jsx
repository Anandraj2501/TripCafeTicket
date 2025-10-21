import React from 'react'

const Footer = () => {
    const footnavigation = [
        { name: 'Home', href: '/'},
        //{ name: 'About Us', href: '/about-us' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Contact Us', href: '/contact-us'},
        { name: 'Terms & Conditions', href: '/terms-conditions'},
        { name: 'Privacy', href: '/privacy'},
        { name: 'Blog', href: '/blog'},
    
      
      ]
    return (
       <>
       <div className="h-[120px]  sm:w-[100%] md:w-[100%] lg:w-[100%] xl:w-[100%] 2xl:w-[100%] px-3 bg-[#d3bdbb] bg-no-repeat bg-cover " style={{ backgroundImage: 'url(images/footer-after-image.webp)' }}></div>
        <div className="px-[0] bg-[#fef6f0]" >
            <div className="py-5 text-black flex flex-wrap justify-center items-center">
            {footnavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    style={{ whiteSpace:'nowrap'}}
                    className={'px-3 py-0 text-sm font-medium'}>
                    {item.name}
                  </a>
                ))}
                
             
                <span className="px-5 border-r flex items-center">
                    
                    <span  className='text-center'> Copyrights &copy; 2024 TripCafe Holidays. All Rights Reserved
                    </span> </span>

                <span className="flex px-5">
                
                    <a href="//www.dmca.com/Protection/Status.aspx?ID=aa066661-b49f-4618-943c-f9a7e87f3f0f" title="DMCA.com Protection Status" className="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=aa066661-b49f-4618-943c-f9a7e87f3f0f"  alt="DMCA.com Protection Status" /></a>  <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>
                </span>
            </div>
        </div>
        </>
    )
}

export default Footer;