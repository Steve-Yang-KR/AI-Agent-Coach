const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.generateIntention = functions.firestore
  .document("players/{playerId}")
  .onUpdate(async (change, context) => {

    const player = change.after.data();
    const belief = player.belief || {};
    const desire = player.desire || {};

    let intention = {};

    if (belief.weaknesses?.includes("weak_foot")) {
      intention.today_training = "Weak foot training";
    }

    if (belief.activity === "low") {
      intention.message = "Let's train today!";
    }

    await admin.firestore()
      .collection("players")
      .doc(context.params.playerId)
      .update({ intention });

    return null;
  });
