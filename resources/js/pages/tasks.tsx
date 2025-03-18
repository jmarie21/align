import CustomDialog from '@/components/custom-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        task_name: '',
    });

    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('task.store'), {
            onSuccess: () => {
                setIsDialogOpen(false);
                reset();
            },
            onError: (error) => {
                console.log('Error when adding task:', error);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex w-full justify-between">
                    <h1 className="text-3xl font-bold">Tasks</h1>
                    <CustomDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} headerName="Add Task" triggerButtonName="Add Task">
                        <form onSubmit={addTask}>
                            <Label htmlFor="name">Task Name</Label>
                            <Input placeholder="Enter task name" value={data.task_name} onChange={(e) => setData('task_name', e.target.value)} />
                            {errors.task_name && <p className="text-sm text-red-500">{errors.task_name}</p>}
                            <div className="flex justify-end">
                                <Button type="submit" className="mt-6" disabled={processing}>
                                    Add
                                </Button>
                            </div>
                        </form>
                    </CustomDialog>
                </div>
                <Separator />
            </div>
        </AppLayout>
    );
}
