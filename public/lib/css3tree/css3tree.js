// This was derived from http://experiments.wemakesites.net/css3-treeview.html.
/*global $: false, define: false */

define(['jquery'], function ($) {
  'use strict';

  var lastId = 0;

  function populateTreeNode(parent, value) {
    if (typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('populateTreeNode: value argument must be an object');
    }

    Object.keys(value).sort().forEach(function (key) {
      var node = value[key];
      var children = node.children;

      // Add non-leaf tree node.
      var li = $('<li>');
      li.data('object', node.object);
      lastId++;
      var id = 'item' + lastId;
      var checkbox = $('<input>', {type: 'checkbox', id: id});
      var label = $('<label>', {'for': id}).text(key);
      li.append(checkbox);
      li.append(label);
      parent.append(li);
      var ul = $('<ul>');
      li.append(ul);

      if (Array.isArray(children)) {
        children.forEach(function (item) {
          // Add leaf tree node.
          var a = $('<a>', {href: './'}).text(item.toString());
          a.data('object', item);
          li = $('<li>').append(a);
          ul.append(li);
        });
      } else if (typeof children === 'object') {
        populateTreeNode(ul, children);
      } else {
        throw new Error(
          'populateTreeNode: tree node values must be objects or arrays');
      }
    });
  }

  function populateTree(jq, data) {
    jq.addClass('css-treeview');
    var ul = $('<ul>');
    jq.append(ul);
    populateTreeNode(ul, data);

    $('.css-treeview a').click(function (event) {
      event.preventDefault();
    });
  }

  return {
    populate: populateTree
  };
});
