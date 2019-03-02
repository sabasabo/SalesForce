const express = require('express');
const router = express.Router();
const requestPromise = require('request-promise');
const $ = require('cheerio');

/* GET users listing. */
router.get('/:company', function(req, res, next) {
    const scrape = (company, res) => {
        const options = {
            url: `https://www.crunchbase.com/organization/${company}`,
            headers: {
                'User-Agent': 'request'
            }
        };
        console.log('aa');
        requestPromise(options)
            .then(function(html){
                console.log('ab');

                //success!
                //const wikiUrls = [];
                //     for (let i = 0; i < 45; i++) {
                //       wikiUrls.push($('big > a', html)[i].attribs.href);
                //     }
                //     console.log(wikiUrls);
                const result = {};
                result.date = $(`a[href="/search/funding_rounds/field/organization/last_funding_at/${company}"]`, html).text();

                const raises = $('span[class="component--field-formatter field-type-money ng-star-inserted"]', html).contents();
                for (let i = 0; i < raises.length; i++) {
                    console.log(raises[i].data);
                }
                result.raises = raises.text();
                result.totalFunding = $(`a[href="/search/funding_rounds/field/organization/funding_total/${company}"]`, html).text();
                console.log(html);
                console.log($('.firstHeading', html).text());
                console.log($('.bday', html).text());
                res.send(result);
            })
            .catch(function(err){
                //handle error
                console.log(err);
                console.log('ad');

            });
            console.log('af');

    };
    scrape(req.params.company, res);
});



module.exports = router;
