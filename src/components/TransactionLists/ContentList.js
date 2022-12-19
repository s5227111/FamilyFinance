import React from 'react';
import { FlatList } from 'react-native';
import ItemList from './ItemList';


const ContentList = ({ data, onRefresh, onEndReached, refreshing }) => {
    const renderItem = ({ item }) => {
        return (
            <ItemList
                item={item}
            />
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onRefresh={onRefresh}
            refreshing={refreshing}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
        />
    );
};

export default ContentList;