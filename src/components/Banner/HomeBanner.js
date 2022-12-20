import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import BannerImage from '../../../assets/banner.png';

const HomeBanner = () => {
    return (
        <View style={styles.banner}>
            <Image source={BannerImage} style={styles.bannerImage} />
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        height: 200,
        width: '100%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    bannerImage: {
        height: 200,
        width: '95%',
        borderRadius: 10,
    },
});

export default HomeBanner;