import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
// import { TestComponent } from './TestComponent';
import { Appointments } from './Appointments';


const App = () => {

  /* Fetch Test
  fetch("http://localhost:3000/hello")
    .then((response) => response.text())
    .then((data) => console.log(data));
   End Fetch Test */
  
  const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
  });


  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          {/* <TestComponent /> */}
          <Appointments />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
