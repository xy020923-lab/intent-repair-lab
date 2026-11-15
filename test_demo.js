const fs=require('fs');
const vm=require('vm');
const assert=require('assert');
const elements={};
function element(){return {children:[],value:'',textContent:'',className:'',style:{},append(x){this.children.push(x)},replaceChildren(...x){this.children=x},addEventListener(){},set scrollTop(x){},get scrollHeight(){return 0}}}
for(const id of ['scenario','mode','start','chat','choices','message','messageForm','trace','stage','repeats','turns','completed'])elements[id]=element();
elements.scenario.value='status';elements.mode.value='targeted';
const ctx=vm.createContext({document:{getElementById:id=>elements[id],createElement:element},console});
vm.runInContext(fs.readFileSync('script.js','utf8'),ctx);
for(const task of ['status','request','other'])for(const mode of ['targeted','open']){
  elements.scenario.value=task;elements.mode.value=mode;
  vm.runInContext('start()',ctx);
  vm.runInContext('handle(s.task.initial)',ctx);
  if(mode==='targeted'){
    const choice=task==='status'?'Check existing refund':task==='request'?'Start a new refund':'Something else';
    const button=elements.choices.children.find(x=>x.textContent===choice);
    assert(button,`${task}/${mode}: choice missing`);button.onclick();
    if(task==='other')vm.runInContext('handle(s.task.detail)',ctx);
  }else vm.runInContext('handle(s.task.detail)',ctx);
  const result=vm.runInContext('({completed:s.completed,repeats:s.repeats,turns:s.turns,phase:s.phase})',ctx);
  assert.equal(result.phase,'done');assert.equal(result.completed,task!=='other');
  assert.equal(result.repeats,mode==='open'||task==='other'?1:0);
  console.log(`${task}/${mode}: ${JSON.stringify(result)}`);
}
