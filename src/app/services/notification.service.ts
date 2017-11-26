import { Inject, Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

    public blinkTitle() {
        let message = 'New Message';

        var oldTitle = document.title,
            timeoutId,
            blink = function () { document.title = document.title == message ? ' ' : message; },
            clear = function () {
                clearInterval(timeoutId);
                document.title = oldTitle;
                window.onmousemove = null;
                timeoutId = null;
            };

        if (!timeoutId) {
            timeoutId = setInterval(blink, 1000);
            window.onmousemove = clear;
        }
    };
}