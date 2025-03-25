import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Button } from './ui/button';

export default function HeroSection() {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <div className="w-1/2 space-y-6 text-center">
                <h1 className="font-mono text-5xl font-bold">Align Your Goals, Elevate Your Productivity</h1>
                <p className="text-xl text-gray-500">
                    Stay focused, stay efficient, and take control of your tasks with precision. Align helps you prioritize what matters, eliminate
                    distractions, and turn your to-dos into achievements.
                </p>
                {auth.user ? (
                    <Button size="lg">
                        <Link href={route('tasks')}>View Tasks</Link>
                    </Button>
                ) : (
                    <Button size="lg">
                        <Link href={route('login')}>Get Started</Link>
                    </Button>
                )}
            </div>
        </>
    );
}
