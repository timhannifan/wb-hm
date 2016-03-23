Meteor.startup(function(){
  if (!Sources.find().fetch().length){
   Sources.insert({
      sourceName: 'monster',
      sourceIndustry: 'IT',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=22',
      // sourceCategories: ['IT']
    });
   Sources.insert({
      sourceName: 'monster',
      sourceIndustry: 'Marketing',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=14',
      // sourceCategories: ['marketing','communications']
    });
   Sources.insert({
      sourceName: 'monster',
      sourceIndustry: 'Customer Service',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=3',
      // sourceCategories: ['customer-service','call-center','BPO']
    });
   Sources.insert({
      sourceName: 'monster',
      sourceIndustry: 'Admin',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=907',
      // sourceCategories: ['admin','secretarial']
    });
   Sources.insert({
      sourceName: 'monster',
      sourceIndustry: 'Supply Chain',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18',
      // sourceCategories: ['purchasing','logistics','supply-chain']
    });
   Sources.insert({
      sourceName: 'monster',
      sourceIndustry: 'Manufacturing',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=17',
      // sourceCategories: ['maufacturing','engineering','research and development']
    });

   Sources.insert({
      sourceName: 'monster',
      sourceIndustry: 'Telecom',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=23',
      // sourceCategories: ['telecom','isp']
    });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Retail',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18',
     // sourceCategories: ['retail']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Biotech',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=16',
     // sourceCategories: ['pharmaceutical', 'biotechnology']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Advertising',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=5',
     // sourceCategories: ['advertising', 'entertainment', 'media']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Import/Export',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=6',
     // sourceCategories: ['export', 'import']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Real Estate',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=908',
     // sourceCategories: ['real estate']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Other',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=15',
     // sourceCategories: ['uncategorized']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Sales',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=20',
     // sourceCategories: ['sales', 'business development']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Finance',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=7',
     // sourceCategories: ['finance', 'accounts']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'HR',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=11',
     // sourceCategories: ['human resources']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Legal',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=13',
     // sourceCategories: ['legal']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Banking',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=2',
     // sourceCategories: ['banking', 'insurance', 'financial services']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Construction',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=786',
     // sourceCategories: ['construction']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Education',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1000',
     // sourceCategories: ['education', 'teaching']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Oil and Gas',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=785',
     // sourceCategories: ['oil and gas', 'exploration']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Healthcare',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=9',
     // sourceCategories: ['healthcare']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Analytics/Business Intelligence',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1071',
     // sourceCategories: ['analytics', 'business intelligence']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Hotels/Restaurants',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=10',
     // sourceCategories: ['hotels', 'restaurants']
   });
  Sources.insert({
     sourceName: 'monster',
     sourceIndustry: 'Travel',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=24',
     // sourceCategories: ['travel', 'airlines']
   });

  }
});
