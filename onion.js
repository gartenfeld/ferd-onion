var scrape = require('scrape');
var url = 'http://www.theonion.com';

module.exports = function(ferd) {

  ferd.listen(/ferd onion/i, function (response) {

    scrape.request(url, function (err, $) {
      if (err) return console.error(err);
     
      $('.most-popular').each(function (div) {

        var headlines = ['Popular News on *The Onion*:'];

        div.find('.headline').each(function (tag, i) {
          var a = tag.find('a').first(),
              title = a.attribs.title,
              href = url + a.attribs.href;
          var line = '`' + (i+1).toString() + '` ' +
                     '<' + href + '|' + title + '>';
          headlines.push(line);
        });

        response.postMessage({
          as_user: false,
          username: 'Ferd',
          text: headlines.join('\n'),
          "mrkdwn": true,
          icon_emoji: ':jack_o_lantern:'
        });

      });
    });
    
  });

};
