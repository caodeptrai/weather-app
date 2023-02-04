import React, { useContext, useState } from 'react';
import { Input } from 'antd';
import './Search.scss';
import { AppContext } from '../../context/AppContext';

const Search = () => {
    const [searchText, setSearchText] = useState('');
    const { setQuery } = useContext(AppContext);

    const onPressEnter = (e) => {
        e.preventDefault();
        setSearchText(e.target.value);
        if (searchText !== '') setQuery({ q: searchText });
        setSearchText('');
    };

    return (
        <Input
            placeholder="Search"
            allowClear={true}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={onPressEnter}
        />
    );
};

export default Search;
