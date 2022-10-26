import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import Article from '../components/article';
import LoadingIndicator from '../components/loader';
import Space from '../components/space';
import { saveArticles } from '../redux/actions/saveArticlesAction';
import { saveSearchedArticles } from '../redux/actions/saveSearchedArticlesAction';
import { saveToken } from '../redux/actions/saveTokenAction';
import dashboardServices from '../services/dashboardServices';

type DashboardScreenProps = {
    navigation: StackNavigationProp<any>
}

const DashboardScreen: React.FC<DashboardScreenProps> = (props) => {
    const dispatch = useDispatch()
    const token = useSelector((store) => store.token.token)
    const storeData = useSelector((store) => store)
    console.log(storeData, "storeData")
    const [articles, setArticles] = useState([])
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(-1)
    const [searchText, setSearchText] = useState("")
    const [text, setText] = useState("")
    const [loader, setLoader] = useState(false)
    const [stop, setStop] = useState(false)
    const fetchArticles = (p) => {
        let pageNumber = p + 1
        setPage(pageNumber)
        if (pageNumber > 0) {
            setLoader(true)
        } else {
            setLoading(true)
        }
        dashboardServices.fetchArticles({ page: pageNumber, token: token }).then((res) => {
            let fetchedArticles
            if (res.success) {
                fetchedArticles = res.data.docs
                if (fetchedArticles.length == 0) {
                    setStop(true)
                }
                let loadedList = articles
                if (loadedList.length == 0) {
                    loadedList = fetchedArticles
                } else {
                    if (loadedList.length > 0 && pageNumber > 0) {
                        loadedList = loadedList.concat(fetchedArticles)
                    }
                }
                if (loadedList != articles) {
                    setArticles(loadedList)
                    setData(loadedList)
                    dispatch(saveArticles(loadedList))
                } else {
                    setArticles(fetchedArticles)
                    setArticles(fetchedArticles)
                    dispatch(saveArticles(fetchedArticles))
                }
            }
        }).finally(() => {
            setLoader(false)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchArticles(page)
    }, [])
    const handleSearch = (val) => {
        setSearchText(val)
        const newData = data.filter(item => {
            const itemData = `${item.headline.main.toUpperCase()}`
            const textData = val.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setArticles(newData)
        dispatch(saveSearchedArticles(newData))
    }

    const logout = () => {
        dispatch(saveToken(""))
        dispatch(saveArticles([]))
        dispatch(saveSearchedArticles([]))
        props.navigation.reset({
            index: 0,
            routes: [{ name: "Login" }]
        })
    }
    return (
        <>
            <LoadingIndicator visible={loading} />
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#C4C4C4', backgroundColor: '#FFFFFF', borderRadius: 10, width: '100%', paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={require('../images/search.png')} style={styles.searchIcon} />
                    <Space right={10} />
                    <TextInput
                        value={text}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(val) => {
                            setText(val)
                            handleSearch(val)
                        }}
                        placeholder='Search Articles'
                        placeholderTextColor="black"

                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {searchText != "" && (<TouchableOpacity onPress={() => {
                        setText("")
                        handleSearch("")
                    }}>
                        <Image source={require('../images/clear.png')} style={styles.clearIcon} />
                    </TouchableOpacity>)}
                    <Space left={5}/>
                    <TouchableOpacity onPress={() => {logout()}}> 
                        <Image source={require('../images/logout.png')} style={styles.logout} />
                    </TouchableOpacity>
                </View>
            </View>
            <SafeAreaView style={styles.container}>
                {articles.length > 0 ?
                    (
                        <>
                            <Space top={20} />
                            <FlatList
                                data={articles}
                                renderItem={(item) => (<Article article={item.item} />)}
                                ItemSeparatorComponent={() => (<View style={styles.seperator} />)}
                                onEndReached={() => {
                                    if (!stop) {
                                        fetchArticles(page)
                                    }
                                }}
                                onEndReachedThreshold={0.5}
                                ListFooterComponent={() => (<LoadingIndicator visible={loader} />)}
                            />
                        </>

                    )
                    :
                    (
                        <View style={styles.noArticles}>
                            <Text style={styles.noArticlesText}>
                                No Articles Available
                            </Text>
                        </View>
                    )}
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#000030'
    },
    seperator: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'white',
        marginTop: 15,
        marginBottom: 15
    },
    searchIcon: {
        width: 35,
        height: 35
    },
    clearIcon: {
        width: 20,
        height: 20
    },
    noArticles: {
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    noArticlesText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: '900'
    },
    logout: {
        width: 25,
        height: 25
    }

})
export default DashboardScreen