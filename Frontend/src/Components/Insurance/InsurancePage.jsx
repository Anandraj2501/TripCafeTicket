import { LaptopMinimalCheck } from 'lucide-react';
const InsurancePage = () => {
    return (
        <div className="p-8">
            <section>
                <div className="flex">
                    <div className="w-1/3">
                        <h3 className=" font-bold text-3xl w-[340px]">Cover All Your Travel Insurance Needs</h3>

                        <div className="mt-7 text-gray-700">
                            Bringing to you, comprehensive travel+medical insurance plans that cover all your travel needs. Whether you are travelling solo, with family or friends, we have a plan for you. Our plans cover trip cancellations, medical emergencies, lost luggage and more. Buy your travel insurance online and travel with peace of mind.
                        </div>
                    </div>
                    <div className="flex flex-1 justify-center items-center">
                        <div className="w-2/3 grid grid-cols-2 gap-4">
                            <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                <span><LaptopMinimalCheck /></span>
                                <p>Instant Policy Generation</p>
                            </div>
                            <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                <span><LaptopMinimalCheck /></span>
                                <p>Comprehensive Health Insurance Included</p>
                            </div>
                            <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                <span><LaptopMinimalCheck /></span>
                                <p>Worldwide Cashless hospitalisation</p>
                            </div>
                            <div className='flex justify-center items-center border p-4 rounded-lg shadow-lg gap-2'>
                                <span><LaptopMinimalCheck /></span>
                                <p>Value For Money</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section className='mt-24'>
                <div className='font-bold text-3xl'>
                    <p >What Kinds of Plans Are Available? </p>
                </div>
            </section>
            <section className='mt-10'>
                <div className=' flex  border px-3 rounded-lg shadow-lg p-3 bg-gradient-to-r from-cyan-100 to-blue-100'>
                    <div className='flex-1 flex flex-col gap-4'>
                        <p className='font-bold text-base '>Travel Insurance</p>
                        <div className='flex gap-6'>
                            <span className=' border-l-4 border-black '>
                                <span className='ml-2'>
                                    Quick & easy claim process in simple 4 steps
                                </span>

                            </span>
                            <span className='border-l-4 border-black '>
                                <span className='ml-2'>
                                    100% Digital Claim & Settlement
                                </span>

                            </span>
                        </div>
                        <p>Powered By</p>
                    </div>
                    <div>
                        Image here
                    </div>
                </div>
            </section>
        </div>
    )
}

export default InsurancePage;