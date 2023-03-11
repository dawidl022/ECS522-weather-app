import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { getCoordinates } from "../../api/location";
import { baseUrl } from "../../env/variables";
import { Location } from "../../types/location";

/**
 * Component for selecting a location using Google Maps autocomplete and
 * Geocoding APIs
 *
 * Does not check if the Maps API is reachable and will silently fail. Caller
 * should check if the Maps API is reachable before rendering this component to
 * detect any errors and display them to the user.
 */
const LocationSelect = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={async data => {
        setSelectedLocation({
          name: data.description,
          coords: await getCoordinates(data.place_id),
        });
      }}
      query={{
        language: "en",
      }}
      requestUrl={{
        url: `${baseUrl}/maps/api`,
        useOnPlatform: "all",
      }}
    />
  );
};

export default LocationSelect;