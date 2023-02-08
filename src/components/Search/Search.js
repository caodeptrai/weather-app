import React, { useContext, useState } from 'react';
import './Search.scss';
import { AppContext } from '../../context/AppContext';
import { AutoComplete, Spin } from 'antd';
import { debounce } from 'lodash';
import { getCity } from '../../services/CityService';

function DebounceSearch({ fetchOptions, debounceTimeout = 300, ...props }) {
    // Search: abcddassdfasdf

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions]);

    return (
        <AutoComplete
            className="custom"
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options?.map((opt, index) => (
                <AutoComplete.Option key={index} value={opt.name}>
                    {` ${opt.name}`}
                </AutoComplete.Option>
            ))}
        </AutoComplete>
    );
}

const Search = () => {
    const [value, setValue] = useState([]);
    const { setQuery } = useContext(AppContext);

    async function fetchCityList(search) {
        if (search === '') return;
        if (search !== '') {
            const data = await getCity(search);
            return data;
        }
    }

    const handleSelect = (value, option) => {
        setValue('');
        if (option !== '') {
            setQuery({ q: option.value });
        }
    };

    return (
        <DebounceSearch
            placeholder="Search..."
            fetchOptions={fetchCityList}
            onChange={(newValue) => setValue(newValue)}
            onSelect={handleSelect}
            value={value}
            allowClear={true}
            className="custom"
        ></DebounceSearch>
    );
};

export default Search;
