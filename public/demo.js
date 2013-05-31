require.config({
  paths: {
    backbone: 'lib/backbone',
    bootstrap: 'lib/bootstrap/js/bootstrap.min',
    css3tree: 'lib/css3tree/css3tree',
    jquery: 'lib/jquery-2.0.1',
    underscore: 'lib/underscore-min'
  },
  shim: { // needed for non-AMD modules
    backbone: {deps: ['underscore'], exports: 'Backbone'},
    underscore: {exports: '_'}
  }
});

var deps = ['jquery', 'underscore', 'backbone',
  'css3tree', 'patient', 'specimen', 'bootstrap'];
require(deps, function ($, _, Backbone, tree, patient, specimen) {
  'use strict';

  function loadData() {
    var patients = new patient.Collection();

    var pat = new patient.Model({
      id: 'PatId1',
      altId: 'AltPatId1',
      name: 'Doe, John',
      location: 'ICU',
      physician: 'Dr. Bob',
      comment: 'claimed he lost his wallet'
    });
    patients.add(pat);

    var spec = new specimen.Model({
      labId: 'LabId1',
      type: 'Blood',
      source: 'direct draw',
      collectionDate: '5/29/13',
      collectionTime: '0530',
      comment: 'patient cried'
    });
    pat.addSpecimen(spec);

    spec = new specimen.Model({labId: 'LabId2', type: 'Urine'});
    pat.addSpecimen(spec);


    pat = new patient.Model({
      name: 'Doe, Jane',
      id: 'PatId2',
      altId: 'AltPatId2'
    });
    patients.add(pat);

    spec = new specimen.Model({labId: 'LabId3', type: 'Sputnum'});
    pat.addSpecimen(spec);

    new patient.TreeView({model: patients}).render();
  }

  function updateDateTime() {
    var s = new Date().toLocaleString();

    // Remove seconds.
    var index = s.lastIndexOf(':');
    s = s.substring(0, index) + s.substring(index + 3);

    $('#dateTime').text(s);
  }

  $(function () {
    loadData();
    updateDateTime();
    setInterval(updateDateTime, 60 * 1000); // every minute
  });
});
