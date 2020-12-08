import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { getInitialState } from '../State/initial-state';
import { techniqueTestData } from '../../zTestData/techniques.test.data';

@Injectable()
export class SettingsStoreServiceMock {
    setDevice(device: {
        isMobile: boolean;
        isDesktop: boolean;
        isMobileWeb: boolean;
        isTablet: boolean;
    }) {
        console.log(device);
    }

    stateChanged = of(this.getState());

    private getState() {
        const initState = getInitialState();
        initState.settings = {
            device: {
                isMobile: true,
                isDesktop: false,
                isMobileWeb: false,
                isTablet: false,
            },
        };
        return initState;
    }
}
