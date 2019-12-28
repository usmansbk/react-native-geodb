import React from 'react';
import GeoDBCitiesSearch from 'react-native-geodb';

export default () => (
	<GeoDBCitiesSearch
		query={{
			key: "rdcRtGlyhVmshYGy2m2p3jBCFSfOp1rrdtqjsn8tzV5y3RRSK3"
		}}
		showActivityIndicator
		progressViewOffset={300}
	/>
);