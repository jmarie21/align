import CustomDialog from '@/components/custom-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { tasks } = usePage<{ tasks: any[] }>().props;
    console.log(tasks);
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

    const deleteTask = (id: number) => {
        router.delete(route('task.destroy', id), {
            onSuccess: () => {
                console.log('deleted');
            },
            onError: (error) => {
                console.error('Error when deleting task:', error);
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
                {tasks.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {tasks.map((task: { id: number; task_name: string }) => (
                            <div key={task.id} className="flex justify-between rounded-lg border border-gray-200 p-6 shadow-md">
                                <div>
                                    <h1>{task.task_name}</h1>
                                </div>
                                <div className="pl-6">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Ellipsis />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-red-500 focus:text-red-500">
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No tasks available.</p>
                )}
            </div>
        </AppLayout>
    );
}
