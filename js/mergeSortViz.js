
var bd=[],bardata=[], SColors=[];
var data;
  
data = document.getElementById("ArrayData").value; 
bd = data.split(",");
for (var i = 0; i < bd.length;i++){
  bardata.push(parseInt(bd[i]))
  SColors.push('#7a99b8');
}

//bardata = [9,7,2,1,14,3,7,13,6,7,8,9,3,12,30,25,1];
//SColors=['#6699ff','#6699ff','#6699ff','#6699ff','#6699ff','#6699ff','#6699ff','#6699ff','#6699ff','#6699ff','#6699ff',
//'#6699ff','#6699ff','#6699ff','#6699ff','#6699ff','#6699ff'];
var height = 400,
    width = 1000,
    barWidth = 50,
    barOffset = 5;
var yScale = d3.scale.linear()
  .domain([0, d3.max(bardata)])
  .range([0, height])
var xScale = d3.scale.ordinal()
  .domain(d3.range(0,bardata.length))
  .rangeBands([0,width])
//document.write(bardata);

d3.select("#Enter").on('click', function(){
  d3.select("#message").text("Hit 'Next' button to start");
 d3.select('#chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g') 
    .selectAll('rect').data(bardata)
    .enter().append('rect').attr('class', 'bars')
      .style('fill', function(d,i){
      return "white";
         })
      .attr('width', xScale.rangeBand()-1)
      .attr('height', function(d) {
      return yScale(d);
         })
      .attr('x', function(d,i){
      return xScale(i);
        })
      .attr('y', function(d){
      return (height - yScale(d));
        })     
});

//------------------------
var M = "Your vector is: ".concat(String(bardata));

var states = []
var colors = []
var messages = []
//document.write("here");
states.push(bardata.slice(0));
colors.push(SColors.slice(0));
//document.write(String(colors));
messages.push(M);
var tempColor = [];
//var c = ['#6699ff','purple','pink', 'gold','yellow', 'orange', 'blue', 'teal']
var end = [["#FF00FF", "#990099"],["#DDA0DD", "#BA55D3"],["#6600cc","#e6ccff"],["#00ffcc","#00997a"],
["#6699ff","#1a66ff"],["#666699","#b3b3cc"]];
var compare = ["#ADFF2F","green"];
var sorted = ['#87CEFA','#6495ED','#00BFFF', '#1E90FF', '#00CED1','#7FFFD4','#20B2AA']
var partition = [ '#ff6633','#ffcc33' ,'#ff99cc','#FFA07A','#ccff33','#cc6699','#BDB76B','#ffff33']

function merge(v, start, size, lvl){
 
  var i, size1, size2, start2, l, r, the_end;

  if (size == 1) {
    return;
  }

  size1 = Math.floor(size / 2);
  size2 = size - size1;
  start2 = start + size1;

//safe state before we call merge on 1st half
  states.push(v.slice(0));
  messages.push("Partition lvl: ".concat(String(lvl), ", take 1st half"));
  tempColor = colors[colors.length -1].slice(0);

  for (var i = start; i < start+size1; i++){
    tempColor[i] = partition[lvl];
  }
  colors.push(tempColor.slice(0));
  //call merge on first half
  merge(v, start, size1, lvl + 1);
 
 //save state after we call it
    states.push(v.slice(0));
    messages.push("Partition lvl: ".concat(String(lvl), " (left) is done, return"));
    tempColor = colors[colors.length -1].slice(0);
    for (var i = start; i < start+size1; i++){
    tempColor[i] = end[lvl][0];
  } 
    colors.push(tempColor.slice(0));

  //-----------

  //save state before we call merge on 2nd half
  states.push(v.slice(0));
  messages.push("Partition lvl: ".concat(String(lvl), ", take 2nd half"));
  tempColor = colors[colors.length -1].slice(0);
  for (var i = start2; i < start2+size2; i++){
    tempColor[i] = partition[lvl];
  }
  colors.push(tempColor.slice(0));
  //call merge on second haalf
  merge(v, start2, size2, lvl + 1);

//save state after it returns

 states.push(v.slice(0));
    messages.push("Partition lvl: ".concat(String(lvl), " (right) is done,return"));
    tempColor = colors[colors.length -1].slice(0);
    for (var i = start2; i < start2+size2; i++){
    tempColor[i] = end[lvl][1];
  } 
    colors.push(tempColor.slice(0));

var tempElem,tmp1,tmp2;
  //merging 2 vectors
  i = start;
  l = start; r = start2; the_end = start+size;
  while (1){

  //add state for each comparison
  
  states.push(v.slice(0));
  tempColor = colors[colors.length -1].slice(0);
  if (l != r ){
   tmp1 = tempColor[l];
  tempColor[l] = compare[0];}
  if (r != the_end){
    tmp2 = tempColor[r];
  tempColor[r] = compare[1];
  }
  colors.push(tempColor.slice(0));

    //no left to copy
    if ( l == r ){
    messages.push("Merging: no left elemnts left, copy right elements over to sorted part");

    states.push(v.slice(0));
    tempColor = colors[colors.length -1].slice(0);
    for (x = l; x < start+size; x++){ tempColor[x] = sorted[lvl]; }
    colors.push(tempColor.slice(0));
    messages.push("Merging: this part is sorted");
      break;
    }else if( r == the_end){
    messages.push("Merging: no right elemnts left, copy left elements over to sorted part"); 

    states.push(v.slice(0));
    tempColor = colors[colors.length -1].slice(0);
    for (x = l; x < start+size; x++ ){ tempColor[x] = sorted[lvl]; }
    colors.push(tempColor.slice(0));
    messages.push("Merging: this part is sorted");
      break;
    }else if (parseInt(v[l]) < parseInt(v[r])){
    messages.push("Compare 1st elemnts of merging parts: ".concat(String(v[l])," < ",String(v[r]))); 

    tempColor = colors[colors.length - 1].slice(0);
    tempColor[l] = sorted[lvl];
    tempColor[r] = tmp2;
    l = l + 1;
    states.push(v.slice(0));
    colors.push(tempColor.slice(0));
    messages.push("Merging: ".concat("move ",String(v[l - 1])," over to sorted part"));
    
    }else {
    messages.push("Compare 1st elements of merging parts: ".concat(String(v[r])," <= ",
      String(v[l])));
    
    tempColor = colors[colors.length -1].slice(0);
    tempColor[r] = tmp1;
    tempColor[l] = sorted[lvl];
    l = l + 1;
    r = r + 1;
    tempElem = v.splice(r-1,1);
    v.splice(l-1,0, tempElem);
    states.push(v.slice(0));

    colors.push(tempColor.slice(0));
    messages.push("Merging: ".concat("move ",String(v[l-1])," over to sorted part"));   
    }
    
    i++;
  }
}

merge(bardata, 0, bardata.length, 1);
colors.push(colors[colors.length -1].slice(0));
states.push(states[states.length - 1]);
messages.push("Vector is sorted!");
//---------------------------
var step = -1;

d3.select("#next").on('click', function(){
  step++;
  d3.selectAll('.bars')
    .data(states[step])
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d){
      return (height - yScale(d));
    })
    .style('fill', function(d,i){
      return colors[step][i];
         })
    .append("text").text(function(d){return d3.format(".2s")})

    d3.select("#message").text(messages[step])
    
})
d3.select("#prev").on('click', function(){
  step--;
  d3.selectAll('.bars')
    .data(states[step])
    .attr('height', function(d) {
      return yScale(d);
    })
    .attr('y', function(d){
      return (height - yScale(d));
    })
      .style('fill', function(d,i){
      return colors[step][i];
         })
    d3.select("#message").text(messages[step])
    
})


