import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import AppLogo from './app-logo';

export default function AuthNavbar() {
    return (
        <>
            <nav className="fixed top-0 flex w-full items-center justify-between p-4 px-64 shadow-md">
                <div>
                    <AppLogo />
                </div>

                <div>
                    <Link href={route('tasks')}>
                        <Button size="lg">Tasks</Button>
                    </Link>
                </div>
            </nav>
        </>
    );
}
