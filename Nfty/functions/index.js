const functions = require("firebase-functions");
const sample_metadata = require("./metadata/sample_metadata.json");

let nft_metadata = new Map();

exports.write_metadata = functions.https.onCall((data, context) => {
	if(data.tokenId){
		let metadata = sample_metadata;
	 	metadata['name'] = data['name'];
	 	metadata['owner'] = data['owner'];
	 	metadata['creator'] = data['creator'];
	 	metadata['image_uri'] = data['image_uri'];
	 	nft_metadata.set(data['tokenId'], metadata);
	 	return metadata;
	} else{
		return {
			error: "no tokenId given",
		};
	};	
});


exports.get_metadata = functions.https.onRequest((req, res) => {
	const tokenId = Number(req.query.tokenId);
	if(nft_metadata.has(tokenId)){
		res.status(200).send(nft_metadata.get(tokenId));
	} else{
		res.status(200).send("invalid token id");
	}
});
