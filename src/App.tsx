import RoomAllocation from './components/RoomAllocation';
import '@/styles/global.css';

const App = () => {
  return (
    <RoomAllocation
      guest={10}
      room={3}
      onChange={(result) => console.log(result)}
    />
  );
};

export default App;
