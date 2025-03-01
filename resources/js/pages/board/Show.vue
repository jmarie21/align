<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Input from '@/components/ui/input/Input.vue';
import Label from '@/components/ui/label/Label.vue';
import Separator from '@/components/ui/separator/Separator.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

defineProps({
    board: {
        type: Object,
        default: () => ({ name: '' }),
    },
    taskLists: Object,
    tasks: Object,
});
</script>

<template>
    <Head :title="board.name" />
    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div class="mt-4 flex w-full justify-between">
                <div class="text-3xl font-bold">{{ board.name }}</div>
                <div>
                    <Dialog>
                        <DialogTrigger> <Button>Add a list</Button> </DialogTrigger>
                        <DialogContent>
                            <form>
                                <DialogHeader>
                                    <DialogTitle>Create a new board</DialogTitle>

                                    <div class="my-4 space-y-2">
                                        <Label>Board Name</Label>
                                        <Input type="text" placeholder="Enter a board name" />
                                        <p class="text-sm text-red-500"></p>
                                    </div>
                                </DialogHeader>

                                <DialogFooter> <Button type="submit">Add</Button> </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <Separator />
        </div>
    </AppLayout>
</template>
