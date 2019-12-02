import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Button, Alert, ActivityIndicator, View, StyleSheet, SafeAreaView } from "react-native";
import SearchProfile from '../component/SearchProfile';
import color from '../constant/color';
import { useDispatch, useSelector } from "react-redux";
import * as searchUserActions from '../store/actions/SearchUsers';
import { Searchbar } from 'react-native-paper';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../component/UI/HeaderButton';



// const dateSource = [{ id: 1, name: 'ZohaibAhmad786', imageUrl: 'https://qph.fs.quoracdn.net/main-thumb-358605010-200-jaqlwruxuzfmumevivwczawuqixbwghe.jpeg' },
// { id: 2, name: 'Ahamd', imageUrl: 'https://www.ft.com/__origami/service/image/v2/images/raw/http%3A%2F%2Fcom.ft.imagepublish.upp-prod-us.s3.amazonaws.com%2F83afb31c-38fc-11e9-9988-28303f70fcff?fit=scale-down&source=next&width=700' }]
export default Home = props => {
    const dispatch = useDispatch();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const SearchedUserData = useSelector(state => state.SearchUsers.searchUsers);

    useEffect(() => {
        if (error) {
            Alert.alert('An error Occured!', error, [{ text: 'Okay' }])
        }
    }, [error]);

    const findGitUserHandler = useCallback(async (userName) => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(searchUserActions.searchUser(userName));

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
        setSearch('');
    }, [dispatch, setError, setIsLoading, error,setSearch])

    return (
        <View style={styles.searchContainer}>
            {
                isLoading ? <ActivityIndicator size='large' color={color.primary}/>:
                <Searchbar
                style={{ margin: 4 }}
                placeholder="Search User Name"
                onChangeText={search => setSearch(search)}
                value={search}
                onIconPress={() => findGitUserHandler(search)}
            />
            }

            
                <FlatList
                    data={SearchedUserData}
                    keyExtractor={item => item.id.toString()}
                    renderItem={itemData =>
                        <SearchProfile
                            usersName={itemData.item.login}
                            userImage={itemData.item.avatar_url}
                        >
                            <Button color={color.primary} title='Add to Profile' onPress={() => dispatch(searchUserActions.addProfile(itemData.item))} />
                        </SearchProfile>
                    }
                />
            
        </View>
    )
};
Home.navigationOptions = navData => {
    return {
        headerTitle: 'Search User',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='Menu'
                    iconName='md-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }
                    }

                />
            </HeaderButtons>
        )

    }
}
const styles = StyleSheet.create({
    searchContainer: {
        flex: 1
    },
})

