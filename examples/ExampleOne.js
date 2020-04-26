import React from 'react';
import GeoDBCitiesSearch, { Geocoder } from 'react-native-geodb';

const GEODB_KEY = "rdcRtGlyhVmshYGy2m2p3jBCFSfOp1rrdtqjsn8tzV5y3RRSK3"

export default () => {
	
	Geocoder({lat: 10.52641, lng: 7.43879}, GEODB_KEY).then(response => console.log(response)).catch(error => console.log(error));
	return (
		<GeoDBCitiesSearch
			query={{
				key: GEODB_KEY
			}}
			showActivityIndicator
			progressViewOffset={300}
		/>
	);
};