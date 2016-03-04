Meteor.startup(function(){
  if (!Sources.find().fetch().length){
   Sources.insert({
      sourceName: 'Monster IT',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=22',
      sourceCategories: ['IT']
    });
   Sources.insert({
      sourceName: 'Monster Marketing',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=14',
      sourceCategories: ['marketing','communications']
    });
   Sources.insert({
      sourceName: 'Monster Customer Service',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=3',
      sourceCategories: ['customer-service','call-center','BPO']
    });
   Sources.insert({
      sourceName: 'Monster Admin',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=907',
      sourceCategories: ['admin','secretarial']
    });
   Sources.insert({
      sourceName: 'Monster Supply Chain',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18',
      sourceCategories: ['purchasing','logistics','supply-chain']
    });
   Sources.insert({
      sourceName: 'Monster Manufacturing',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=17',
      sourceCategories: ['maufacturing','engineering','research and development']
    });

   Sources.insert({
      sourceName: 'Monster Telecom',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=23',
      sourceCategories: ['telecom','isp']
    });
  Sources.insert({
     sourceName: 'Monster Retail',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18',
     sourceCategories: ['retail']
   });
  Sources.insert({
     sourceName: 'Monster Biotech',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=16',
     sourceCategories: ['pharmaceutical', 'biotechnology']
   });
  Sources.insert({
     sourceName: 'Monster Advertising',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=5',
     sourceCategories: ['advertising', 'entertainment', 'media']
   });
  Sources.insert({
     sourceName: 'Monster Import/Export',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=6',
     sourceCategories: ['export', 'import']
   });
  Sources.insert({
     sourceName: 'Monster Real Estate',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=908',
     sourceCategories: ['real estate']
   });
  Sources.insert({
     sourceName: 'Monster Other',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=15',
     sourceCategories: ['uncategorized']
   });
  Sources.insert({
     sourceName: 'Monster Sales',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=20',
     sourceCategories: ['sales', 'business development']
   });
  Sources.insert({
     sourceName: 'Monster Finance',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=7',
     sourceCategories: ['finance', 'accounts']
   });
  Sources.insert({
     sourceName: 'Monster HR',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=11',
     sourceCategories: ['human resources']
   });
  Sources.insert({
     sourceName: 'Monster Legal',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=13',
     sourceCategories: ['legal']
   });
  Sources.insert({
     sourceName: 'Monster Banking',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=2',
     sourceCategories: ['banking', 'insurance', 'financial services']
   });
  Sources.insert({
     sourceName: 'Monster Construction',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=786',
     sourceCategories: ['construction']
   });
  Sources.insert({
     sourceName: 'Monster Education',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1000',
     sourceCategories: ['education', 'teaching']
   });
  Sources.insert({
     sourceName: 'Monster Oil and Gas',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=785',
     sourceCategories: ['oil and gas', 'exploration']
   });
  Sources.insert({
     sourceName: 'Monster Healthcare',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=9',
     sourceCategories: ['healthcare']
   });
  Sources.insert({
     sourceName: 'Monster Analytics/Business Intelligence',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1071',
     sourceCategories: ['analytics', 'business intelligence']
   });
  Sources.insert({
     sourceName: 'Monster Hotels/Restaurants',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=10',
     sourceCategories: ['hotels', 'restaurants']
   });
  Sources.insert({
     sourceName: 'Monster Travel',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=24',
     sourceCategories: ['travel', 'airlines']
   });

  }
});
