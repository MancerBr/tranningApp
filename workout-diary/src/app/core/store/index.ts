import {ActionReducerMap} from '@ngrx/store';

import {authFeatureKey, reducer, AuthEffects} from './auth';

export interface StoreState {
}

export const reducers: ActionReducerMap<StoreState> = {
    [authFeatureKey]: reducer,
};

export const effects: any[] = [
    AuthEffects,
];
