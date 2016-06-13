this.GlobalUI = (function() {
  function GlobalUI() {}

  GlobalUI.dialog = {};

  GlobalUI.toast = function(text, className) {
    var toast;
    toast = $("[global-toast]")[0];
    // toast.text = text;
    return toast.show({text: text, duration: 3000});
  };

  GlobalUI.showDialog = function(opts) {
    this.dialog = $("[global-dialog]")[0];
    this.dialog.heading = opts.heading != null ? opts.heading : "";
    Session.set("global.ui.dialogHeading", opts.heading);
    Session.set("global.ui.dialogData", opts.data);
    Session.set("global.ui.dialogTemplate", opts.template);
    Session.set("global.ui.dialogFullOnMobile", opts.fullOnMobile != null);
    return Tracker.afterFlush((function(_this) {
      return function() {
        return _this.dialog.open();
      };
    })(this));
  };

  GlobalUI.showModal = function(opts) {
    this.dialog = $("#globalModal")[0];
    this.dialog.heading = opts.heading;
    Session.set("global.ui.dialogHeading", opts.heading);
    Session.set("global.ui.dialogData", opts.data);
    Session.set("global.ui.dialogTemplate", opts.template);
    Session.set("global.ui.dialogFullOnMobile", opts.fullOnMobile != null);
    return Tracker.afterFlush((function(_this) {
      return function() {
        return _this.dialog.open();
      };
    })(this));
  };

  GlobalUI.closeDialog = function() {
    Session.set("global.ui.dialogHeading", null);
    Session.set("global.ui.dialogTemplate", null);
    Session.set("global.ui.dialogData", null);
    Session.set("global.ui.dialogFullOnMobile", null);
    return this.dialog.close();
  };

  return GlobalUI;

})();

Template.globalLayout.helpers({
  globalDialogHeading: function() {
    return Session.get("global.ui.dialogHeading");
  },
  globalDialogTemplate: function() {
    return Session.get("global.ui.dialogTemplate");
  },
  globalDialogData: function() {
    return Session.get("global.ui.dialogData");
  },
  globalDialogFullOnMobile: function() {
    return Session.get("global.ui.dialogFullOnMobile");
  }
});

Template.globalLayout.events({
  "iron-overlay-closed [paper-dialog]": function(e) {
    Session.set("global.ui.dialogHeading", null);
    Session.set("global.ui.dialogTemplate", null);
    Session.set("global.ui.dialogData", null);
    return Session.set("global.ui.dialogFullOnMobile", null);
  },
  "click [data-open-dialog]": function(e) {
    var node;
    node = $(e.target);
    return GlobalUI.showDialog({
      heading: node.data("heading"),
      template: node.data("openDialog"),
      data: node.data("useContext") != null ? this : void 0,
      fullOnMobile: node.data("fullOnMobile")
    });
  },
  'click [data-action=back]' : function () {
    history.back();
  }
});
