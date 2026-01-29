// Expected global: filepath (string)
var filepath = (typeof filepath !== 'undefined') ? filepath : '';
var f = new File(filepath);
f.exists;
