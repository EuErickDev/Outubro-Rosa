const nav=document.querySelector('.nav');
const menu=document.querySelector('.menu-btn');
menu.addEventListener('click',()=>{
 const open=nav.classList.toggle('mobile-open');
 menu.textContent=open?'×':'☰';
 menu.setAttribute('aria-expanded',String(open));
 menu.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{
 nav.classList.remove('mobile-open');
 menu.textContent='☰';
 menu.setAttribute('aria-expanded','false');
 menu.setAttribute('aria-label','Abrir menu');
}));

document.querySelectorAll('.faq-item button').forEach(btn=>{
 btn.addEventListener('click',()=>{
  const item=btn.parentElement, was=item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(x=>x.classList.remove('open'));
  document.querySelectorAll('.faq-item button').forEach(button=>{
   button.setAttribute('aria-expanded','false');
   button.querySelector('span').textContent='+';
  });
  if(!was){
   item.classList.add('open');
   btn.setAttribute('aria-expanded','true');
   btn.querySelector('span').textContent='−';
  }
 });
});

const data={
 corpo:['Conheça seu corpo','Observar o que é habitual para você ajuda a perceber mudanças. Se notar uma alteração nova, diferente do habitual ou persistente, procure uma unidade de saúde para avaliação.'],
 acompanhamento:['Tenha acompanhamento','Converse com profissionais de saúde e siga as orientações indicadas para seu perfil. Em caso de dúvida, uma Unidade Básica de Saúde pode ser uma porta de entrada para orientação.'],
 habitos:['Cuide dos hábitos','Alimentação equilibrada, atividade física e outros hábitos saudáveis fazem parte do cuidado integral. Eles não substituem avaliações ou orientações profissionais.']
};
const modal=document.querySelector('#modal'), title=document.querySelector('#modal-title'), text=document.querySelector('#modal-text');
document.querySelectorAll('[data-modal]').forEach(b=>b.addEventListener('click',()=>{title.textContent=data[b.dataset.modal][0];text.textContent=data[b.dataset.modal][1];modal.classList.add('show')}));
document.querySelector('.close').addEventListener('click',()=>modal.classList.remove('show'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});

document.querySelectorAll('.myth-toggle').forEach(button=>{
 button.addEventListener('click',()=>{
  const expanded=button.getAttribute('aria-expanded')==='true';
  const answer=button.nextElementSibling;
  button.setAttribute('aria-expanded',String(!expanded));
  button.firstChild.textContent=expanded?'Ver resposta ':'Ocultar resposta ';
  button.querySelector('span').textContent=expanded?'＋':'−';
  answer.hidden=expanded;
 });
});

const quizQuestions=[
 {question:'Um nódulo na mama que não dói ainda merece avaliação?',answers:['Sim, uma mudança nova deve ser avaliada.','Não, câncer sempre causa dor.'],correct:0,explanation:'Um nódulo pode não doer. Procure avaliação; muitos nódulos são benignos, mas a internet não consegue diagnosticar.',source:'OMS',url:'https://www.who.int/news-room/fact-sheets/detail/breast-cancer'},
 {question:'O autoexame mensal substitui a mamografia indicada?',answers:['Sim, se for feito todo mês.','Não. Autopercepção não substitui exames indicados.'],correct:1,explanation:'Conhecer o que é habitual ajuda a perceber mudanças, mas não substitui rastreamento orientado ou investigação médica.',source:'INCA',url:'https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/mama'},
 {question:'Se não há casos na família, o risco é zero?',answers:['Sim, só o histórico familiar importa.','Não. A maioria das mulheres diagnosticadas não tem histórico familiar conhecido.'],correct:1,explanation:'Ausência de histórico familiar conhecido não elimina o risco. Idade e outros fatores também podem importar.',source:'OMS',url:'https://www.who.int/news-room/fact-sheets/detail/breast-cancer'},
 {question:'Homens podem desenvolver câncer de mama?',answers:['Sim, embora seja incomum.','Não, só mulheres têm tecido mamário.'],correct:0,explanation:'É incomum, mas a OMS estima que cerca de 0,5% a 1% dos casos ocorram em homens.',source:'OMS',url:'https://www.who.int/news-room/fact-sheets/detail/breast-cancer'},
 {question:'Um diagnóstico de câncer de mama significa que a pessoa fez algo errado?',answers:['Sim, sempre é possível evitar.','Não. Muitos fatores não podem ser controlados, e ninguém deve ser culpado.'],correct:1,explanation:'Há fatores de risco que não são escolhas pessoais, e nem todos os casos podem ser prevenidos. O cuidado deve ser acolhedor e sem culpa.',source:'OMS',url:'https://www.who.int/news-room/fact-sheets/detail/breast-cancer'}
];
const quizQuestion=document.querySelector('#quiz-question');
const quizOptions=document.querySelector('#quiz-options');
const quizFeedback=document.querySelector('#quiz-feedback');
const quizProgressText=document.querySelector('#quiz-progress-text');
const quizProgressBar=document.querySelector('#quiz-progress-bar');
const quizScore=document.querySelector('#quiz-score');
const quizNext=document.querySelector('#quiz-next');
const quizRestart=document.querySelector('#quiz-restart');
let quizIndex=0;
let quizPoints=0;

function renderQuizQuestion(){
 const current=quizQuestions[quizIndex];
 quizQuestion.textContent=current.question;
 quizProgressText.textContent=`Pergunta ${quizIndex+1} de ${quizQuestions.length}`;
 quizProgressBar.style.width=`${((quizIndex+1)/quizQuestions.length)*100}%`;
 quizScore.textContent=`${quizPoints} ${quizPoints===1?'ponto':'pontos'}`;
 quizFeedback.textContent='';
 quizOptions.replaceChildren();
 current.answers.forEach((answer,index)=>{
  const option=document.createElement('button');
  option.type='button';
  option.className='quiz-option';
  option.textContent=answer;
  option.addEventListener('click',()=>answerQuiz(option,index,current));
  quizOptions.append(option);
 });
 quizNext.hidden=true;
 quizRestart.hidden=true;
}

function answerQuiz(selectedOption,selectedAnswer,current){
 const options=[...quizOptions.querySelectorAll('.quiz-option')];
 options.forEach(option=>{option.disabled=true;});
 const isCorrect=selectedAnswer===current.correct;
 if(isCorrect){
  quizPoints++;
  selectedOption.classList.add('is-correct');
 }else{
  selectedOption.classList.add('is-incorrect');
  options[current.correct].classList.add('is-correct');
 }
 quizScore.textContent=`${quizPoints} ${quizPoints===1?'ponto':'pontos'}`;
 quizFeedback.textContent=`${isCorrect?'Isso mesmo!':'Quase!'} ${current.explanation} `;
 const source=document.createElement('a');
 source.href=current.url;
 source.target='_blank';
 source.rel='noopener noreferrer';
 source.textContent=`Fonte: ${current.source}`;
 quizFeedback.append(source);
 quizNext.textContent=quizIndex===quizQuestions.length-1?'Ver meu resultado':'Próxima pergunta →';
 quizNext.hidden=false;
}

function finishQuiz(){
 quizQuestion.textContent='Quiz concluído!';
 quizProgressText.textContent='Resultado final';
 quizProgressBar.style.width='100%';
 quizOptions.replaceChildren();
 const feedback=quizPoints===quizQuestions.length
  ?'Excelente: você acertou todas. Continue conferindo informações em fontes confiáveis.'
  :quizPoints>=3
   ?'Bom trabalho! Reveja os temas que despertaram dúvidas e continue aprendendo.'
   :'Valeu participar. As respostas explicadas são um bom ponto de partida para aprender mais.';
 quizFeedback.textContent=`Você fez ${quizPoints} de ${quizQuestions.length} pontos. ${feedback}`;
 quizNext.hidden=true;
 quizRestart.hidden=false;
 quizQuestion.focus();
}

quizNext.addEventListener('click',()=>{
 quizIndex++;
 if(quizIndex===quizQuestions.length){
  finishQuiz();
  return;
 }
 renderQuizQuestion();
 quizQuestion.focus();
});
quizRestart.addEventListener('click',()=>{
 quizIndex=0;
 quizPoints=0;
 renderQuizQuestion();
 quizQuestion.focus();
});
renderQuizQuestion();

document.querySelector('#share').addEventListener('click',async()=>{
 const msg=document.querySelector('#share-msg');
 try{
  if(navigator.share){await navigator.share({title:'Outubro Rosa — Informação que transforma',text:'Conheça esta campanha educativa sobre o Outubro Rosa.',url:location.href});msg.textContent='Obrigado por compartilhar.'}
  else{await navigator.clipboard.writeText(location.href);msg.textContent='Link copiado para a área de transferência.'}
 }catch(e){msg.textContent='Copie o endereço desta página para compartilhar.'}
});
