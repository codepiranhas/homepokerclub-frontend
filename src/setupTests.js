import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

/**
 * Used to overrite the default console.error used by React
 * to show prop-types errors.
 *
 * Without this, these kind of errors are not caught by Jest.
 */
const originalConsoleError = console.error;

console.error = message => {
  if (/(Failed prop type)/.test(message)) {
    throw new Error(message);
  }

  originalConsoleError(message);
};
