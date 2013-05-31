define(['backbone'], function (Backbone) {
  'use strict';

  var Model = Backbone.Model.extend({
    defaults: function () {
      return {
        labId: null,
        type: null,
        source: null,
        collectionDate: null,
        collectionTime: null,
        comment: null
      };
    },

    toString: function () {
      return this.get('labId') + ',' + this.get('type');
    }
  });

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  // This is a view for a single specimen.
  // To create and render,
  // new specimen.FormView({model: specimenModel}).render();
  var FormView = Backbone.View.extend({
    el: $('#specimen'),

    render: function () {
      $('#labId').val(this.model.get('labId'));
      $('#type').val(this.model.get('type'));
      $('#source').val(this.model.get('source'));
      $('#collectionDate').val(this.model.get('collectionDate'));
      $('#collectionTime').val(this.model.get('collectionTime'));
      $('#specimen #comment').val(this.model.get('comment'));
      return this;
    }
  });

  return {
    Model: Model,
    Collection: Collection,
    FormView: FormView
  };
});
