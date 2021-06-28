import {Action, Reducer} from 'redux';
import {AppThunkAction} from './';
import {sortSummaries} from './CompaniesUtilities';

export interface CompaniesState {
    isLoading: boolean;
    isLoaded: boolean;
    summaries: Summary[];
    sortConfig: { key: string, direction: string };
    selectValues: string[];
    sliderValues: number[];
}

export interface Summary {
    name: string;
    uniqueSymbol: string;
    lastSharePrice: number;
    score: number;
    priceFluctuation90Day: number;
}

export interface SelectOption {
    label: string;
    value: string;
}

interface RequestCompaniesAction {
    type: 'REQUEST_COMPANIES';
}

interface ReceiveCompaniesAction {
    type: 'RECEIVE_COMPANIES';
    isLoaded: boolean;
    summaries: Summary[];
}

interface SortConfigAction {
    type: 'SORT_CONFIG';
    sortConfig: { key: string, direction: string }
    summaries: Summary[];
}

interface FilterCompaniesAction {
    type: 'FILTER_SELECT';
    selectValues: string[];
}

interface SliderAction {
    type: 'FILTER_SLIDER';
    values: number[];
}

type KnownAction =
    RequestCompaniesAction
    | ReceiveCompaniesAction
    | SortConfigAction
    | FilterCompaniesAction
    | SliderAction;

export const actionCreators = {
    requestCompanies: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();

        if (!(appState && appState.companies && !appState.companies.isLoaded)) {
            return;
        }

        fetch(`companies/summaries`)
            .then(response => response.json() as Promise<Summary[]>)
            .then(data => {
                dispatch({type: 'RECEIVE_COMPANIES', isLoaded: true, summaries: data});
            });
        dispatch({type: 'REQUEST_COMPANIES'});
    },

    requestSort: (key: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();

        if (!(appState && appState.companies)) {
            return;
        }

        const {summaries} = appState.companies;
        const {sortConfig} = appState.companies;
        let direction = 'ascending';

        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        sortSummaries(key, direction, summaries);
        dispatch({type: 'SORT_CONFIG', summaries: summaries, sortConfig: {key: key, direction: direction}});
    },

    filterWithSelect: (selectOptions: SelectOption[]): AppThunkAction<KnownAction> => async (dispatch) => {
        const selectValues = selectOptions.map(selectOption => selectOption.value);

        dispatch({type: 'FILTER_SELECT', selectValues});
    },

    filterWithSlider: (values: number[]): AppThunkAction<KnownAction> => async (dispatch) => {
        dispatch({type: 'FILTER_SLIDER', values: values})
    }
};

const unloadedState: CompaniesState = {
    isLoaded: false,
    sortConfig: {direction: '', key: ''},
    summaries: [],
    isLoading: false,
    selectValues: [],
    sliderValues: [0, 20]
};

export const reducer: Reducer<CompaniesState> = (state: CompaniesState | undefined, incomingAction: Action): CompaniesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;

    switch (action.type) {
        case 'REQUEST_COMPANIES':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_COMPANIES':
            if (!state.isLoaded) {
                return {
                    ...state,
                    isLoaded: true,
                    summaries: action.summaries,
                    isLoading: false
                };
            }
            break;
        case 'SORT_CONFIG':
            return {
                ...state,
                summaries: action.summaries,
                sortConfig: action.sortConfig
            }
        case 'FILTER_SELECT':
            return {
                ...state,
                selectValues: action.selectValues
            }
        case 'FILTER_SLIDER':
            return {
                ...state,
                sliderValues: action.values
            }
    }

    return state;
};
