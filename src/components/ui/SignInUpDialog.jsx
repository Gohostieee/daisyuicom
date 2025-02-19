import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "./dialog";
export default function SignInUpDialog({ trigger, content, title }) {
    return (
        <Dialog>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent className="bg-base-100 grid grid-cols-1 items-center justify-items-center shadow-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )

}