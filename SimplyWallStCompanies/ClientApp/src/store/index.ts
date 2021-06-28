import * as Companies from './Companies';

export interface ApplicationState {
    companies: Companies.CompaniesState | undefined;
}

export const reducers = {
    companies: Companies.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
