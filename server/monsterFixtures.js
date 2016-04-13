Meteor.startup(function(){
  if (!MonsterSources.find().fetch().length){
      MonsterSources.insert({
        sourceName: 'monster',
        sourceCategory: 'IT',
        sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=22',
        // sourceCategories: ['IT']
      });
      MonsterSources.insert({
        sourceName: 'monster',
        sourceCategory: 'Marketing',
        sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=14',
        // sourceCategories: ['marketing','communications']
      });
      MonsterSources.insert({
        sourceName: 'monster',
        sourceCategory: 'Customer Service',
        sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=3',
        // sourceCategories: ['customer-service','call-center','BPO']
      });
      MonsterSources.insert({
        sourceName: 'monster',
        sourceCategory: 'Admin',
        sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=907',
        // sourceCategories: ['admin','secretarial']
      });
      MonsterSources.insert({
        sourceName: 'monster',
        sourceCategory: 'Supply Chain',
        sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18',
        // sourceCategories: ['purchasing','logistics','supply-chain']
      });
      MonsterSources.insert({
        sourceName: 'monster',
        sourceCategory: 'Manufacturing',
        sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=17',
        // sourceCategories: ['maufacturing','engineering','research and development']
      });

      MonsterSources.insert({
        sourceName: 'monster',
        sourceCategory: 'Telecom',
        sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=23',
        // sourceCategories: ['telecom','isp']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Retail',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18',
       // sourceCategories: ['retail']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Biotech',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=16',
       // sourceCategories: ['pharmaceutical', 'biotechnology']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Advertising',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=5',
       // sourceCategories: ['advertising', 'entertainment', 'media']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Import/Export',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=6',
       // sourceCategories: ['export', 'import']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Real Estate',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=908',
       // sourceCategories: ['real estate']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Other',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=15',
       // sourceCategories: ['uncategorized']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Sales',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=20',
       // sourceCategories: ['sales', 'business development']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Finance',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=7',
       // sourceCategories: ['finance', 'accounts']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'HR',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=11',
       // sourceCategories: ['human resources']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Legal',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=13',
       // sourceCategories: ['legal']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Banking',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=2',
       // sourceCategories: ['banking', 'insurance', 'financial services']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Construction',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=786',
       // sourceCategories: ['construction']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Education',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1000',
       // sourceCategories: ['education', 'teaching']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Oil and Gas',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=785',
       // sourceCategories: ['oil and gas', 'exploration']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Healthcare',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=9',
       // sourceCategories: ['healthcare']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Analytics/Business Intelligence',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1071',
       // sourceCategories: ['analytics', 'business intelligence']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Hotels/Restaurants',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=10',
       // sourceCategories: ['hotels', 'restaurants']
      });
      MonsterSources.insert({
       sourceName: 'monster',
       sourceCategory: 'Travel',
       sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=24',
       // sourceCategories: ['travel', 'airlines']
      });
  }
});