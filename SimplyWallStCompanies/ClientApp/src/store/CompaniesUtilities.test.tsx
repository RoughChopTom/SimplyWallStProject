import * as React from 'react';
import {Summary} from './Companies';
import {sortSummaries} from './CompaniesUtilities';

describe('foo', () => {
    const summaries: Summary[] = [
        {
            name: '1',
            lastSharePrice: 1,
            priceFluctuation90Day: 1,
            score: 1,
            uniqueSymbol: '1'
        },
        {
            name: '2',
            lastSharePrice: 2,
            priceFluctuation90Day: 2,
            score: 2,
            uniqueSymbol: '2'
        },
        {
            name: '3',
            lastSharePrice: 3,
            priceFluctuation90Day: 2,
            score: 3,
            uniqueSymbol: '3'
        }
    ]

    it('should sort number lastSharePrice in descending order', () => {
        sortSummaries('lastSharePrice', 'descending', summaries);
        expect(summaries.map(x => x.lastSharePrice)).toStrictEqual([3, 2, 1]);
    })

    it('should sort number lastSharePrice in ascending order', () => {
        sortSummaries('lastSharePrice', 'ascending', summaries);
        expect(summaries.map(x => x.lastSharePrice)).toStrictEqual([1, 2, 3]);
    })

    it('should sort string name in descending order', () => {
        sortSummaries('name', 'descending', summaries);
        expect(summaries.map(x => x.name)).toStrictEqual(['3', '2', '1']);
    })

    it('should sort string name in ascending order', () => {
        sortSummaries('name', 'ascending', summaries);
        expect(summaries.map(x => x.name)).toStrictEqual(['1', '2', '3']);
    })
});
