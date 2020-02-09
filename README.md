# hebden-places

This data was collected during the work on the Hebden Rising site following
the Christmas 2015 flooding. It was felt that a database of community and
commercial locations would be of general benefit, so the decision was made
to publish under an Open Data License.

The data is held in the `src/hebden-places.geojson` file.

# Metadata

The data contains the following columns

* name - a street number and name, or address description
* comments - the name of the business or amenity at the address
* lat - The latitude of the place
* lon - The longitude of the place

`lat` and `lon` are provided in Web Mercator format (the default for the
  Leaflet JS Library).

# Preparing output files

* `npm install`
* `npm run process`
