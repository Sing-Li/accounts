// Request Meteor developer account credentials for the user
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
var requestCredential = function (credentialRequestCompleteCallback) {
  var config = ServiceConfiguration.configurations.findOne({
    service: 'meteor-developer'
  });
  if (!config) {
    credentialRequestCompleteCallback &&
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var loginUrl =
        MeteorDeveloperAccounts._server +
        "/oauth2/authorize?" +
        "state=" + credentialToken +
        "&response_type=code&" +
        "client_id=" + config.clientId +
        "&redirect_uri=" + Meteor.absoluteUrl("_oauth/meteor-developer?close");

  OAuth.showPopup(
    loginUrl,
    _.bind(credentialRequestCompleteCallback, null, credentialToken),
    {
      width: 470,
      height: 420
    }
  );
};

MeteorDeveloperAccounts.requestCredential = requestCredential;
