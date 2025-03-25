import CustomDialog from '@/components/custom-dialog';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Ellipsis } from 'lucide-react';
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

interface Task {
    id: number;
    name: string;
    description: string;
}

export default function Dashboard() {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const { tasks } = usePage<{ tasks: any }>().props;

    const { data, setData, post, put, processing, errors, reset } = useForm<AddTaskForm>({
        name: '',
        description: '',
    });

    const openEditTaskDialog = (task: Task) => {
        setIsEditDialogOpen(true);
        setSelectedTask(task);
        setData({
            name: task.name,
            description: task.description,
        });
    };

    const handleAddTask: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('tasks.store'), {
            onSuccess: () => {
                console.log('task added');
                setIsAddDialogOpen(false);
                reset();
            },
            onError: (error) => {
                console.log('Error when adding task: ', error);
            },
        });
    };

    const handleEditTask: FormEventHandler = (e) => {
        e.preventDefault();
        if (!selectedTask) return;
        put(route('tasks.update', selectedTask.id), {
            onSuccess: () => {
                console.log('task updated');
                setIsEditDialogOpen(false);
                reset();
            },
            onError: (error) => {
                console.log('Error when updating task: ', error);
            },
        });
    };

    const handleDeleteTask = (id: number) => {
        router.delete(route('tasks.destroy', id), {
            onSuccess: () => {
                console.log('task deleted');
            },
            onError: (error) => {
                console.log('Error when deleting task: ', error);
            },
        });
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

                {/* Display tasks */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {tasks.map((task: Task) => (
                        <div key={task.id} className="flex justify-between rounded-lg border border-gray-200 p-4 shadow-md">
                            <h1>{task.name}</h1>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => openEditTaskDialog(task)}>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleDeleteTask(task.id)} className="text-red-500">
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Task Dialog */}
            <CustomDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} title="Add Task">
                <form onSubmit={handleAddTask}>
                    <div className="my-2">
                        <Label>Task Name</Label>
                        <Input type="text" placeholder="Enter task name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div className="my-2">
                        <Label>Task Description</Label>
                        <Textarea
                            placeholder="Enter description name"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Add
                        </Button>
                    </div>
                </form>
            </CustomDialog>

            {/* Edit Task Dialog */}
            <CustomDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} title="Edit Task">
                <form onSubmit={handleEditTask}>
                    <div className="my-2">
                        <Label>Task Name</Label>
                        <Input type="text" placeholder="Enter task name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div className="my-2">
                        <Label>Task Description</Label>
                        <Textarea
                            placeholder="Enter description name"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button type="submit" disabled={processing}>
                            Edit
                        </Button>
                    </div>
                </form>
            </CustomDialog>
        </AppLayout>
    );
}
