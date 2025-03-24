import AuthNavbar from '@/components/auth-navbar';
import GuestNavbar from '@/components/guest-navbar';
import HeroSection from '@/components/hero-section';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    console.log(auth);

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="flex min-h-screen items-center justify-center">
                {auth.user ? <AuthNavbar /> : <GuestNavbar />}

                <HeroSection />
            </div>
        </>
    );
}
