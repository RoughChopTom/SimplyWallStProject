import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {ApplicationState} from '../store';
import * as CompaniesStore from '../store/Companies';
import Select from 'react-select';
import {SelectOption} from '../store/Companies';
import {Slider} from '@material-ui/core';
import {ChangeEvent} from 'react';

type CompaniesProps =
    CompaniesStore.CompaniesState
    & typeof CompaniesStore.actionCreators
    & RouteComponentProps<{ startDateIndex: string }>;


class Company extends React.PureComponent<CompaniesProps> {

    public componentDidMount() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Companies</h1>
                <div className={'filter__container'}>
                    <h3>Filter by:</h3>
                    <label>Snowflake score (0-20)</label>
                    {this.renderSlider()}
                    <label>Exchange symbol</label>
                    {this.renderSelect()}
                </div>
                {this.renderIsLoading()}
                {this.renderCompaniesTable()}
            </React.Fragment>
        );
    }

    private renderSelect() {
        const {summaries} = this.props;
        const options: SelectOption[] = summaries
            .map((x) => ({value: x.uniqueSymbol, label: x.uniqueSymbol}))
            .sort((a, b) => (a.value > b.value) ? 1 : -1);

        return (
            <Select
                isMulti
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.onSelectChange}
            />
        )
    }

    private renderSlider() {
        const {sliderValues} = this.props;

        return (
            <Slider
                onChange={this.onSliderChange}
                value={sliderValues}
                max={20}
                min={0}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
            />
        )
    }

    private renderIsLoading() {
        return (
            <div className="d-flex justify-content-between">
                {this.props.isLoading && <span>Loading...</span>}
            </div>
        );
    }

    private ensureDataFetched() {
        this.props.requestCompanies();
    }

    private getClassNamesFor = (name: string) => {
        const {sortConfig} = this.props;

        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    private onSelectChange = (value: any) => {
        this.props.filterWithSelect(value);
    };

    private onSliderChange = (event: ChangeEvent<{}>, value: any) => {
        this.props.filterWithSlider(value);
    };

    private isVisible(summary: CompaniesStore.Summary) {
        const {selectValues, sliderValues} = this.props;

        return sliderValues[0] <= summary.score && sliderValues[1] >= summary.score &&
            (selectValues.length === 0 || selectValues.includes(summary.uniqueSymbol));
    }


    private renderCompaniesTable() {
        const {summaries} = this.props;
        
        return (
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => this.props.requestSort('name')}
                            className={this.getClassNamesFor('name')}
                        >
                            Name
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => this.props.requestSort('uniqueSymbol')}
                            className={this.getClassNamesFor('uniqueSymbol')}
                        >
                            Unique Symbol Code
                        </button>
                    </th>
                    <th className="currency">
                        <button
                            type="button"
                            onClick={() => this.props.requestSort('lastSharePrice')}
                            className={this.getClassNamesFor('lastSharePrice')}
                        >
                            Last Known Share Price
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => this.props.requestSort('score')}
                            className={this.getClassNamesFor('score')}
                        >
                            Snowflake Score
                        </button>
                    </th>
                    <th className="currency">
                        <button
                            type="button"
                            onClick={() => this.props.requestSort('priceFluctuation90Day')}
                            className={this.getClassNamesFor('priceFluctuation90Day')}
                        >
                            90 Day Price Fluctuation
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {summaries.map((summary: CompaniesStore.Summary) =>
                    (this.isVisible(summary) && (
                            <tr key={summary.name}>
                                <td>{summary.name}</td>
                                <td>{summary.uniqueSymbol}</td>
                                <td className="currency">{summary.lastSharePrice}</td>
                                <td>{summary.score}</td>
                                <td className="currency">{summary.priceFluctuation90Day}</td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.companies,
    CompaniesStore.actionCreators
)(Company as any);
