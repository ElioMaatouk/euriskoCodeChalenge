import React from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import { scale } from "../utils/scale";
import Space from "./space";

type ArticleProps = {
    article: any
}

const Article: React.FC<ArticleProps> = (props) => {
    return (
        <View>
            <Text style={styles.title}>
                {props.article.headline.main}
            </Text>
            {props.article.byline.original != null && (
                <Text style={styles.byLine}>
                    {props.article.byline.original}
                </Text>
            )}
            <Space top={15} />
            {props.article.multimedia.length > 0 ? (
                <>
                    <Image source={{ uri: `https://static01.nyt.com/${props.article.multimedia[0].url}` }} style={styles.mainImage} />
                    <Space top={15} />
                </>
            ) : null}
            <Text style={styles.abstract}>
                {props.article.abstract}
            </Text>
            <Space top={5} />
            <Text style={styles.mainText}>
                {props.article.lead_paragraph}
            </Text>
            <View>
                <Text style={styles.byLine}>
                    Full Article
                </Text>
                <Text style={styles.link} onPress={() => Linking.openURL(`${props.article.web_url}`)}>{props.article.web_url}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: '#000290',
        fontWeight: '900'
    },
    mainImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    abstract: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '400'
    },
    byLine: {
        fontSize: 18,
        color: '#000290',
        fontWeight: '900'
    },
    mainText: {
        fontSize: 15,
        color: '#FFFFFF',
    },
    link: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15,
        lineHeight: 14,
        color: '#903290',
    },
})
export default Article;