import { useEffect } from "react";
import { X } from 'lucide-react';

const HotelReservationMessage = () => {
    // useEffect(() => {
    //     document.querySelector('.hotel-message').style.display = 'none';
    // }, []);

    return (
        <div className="hotel-message h-full fixed top-0 left-0 w-full z-50">
            
            <div className="h-full w-full  bg-[rgba(255,255,255,0.5)]  flex justify-center items-center py-2">
                <div className="container mx-auto max-w-md mt-4">
                    <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 relative">
                        <div className="flex justify-end absolute top-2 right-2" onClick={()=>{
                            document.querySelector('.hotel-message').style.display = 'none';
                        }} >
                             <X className=" cursor-pointer "/>
                        </div>  
                        <p className="text-sm">
                            Confirmed Hotel Reservation @ ₹1000
                            Get your proof of accommodation with TripCafeTicket in 30–90 minutes.
                            Valid confirmation number provided, held up to 14 days as per travel date*.
                            (For visa applications only, not valid for stay.)
                        </p>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default HotelReservationMessage;
