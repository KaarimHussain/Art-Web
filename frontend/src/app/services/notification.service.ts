import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"

export interface Notification {
    id: string
    type: "success" | "error" | "warning" | "info"
    title: string
    message: string
    duration?: number
}

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    private notifications$ = new BehaviorSubject<Notification[]>([])

    getNotifications() {
        return this.notifications$.asObservable()
    }

    private addNotification(notification: Omit<Notification, "id">) {
        const id = Math.random().toString(36).substr(2, 9)
        const newNotification: Notification = {
            ...notification,
            id,
            duration: notification.duration || 5000,
        }

        const currentNotifications = this.notifications$.value
        this.notifications$.next([...currentNotifications, newNotification])

        // Auto remove after duration
        if ((newNotification.duration ?? 0) > 0) {
            setTimeout(() => {
                this.removeNotification(id)
            }, newNotification.duration!)
        }
    }

    removeNotification(id: string) {
        const currentNotifications = this.notifications$.value
        this.notifications$.next(currentNotifications.filter((n) => n.id !== id))
    }

    success(title: string, message: string, duration?: number) {
        this.addNotification({ type: "success", title, message, duration })
    }

    error(title: string, message: string, duration?: number) {
        this.addNotification({ type: "error", title, message, duration })
    }

    warning(title: string, message: string, duration?: number) {
        this.addNotification({ type: "warning", title, message, duration })
    }

    info(title: string, message: string, duration?: number) {
        this.addNotification({ type: "info", title, message, duration })
    }
}
