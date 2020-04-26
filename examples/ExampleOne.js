import React from 'react';
import GeoDBCitiesSearch, { Geocoder } from 'react-native-geodb';

export default () => {
	Geocoder({}).then(response => console.log(response)).catch(error => console.log(error));
	return (
		<GeoDBCitiesSearch
			query={{
				key: "rdcRtGlyhVmshYGy2m2p3jBCFSfOp1rrdtqjsn8tzV5y3RRSK3"
			}}
			showActivityIndicator
			progressViewOffset={300}
		/>
	);
};