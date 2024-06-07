const scrape = require('./scraper');

async function test() {
    try {
        const topic = 'HTML';  // Specify the topic to search for
        console.log(`Searching for articles on topic: ${topic}`);
        
        const articles = await scrape.scrapeMediumArticles(topic);
        if (articles.length === 0) {
            console.log('No articles found.');
        } else {
            console.log('Found articles:');
            console.log(articles);
        }
    } catch (error) {
        console.error('Test failed:', error);
    }
}

test();
