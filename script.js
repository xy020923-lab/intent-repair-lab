const $ = id => document.getElementById(id);
const tasks = {
  status:{initial:"I applied for a refund last week. Where is it?",goal:"status",detail:"The refund was approved but the money has not arrived."},
  request:{initial:"I need help with a refund for order 2048.",goal:"request",detail:"I want to start a new refund request."},
  other:{initial:"There is a problem with my refund.",goal:"other",detail:"I need to change the bank account for my refund."}
};
let s;
function bubble(who,text){const el=document.createElement('div');el.className=`bubble ${who}`;el.textContent=text;$('chat').append(el);$('chat').scrollTop=$('chat').scrollHeight}
function trace(text){const el=document.createElement('li');el.textContent=text;$('trace').append(el)}
function update(){ $('repeats').textContent=s.repeats;$('turns').textContent=s.turns;$('completed').textContent=s.completed?'Yes':'No';$('stage').textContent=s.stage }
function options(items){$('choices').replaceChildren();for(const [label,action] of items){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>{bubble('user',label);$('choices').replaceChildren();action()};$('choices').append(b)}}
function start(){s={task:tasks[$('scenario').value],mode:$('mode').value,repeats:0,turns:0,completed:false,stage:'Waiting for the first request',phase:'initial'};$('chat').replaceChildren();$('trace').replaceChildren();$('choices').replaceChildren();bubble('bot','Hello. I can demonstrate refund requests and refund-status checks. This is a simulation; no real order is accessed.');$('message').value=s.task.initial;trace('Demo reset; local scenario selected.');update()}
function classify(text){const t=text.toLowerCase();if(/bank|account|payment details|destination/.test(t))return 'other';if(/where|status|progress|approved|arrived|received|track/.test(t))return 'status';if(/start|apply|new|request/.test(t))return 'request';return 'uncertain'}
function finish(goal){s.phase='done';if(goal==='status'){bubble('bot','Simulated order 2048: refund approved; payment processing. In a live service I would show the verified status and date.');s.completed=s.task.goal==='status'}else if(goal==='request'){bubble('bot','Simulated next step: open the new refund request form for order 2048.');s.completed=s.task.goal==='request'}else{bubble('bot','I cannot change bank details here. I can connect you with a human agent; no account change has been made.');s.completed=false}trace(`Route selected: ${goal}. Original task ${s.completed?'reached':'not completed'} in this simulation.`);s.stage=s.completed?'Original task reached in simulation':'Original task not completed';update()}
function confirm(){s.phase='confirm';s.turns++;bubble('bot','To make sure I understood: do you want to check an existing refund, start a new refund, or do something else?');trace('Ambiguous refund topic → targeted options with an escape route.');s.stage='Waiting for targeted confirmation';update();options([['Check existing refund',()=>finish('status')],['Start a new refund',()=>finish('request')],['Something else',()=>askOther()]])}
function suggestDetail(){const b=document.createElement('button');b.type='button';b.textContent='Use scenario detail';b.onclick=()=>{$('choices').replaceChildren();handle(s.task.detail)};$('choices').replaceChildren(b)}
function askOther(){s.phase='other';s.turns++;bubble('bot','What are you trying to do? Please describe it in one sentence.');trace('User rejected offered intents → open correction.');s.stage='Waiting for correction';update();suggestDetail()}
function openQuestion(){s.phase='open';s.turns++;bubble('bot','Could you tell me more about the issue you are experiencing?');trace('Ambiguous refund topic → open-ended repair question.');s.stage='Waiting for more detail';update();suggestDetail()}
function handle(text){if(!text.trim())return;bubble('user',text.trim());$('message').value='';const intent=classify(text);trace(`Message classified as ${intent} using local keyword rules.`);if(s.phase==='initial'){
  // Both approaches deliberately start from an ambiguous refund topic so their repair can be compared.
  if(s.mode==='targeted')confirm();else openQuestion();return
}
if(s.phase==='open'||s.phase==='other'||s.phase==='confirm'){
  s.repeats++;let route=intent;if(route==='uncertain'){bubble('bot','I still cannot tell which task you mean. Please choose a route or ask for a human agent.');trace('Uncertain reply → explicit recovery options.');s.stage='Needs another correction';update();options([['Check existing refund',()=>finish('status')],['Start a new refund',()=>finish('request')],['Human agent / other issue',()=>finish('other')]]);return}
  finish(route);return
}
if(s.phase==='done'){bubble('bot','This demo is complete. Press Start / reset to compare another scenario.');trace('Post-completion input ignored.')}}
$('messageForm').addEventListener('submit',e=>{e.preventDefault();handle($('message').value)});$('start').onclick=start;$('scenario').onchange=start;$('mode').onchange=start;start();
