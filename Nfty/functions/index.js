const functions = require("firebase-functions");
const sample_metadata = require("./metadata/sample_metadata.json");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Firestore.
      const original = snap.data().original;

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Uppercasing', context.params.documentId, original);
      
      const uppercase = original.toUpperCase();
      
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Firestore.
      // Setting an 'uppercase' field in Firestore document returns a Promise.
      return snap.ref.set({uppercase}, {merge: true});
    });

    

    /*
	parameters: data, context
	data {
		uri: image uri
		tokenId: token Id 
	}

	returns: token 
	token = {
		name: "",
		description: "",
		image: "uri",
		owner: "",
		attributes: []
	}
    */

nft_metadata = new Map();

exports.write_metadata = functions.https.onCall((data, context) => {
	var metadata = sample_metadata;
	 metadata.name = data?.name || "no name set";
	 metadata.owner = data?.owner || "not working";
	 metadata.creator = data?.creator || "no creator set";
	 metadata.image_uri = data?.image_uri || "no image uri"; 
	// const uri = data.uri; 
	// const owner = context.auth.token.name || null;

	return metadata;
});


exports.get_metadata = functions.https.onRequest((req, res) => {
	const tokenId = Number(req.query.tokenId);

	nft_metadata.set(nft_metadata.size, sample_metadata);
	if(nft_metadata.has(tokenId)){
		res.status(200).send(nft_metadata.get(tokenId));
	} else{

		res.status(200).send("invalid token id");
	}
});