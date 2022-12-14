import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import VerSol from './VerSol';
import Nav from "./Nav";
import App from './App';
import {TabSol, MostrarSolicitudes} from './mocking/datos';
import reportWebVitals from './reportWebVitals';
import {ApolloClient, InMemoryCache, ApolloProvider, gql} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8193/graphql',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

client.query({
  query: gql`
    query ReadSolicitudes {
      readSolicitudes {
        id
        fecha
        usuario {
          nombres
          apellidos
        }
        estado
        ejemplar {
          documento{
            id
            titulo
            }
          id
          ubicacion
        }
        prestamo {
          adomicilio
        }
      }
    }
  ` 
});

client.query({query: gql`
    query ReadEjemplar($readEjemplarId: ID) {
        readEjemplar(id: $readEjemplarId) {
            documento{
            titulo
            }
        }
    }
`});


client.query({query:gql`
  query ReadSolicitud($readSolicitudId: ID) {
      readSolicitud(id: $readSolicitudId) {
        id
        fecha
        usuario {
          nombres
          apellidos
        }
        estado
        ejemplar {
          id
          ubicacion
        }
        prestamo {
          adomicilio
        }
      }
    }
  `
});

client.query({query:gql`
  query ReadSolicitudesUsuario($entrada: String) {
    readSolicitudesUsuario(nombre: $entrada) {
      id
      fecha
      usuario {
        id
        nombres
        apellidos
      }
      estado
      ejemplar {
        id
        ubicacion
        documento{
          id
          titulo
          }
      }
      prestamo {
        id
        adomicilio
      }
    }
  }
`}).then((result) => console.log(result));


const root = ReactDOM.createRoot(document.getElementById('root'));
const root2 = ReactDOM.createRoot(document.getElementById('root2'));
const header = ReactDOM.createRoot(document.getElementById('header'));
header.render(
  <ApolloProvider client={client}>
    <Nav />
    
  </ApolloProvider>
);
root.render(
  <ApolloProvider client={client}>
      <VerSol />
  </ApolloProvider>
);
root2.render(
  <ApolloProvider client={client}>
    <TabSol />
  </ApolloProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
