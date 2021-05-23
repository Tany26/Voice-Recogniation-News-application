
  
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';

import useStyles from './styles';

import NewsCard from './components/NewsCards/NewsCards';
const alanKey = 'd64cc9d9e7e8d0ea5f1b36ee160b5dec2e956eca572e1d8b807a3e2338fdd0dc/stage';


const App = () => {


  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
 

    const classes = useStyles();

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }  else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            },
        })
    }, [])

    return (

        <div>
        <div className = { classes.logoContainer } >
        <img src = "https://alan.app/voice/images/previews/preview.png"
        className = { classes.alanLogo }
        alt = "logo" />
        </div> 

        <NewsCard articles = { newsArticles }  activeArticle = { activeArticle }/> 
        </div>


    )
}

export default App;