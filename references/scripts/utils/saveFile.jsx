// Expected globals: text (string), file (string) - file path
var text = (typeof text !== 'undefined') ? text : '';
var file = (typeof file !== 'undefined') ? file : '';
var jsonFile = new File(file);
jsonFile.open("w");
jsonFile.encoding = "UTF-8";
jsonFile.lineFeed = "Unix";
jsonFile.write(text);
jsonFile.close();
