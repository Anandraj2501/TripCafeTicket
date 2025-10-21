import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-white">
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
        </div>
    )
}

export default Navbar;