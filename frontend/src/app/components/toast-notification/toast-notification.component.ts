import { Component, type OnInit, type OnDestroy } from '@angular/core';
import { Subscription } from "rxjs"
import { CommonModule } from "@angular/common"
import { NotificationService, Notification as AppNotification } from '../../services/notification.service';


@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-notification.component.html',
  styleUrl: './toast-notification.component.css'
})
export class ToastNotificationComponent {
  notifications: AppNotification[] = []
  private subscription: Subscription = new Subscription()

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.subscription = this.notificationService
      .getNotifications()
      .subscribe((notifications) => (this.notifications = notifications))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  trackByFn(index: number, item: AppNotification) {
    return item.id
  }

  getNotificationClasses(notification: AppNotification): string {
    const baseClasses = "animate-slide-in-right"

    switch (notification.type) {
      case "success":
        return `${baseClasses} bg-slate-800/90 border-emerald-500/30`
      case "error":
        return `${baseClasses} bg-slate-800/90 border-red-500/30`
      case "warning":
        return `${baseClasses} bg-slate-800/90 border-amber-500/30`
      case "info":
        return `${baseClasses} bg-slate-800/90 border-blue-500/30`
      default:
        return `${baseClasses} bg-slate-800/90 border-slate-600/30`
    }
  }

  removeNotification(id: string) {
    this.notificationService.removeNotification(id)
  }
}
