import moment from 'moment';
import {useEffect, useState} from 'react';
import {ICON_NAMES} from '../../../../helpers/constants';
import {navigate} from '../../../../navigation';
import {usePostAddFilterMutation} from '../../../../services/home';
import ShowToast from '../../../../utils/Toast';
import {generateEncryptedKey} from '../../../../widgets/CryptoPrivacy';
import {FilterScreenView} from './FilterScreenView';

const FilterScreen = (props: any) => {
  var {body} = props?.route?.params;
  const [sliderValues, setSliderValues] = useState([1, 10000]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [minValue, set_minValue] = useState(1);
  const [maxValue, set_maxValue] = useState(200);
  const [selectedItem, setSelectedItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(1);
  const [vendorId, setVendorId] = useState('')
  const [addFilter] = usePostAddFilterMutation();

  const handleSliderValuesChange = (values: any) => {
    setSliderValues(values);
  };
  const filterOptions = [
    {
      name: 'New',
      value: 'NEW',
    },
    {
      name: 'Popluar',
      value: 'POPULAR',
    },
    {
      name: 'Price Low To High',
      value: 'LTH',
    },
    {
      name: 'Price High To Low',
      value: 'HTL',
    },
  ];

  const ratings = [
    {
      name: '1.0 ',
      icon: ICON_NAMES.blackStar,
      value: 1,
    },
    {
      name: '2.0 ',
      icon: ICON_NAMES.blackStar,
      value: 2,
    },
    {
      name: '3.0 ',
      icon: ICON_NAMES.blackStar,
      value: 3,
    },
    {
      name: '4.0 ',
      icon: ICON_NAMES.blackStar,
      value: 4,
    },
    {
      name: '5.0 ',
      icon: ICON_NAMES.blackStar,
      value: 5,
    },
  ];

  useEffect(() => {
    if (body) {
      setSelectedCategory(body?.categoryId);
      setSliderValues([body?.startRange, body?.endRange]);
      setSelectedFilter(body?.sortBy);
      setSelectedItem(body?.rating);
      setVendorId(body?.vendorId)
    }
  }, [body]);

  

  const applyFilter = () => {
    const body = {
      startRange: sliderValues[0],
      endRange: sliderValues[1],
      sortBy: selectedFilter,
      categoryId: selectedCategory,
      rating: selectedItem,
      vendorId:vendorId,
      appkey: moment.utc().valueOf().toString(),
    };
    navigate('AllCategories', {body: body});
  };
  const clearFilter = () => {
    const body = {
      startRange: 1,
      endRange: 10000,
      sortBy: '',
      categoryId: selectedCategory,
      rating: '',
      vendorId:vendorId,
    };
    navigate('AllCategories', {body: body});
  };

  return (
    <FilterScreenView
      handleSliderValuesChange={handleSliderValuesChange}
      sliderValues={sliderValues}
      setSliderValues={setSliderValues}
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      filterOptions={filterOptions}
      ratings={ratings}
      maxValue={maxValue}
      minValue={minValue}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem}
      applyFilter={applyFilter}
      clearFilter={clearFilter}
    />
  );
};

export default FilterScreen;
