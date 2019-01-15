import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// configure Enzyme for React v16
Enzyme.configure({ adapter: new Adapter() });
