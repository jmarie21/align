import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';

export default function GuestNavbar() {
    return (
        <>
            <nav className="fixed top-0 flex w-full items-center justify-between p-4 px-64 shadow-md">
                <div>
                    <Link href={route('home')}>
                        <AppLogo />
                    </Link>
                </div>

                <div className="space-x-4">
                    <Button variant="outline">
                        <Link href={route('login')}>Login</Link>
                    </Button>

                    <Button>
                        <Link href={route('register')}>Register</Link>
                    </Button>
                </div>
            </nav>
        </>
    );
}
