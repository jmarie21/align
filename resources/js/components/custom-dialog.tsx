import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface CustomDialogProps {
    children: ReactNode;
    title: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CustomDialog({ children, title, open, onOpenChange }: CustomDialogProps) {
    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    );
}
