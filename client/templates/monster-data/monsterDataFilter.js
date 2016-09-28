monsterDataFilter = new SimpleSchema({
  startDate: {
    type: Date,
    optional: true,
    label: 'Starting',
    autoform: {
      afFieldInput: {
        type: "date",
      },
      defaultValue: function() {
        let current = new Date();
        let daysAgo = new Date() - 1000*3600*24*1;

        let rVal = moment.utc(daysAgo).format("YYYY-MM-DD");
        return rVal;
      }
    },
    custom: function () {
      if (!!this.value && (this.value > this.field('endDate').value)) {
        return "daterangeMismatch";
      }
    }
  },
  endDate: {
    type: Date,
    optional: true,
    label: 'Ending',
    autoform: {
      afFieldInput: {
        type: "date"
      },
      defaultValue: new Date()
    },
    custom: function () {
      if (!!this.value && (this.value < this.field('startDate').value)) {
        return "daterangeMismatch";
      }
    }    
  },
  sourceCategory: {
    type: [String],
    optional: true,
    label: "Category",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = MonsterMeta.find( {type: "sourceCategory"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }
  },
  qualification: {
    type: [String],
    optional: true,
    label: "Qualification",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = MonsterMeta.find( {type: "qualification"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }
  },
  experience: {
    type: [String],
    optional: true,
    label: "Experience",
    autoform: {
      type: "select-multiple",
      options: function () {
        let data = MonsterMeta.find( {type: "experience"}, { fields: { name: 1 }, sort: { name: 1 }} );
        if ( data ) {
          var uniques = _.uniq( data.map( ( item ) => {
            return item.name;
          }), true );

          var res = [];
          for (var i = 0; i < uniques.length; i++) {
            res.push({label: uniques[i], value: uniques[i]});
          }
          return res;
        }
      }
    }
  }
});
