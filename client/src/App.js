import './App.css';
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Recipe from './pages/Recipe';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <div className="App">
      <Nav/>
      {/* <Landing/> */}
      <Recipe/>
      {/* <Profile/> */}
      {/* <Search/> */}
      <Footer/>
    </div>
  );
}

export default App;