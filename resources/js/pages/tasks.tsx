import CustomDialog from '@/components/custom-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type AddTaskForm = {
    name: string;
    description: string;
};

export default function Dashboard() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm<AddTaskForm>({
        name: '',
        description: '',
    });

    const handleAddTask: FormEventHandler = (e) => {
        e.preventDefault();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between pt-4">
                    <div>
                        <h1 className="text-3xl font-bold">Tasks</h1>
                    </div>
                    <div>
                        <Button onClick={() => setIsAddDialogOpen(true)}>Add Task</Button>
                    </div>
                </div>

                <Separator />
            </div>

            {/* Add Task Dialog */}
            <CustomDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} title="Add Task">
                <form onSubmit={handleAddTask}>
                    <div className="space-y-2">
                        <Label>Task Name</Label>
                        <Input type="text" placeholder="Enter task name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Task Description</Label>
                        <Input
                            type="text"
                            placeholder="Enter description name"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit">Add</Button>
                    </div>
                </form>
            </CustomDialog>
        </AppLayout>
    );
}
