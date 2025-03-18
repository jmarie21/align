import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CustomDialogProps {
    headerName: string;
    triggerButtonName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: React.ReactNode;
}

export default function customDialog({ headerName, triggerButtonName, children, open, onOpenChange }: CustomDialogProps) {
    return (
        <div>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogTrigger asChild>
                    <Button>{triggerButtonName}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{headerName}</DialogTitle>
                    </DialogHeader>
                    <div className="my-2 space-y-4">{children}</div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
