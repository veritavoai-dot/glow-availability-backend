(function(){
  var s=document.createElement("style");
  s.textContent="\n  .cav-scope{--gold:#BE7100;--gold-dark:#9c5d00;--cream:#faf6f0;--ink:#2b2622;--muted:#8a8178;--line:#eadfd2;--no:#d9d2c8;}\n  .cav-scope *{box-sizing:border-box;margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;}\n  .cav-fab{position:fixed;right:40px;bottom:120px;z-index:2147483000;background:var(--gold);color:#fff;border:none;padding:17px 26px;border-radius:999px;font-size:17px;font-weight:700;letter-spacing:.3px;box-shadow:0 8px 24px rgba(190,113,0,.35);cursor:pointer;display:flex;align-items:center;gap:8px;}\n  .cav-fab:active{transform:scale(.97)}\n  .cav-overlay{position:fixed;inset:0;z-index:2147483001;background:rgba(43,38,34,.55);display:none;align-items:flex-end;justify-content:center;}\n  .cav-overlay.open{display:flex}\n  @media(min-width:640px){.cav-overlay{align-items:center}}\n  .cav-modal{background:var(--cream);width:100%;max-width:440px;border-radius:22px 22px 0 0;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 -10px 40px rgba(0,0,0,.25);}\n  @media(min-width:640px){.cav-modal{border-radius:22px}}\n  .cav-head{padding:18px 20px 14px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;}\n  .cav-brand{font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:var(--gold);font-weight:700}\n  .cav-title{font-size:19px;font-weight:600;margin-top:2px;color:var(--ink)}\n  .cav-x{background:none;border:none;font-size:22px;color:var(--muted);cursor:pointer;line-height:1}\n  .cav-body{padding:20px;overflow-y:auto;color:var(--ink)}\n  .cav-lead{font-size:14px;color:var(--muted);margin-bottom:18px;line-height:1.5}\n  .cav-field{margin-bottom:14px}\n  .cav-field label{display:block;font-size:13px;font-weight:600;margin-bottom:6px}\n  .cav-field input{width:100%;padding:13px 14px;border:1px solid var(--line);border-radius:12px;font-size:16px;background:#fff;color:var(--ink);}\n  .cav-field input:focus{outline:none;border-color:var(--gold)}\n  .cav-err{color:#b23b3b;font-size:12px;margin-top:5px;display:none}\n  .cav-field.bad input{border-color:#b23b3b}\n  .cav-field.bad .cav-err{display:block}\n  .cav-btn{width:100%;background:var(--gold);color:#fff;border:none;padding:15px;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;margin-top:6px;}\n  .cav-btn:active{background:var(--gold-dark)}\n  .cav-btn:disabled{opacity:.6;cursor:default}\n  .cav-fine{font-size:11px;color:var(--muted);text-align:center;margin-top:12px;line-height:1.4}\n  .cal-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}\n  .cal-month{font-size:18px;font-weight:600}\n  .cal-nav{background:#fff;border:1px solid var(--line);width:38px;height:38px;border-radius:10px;font-size:18px;color:var(--gold);cursor:pointer}\n  .cal-nav:disabled{opacity:.3;cursor:default}\n  .cal-dow{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px}\n  .cal-dow span{text-align:center;font-size:11px;color:var(--muted);font-weight:600;text-transform:uppercase}\n  .cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}\n  .cal-cell{aspect-ratio:1/1;border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:16px;border:1px solid transparent}\n  .cal-cell.empty{background:transparent}\n  .cal-cell.avail{background:#fff;border-color:var(--gold);color:var(--ink);cursor:pointer;font-weight:600}\n  .cal-cell.avail:active{background:#fbefdd}\n  .cal-cell.avail .dot{width:6px;height:6px;border-radius:50%;background:var(--gold);margin-top:4px}\n  .cal-cell.full{background:#f1ebe1;color:var(--no)}\n  .cal-cell.full .dot{width:6px;height:6px;border-radius:50%;background:var(--no);margin-top:4px}\n  .cal-cell.past{background:transparent;color:#d8cfc2}\n  .cal-legend{display:flex;gap:16px;justify-content:center;margin-top:16px;font-size:12px;color:var(--muted)}\n  .cal-legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px;vertical-align:middle}\n  .cav-loading{text-align:center;padding:40px 0;color:var(--muted);font-size:14px}\n  .cav-spin{width:26px;height:26px;border:3px solid var(--line);border-top-color:var(--gold);border-radius:50%;margin:0 auto 12px;animation:cavspin .8s linear infinite}\n  @keyframes cavspin{to{transform:rotate(360deg)}}\n  .times-back{background:none;border:none;color:var(--gold);font-size:14px;font-weight:600;cursor:pointer;margin-bottom:14px}\n  .times-date{font-size:17px;font-weight:600;margin-bottom:14px}\n  .times-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}\n  .time-chip{padding:13px 6px;border-radius:12px;text-align:center;font-size:15px;font-weight:600;border:1px solid var(--line)}\n  .time-chip.free{background:#fff;border-color:var(--gold);color:var(--ink);cursor:pointer}\n  .time-chip.free:active{background:#fbefdd}\n  .time-chip.taken{background:#f1ebe1;color:var(--no);text-decoration:line-through}\n  .book-msg{text-align:center;padding:14px 4px}\n  .book-msg h3{font-size:20px;margin-bottom:10px;color:var(--ink)}\n  .book-msg p{color:var(--muted);font-size:14px;line-height:1.6;margin-bottom:22px}\n  .book-time{color:var(--gold);font-weight:700}\n";
  document.head.appendChild(s);
  var wrap=document.createElement("div");
  wrap.innerHTML="<button class=\"cav-fab\" onclick=\"cavOpen()\"><span>&#128197;</span> Check Availability</button>\n\n<div class=\"cav-overlay cav-scope\" id=\"cavOverlay\">\n  <div class=\"cav-modal\">\n    <div class=\"cav-head\">\n      <div>\n        <div class=\"cav-brand\">Glow Aesthetics Lab</div>\n        <div class=\"cav-title\" id=\"cavHeadTitle\">Check Availability</div>\n      </div>\n      <button class=\"cav-x\" onclick=\"cavClose()\">&times;</button>\n    </div>\n    <div class=\"cav-body\" id=\"cavBody\"></div>\n  </div>\n</div>";
  while(wrap.firstChild){document.body.appendChild(wrap.firstChild);}
})();

(function(){
  var BACKEND = "https://glow-availability-backend-gze2.vercel.app";
  var BOOKING_URL = "https://book.glowaestheticslab.com";

  var lead = {firstName:"",email:"",phone:""};
  var daysData = {};      // "YYYY-MM-DD" -> array of free ISO times
  var loadedMonths = {};  // "Y-M" -> true
  var masterTimes = [];   // ["08:00","08:30",...]
  var view = new Date(); view.setDate(1);
  var minMonth = new Date(); minMonth.setDate(1);
  var maxMonth = new Date(); maxMonth.setMonth(maxMonth.getMonth()+2); maxMonth.setDate(1);
  var screen = "form";
  var chosenDay=null, chosenTime=null, loadingMonth=false;

  var MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var DOW=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

  function pad(n){return (n<10?"0":"")+n;}
  function dayKey(y,m,d){return y+"-"+pad(m+1)+"-"+pad(d);}

  window.cavOpen=function(){screen="form";render();document.getElementById('cavOverlay').classList.add('open');};
  window.cavClose=function(){document.getElementById('cavOverlay').classList.remove('open');};

  function render(){
    var b=document.getElementById('cavBody');
    var t=document.getElementById('cavHeadTitle');
    if(screen==="form"){t.textContent="Check Availability";b.innerHTML=formHTML();}
    else if(screen==="cal"){t.textContent="Pick a Day";b.innerHTML=calHTML();}
    else if(screen==="times"){t.textContent="Pick a Time";b.innerHTML=timesHTML();}
    else if(screen==="book"){t.textContent="Almost There";b.innerHTML=bookHTML();}
  }

  function formHTML(){
    return '<p class="cav-lead">Enter your details to view live availability. No payment needed to look.</p>'
    +'<div class="cav-field" id="f-name"><label>First name</label><input id="in-name" type="text" placeholder="Jane" value="'+esc(lead.firstName)+'"><div class="cav-err">Please enter your first name</div></div>'
    +'<div class="cav-field" id="f-email"><label>Email</label><input id="in-email" type="email" placeholder="jane@email.com" value="'+esc(lead.email)+'"><div class="cav-err">Please enter a valid email</div></div>'
    +'<div class="cav-field" id="f-phone"><label>Mobile number</label><input id="in-phone" type="tel" placeholder="07123 456789" value="'+esc(lead.phone)+'"><div class="cav-err">Please enter your mobile number</div></div>'
    +'<button class="cav-btn" id="cav-go" onclick="cavSubmit()">See Availability</button>'
    +'<p class="cav-fine">We use your details only to hold your place in the queue and let you know about openings.</p>';
  }
  function esc(s){return (s||"").replace(/"/g,"&quot;");}
  function setBad(id,bad){document.getElementById(id).classList.toggle('bad',bad);}

  window.cavSubmit=function(){
    var name=document.getElementById('in-name').value.trim();
    var email=document.getElementById('in-email').value.trim();
    var phone=document.getElementById('in-phone').value.trim();
    var ok=true;
    if(!name){ok=false;setBad('f-name',true);}else setBad('f-name',false);
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){ok=false;setBad('f-email',true);}else setBad('f-email',false);
    if(phone.replace(/\D/g,'').length<7){ok=false;setBad('f-phone',true);}else setBad('f-phone',false);
    if(!ok)return;
    lead={firstName:name,email:email,phone:phone};
    var btn=document.getElementById('cav-go');btn.disabled=true;btn.textContent="Just a moment...";
    fetch(BACKEND+"/api/lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(lead)})
      .catch(function(){})
      .finally(function(){screen="cal";render();loadMonth(view.getFullYear(),view.getMonth());});
  };

  function loadMonth(y,m){
    var key=y+"-"+m;
    if(loadedMonths[key]){render();return;}
    loadingMonth=true;render();
    var start=new Date(y,m,1).getTime();
    var end=new Date(y,m+1,0,23,59,59).getTime();
    fetch(BACKEND+"/api/slots?startDate="+start+"&endDate="+end)
      .then(function(r){return r.json();})
      .then(function(j){
        if(j&&j.days){for(var k in j.days){daysData[k]=j.days[k];}}
        loadedMonths[key]=true;rebuildMaster();
      })
      .catch(function(){loadedMonths[key]=true;})
      .finally(function(){loadingMonth=false;render();});
  }
  function rebuildMaster(){
    var set={};
    for(var k in daysData){(daysData[k]||[]).forEach(function(iso){set[iso.split('T')[1].slice(0,5)]=1;});}
    masterTimes=Object.keys(set).sort();
  }

  function calHTML(){
    var y=view.getFullYear(),m=view.getMonth();
    var prevOff=(y<minMonth.getFullYear()||(y===minMonth.getFullYear()&&m<=minMonth.getMonth()));
    var nextOff=(y>maxMonth.getFullYear()||(y===maxMonth.getFullYear()&&m>=maxMonth.getMonth()));
    var top='<div class="cal-top"><button class="cal-nav"'+(prevOff?' disabled':'')+' onclick="cavStep(-1)">&#8249;</button>'
      +'<div class="cal-month">'+MONTHS[m]+' '+y+'</div>'
      +'<button class="cal-nav"'+(nextOff?' disabled':'')+' onclick="cavStep(1)">&#8250;</button></div>';
    if(loadingMonth && !loadedMonths[y+"-"+m]){
      return top+'<div class="cav-loading"><div class="cav-spin"></div>Loading live availability...</div>';
    }
    var first=new Date(y,m,1);
    var startDow=(first.getDay()+6)%7;
    var days=new Date(y,m+1,0).getDate();
    var today=new Date();today.setHours(0,0,0,0);
    var cells="";
    for(var i=0;i<startDow;i++)cells+='<div class="cal-cell empty"></div>';
    for(var d=1;d<=days;d++){
      var dt=new Date(y,m,d);dt.setHours(0,0,0,0);
      if(dt<today){cells+='<div class="cal-cell past">'+d+'</div>';continue;}
      var key=dayKey(y,m,d);
      var avail=daysData[key]&&daysData[key].length>0;
      if(avail)cells+='<div class="cal-cell avail" onclick="cavOpenDay('+d+')">'+d+'<span class="dot"></span></div>';
      else cells+='<div class="cal-cell full">'+d+'<span class="dot"></span></div>';
    }
    var dow=DOW.map(function(x){return '<span>'+x+'</span>';}).join("");
    return top+'<div class="cal-dow">'+dow+'</div><div class="cal-grid">'+cells+'</div>'
      +'<div class="cal-legend"><span><i style="background:var(--gold)"></i>Available</span><span><i style="background:var(--no)"></i>Not available</span></div>';
  }
  window.cavStep=function(dir){view.setMonth(view.getMonth()+dir);render();loadMonth(view.getFullYear(),view.getMonth());};
  window.cavOpenDay=function(d){chosenDay=new Date(view.getFullYear(),view.getMonth(),d);screen="times";render();};

  function timesHTML(){
    var d=chosenDay;
    var key=dayKey(d.getFullYear(),d.getMonth(),d.getDate());
    var freeSet={};(daysData[key]||[]).forEach(function(iso){freeSet[iso.split('T')[1].slice(0,5)]=1;});
    var label=DOW[(d.getDay()+6)%7]+' '+d.getDate()+' '+MONTHS[d.getMonth()];
    var grid=masterTimes.map(function(tm){
      return freeSet[tm]
        ? '<div class="time-chip free" onclick="cavPickTime(\''+tm+'\')">'+tm+'</div>'
        : '<div class="time-chip taken">'+tm+'</div>';
    }).join("");
    return '<button class="times-back" onclick="cavBackCal()">&#8249; Back to calendar</button>'
      +'<div class="times-date">'+label+'</div><div class="times-grid">'+grid+'</div>'
      +'<div class="cal-legend" style="margin-top:18px"><span><i style="background:var(--gold)"></i>Available</span><span><i style="background:var(--no)"></i>Taken</span></div>';
  }
  window.cavBackCal=function(){screen="cal";render();};
  window.cavPickTime=function(tm){chosenTime=tm;screen="book";render();};

  function bookHTML(){
    var d=chosenDay;
    var label=DOW[(d.getDay()+6)%7]+' '+d.getDate()+' '+MONTHS[d.getMonth()]+' at '+chosenTime;
    return '<div class="book-msg"><h3>Choose your treatment first</h3>'
      +'<p>To book <span class="book-time">'+label+'</span> you need to choose your treatment first. Head back to the booking page to pick your treatment and pay.</p>'
      +'<button class="cav-btn" onclick="cavGoBook()">Go back to the booking page</button></div>';
  }
  window.cavGoBook=function(){cavClose();window.scrollTo({top:0,behavior:'smooth'});};
})();
