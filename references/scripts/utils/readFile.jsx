// Expected global: filepath (string)
var filepath = (typeof filepath !== 'undefined') ? filepath : '';
var f = new File(filepath);
f.encoding = "UTF-8";
f.open('r');
var content = f.read();
f.close();
content;
