import './App.scss';
import Header from './components/Header/Header';
import FilterContainer from './components/Filter/FilterContainer';
import TicketsListContainer from './components/TicketsList/TicketsListContainer';
import TabsMenuContainer from './components/TabsMenu/TabsMenuContainer';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <FilterContainer />
        <div>
          <TabsMenuContainer />
          <TicketsListContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
