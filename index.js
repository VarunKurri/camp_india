var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    User            = require('./models/user'),
    Campground       =require('./models/campground');
   


mongoose.connect("mongodb://localhost/camp");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
   res.render("landing");
});
app.get("/campgrounds", function(req, res){
   Campground.find({}, function(err, allCampgrounds){
       
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
       
   });
});


app.post("/campgrounds", function(req, res){
  
    var campground = {
        name: req.body.name, 
        image: req.body.image, 
        price: req.body.price, 
        
        description: req.body.description
    };
    Campground.create(campground, function(err, campground){
            console.log("Successfully added " + campground.name);
            res.redirect("/campgrounds");
        });
   
});

app.get("/campgrounds/new",  function(req, res){
   res.render("campgrounds/new");
});


app.get("/campgrounds/:id", function(req, res){
   Campground.findById(req.params.id).exec(function(err, foundCampground){
       
            res.render("campgrounds/show", {campground: foundCampground}); 
       
   });
});


app.get("/campgrounds/:id/edit",  function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       
            res.render("campgrounds/edit", {campground: foundCampground}); 
       
    });
});

app.put("/campgrounds/:id", function(req, res){
    var updatedCampground = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description
        };
    Campground.findByIdAndUpdate(req.params.id, updatedCampground, function(err, foundCampground){
       
          res.redirect("/campgrounds/" + foundCampground._id); 
       
   });
});



app.listen(3000, function(){
   console.log("Server running !!!!");
});