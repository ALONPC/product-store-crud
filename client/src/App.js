import React from 'react';
import { Layout } from './components/Layout';
import { BrowserRouter, Route } from 'react-router-dom';
import { Panel } from './components/Panel';
import { SearchResults } from './components/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path="/panel" component={Panel} />
        <Route exact path={['/', '/search']} component={SearchResults} />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
