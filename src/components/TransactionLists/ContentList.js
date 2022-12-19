import React from 'react';
import { FlatList } from 'react-native';
import ItemList from './ItemList';
import { getUser } from '../../storage/userStorage';


const ContentList = ({ data, onRefresh, onEndReached, refreshing }) => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        getUser()
            .then((user) => {
                setUser(user);
            });
    }, []);


    const renderItem = ({ item }) => {
        return (
            <ItemList
                item={item}
                user={user}
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