<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import { useToast } from '@/components/ui/toast';
import Toaster from '@/components/ui/toast/Toaster.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/vue3';
import { CirclePlus } from 'lucide-vue-next';
import { ref } from 'vue';

const page = usePage();
const isAddListDialogOpen = ref(false);
const isAddTaskDialogOpen = ref(false);
const selectedListId = ref<number | null>(null);

const { toast } = useToast();

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const listForm = useForm({
    name: '',
});

const taskForm = useForm({
    name: '',
});

const openAddTaskDialog = (listId: number) => {
    selectedListId.value = listId;
    isAddTaskDialogOpen.value = true;
    console.log(selectedListId.value);
};

const handleAddList = () => {
    listForm.post(route('list.storeList', props.board.id), {
        onSuccess: () => {
            toast({
                title: 'List added',
                description: (page.props.flash as { message: string }).message,
            });
            isAddListDialogOpen.value = false;
            listForm.reset();
        },
    });
};

const handleAddTask = () => {
    if (!selectedListId.value === null) return;

    taskForm.post(route('task.store', [props.board.id, selectedListId.value]), {
        onSuccess: () => {
            toast({
                title: 'Task Added',
                description: (page.props.flash as { message: string }).message,
            });
            isAddTaskDialogOpen.value = false;
            taskForm.reset();
        },
        onError: (errors) => {
            console.log(errors);
        },
    });
};

const props = defineProps({
    board: {
        type: Object,
        default: () => ({ name: '' }),
    },
});
</script>

<template>
    <Toaster />
    <Head :title="board.name" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mt-4 flex w-full justify-between">
                <div class="text-3xl font-bold">{{ board.name }}</div>
                <div>
                    <Dialog v-model:open="isAddListDialogOpen">
                        <DialogTrigger> <Button>Add a list</Button> </DialogTrigger>
                        <DialogContent>
                            <form @submit.prevent="handleAddList">
                                <DialogHeader>
                                    <DialogTitle>Create a new list</DialogTitle>

                                    <div class="my-4 space-y-2">
                                        <Label>List Name</Label>
                                        <Input type="text" placeholder="Enter a list name" v-model="listForm.name" />
                                        <p v-if="listForm.errors.name" class="text-sm text-red-500">{{ listForm.errors.name }}</p>
                                    </div>
                                </DialogHeader>

                                <DialogFooter> <Button type="submit">Add</Button> </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Separator />

            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div v-for="list in board.task_lists">
                    <div class="space-y-4 rounded-lg border p-6 shadow-md">
                        <div class="flex items-center justify-between">
                            <h1 class="text-2xl font-bold">{{ list.name }}</h1>
                            <Button @click="openAddTaskDialog(list.id)"><CirclePlus /> Add Task</Button>
                        </div>

                        <div v-for="task in list.tasks" class="flex">
                            <div class="w-full rounded-lg border border-gray-300 p-4">
                                <h1>{{ task.name }}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog v-model:open="isAddTaskDialogOpen">
                <DialogTrigger> </DialogTrigger>
                <DialogContent>
                    <form @submit.prevent="handleAddTask">
                        <DialogHeader>
                            <DialogTitle>Add a new task</DialogTitle>

                            <div class="my-4 space-y-2">
                                <Label>Task Name</Label>
                                <Input type="text" placeholder="Enter a list name" v-model="taskForm.name" />
                                <p v-if="taskForm.errors.name" class="text-sm text-red-500">{{ taskForm.errors.name }}</p>
                            </div>
                        </DialogHeader>

                        <DialogFooter> <Button type="submit">Add</Button> </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </AppLayout>
</template>
