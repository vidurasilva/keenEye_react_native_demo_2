import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, SIZES, icons, images} from '../constants';
import React from 'react';
import MapView from 'react-native-maps';

function OrderDelivery({route, navigation}) {
  const [restaurant, setRestaurants] = React.useState(null);
  const [streetName, setStreetName] = React.useState('');
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  React.useEffect(() => {
    let {restaurant, currentLocation} = route.params;
    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude + toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude + toLoc.longitude) * 2,
    };
    setRestaurants(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, [route.params]);
  function renderMap() {
    return (
      <View style={{flex: 1}}>
        <MapView style={{flex: 1}}></MapView>
      </View>
    );
  }
  function renderDistanceHeader() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 50,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          left: 0,
          right: 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: SIZES.width * 0.9,
            paddingHorizontal: SIZES.padding * 2,
            paddingVertical: SIZES.padding,
            borderRadius: SIZES.radius,
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              paddingRight: SIZES.padding * 2,
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={icons.list}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={style.container}>
      {renderMap()}
      {/* {renderDistanceHeader()} */}
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
export default OrderDelivery;
