'use strict';

(function () {

  var rm;
  function getText(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader("Content-Type");
        if (type.match(/^text/))
          callback(request.responseText); // Pass it to callback
      }
    };
    request.send(null);
  }

  function go(url) {
    var mush;
    getText(url, function(txt) {
      var section = $('#main');
      //console.log('setting main html in go to: ' + txt);
      section.html(txt);
    });    
    mush = $('#mush');
    if( mush.html() == "" ) {
      //console.log('mush.html empty');
      getText('/mush', function(txt1) {
        //console.log('setting mush html in go to: ' + txt1);
        mush.html(txt1);
      });
    }    
  }

  function look(obj) {
    var str = '', i;
    if (obj.part) {
      for (i = 0; i < obj.part.length; i = i + 1) {
        str += obj.part[i].desc + ' ';
      }
    } else {
    str = obj.desc;
    }
    return str;
  }

  function names(obj) {
    var str = '', i;
    if (obj.part) {
      for (i = 0; i < obj.part.length; i = i + 1)
        str += obj.part[i].name + ' ';
    } else if ( obj instanceof Array ) {
      for (i = 0; i < obj.length; i = i + 1)
        str += obj[i].name + ' ';
    }    
    return str;
  }

  function find(rm, name) {
    var s = '';
    //console.log( 'find: ' + name );
    for( k in rm ) {
      if( k == 'name' && rm[k] == name ) {
        s = rm['desc'];
      } else if( k == 'part' ) {
        rm[k].forEach(function(o) { s += find(o, name); });
      }
    }
    return s;
  }

  function pick(user, object, from) {
    if (object.name) {
      user.part.push(object);
      from ? del(from, object) : del(rm, object);   
    }
  }

  function del(col, obj) {
    col.splice(col.indexOf(obj.name),1);
  }

  function view(room) {

    ftable.rm = rm = room.rm;
    var d = $('#tmp');
    d.append('<h1>'+rm.name+'</h1>')
     .append(rm.desc);
    if(rm.comment) { d.append('<p>'+rm.comment+'</p>'); }
    d.append('<ul>');
    rm.part.forEach(function(x) {
      d.append('<li>' + x.name + ': ' + x.desc + '</li>');
    });
    d.append('</ul>');

  }

  
  var ftable = { rm: rm,
              go: go,
              getText: getText, 
              view: view,
              look: look,
              names: names, 
              pick: pick,
              find: find };

  // on the server side
  if (typeof(module) !== 'undefined' ) {
    module.exports.mansion = ftable;
  } else {
  // on the client side as jQuery plugin
    jQuery.fn.mansion = ftable; 
  }
})()
