module.exports = function(mansion) {

var ncw = process.cwd();

main = function(req, res){
  res.sendfile(ncw + '/public/main.html');
};

lab = function(req, res){
  res.sendfile(ncw + '/public/lab_.html');
};

library = function(req, res){
  res.sendfile(ncw + '/public/library_.html');
};

conference = function(req, res){
  res.sendfile(ncw + '/public/conference_.html');
};

chapel = function(req, res){
  res.sendfile(ncw + '/public/chapel_.html');
};

living = function(req, res){
  res.sendfile(ncw + '/public/living_.html');
};

room = function(req, res){
  res.sendfile(ncw + '/public/room_.html');
};

office = function(req, res){
  res.sendfile(ncw + '/public/office_.html');
};

return { main: main, 
         lab: lab,
         library: library,
         conference: conference,
         chapel: chapel,
         living: living,
         room: room,
         office: office         
       }
} //function(mansion)
