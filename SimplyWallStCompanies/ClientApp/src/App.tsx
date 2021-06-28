import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import './custom.css'
import Company from './components/Company';

export default () => (
    <Layout>
        <Route exact path='/' component={Company} />
    </Layout>
);
