import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    <img
                        src="https://i.pinimg.com/736x/69/a4/fe/69a4fec92b390a9807196cbd6cfb5356.jpg"
                        alt="Logo tienda de ropa"
                        className="h-24 w-24 mx-auto rounded-full border-4 border-green-500 shadow-lg transition-transform duration-300 hover:scale-105"
                    />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-xl border border-green-300">
                {children}
            </div>
        </div>
    );
}
