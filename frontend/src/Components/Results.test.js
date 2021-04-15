import renderer from 'react-test-renderer';
import SearchResults from './Results';

//Snapshot test
test('renders correctly',()=>{
    const tree = renderer
    .create(SearchResults)
    .toJSON();
    expect(tree).toMatchSnapshot();
});