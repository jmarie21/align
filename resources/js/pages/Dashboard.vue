<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast/use-toast';
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/vue3';
import { Eye, Trash2 } from 'lucide-vue-next';
import { ref } from 'vue';

const isAddDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const selectedBoardId = ref<number | null>(null);
const { toast } = useToast();
const page = usePage();

defineProps({
    boards: Object,
});

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

const form = useForm({
    name: '',
});

const openDeleteDialog = (boardId: number) => {
    selectedBoardId.value = boardId;
    isDeleteDialogOpen.value = true;
};

const handleAddBoard = () => {
    form.post(route('board.store'), {
        onSuccess: () => {
            toast({
                title: 'Board Added',
                description: (page.props.flash as { message: string }).message,
            });
            isAddDialogOpen.value = false;
            form.reset();
        },
        onError: (errors) => {
            console.log(errors);
        },
    });
};

const handleDeleteBoard = () => {
    if (selectedBoardId.value === null) return;

    form.delete(route('board.delete', { id: selectedBoardId.value }), {
        onSuccess: () => {
            toast({
                title: 'Board Added',
                description: (page.props.flash as { message: string }).message,
            });
            isDeleteDialogOpen.value = false;
            selectedBoardId.value = null;
        },
        onError: (errors) => {
            console.log(errors);
        },
    });
};

const viewBoard = (boardId: number) => {
    router.get(route('board.show', { id: boardId }));
};
</script>

<template>
    <Toaster />
    <Head title="Dashboard" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mt-4 flex w-full justify-between">
                <div class="text-3xl font-bold">Boards</div>
                <div>
                    <Dialog v-model:open="isAddDialogOpen">
                        <DialogTrigger> <Button>Create Board</Button> </DialogTrigger>
                        <DialogContent>
                            <form @submit.prevent="handleAddBoard">
                                <DialogHeader>
                                    <DialogTitle>Create a new board</DialogTitle>

                                    <div class="my-4 space-y-2">
                                        <Label>Board Name</Label>
                                        <Input type="text" placeholder="Enter a board name" v-model="form.name" />
                                        <p v-if="form.errors.name" class="text-sm text-red-500">{{ form.errors.name }}</p>
                                    </div>
                                </DialogHeader>

                                <DialogFooter> <Button type="submit">Add</Button> </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Separator />

            <!-- Board Lists -->
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div v-for="board in boards" :key="board.id">
                    <div class="space-y-4 rounded-lg border p-6 shadow-md">
                        <h3 class="text-xl font-bold">{{ board.name }}</h3>
                        <div class="flex justify-end space-x-4">
                            <Button @click="viewBoard(board.id)"><Eye /></Button>
                            <Button variant="destructive" @click="openDeleteDialog(board.id)"><Trash2 /></Button>
                        </div>
                    </div>
                </div>
            </div>

            <!--Delete Dialog-->
            <Dialog v-model:open="isDeleteDialogOpen">
                <DialogContent>
                    <form @submit.prevent="handleDeleteBoard">
                        <DialogHeader>
                            <DialogTitle>Delete board</DialogTitle>

                            <DialogDescription>Are you sure you want to delete this board?</DialogDescription>
                        </DialogHeader>

                        <DialogFooter> <Button variant="destructive" type="submit">Delete</Button> </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    </AppLayout>
</template>
