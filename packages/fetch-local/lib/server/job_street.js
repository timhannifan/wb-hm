var cheerio = Npm.require('cheerio');

Meteor.startup(function() {
  if (JobStreetItems.find().count() == 0 && JobStreetSources.find().count() == 0) {
    var specializationCodes = [
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Accounting/Finance',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=130&area=&salary=&src=12',
        sourceSpecialization: 'Audit & Taxation Jobs',
        sourceSearchDepth: 55,
        sourceSpecializationCode: 130
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Accounting/Finance',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=135&area=&salary=&src=12',
        sourceSpecialization: 'Banking/Financial Jobs',
        sourceSearchDepth: 55,
        sourceSpecializationCode: 135
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Accounting/Finance',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=132&area=&salary=&src=12',
        sourceSpecialization: 'Corporate Finance/Investment Jobs',
        sourceSearchDepth: 55,
        sourceSpecializationCode: 132
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Accounting/Finance',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=131&area=&salary=&src=12',
        sourceSpecialization: 'General/Cost Accounting Jobs',
        sourceSearchDepth: 55,
        sourceSpecializationCode: 131
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Admin/Human Resources',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=133&area=&salary=&src=12',
        sourceSpecialization: 'Clerical/Administrative Jobs',
        sourceSearchDepth: 200,
        sourceSpecializationCode: 133
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Admin/Human Resources',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=137&area=&salary=&src=12',
        sourceSpecialization: 'Human Resources Jobs',
        sourceSearchDepth: 150,
        sourceSpecializationCode: 137
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Admin/Human Resources',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=146&area=&salary=&src=12',
        sourceSpecialization: 'Secretarial Jobs',
        sourceSearchDepth: 200,
        sourceSpecializationCode: 146
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Admin/Human Resources',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=148&area=&salary=&src=12',
        sourceSpecialization: 'Top Management Jobs',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 148
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Arts/Media/Communications',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=100&area=&salary=&src=12',
        sourceSpecialization: 'Advertising Jobs',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 100
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Arts/Media/Communications',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=101&area=&salary=&src=12',
        sourceSpecialization: 'Arts/Creative Design Jobs',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 101
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Arts/Media/Communications',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=106&area=&salary=&src=12',
        sourceSpecialization: 'Entertainment Jobs',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 106
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Arts/Media/Communications',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=141&area=&salary=&src=12',
        sourceSpecialization: 'Public Relations Jobs',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 141
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Building/Construction',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=180&area=&salary=&src=12',
        sourceSpecialization: 'Architect/Interior Design Jobs',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 180
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Building/Construction',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=184&area=&salary=&src=12',
        sourceSpecialization: 'Civil Engineering/Construction Jobs',
        sourceSearchDepth: 65,
        sourceSpecializationCode: 184
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Building/Construction',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=150&area=&salary=&src=12',
        sourceSpecialization: 'Property/Real Estate Jobs',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 150
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Building/Construction',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=198&area=&salary=&src=12',
        sourceSpecialization: 'Quantity Surveying Jobs',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 198
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Computer/Information Technology',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=192&area=&salary=&src=12',
        sourceSpecialization: 'IT - Hardware Jobs',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 192
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Computer/Information Technology',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=193&area=&salary=&src=12',
        sourceSpecialization: 'IT - Network/Sys/DB Admin Jobs',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 193
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Computer/Information Technology',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=191&area=&salary=&src=12',
        sourceSpecialization: 'IT - Software Jobs',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 191
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Education/Training',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=105&area=&salary=&src=12',
        sourceSpecialization: 'Education Jobs',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 105
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Education/Training',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=121&area=&salary=&src=12',
        sourceSpecialization: 'Training and Development Jobs',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 121
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=185&area=&salary=&src=12',
        sourceSpecialization: 'Chemical Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 185
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=187&area=&salary=&src=12',
        sourceSpecialization: 'Electrical Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 187
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=186&area=&salary=&src=12',
        sourceSpecialization: 'Electronics Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 186
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=189&area=&salary=&src=12',
        sourceSpecialization: 'Environmental Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 189
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=200&area=&salary=&src=12',
        sourceSpecialization: 'Industrial Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 200
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=195&area=&salary=&src=12',
        sourceSpecialization: 'Mechanical/Automotive Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 195
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=190&area=&salary=&src=12',
        sourceSpecialization: 'Oil/Gas Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 190
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Engineering',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=188&area=&salary=&src=12',
        sourceSpecialization: 'Other Engineering',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 188
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Healthcare',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=113&area=&salary=&src=12',
        sourceSpecialization: 'Doctor/Diagnosis',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 113
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Healthcare',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=112&area=&salary=&src=12',
        sourceSpecialization: 'Pharmacy',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 112
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Healthcare',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=111&area=&salary=&src=12',
        sourceSpecialization: 'Nurse/Medical Support',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 111
      },

      {
        sourceName: 'jobstreet',
        sourceCategory: 'Hotel/Restaurant',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=107&area=&salary=&src=12',
        sourceSpecialization: 'Food/Beverage/Restaurant',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 107
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Hotel/Restaurant',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=114&area=&salary=&src=12',
        sourceSpecialization: 'Hotel/Tourism',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 114
      },

      {
        sourceName: 'jobstreet',
        sourceCategory: 'Manufacturing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=115&area=&salary=&src=12',
        sourceSpecialization: 'Maintenance',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 115
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Manufacturing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=194&area=&salary=&src=12',
        sourceSpecialization: 'Manufacturing',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 194
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Manufacturing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=196&area=&salary=&src=12',
        sourceSpecialization: 'Process Design and Control',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 196
      },
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Manufacturing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=140&area=&salary=&src=12',
        sourceSpecialization: 'Purchasing/Material Management',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 140
      },  
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Manufacturing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=197&area=&salary=&src=12',
        sourceSpecialization: 'Quality Assurance',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 197
      },

//      -- checked below
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sales/Marketing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=142&area=&salary=&src=12',
        sourceSpecialization: 'Sales - Corporate Jobs',
        sourceSearchDepth: 200,
        sourceSpecializationCode: 142
      },  
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sales/Marketing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=139&area=&salary=&src=12',
        sourceSpecialization: 'Marketing and Business Development',
        sourceSearchDepth: 200,
        sourceSpecializationCode: 139
      },  
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sales/Marketing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=149&area=&salary=&src=12',
        sourceSpecialization: 'Merchandising',
        sourceSearchDepth: 25,
        sourceSpecializationCode: 149
      },  
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sales/Marketing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=145&area=&salary=&src=12',
        sourceSpecialization: 'Retail Sales',
        sourceSearchDepth: 175,
        sourceSpecializationCode: 145
      },  
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sales/Marketing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=143&area=&salary=&src=12',
        sourceSpecialization: 'Sales - Engineering/Tech/IT',
        sourceSearchDepth: 75,
        sourceSpecializationCode: 143
      },  
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sales/Marketing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=144&area=&salary=&src=12',
        sourceSpecialization: 'Sales - Financial Services',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 144
      },  
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sales/Marketing',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=151&area=&salary=&src=12',
        sourceSpecialization: 'Telemarketing',
        sourceSearchDepth: 50,
        sourceSpecializationCode: 151
      },          

      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=103&area=&salary=&src=12',
        sourceSpecialization: 'Actuarial/Statistics',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 103
      },        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=102&area=&salary=&src=12',
        sourceSpecialization: 'Agriculture',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 102
      },        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=181&area=&salary=&src=12',
        sourceSpecialization: 'Aviation',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 181
      },        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=182&area=&salary=&src=12',
        sourceSpecialization: 'Biotechnology',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 182
      },        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=183&area=&salary=&src=12',
        sourceSpecialization: 'Chemistry',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 183
      },        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=108&area=&salary=&src=12',
        sourceSpecialization: 'Food Technology/Nutritionist',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 108
      },        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=109&area=&salary=&src=12',
        sourceSpecialization: 'Geology/Geophysics',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 109
      },        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Sciences',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=199&area=&salary=&src=12',
        sourceSpecialization: 'Science and Technology',
        sourceSearchDepth: 20,
        sourceSpecializationCode: 199
      },  

        
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Services',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=119&area=&salary=&src=12',
        sourceSpecialization: 'Security/Armed Forces',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 119
      },         
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Services',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=134&area=&salary=&src=12',
        sourceSpecialization: 'Customer Service',
        sourceSearchDepth: 150,
        sourceSpecializationCode: 134
      },         
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Services',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=147&area=&salary=&src=12',
        sourceSpecialization: 'Logistics/Supply Chain',
        sourceSearchDepth: 100,
        sourceSpecializationCode: 147
      },         
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Services',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=138&area=&salary=&src=12',
        sourceSpecialization: 'Law/Legal Services',
        sourceSearchDepth: 40,
        sourceSpecializationCode: 138
      },         
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Services',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=118&area=&salary=&src=12',
        sourceSpecialization: 'Personal Care',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 118
      },         
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Services',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=120&area=&salary=&src=12',
        sourceSpecialization: 'Social Services',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 120
      },         
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Services',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=152&area=&salary=&src=12',
        sourceSpecialization: 'Tech and Helpdesk Support',
        sourceSearchDepth: 30,
        sourceSpecializationCode: 152
      }, 
    
      {
       sourceName: 'jobstreet',
       sourceCategory: 'Other',
       sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=110&area=&salary=&src=12',
       sourceSpecialization: 'General Work',
       sourceSearchDepth: 25,
       sourceSpecializationCode: 110
      },          
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Other',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=104&area=&salary=&src=12',
        sourceSpecialization: 'Journalist and Editors',
        sourceSearchDepth: 25,
        sourceSpecializationCode: 104
      },          
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Other',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=117&area=&salary=&src=12',
        sourceSpecialization: 'Publishing',
        sourceSearchDepth: 25,
        sourceSpecializationCode: 117
      },          
      {
        sourceName: 'jobstreet',
        sourceCategory: 'Other',
        sourceUrl: 'http://www.jobstreet.com.my/en/job-search/job-vacancy.php?key=&location=&specialization=116&area=&salary=&src=12',
        sourceSpecialization: 'Other',
        sourceSearchDepth: 25,
        sourceSpecializationCode: 116
      }
    ];
    var subSpecTargets = [];
    var jobDescriptionTargets = [];
    var jobContentURLs = [];
    var insertJSSource = function(obj){
        JobStreetSources.insert({
          sourceCategory: obj.sourceCategory,
          sourceUrl: obj.sourceUrl,
          sourceSpecialization: obj.sourceSpecialization,
          sourceSearchDepth: obj.sourceSearchDepth,
          sourceSpecializationCode: obj.sourceSpecializationCode
        }, function(err, res){
          if (err)
            console.log(err);
        });

        subSpecTargets.push({
          sourceUrl: obj.sourceUrl, 
          sourceSearchDepth: obj.sourceSearchDepth,
          sourceCategory: obj.sourceCategory,
          sourceSpecialization: obj.sourceSpecialization,
        });
        console.log('subSpecTargets:');
        // console.dir(subSpecTargets);
    };

    for (var i = specializationCodes.length - 1; i >= 0; i--) {
      insertJSSource(specializationCodes[i]);
    }

    var callback = function(obj,index){
      var i = 1;
      // upperLimit defines the pagedepth of the search minus 1
      var upperLimit = obj.sourceSearchDepth;
      var pageTarget = "";
      while (i < upperLimit) {
          pageTarget = obj.sourceUrl + '&pg=' + i;
          i++;
          console.log('pageTarget:' + pageTarget);
        
        jobDescriptionTargets.push({
          jobUrl: pageTarget, 
          sourceCategory: obj.sourceCategory,
          sourceSpecialization: obj.sourceSpecialization
        });
      }
    }

    for (var i = subSpecTargets.length - 1; i >= 0; i--) {  
      callback(subSpecTargets[i]);
    };

    console.log('jobDescriptionTargets: ');
    console.dir(jobDescriptionTargets);

    var groupedItems = [];
    var uniqueItems = _.uniq(groupedItems);
    function insertNewItem (obj, category, subspec) {
      console.log('inserting new item here....');
      var parentCategory = category,
      subSpecialization = subspec;

      HTTP.call("GET", obj.jobUrl, function (error, result) {
        var self = this;


        if(error && result.statusCode !== 200){console.log('Request error.');}
        
        if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") == -1){
          console.log('Successful HTTP request on' + obj.jobUrl);

          //.position-title-link elements contain target URLS
          var info = result.content
          , $ = cheerio.load(info)
          , $body = $('body')
          , newItem = {};

          newItem.title = $body.find('#position_title').text();
          newItem.title = $body.find('#position_title').text();
          newItem.url = obj.jobUrl;
          newItem.company = $body.find('#company_name').text();
          newItem.location = $body.find('#single_work_location').text();
          newItem.experience = $body.find('#years_of_experience').text();
          newItem.sourceCategory = parentCategory;
          newItem.sourceSpecialization = subSpecialization;

          JobStreetItems.insert(newItem);
        }

        // Classified ads: some post properties are not available
        if (result.statusCode == 200 && obj.jobUrl.search("job-classified-ads") > 0){
          console.log('Successful HTTP request, classified job posting, using alternate parse targets');

          //.position-title-link elements contain target URLS
          var info = result.content
          , $ = cheerio.load(info)
          , $body = $('body')
          , newItem = {};

          newItem.title = $body.find('.rRowTitleCls').text();
          newItem.url = obj.jobUrl;
          newItem.company = $body.find('.rRowCompanyCls').text();
          newItem.location = $body.find('.rRowLocCls').text();
          newItem.experience = null;
          newItem.sourceCategory = obj.sourceCategory;
          newItem.sourceSpecialization = obj.sourceSpecialization;

          JobStreetItems.insert(newItem);
        }

      });
    }
    function findUniques(array) {
      return (_.uniq(array));
    }
    function findUniquesCount(array) {
      return (_.uniq(array).count());
    }
    function insertCleanedArray(array, category, subspec) {
      for (var i = array.length - 1; i >= 0; i--) {

        var exists = JobStreetItems.findOne({url: array[i].jobUrl});
        if (exists){
          console.log('Found a matching URL. Skipping to next item');
        } else {
          console.log('New jobStreetItem found, creating document....');
          insertNewItem(array[i], category, subspec);
        }
      }
    }
    function callbackUnique(array) {
      return _.uniq(array);
    }
    var uniqueJobs = findUniques(groupedItems);

    // console.log(jobDescriptionTargets);
    for (var i = jobDescriptionTargets.length - 1; i >= 0; i--) {
      console.log('JOB DESCRIPTION TARGET');
      console.dir(jobDescriptionTargets[i]);
      var parentCategory = jobDescriptionTargets[i].sourceCategory;
      var subSpecialization = jobDescriptionTargets[i].sourceSpecialization;

      console.log(parentCategory);
      console.log(subSpecialization);

      HTTP.call("GET", jobDescriptionTargets[i].jobUrl, function (error, result) {
        var self = this;
        self.items = new Array();
        if(error && result.statusCode !== 200){console.log('Request error.');}
        
        if (result.statusCode == 200){
          console.log('Successful HTTP request!');

          //.position-title-link elements contain target URLS
          var info = result.content
          , $ = cheerio.load(info)
          , $body = $('body')
          , $targets = $body.find('.position-title-link');

          // for each one of those elements found

          for (var i = $targets.length - 1; i >= 0; i--) {
            
            var $a = $($targets[i]).attr('href');
            var modifiedObj = {};
            modifiedObj.jobUrl = $a;
            groupedItems.push(modifiedObj);
          };
        }

        insertCleanedArray(callbackUnique(groupedItems), parentCategory, subSpecialization);
      });
    }
    
  }
});
