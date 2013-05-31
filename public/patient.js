define(['backbone', 'specimen', 'css3tree'],
  function (Backbone, specimen, tree) {
  'use strict';

  var Model = Backbone.Model.extend({
    defaults: function () {
      return {
        name: null,
        id: null,
        altId: null,
        location: null,
        physician: null,
        comment: null,
        specimens: new specimen.Collection()
      };
    },

    addSpecimen: function (specimen) {
      this.get('specimens').add(specimen);
    },

    toString: function () {
      return this.get('name') + ' (' + this.get('id') + ')';
    }
  });

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  // This is a view for a single patient.
  // To create and render,
  // new patient.FormView({model: patientModel}).render();
  var FormView = Backbone.View.extend({
    el: $('#patient'),

    render: function () {
      $('#patientId').val(this.model.get('id'));
      $('#altPatientId').val(this.model.get('altId'));
      $('#name').val(this.model.get('name'));
      $('#location').val(this.model.get('location'));
      $('#physician').val(this.model.get('physician'));
      $('#patient #comment').val(this.model.get('comment'));
      return this;
    }
  });

  // This is a view for a collection of patients.
  // To create and render,
  // new patient.TreeView({model: patientCollection}).render();
  var TreeView = Backbone.View.extend({
    el: $('#nav'),

    initialize: function () {
      var el = this.$el;
      var forms = $('#forms');
      var marginTop = parseInt(el.css('margin-top'), 10);
      var marginBottom = parseInt(el.css('margin-bottom'), 10);
      var borderTop = parseInt(el.css('border-top-width'), 10);
      var borderBottom = parseInt(el.css('border-bottom-width'), 10);
      el.height(forms.height() -
        marginTop - borderTop - borderBottom - marginBottom);
    },

    render: function () {
      var treeData = {};
      this.model.each(function (patient) {
        treeData[patient.toString()] = {
          object: patient,
          children: patient.get('specimens').toArray()
        };
      });

      tree.populate(this.$el, treeData);
      return this;
    },

    events: {
      'click a': 'selectSpecimen'
    },

    selectSpecimen: function (event) {
      var a = $(event.target);
      var patientModel = a.parent().parent().parent().data('object');
      var specimenModel = a.data('object');
      new FormView({model: patientModel}).render();
      new specimen.FormView({model: specimenModel}).render();
    }
  });

  return {
    Model: Model,
    Collection: Collection,
    FormView: FormView,
    TreeView: TreeView
  };
});
