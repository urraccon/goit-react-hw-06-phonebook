import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.css';
import { Input } from 'components/common/input/Input';
import { setFilter } from 'components/redux/contactsFilterSlice';

export const Filter = () => {
  const term = useSelector(state => state.contactsFilter);
  const dispatch = useDispatch();

  console.log('term is: ', term);

  return (
    <div className={styles.filter}>
      <Input
        labelName="Find contacts by name"
        onChange={evt => dispatch(setFilter(evt.target.value))}
        name="filter"
        value={term}
      />
    </div>
  );
};
