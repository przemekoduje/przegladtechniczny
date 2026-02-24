const admin = require("firebase-admin");
const serviceAccount = require("./functions/service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function check() {
  const snapshot = await db.collection("userCarts").orderBy("createdAt", "desc").limit(1).get();
  snapshot.forEach(doc => {
    console.log("Found doc:", doc.id);
    console.log("Data:", JSON.stringify(doc.data(), null, 2));
  });
}

check().catch(console.error);
