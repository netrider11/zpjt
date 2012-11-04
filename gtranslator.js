google.load("language", "1");

function gtranslate() {
  var text = document.getElementById("text").value;
  var tlang = document.getElementById("tlang").value
  google.language.detect(text, function(result) {
    if (!result.error && result.language) {
      google.language.translate(text, result.language, tlang,
                                function(result) {
        var translated = document.getElementById("translation");
        if (result.translation) {
          translated.value = result.translation;
        }
      });
    }
  });
}