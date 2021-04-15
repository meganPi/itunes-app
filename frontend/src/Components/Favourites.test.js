import renderer from 'react-test-renderer';
import Favourites from './Favourites';

//Snapshot test
test('renders correctly',()=>{
    const tree = renderer
    .create(Favourites)
    .toJSON();
    expect(tree).toMatchSnapshot();
});