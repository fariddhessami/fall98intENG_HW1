const express = require('express');

const server = express();
server.use(express.json());

var bodyParser = require('body-parser');



var the_requested_point = {
    "coordinates": [33, 14]
}

var the_polygons = [];





server.get('/', (req, res) => {
    res.send('Faridy Server');
})

server.get('/gis/test1', (req, res) => {
    res.send([1, 2, 3]);
})

server.get('/gis/test2', (req, res) => {
    // res.send(the_requested_point.coordinates[1]);
    // //sends as status code!!


})


server.get('/gis/test3', (req, res) => {
    res.send(the_requested_point);
})

server.get('/gis/testpoint/:lat/:long', (req, res) => {
    the_requested_point.coordinates[0] = req.params.lat;
    the_requested_point.coordinates[1] = req.params.long;
    console.log('new point has recieved lat: ' + the_requested_point.coordinates[0] + ' long: ' + the_requested_point.coordinates[1]);
})


server.put('/gis/addpolygon1', (req, res) => {
    // res.body = req.body;
    // res.send();

    res.send(req.body);
})

server.put('/gis/addpolygon2', (req, res) => {

    var jSonSTring = JSON.stringify(req.body);



    var obj2 = JSON.parse(jSonSTring);


    res.send(obj2);

})


server.put('/gis/addpolygon', (req, res) => {

    var jSonSTring = JSON.stringify(req.body);



    var obj = JSON.parse(jSonSTring);

    console.log(obj.type);
    console.log(obj.properties);


    var obj_name = obj.properties.name;

    var obj_coors = obj.geometry.coordinates;

    var obj_coors_arr = obj.geometry.coordinates;

    console.log(obj_name);
    console.log('coors ' + obj_coors);
    console.log(obj_coors_arr);




    // array.forEach(element => {

    // });

    res.send(obj);

})





server.listen(2019);
console.log('faridy server is listening on port : 2019...')