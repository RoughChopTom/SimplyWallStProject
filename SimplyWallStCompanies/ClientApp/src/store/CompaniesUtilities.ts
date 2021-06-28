import {Summary} from './Companies';

export const sortSummaries = (key: string, direction: string, summaries: Summary[]) => {
    if (!summaries) {
        return;
    }

    summaries.sort((a, b) => {
        if (a[key as keyof Summary] < b[key as keyof Summary]) {
            return direction === 'ascending' ? -1 : 1;
        }
        if (a[key as keyof Summary] > b[key as keyof Summary]) {
            return direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

}
