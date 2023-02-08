var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
// The following collections were created using the 
// Drawing Tools in the code editor 

var filtered = s2
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2018-12-01', '2018-12-30'))
  .filter(ee.Filter.bounds(AOI))
  .select(['B2', 'B3', 'B4','B5','B6']);

var composite = filtered.median().clip(AOI);
Map.setCenter(32.722303, 16.380837, 10);

// Display the input composite.
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(composite, rgbVis, 'image');

///////////////////////////////////////////////////
// Classification //

var training = water.merge(agriculture).merge(urbanareas).merge(barrenland).merge(mountains).merge(wadis);
print(training);

var label = 'class';
var bands = ['B2', 'B3', 'B4', 'B5'];
var input = composite.select(bands);
print (input);

// Overlay the point on the image to get training data.
var training = composite.sampleRegions({
  collection: training, 
  properties: ['class'], 
  scale: 10
  
});

var trainingData = training.randomColumn();
var trainSet = trainingData.filter(ee.Filter.lt('random', 0.8));
var testSet = trainingData.filter(ee.Filter.gte('random', 0.8));

// classification model //
var classifier = ee.Classifier.smileRandomForest(50).train({
  features: training,  
  classProperty: 'class', 
  inputProperties: composite.bandNames()
});
// // Classify the image.
var classified = composite.classify(classifier);


//Define a pallete for the classification
var landcoverPallete = [
  '021CA4',
  '#4d9221',
  '#a50f15',
  '#f1a340',
  '#252525',
  '#3182bd',
];

Map.addLayer(classified.clip(AOI), {palette: landcoverPallete, min:0, max:5}, 'classification CART 2018-12');


// Accuracy Assessment
//************************************************************************** 

// Use classification map to assess accuracy using the validation fraction
// of the overall training set created above.
var test = classified.sampleRegions({
  collection: testSet,
  properties: ['class'],
  scale: 10,
});

var testConfusionMatrix = test.errorMatrix('class', 'classification CART 2018-12')
// Printing of confusion matrix may time out. Alternatively, you can export it as CSV
print('Confusion Matrix', testConfusionMatrix);
print('Test Accuracy', testConfusionMatrix.accuracy());



///////////////////////----- Create Legend -----///////////////////////////////

// set position of panel

var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
 
// Create legend title

var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 
// Add the title to the panel

legend.add(legendTitle);
 
// Creates and styles 1 row of the legend.

var makeRow = function(color, name) {
 
      // Create the label that is actually the colored box.
      
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
 
      // Create the label filled with the description text.
      
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
 
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
 
//  Palette with the colors
var palette =['021CA4','#4d9221' , '#a50f15', '#f1a340', '#252525', '#3182bd',];
 
// name of the legend
var names = ['Water', 'Agriculture', 'Urban Areas' ,'Barren Land', 'Mountains', 'Wadis'];
 
// Add color and and names
for (var i = 0; i <5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
 
// add legend to map (alternatively you can also print the legend to the console)

Map.add(legend);

// set position of panel
var title = ui.Panel({
  style: {
    position: 'top-center',
    padding: '8px 15px'
  }
});
 
// Create legend title

var mapTitle = ui.Label({
  value: 'Classification 2022-12',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 
// Add the title to the panel
title.add(mapTitle);
Map.add(title);

//////////////////////////////////////////////////////////////// 
//classifica2022
var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
// The following collections were created using the 
// Drawing Tools in the code editor 

var filtered2 = s2
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date('2022-12-01', '2022-12-30'))
  .filter(ee.Filter.bounds(AOI))
  .select(['B2', 'B3', 'B4','B5','B6']);

var composite2 = filtered2.median().clip(AOI);

// Display the input composite.
var rgbVis = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(composite2, rgbVis, 'image');

///////////////////////////////////////////////////
// Classification //

var training2 = water.merge(agriculture).merge(urbanareas).merge(barrenland).merge(mountains).merge(wadis);
print(training2);

var label = 'class';
var bands = ['B2', 'B3', 'B4', 'B5'];
var input = composite2.select(bands);
print (input);

// Overlay the point on the image to get training data.
var training2 = composite2.sampleRegions({
  collection: training2, 
  properties: ['class'], 
  scale: 10
  
});

var trainingData2 = training2.randomColumn();
var trainSet2 = trainingData2.filter(ee.Filter.lt('random', 0.8));
var testSet2 = trainingData2.filter(ee.Filter.gte('random', 0.8));

// classification model //
var classifier2 = ee.Classifier.smileRandomForest(50).train({
  features: training2,  
  classProperty: 'class', 
  inputProperties: composite2.bandNames()
});
// // Classify the image.
var classified2 = composite2.classify(classifier2);


//Define a pallete for the classification
var landcoverPallete = [
  '021CA4',
  '#4d9221',
  '#a50f15',
  '#f1a340',
  '#252525',
  '#3182bd',
];

Map.addLayer(classified2.clip(AOI), {palette: landcoverPallete, min:0, max:5}, 'classification CART 2022-12');






///////////////////////////
//#    change detection code   //////////////////////////////

var difference = classified.subtract(classified2).clip(AOI);
var changeparavis = {min: 0, max: 1, palette: ['#00FF00', '#FF0000']};
Map.addLayer(difference, changeparavis, 'Difference', false)
///////
//Convert to Unit16 to download as geoTiff
var IMAGE2022 = classified2.toUint16()   
   
//print projection
print(classified2.projection());
//Exeport image to drive 
Export.image.toDrive({        image:IMAGE2022,
                                     fileFormat:'GeoTIFF',
                                     description:'LULC2022',
                                     scale:30,
                                     folder:'GGE_PROJECT',
                                     region:AOI
                                     
});