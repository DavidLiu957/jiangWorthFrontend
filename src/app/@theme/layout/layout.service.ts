import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, shareReplay, debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {

    protected layoutSize$ = new Subject<void>(); // ← 這裡要補上 <void>
    protected layoutSizeChange$ = this.layoutSize$.pipe(
        shareReplay({ refCount: true }),
    );

    changeLayoutSize(): void {
        this.layoutSize$.next();
    }

    onChangeLayoutSize(): Observable<void> {
        return this.layoutSizeChange$.pipe(delay(1));
    }

    onSafeChangeLayoutSize(): Observable<void> {
        return this.layoutSizeChange$.pipe(
            debounceTime(350)
        );
    }

}