Meteor.startup(function(){
  if (!MonsterSources.find().fetch().length){
    MonsterSources.insert({
      sourceName: 'monster',
      sourceCategory: 'IT',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=22'
    });
    MonsterSources.insert({
      sourceName: 'monster',
      sourceCategory: 'Marketing',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=14'
    });
    MonsterSources.insert({
      sourceName: 'monster',
      sourceCategory: 'Customer Service',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=3'
    });
    MonsterSources.insert({
      sourceName: 'monster',
      sourceCategory: 'Admin',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=907'
    });
    MonsterSources.insert({
      sourceName: 'monster',
      sourceCategory: 'Supply Chain',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18'
    });
    MonsterSources.insert({
      sourceName: 'monster',
      sourceCategory: 'Manufacturing',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=17'
    });

    MonsterSources.insert({
      sourceName: 'monster',
      sourceCategory: 'Telecom',
      sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=23'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Retail',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=18'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Biotech',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=16'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Advertising',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=5'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Import/Export',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=6'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Real Estate',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=908'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Other',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=15'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Sales',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=20'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Finance',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=7'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'HR',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=11'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Legal',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=13'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Banking',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=2'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Construction',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=786'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Education',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1000'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Oil and Gas',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=785'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Healthcare',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=9'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Analytics/Business Intelligence',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=1071'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Hotels/Restaurants',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=10'
    });
    MonsterSources.insert({
     sourceName: 'monster',
     sourceCategory: 'Travel',
     sourceUrl:'http://jobsearch.monster.com.my/rss_jobs.html?cat=24'
    });
  }
});