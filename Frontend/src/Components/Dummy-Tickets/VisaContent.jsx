import React from 'react'

const VisaContent = () => {


    return (
        <>
           <section className="w-full px-3 bg-white pb-20">
               <div className="container mx-auto px-3 md:px-10">
                   <div className="flex flex-wrap gap-x-10">
                       <div className="left w-full md:w-[56.5%] flex flex-col items-center justify-center gap-y-6">
                           <h2 className="text-2xl md:text-4xl font-bold text-center md:text-left">Why do I need a flight & hotel booking document to apply for a visa?</h2>
                           <p className="text-[#333] text-base md:text-xl font-medium text-justify">
                               As a citizen of a foreign nation, you must obtain an appropriate visa for the destination country, unless your country is on their list of visa-free travel nations. Embassies or consulates from most of the countries accept a visa application only when a verifiable flight or hotel booking document is attached to it. However, they accept a dummy flight or hotel booking. There is no need to get a fully-paid booking while applying for a visa. An embassy or consulate issues the requested visa only when it finds the application complete and genuine. <br/><br/>
                               TripCafeTicket helps you obtain dummy reservations for flight & hotel to any destinations or countries instantly. These reservations are acceptable for visa application to any country.
                           </p>
                       </div>
                       <div className="right w-full md:w-[40%]">
                           <div className="w-full">
                               <img src="images/tervel-1.jpg" className="w-full" alt=""/>
                           </div>
                       </div>
                   </div>
               </div>
           </section>  

           {/* Benefits Section */}
           <section className="w-full px-3 bg-gradient-to-b from-gray-50 to-white py-20">
               <div className="container mx-auto px-3 md:px-10">
                   <h1 className="text-3xl md:text-5xl font-bold text-center mb-16">Benefits: Why Choose TripCafeTicket
</h1>
                   
                   {/* First row of benefits */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                       {/* Benefit 1 */}
                       <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                           <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#ec601d]">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                               </svg>
                           </div>
                           <h3 className="text-xl font-bold mb-4">WE WORK 24/7</h3>
                           <p className="text-gray-600">
                               Our dedicated team is available around the clock to assist you with your ticket reservations whenever you need us.
                           </p>
                       </div>

                       {/* Benefit 2 */}
                       <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                           <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#ec601d]">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                               </svg>
                           </div>
                           <h3 className="text-xl font-bold mb-4">TIME SAVING</h3>
                           <p className="text-gray-600">
                               Enjoy a hassle-free experience with our quick and efficient ticket booking process that saves you valuable time.
                           </p>
                       </div>

                       {/* Benefit 3 */}
                       <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                           <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#ec601d]">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                   <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 0 1-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004ZM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 0 1-.921.42Z" />
                                   <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 0 1-.921-.421l-.879-.66a.75.75 0 0 0-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 0 0 1.5 0v-.81a3.833 3.833 0 0 0 1.72-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.113-2.178a3.833 3.833 0 0 0-1.719-.756V6Z" clipRule="evenodd" />
                               </svg>
                           </div>
                           <h3 className="text-xl font-bold mb-4">BEST VALUE</h3>
                           <p className="text-gray-600">
                               We offer competitive pricing and exclusive deals to ensure you get the best value for your ticket purchases.
                           </p>
                       </div>
                   </div>

                   {/* Second row of benefits */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                       {/* Benefit 4 */}
                       <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                           <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#ec601d]">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                   <path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clipRule="evenodd" />
                               </svg>
                           </div>
                           <h3 className="text-xl font-bold mb-4">PROMPT RESPONSE</h3>
                           <p className="text-gray-600">
                               Our customer support team is committed to providing fast and effective solutions to all your inquiries.
                           </p>
                       </div>

                       {/* Benefit 5 */}
                       <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                           <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#ec601d]">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                   <path fillRule="evenodd" d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 0 0-.722-1.952l-3.285-3.832A3 3 0 0 0 16.215 3h-8.43a3 3 0 0 0-2.278 1.048L2.222 7.88A3 3 0 0 0 1.5 9.832ZM7.785 4.5a1.5 1.5 0 0 0-1.139.524L3.881 8.25h3.165a3 3 0 0 1 2.496 1.336l.164.246a1.5 1.5 0 0 0 1.248.668h2.092a1.5 1.5 0 0 0 1.248-.668l.164-.246a3 3 0 0 1 2.496-1.336h3.165l-2.765-3.226a1.5 1.5 0 0 0-1.139-.524h-8.43Z" clipRule="evenodd" />
                                   <path d="M2.813 15c-.725 0-1.313.588-1.313 1.313V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-1.688c0-.724-.588-1.312-1.313-1.312h-4.233a3 3 0 0 0-2.496 1.336l-.164.246a1.5 1.5 0 0 1-1.248.668h-2.092a1.5 1.5 0 0 1-1.248-.668l-.164-.246A3 3 0 0 0 7.046 15H2.812Z" />
                               </svg>
                           </div>
                           <h3 className="text-xl font-bold mb-4">GET CONFIRMATION WITHIN 30 MIN</h3>
                           <p className="text-gray-600">
                               Experience peace of mind with instant confirmation of your ticket reservations, typically within just 30 minutes.
                           </p>
                       </div>

                       {/* Benefit 6 */}
                       <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center">
                           <div className="w-20 h-20 mb-6 flex items-center justify-center text-[#ec601d]">
                               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                   <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                               </svg>
                           </div>
                           <h3 className="text-xl font-bold mb-4">TRUSTED TRAVEL PARTNERS</h3>
                           <div className="flex justify-center items-center space-x-4">
                               <img src="/images/mmt-logo.png" alt="MakeMyTrip" className="h-12 object-contain" />
                               <img src="/images/airiq-logo.jpeg" alt="AirIQ" className="h-12 object-contain" />
                               <img src="/images/tripjack-logo.png" alt="TripJack" className="h-12 object-contain" />
                           </div>
                       </div>
                   </div>
               </div>
           </section>

           <section className="w-full px-3 bg-white pb-20">
               <div className="container mx-auto px-3 md:px-10">
                   <div className="flex flex-wrap gap-x-10">
                       <div className="left w-full md:w-[40%]">
                           <div className="w-full">
                               <img src="images/trevel-2.jpg" className="w-full" alt=""/>
                           </div>
                       </div>
                       <div className="right w-full md:w-[56.5%] flex flex-col items-center justify-center gap-y-6">
                           <h2 className="text-2xl md:text-4xl font-bold text-center md:text-left">Why TripCafeTicket?</h2>
                           <p className="text-sm md:text-base text-justify">
                               We are a team of professionals with over a decade of expertise in travel and tourism. We stay breast with the visa application requirements of various nations across Asia, Europe, Africa, Americas, Australia, and New Zealand. This minimizes your loss in case there is refusal on visa issuance from the embassy for any reason.
                           </p>
                          <ul className="pl-0 w-full space-y-3">
  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6">
      <img src="images/flight-icon.svg" className="w-full h-full object-contain" alt="" />
    </div>
    <div className="text-sm md:text-base leading-relaxed">
      Valid dummy flight or hotel booking per the visa application criteria
    </div>
  </li>

  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6">
      <img src="images/flight-icon.svg" className="w-full h-full object-contain" alt="" />
    </div>
    <div className="text-sm md:text-base leading-relaxed">
      Instant download your PDF reservation.
    </div>
  </li>

  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6">
      <img src="images/flight-icon.svg" className="w-full h-full object-contain" alt="" />
    </div>
    <div className="text-sm md:text-base leading-relaxed">
      The price for one-way, roundtrip, and multi-city flights is the same and is calculated as double the stated price per passenger.
    </div>
  </li>

  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6">
      <img src="images/flight-icon.svg" className="w-full h-full object-contain" alt="" />
    </div>
    <div className="text-sm md:text-base leading-relaxed">
      Avoid flight transit in the US, UK or any country that require a transit visa.
    </div>
  </li>

  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6">
      <img src="images/flight-icon.svg" className="w-full h-full object-contain" alt="" />
    </div>
    <div className="text-sm md:text-base leading-relaxed">
      Unlimited date revision should you change your travel plan.
    </div>
  </li>

  <li className="flex items-start gap-3">
    <div className="flex-shrink-0 w-6 h-6">
      <img src="images/flight-icon.svg" className="w-full h-full object-contain" alt="" />
    </div>
    <div className="text-sm md:text-base leading-relaxed">
      No cancellation fee
    </div>
  </li>
</ul>

                       </div>
                   </div>
               </div>
           </section> 
        </>
    )
}
export default VisaContent;