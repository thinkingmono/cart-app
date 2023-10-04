// components
import Navbar from './Navbar';
import CartContainer from './CartContainer';
import { useGlobalContext } from './utils/context';

function App() {
  const {isLoading} = useGlobalContext();

  if(isLoading){
    return <main style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="loading"></div>
    </main>
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
