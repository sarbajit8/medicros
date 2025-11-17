import { Outlet } from "react-router-dom";
import bannerTwo from '../../assets/th4.jpg';
import ShoppingHeader from "../shopping-view/header";

export function AuthLayout() {
    return (
        <div>
             <ShoppingHeader/>
        <div className="flex min-h-screen w-full">
       
        <div
                className="hidden lg:flex items-center justify-center w-1/2 px-12"
                style={{
                    backgroundImage: `url(${bannerTwo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">Welcome to MediCrossreMedies</h1>
                </div>
            </div>
            <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
        </div>
    );
}