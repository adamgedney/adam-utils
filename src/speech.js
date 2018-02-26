/**
 * Fn Index: 
 *  speech_playMessage
 *  speech_listen
*/

export const speech_playMessage = (message = "Click the microphone icon to tell me what you\'d like to do", voice = "Tessa") => {
  if ('speechSynthesis' in window) {
      let msg = new SpeechSynthesisUtterance(message);
      msg.rate = 1.2;

      window.speechSynthesis.onvoiceschanged = function() {
          const voices = window.speechSynthesis.getVoices();
          // personas = ['Tessa','Moira','Fiona','Daniel','Karen','Melina','Bad News','Bells','Boing','Cellos','Good News','Pipe Organ','Whisper','Zarvox'];

          for(let i = 0; i < voices.length ; i++) {
              if(voices[i].name === voice) {
                  msg.voice = voice;
              }
          }

          window.speechSynthesis.speak(msg);
      };
  }
};

/**
 * When triggered it begins listening for speech commands, relaying them through the callback
 */
export const speech_listen = cb => {
  if ('webkitSpeechRecognition' in window) {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.start();

    recognition.onstart = function () { console.log('Started speaking'); }

    recognition.onresult = event => {
      var final_transcript = '';
      var interim_transcript = '';

      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }

      cb(interim_transcript, final_transcript);
    }
    recognition.onerror = function (event) { console.log('Recognition error', event); }
    recognition.onend = function () { console.log('Finished speaking'); }
  }
};
