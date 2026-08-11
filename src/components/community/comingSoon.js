import toast from "react-hot-toast";

export function notifyComingSoon(action = "This feature") {
    toast(`${action} coming soon`, { duration: 2500 });
}
