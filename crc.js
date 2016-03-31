function xor(g,cs) {
  var N = g.length
  for (c=1;c<N;c++) {
    if (cs[c] == g[c]) {
      cs[c] = '0';
    }else {
      cs[c] = '1';
    }
  }
  return cs
}

function crc(t,g) {
  var e,c,cs=[],a = t.length,N = g.length;
  //Add bit divisor for message
  for(e=a;e<a+N-1;e++){
    t+='0';
  }
  for (e=0;e<N;e++) {
    cs[e]=t[e];
  }
  do {
    if (cs[0]=='1') {
      cs = xor(g,cs);
    }
    for (c=0;c<N-1;c++) {
      cs[c]=cs[c+1];
    }
    cs[c]=t[e++]

  } while (e<=a+N-1);


  res = t.split('');
  for (e=a;e<a+N-1;e++) {
    res[e]=cs[e-a];
  }
  t = res.join('');
  data = {message:t, crc:cs.join('')}
  return data
}
