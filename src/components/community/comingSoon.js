import toast from "react-hot-toast";

export function notifyComingSoon(action = "This feature") {
    toast(`${action} coming soon`, { duration: 2500 });
}

export function notifyReplySubmitted() {
    toast.success("Reply sent for approval", { duration: 3500 });
}

export function notifyPostSubmitted() {
    toast.success("Post sent for approval", { duration: 3500 });
}
