const express = require('express');

const fs = require('fs');

load_from_file();

var file_json = {};

const server = express();
server.use(express.json());

var bodyParser = require('body-parser');


var inside = require('point-in-geopolygon');



var the_requested_point = {
    "coordinates": [33, 14]
}

var the_polygons_with_names = [];

var the_result_polygons_with_names = {};





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

server.get('/gis/testpoint/1/:lat/:long', (req, res) => {
    the_requested_point.coordinates[0] = req.params.lat;
    the_requested_point.coordinates[1] = req.params.long;
    console.log('new point has recieved lat: ' + the_requested_point.coordinates[0] + ' long: ' + the_requested_point.coordinates[1]);
})

server.get('/gis/testpoint/:lat/:long', (req, res) => {
    the_requested_point.coordinates[0] = req.params.lat;
    the_requested_point.coordinates[1] = req.params.long;


    the_result_polygons_with_names = [];

    the_polygons_with_names.forEach(element => {

        var sel_polygon_name = element.obj_name;

        var polygons = element.element;

        console.log('new hey : ' + sel_polygon_name);
        console.log([polygons]);

        console.log('the answer is : ' + inside.polygon([polygons], the_requested_point.coordinates))

        var answer = inside.polygon([polygons], the_requested_point.coordinates);

        // console.log(inside.polygon([element.element], [3, 3]));

        if (answer) {
            the_result_polygons_with_names.push({ sel_polygon_name, polygons });
        }

    });


    res.send(the_result_polygons_with_names);
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


    obj_coors_arr.forEach(element => {
        //foreach polygon
        console.log('hi');
        element.forEach(element => {
            console.log(element[0]);
            console.log(element[1]);
        });

        the_polygons_with_names.push({ obj_name, element });

    });

    // array.forEach(element => {

    // });

    res.send(the_polygons_with_names);

})


function load_from_file() {


    try {
        const data = fs.readFileSync('./file_input.json', 'utf8')
            // console.log(data)
        file_json = data;
        console.log(file_json);

        var obj_from_file = JSON.parse(file_json);



    } catch (err) {
        console.error(err)
    }






}





server.listen(2019);
console.log('faridy server is listening on port : 2019...');