const inv = { 
   "Stick": 0,
   "Stone":1,
   "Chef Knife":6,
   "Dagger":2,
   "Scythe":3,
   "Hammer":4,
   "Mace":5,
   "Spear":5,
   "Trident": 6,
   "Axe":7,
   "Sword":9,
   "Holy Shield":5,
   "Cursed Wand":5
}

const plnam = document.querySelector('#plName')
const but1 = document.querySelector('#butt-1')
const but2 = document.querySelector('#butt-2')
const but3 = document.querySelector('#butt-3')
const but4 = document.querySelector('#butt-4')
const buttSave = document.querySelector('#save')
const buttLoad = document.querySelector('#load')

buttLoad.onclick = onLoad
buttSave.onclick = onSave

buttSave.disabled = true

let saveExists = JSON.parse(localStorage.getItem('GridLock'))
if(saveExists == null || saveExists == undefined){
   buttLoad.disabled = true
}

function onLoad(){
   let saveGame = JSON.parse(localStorage.getItem('GridLock'))
   if(saveGame != null && saveGame != undefined){
      let flag = confirm('Are you sure you want to load a saved game?\nCurrent game progress will be lost')
      if(flag){
         nam = saveGame.plName
         plnam.textContent = nam
         lvl = saveGame.level
         atk1 = saveGame.attack_1
         atk2 = saveGame.attack_2
         wpn1.textContent = saveGame.weapon_1
         wpn2.textContent = saveGame.weapon_2
         hp.textContent = saveGame.hp_s
         pts.textContent = saveGame.pot_s
         buttLoad.disabled = true
         buttSave.disabled = false
         Inn()
      }
   }
}
function onSave(){
   let saveGame = JSON.parse(localStorage.getItem('GridLock'))
   let flag;
   if(saveGame != null && saveGame != undefined){
      flag = confirm('Your previous save will be lost\nOnly current game data will be saved')
   }else{
      flag = true
   }
   if(flag){
      let saveNew = {
         plName: nam,
         hp_s: Math.round(Number(hp.textContent)),
         pot_s: Math.round(Number(pts.textContent)),
         attack_1: atk1,
         attack_2: atk2,
         weapon_1: wpn1.textContent,
         weapon_2: wpn2.textContent,
         level: lvl
      }
      localStorage.setItem('GridLock',JSON.stringify(saveNew))
      alert('Your progress was saved')
      location.reload() 
   }
}

let nam = ''; 
let lvl = 1;

but1.onclick = () => { nam = prompt('Enter character name\n(12 characters only)'); plnam.textContent = nam.slice(0,12); buttSave.disabled = false; Inn()}
but2.style.visibility = 'hidden'
but3.style.visibility = 'hidden'
but4.style.visibility = 'hidden'

const text = document.querySelector('#content')

let atk1 = 2
let atk2 = 3

const hp = document.querySelector('#hp')
const pts = document.querySelector('#pts')
const wpn1 = document.querySelector('#w1')
const wpn2 = document.querySelector('#w2')

function use(butt, str){
   butt.style.visibility = 'visible'
   butt.textContent = str
}
function randInst(){
   ran = Math.floor(Math.random()*100)
   if(ran==1){
      if(Math.floor(Math.random()*2)==1){
         return kindLady
      }else{
         return oldMonk
      }
   }else if(ran==2){
      return child
   }else if(ran==3){
      return instanceDivineBeing
   }else if(ran<=5){
      return raven
   }else if(ran<=18){
      return instanceForrest
   }else if(ran<=29){
      return instanceBridge
   }else if(ran<=40){
      return clown  
   }else if(ran<=51){
      return instanceGraveyard  
   }else if(ran<=62){
      return instanceRuins  
   }else if(ran<=73){
      return instanceTemple  
   }else if(ran<=85){
      return traveler            
   }  
   return Inn    
}
function death(){
   text.textContent = 'Hope you had a good time!\nTo play again just refresh the page'
   but1.style.visibility = 'hidden'
}
function cont(instance = randInst()){ 
   but1.textContent = 'Continue'
   but1.onclick = instance
   
   but2.style.visibility = 'hidden'
   but3.style.visibility = 'hidden'
   but4.style.visibility = 'hidden'

   but1.disabled = false
   but2.disabled = false
   but3.disabled = false
   but4.disabled = false

   if(Number(hp.textContent)<=0){
      save.disabled = true
      text.textContent += '\nandd...umm...you died.'
      but1.style.visibility = 'visible'
      but1.onclick = death
      but2.style.visibility = 'hidden'
      but3.style.visibility = 'hidden'
      but4.style.visibility = 'hidden'
   }
}
function setHP(num){
   hp.textContent = Math.round(Number(hp.textContent) + num)
}
function hpPercent(num){
   hp.textContent = Math.floor(Number(hp.textContent)*((num*0.01)+1))
}
function setPOT(num){
   let temp = Math.round(Number(pts.textContent) + num)
   if(temp<0){
      pts.textContent = 0; 
   }else{
      pts.textContent = temp 
   }
}
function instanceFight(monNum = Math.floor(Math.random()*100)){
   let monster,monHp,monAtk,wpn_1 = wpn1.textContent,wpn_2 = wpn2.textContent,plHp = Number(hp.textContent);
   let diff = Math.floor(Math.random()*7) +1
   if(monNum==1){           //Dragon
      monHp = Math.round(plHp)*2
      monAtk = Math.round((atk1+atk2)*diff*0.100)
      monster = "Vicious Dragon"
   }else if(monNum<=6){         //Demon
      monHp = Math.round(plHp*1.96)
      monAtk = Math.round((atk1+atk2)*diff*0.098)
      monster = "Enraged Demon"
      lvl += 2
   }else if(monNum<=16){        //Zombie
      monHp = Math.round(plHp*1.8)
      monAtk = Math.round((atk1+atk2)*diff*0.090)
      if(monNum==16){
         monster = "Zombie Grunt"
      }else{
         monster = "Mindless Zombie"
      }
   }else if(monNum<=31){        //Bandit
      monHp = Math.round(plHp*1.5)
      monAtk = Math.round((atk1+atk2)*diff*0.077)
      monster = "Vile Bandit"
   }else if(monNum<=51){        //Goblin
      monHp = Math.round(plHp*1.2)
      monAtk = Math.round((atk1+atk2)*diff*0.060)
      monster = "Lousy Goblin"
   }else if(monNum<=61){       //Spider
      monHp = Math.round(plHp*0.5)
      monAtk = Math.round((atk1+atk2)*diff*0.050)
      monster="Humongous Spider"
   }else if(monNum<=75){        //Animal
      monHp = Math.round(plHp*0.7)
      monAtk = Math.round((atk1+atk2)*diff*0.037)
      monster = "Wild Animal"
   }else if(monNum<=99){       //Slime 
      monHp = Math.round(plHp*0.24)
      monAtk = Math.round((atk1+atk2)*diff*0.012)
      monster = "Cute Slime"
   }else if(monNum==102){       //Priest
      diff = Math.floor(Math.random()*2) + 1
      monAtk = Math.round((atk1+atk2)*diff*0.5)
      monHp = Math.round(plHp*1)
      monster="Studious Priest"
   }else if(monNum==103){       //Clown
      diff = Math.floor(Math.random()*2)
      monAtk = Math.round(((atk1+atk2)*diff)+1)
      monHp = Math.round(plHp*3)
      monster="Unlucky Clown"
   }else if(monNum==104){       //Lich
      monHp = plHp*2
      monAtk = Number((atk1+atk2)*diff*0.100)
      monster="Undead Lich"
   }else if(monNum==105){       //Troll
      monHp = Math.round(plHp*1.85)
      monAtk = Math.round((atk1+atk2)*diff*0.098)
      monster="Lonely Troll"
   }else if(monNum==107){       //Spider Boss
      monHp = plHp*2
      monAtk = Math.round((atk1+atk2)*diff*0.100)
      monster="Spider Matriarch"
   }

   text.textContent = "Fighting with...\n\nMonster: "+monster+'\nHealth: '+monHp
   use(but1,'Use ' + wpn_1)
   use(but2,'Use ' + wpn_2)
   use(but3,'Drink Healing Potion')
   use(but4,'Flee')

   but1.onclick = () => {
      if(wpn_1!="Holy Shield" && wpn_1!="Chef Knife"){
         monHp-=atk1
      }
      if(wpn_1=="Holy Shield"){
         monHp-=Number(atk1/2) 
      }
      if(wpn_1=="Cursed Wand" && monster!="Undead Lich" && monster!="Zombie Grunt" && monster!="Mindless Zombie"){
         plHp+=Number(atk1/8)+1
      }
      if(wpn_1=="Holy Shield"){
         plHp+=Number(monAtk*(atk1*0.01))
      }
      if(wpn_1=="Chef Knife"){         
         plHp+=atk1
      }
      if(monHp>0){
         plHp-=monAtk
      }
      hp.textContent = Math.round(plHp)
      monHp = Math.round(monHp)
      text.textContent = "Fighting with...\nMonster: "+monster+'\nHealth: '+monHp+'\n\n'+nam+' attacks with '+wpn_1
      if(monHp<=0){
         cont(() => {slain(monNum,monster)})
      }
      if(plHp<=0){
         cont()
      }
   }
   but2.onclick = () => {
      if(wpn_2!="Holy Shield" && wpn_2!="Chef Knife"){
         monHp-=atk2
      }
      if(wpn_2=="Holy Shield"){
         monHp-=Number(atk2/2) 
      }
      if(wpn_2=="Cursed Wand" && monster!="Undead Lich" && monster!="Zombie Grunt" && monster!="Mindless Zombie"){
         plHp+=Number(atk2/8)+1
      }
      if(wpn_2=="Holy Shield"){
         plHp+=Number(monAtk*(atk2*0.01))
      }
      if(wpn_2=="Chef Knife"){         
         plHp+=atk2
      }
      if(monHp>0){
         plHp-=monAtk
      }
      hp.textContent = Math.round(plHp)
      monHp = Math.round(monHp)
      text.textContent = "Fighting with...\nMonster: "+monster+'\nHealth: '+monHp+'\n\n'+nam+' attacks with '+wpn_2
      if(monHp<=0){
         cont(() => {slain(monNum,monster)})
      }
      if(plHp<=0){
         cont()
      }
   }
   but3.onclick = () => {
      if(plHp<=0){
         cont()
      }else{
         plHp = Math.round(plHp) + 7
         hp.textContent = plHp
         pts.textContent = Number(pts.textContent) - 1
         if(Number(pts.textContent)<=0){
            but3.disabled = true
         }
      }
      
   }
   if(Number(pts.textContent)<=0){
      but3.disabled = true
   }
   but4.onclick = () => {
      if(plHp<=0){
         cont()
      }else{
         text.textContent = "You ran away scared from a "+ monster
         cont()
      }
   }
}
function slain(monNum,monster){
   if(monNum==1){            //Dragon
      lvl += 3
   }else if(monNum<=6){      //Demon
      lvl += 2
   }else if(monNum<=16){     //Zombie
      lvl += 2
   }else if(monNum<=31){     //Bandit
      lvl += 1
   }else if(monNum<=51){     //Goblin
      lvl += 1
   }else if(monNum==103){    //Clown
      if(lvl>6){lvl += -5}
   }else if(monNum==104){    //Lich
      lvl += 4
   }else if(monNum==105){    //Troll
      lvl += 3
   }else if(monNum==106){    //Spider
      lvl += 1
   }else if(monNum==107){    //Spider Boss
      lvl += 4
   }else{
      lvl +=1
   }
   if(monster=="Cute Slime"){
      text.textContent = "You killed a Cute Slime!!\nYou should be ashamed!!!"
   }else if(monster=="Vicious Dragon"){
      text.textContent = "You killed a Vicious Dragon!!\nYou are henceforth " +nam+ " the mighty!!!"
   }else if(monster=="Studious Priest"){
      text.textContent = "You killed a Priest!!\nYou have been cursed by a Divine being"
      hpPercent(-20)
   }else if(monster=="Unlucky Clown"){
      text.textContent = "I liked that Clown\nHave a bomb"
      hpPercent(-80)
   }else if(monster=="Undead Lich"){
      text.textContent = "You conquered a Necropolis\nYou freed a lot of tortured souls\nYou were blessed"
      hpPercent(10)
   }else if(monster=="Lonely Troll"){
      text.textContent = "You killed a Troll!!\nYou gained passage through the bridge"
   }else{
      text.textContent = monster + " was killed by " + nam +"!!"
   }
   cont()
}
function lich(){
   ran = Math.floor(Math.random()*100)
   text.textContent = 'The ground gives way amd you fall down\n...\nYou wake up and find yourself in a huge dark cave system\n\nTwo tunnels lead out of the cave'
   use(but1,'Go Right')
   use(but2,'Go Left')

   but1.onclick = () => {
      text.textContent = 'You enter another cave'
      if(ran<=50){
         cont(() => {instanceFight(104)})
      }else if(ran<=70){
         text.textContent += '\n\nYou found a weapon\nYou exit the cave using a door at the other end\nYou are finally above ground'
         cont(instanceWpn)
      }else if(ran<=100){
         text.textContent = 'You got some healing potions\nYou exit the cave using a door at the other end\nYou are finally above ground'
         setPOT(Math.floor(Math.random()*3)+1)
         cont()
      }
   }
   but2.onclick = () => {
      text.textContent = 'At the center of the cave you see a Golden chest\nAt the other end of the cave you see a door'
      use(but1,'Open Chest')
      use(but2,'Check for traps and open')
      use(but3,'Run out the door')

      but1.onclick = () => {
         text.textContent = ''
         if(ran%2){
            text.textContent = 'Oh yes, I\'ll open a strange chest on a pedestal,\nin a dark cave, under a graveyard,\nin the middle of nowhere, what could go wrong\nThe trapped chest blows up in your face\n'
            hpPercent(-10)
         }
         if(ran>=50){
            text.textContent += 'You find a aweapon'
            cont(instanceWpn)
         }else{
            text.textContent += 'You found some healing potions'
            setPOT(Math.floor(Math.random()*2)+2)
            cont()
         }
      }
      but2.onclick = () => {
         text.textContent = ''
         if(ran%2){
            text.textContent = 'Stop squinting so much,\nyou still don\'t know how chests are trapped\nYou got sprayed with acid\n'
            hpPercent(-20)
         }
         if(ran>=50){
            text.textContent += 'You find a aweapon'
            cont(instanceWpn)
         }else{
            text.textContent += 'You found some healing potions'
            setPOT(Math.floor(Math.random()*2)+2)
            cont()
         }
      }
      but3.onclick = () => {
         text.textContent = 'In your haste you trip twice and bash your face on the door\nI am embarrassed for you\nYou are finally above ground'
         cont()
      }
   }
}
function clown(){
   text.textContent = 'You come across a sad Clown'
   use(but1,'Talk to the Clown')
   use(but2,'Attack the Clown')
   use(but3,'Ignore the Clown')

   ran = Math.floor(Math.random()*100)

   but1.onclick = () => {
      if(ran<=25){
         text.textContent = "Noticing how polite you are the Clown gives you a Weapon"
         cont(instanceWpn)
      }else if(ran<=50){
         text.textContent = "Seeing how unfashionable and rugged you look\nthe Clown gives you some healing potions"
         setPOT(3)
         cont()
      }else if(ran<=70){
         text.textContent = "You spooked the Clown\nThe Clown hops away screaming"
         cont(advice)
      }else if(ran<=80){
         text.textContent = "The Clown finds you rude\nYou are attacked by the Clown"
         cont(() => {instanceFight(103)})      
      }else if(ran<=100){
         text.textContent = "You irritated the Clown with your presence\nThe Clown throws dirt in your eyes and hops away screaming"
         cont(advice)
      }
   }
   but2.onclick = () => {
      if(ran<=2){
         text.textContent = "You tried to hurt my Clown\nSo brave of you, have a calamity"
         hpPercent(-50)
         cont()
      }else if(ran<=20){
         text.textContent = "Annoyed, the Clown runs away shouting"
         cont(advice)
      }else if(ran<=100){
         text.textContent = "You attacked a Clown"
         cont(() => {instanceFight(103)})
      }
   }
   but3.onclick = () => {
      text.textContent = 'The clown shouts out as you walk away'
      cont(advice)
   }
}
function instanceGraveyard(){
   text.textContent = 'You come across a creepy graveyard'
   use(but1,'Leave the creepy Graveyard')
   use(but2,'Loot the graves')
   use(but3,'Pay respect to the dead')

   but1.onclick = () => {
      text.textContent = 'You hear a voice and turn around'
      use(but1,'Run away')
      use(but2,'Investigate the source of the noise')
      use(but3,'Do nothing')

      but1.onclick = () => {
         text.textContent = 'Don\'t be ashamed I would have done the same'
         cont()
      }
      but2.onclick = () => {
         text.textContent = 'You walk towards a grave'
         cont(lich)
      }
      but3.onclick = () => {
         text.textContent = 'You hear no more noises\nYou walk away cautiously'
         cont()
      }
   }
   but2.onclick = () => {
      text.textContent = 'You walk towards a grave'
      cont(lich)
   }
   but3.onclick = () => {
      text.textContent = 'You walk towards a grave to pay your respects'
      cont(lich)
   }
}

function instanceForrest(){
   text.textContent = 'You enter a dark forrest\nYou hear the clattering of claws'
   use(but1,'Burn down the Forrest')
   use(but2,'Find the source of the noises')
   use(but3,'Leave the forrest')

   but1.onclick = () => {
      text.textContent = 'You have trouble breathing through all the smoke'
      use(but1, 'Continue into the forrest')
      use(but2, 'Run away from the forrest')
      but3.style.visibility = 'hidden'

      but1.onclick = () => {
         text.textContent = 'Due to the smoke you got suffocated'
         hpPercent(-99)
         cont()
      }
      but2.onclick = () => {
         text.textContent = 'You left the forrest before you got suffocated'
         hpPercent(-50)
         cont()
      }
   }
   but2.onclick = () => {
      text.textContent = 'You found the source of the voices,\nit\'s a huge web of Spiders'
      cont(() => {instanceFight(107)})
   }
   but3.onclick = () => {
      text.textContent = 'You leave the forrest feeling relieved'
      cont()
   }
}
function instanceTemple(){
   text.textContent = 'You come across an abandoned temple'
   use(but1,'Pray at the Altar')
   use(but2,'Loot the Temple')
   use(but3,'Ignore the temple')

   but1.onclick = () => { 
      text.textContent = 'You prayed at the Altar'
      if(Math.floor(Math.random()*2)){
         text.textContent += '\nYou were blessed!' 
         hpPercent(10)
         cont()
      }else{
         text.textContent += '\nFeeling a lot better, you left the Temple behind'
         cont()
      }
   }
   but2.onclick = () => { 
      ran = Math.floor(Math.random()*100)
      if(ran<=15){
         text.textContent = "You found a Weapon"
         cont(instanceWpn)
      }else if(ran<=50){
         text.textContent = "You found some Healing Potions"
         setPOT(Number((ran-10)/5))
         cont()
      }else if(ran<=65){
         text.textContent = "You desecrated a Temple, Divine retribution was taken"
         hpPercent(-ran+35)
         cont()
      }else if(ran<=85){
         text.textContent = "You were approached by a Priest"
         cont(() => {instanceFight(102)})
      }else if(ran<=100){
         text.textContent = "You found nothing"
         cont()
      }
   }
   but3.onclick = () => { 
      text.textContent = "You return to your Journey"
      cont()
   }
}
function instanceBridge(){
   text.textContent = "You find a Troll blocking the bridge over the river"
   use(but1,'Speak about your sad love life')
   use(but2,'Attack the Troll')
   use(but3,'Cross the river somewhere else')

   but1.onclick = () => {
      text.textContent = 'The troll makes growling noises as you speak your tale'
      if(Math.floor(Math.random()*2)){
         text.textContent += '\nReminded of a lost love the Troll gets sad and lets you go'
         cont()
      }else{
         text.textContent += '\nThe troll feels sorry for you and gives you some\nHealing potions and a Weapon'
         setPOT(3)
         cont(instanceWpn)
      }

   }
   but2.onclick = () => {
      cont(() => {instanceFight(105)})
   }
   but3.onclick = () => {
      text.textContent = 'You find another crossing and cross the river'
      cont()
   }
}

function instanceDivineBeing(){
   text.textContent = "You feel the hair at the back of your neck stand up\nYou come across a Disfigured Woman"
   use(but1,'Start Speaking')
   use(but2,'Try to kill the woman')
   use(but3,'Run away')
   
   but1.onclick = () => {
      text.textContent = "You start speaking and feel the air vanish from your lungs\nYou wake up and find yourself on the side of the road"
      cont()
   }
   but2.onclick = () => {
      text.textContent = 'As you ready your weapon you feel your blood growimg thick\n.....'
      hpPercent(-99)
      cont()
   }
   but3.onclick = () => {
      text.textContent = "As you run you hear the wailing of a mother for her Child\nYou trip thrice as you run away"
      hpPercent(-3)
      cont()
   }
}
function instanceRuins(){
   text.textContent = "You come across an old Ruin"
   use(but1,'Search the Ruin')
   use(but2,'Destroy the Ruin')
   use(but3,'Ignore the Ruin')

   ran = Math.floor(Math.random()*100)   
   but1.onclick = () =>{
      if(ran<=35){
         text.textContent = "You found a Weapon"
         cont(instanceWpn)
      }else if(ran<=69){
         text.textContent = "You found some Healing Potions"
         setPOT(Number((ran-30)/5))
         cont()
      }else if(ran<=100){
         text.textContent = "You found nothing"
         cont()
      }
   }
   but2.onclick = () => {
      if(ran<=20){
         text.textContent = "You found some Healing Potions\n\nYou found a Weapon"
         setPOT(Number((ran+5)/5))
         cont(instanceWpn)
      }else if(ran<=45){
         text.textContent = "You come across a Monster"
         cont(()=>{instanceFight()})
      }else if(ran<=70){
         text.textContent = "You triggered an Ancient Curse"
         hpPercent(-25)
         cont()
      }else if(ran<=100){
         text.textContent = "You found nothing"
         cont()
      }
   }
   but3.onclick = () =>{
      text.textContent = "You return to your Journey"
      cont()
   }
}
            

function traveler(){
   text.textContent = "You come across an unconsious Traveler\non the side of the road"
   use(but1,'Help the Traveler')
   use(but2,'Kill the Traveler')
   use(but3,'Ignore the Traveler')

   but1.onclick = () => {
      if(Number(pts.textContent)<=0){
         but1.disabled = true
      }else{
         setPOT(-1)
         let ran = Math.floor(Math.random()*10)
         if(ran%2==1 && ran<=5){
            text.textContent = "Feeling grateful the Traveler gives you a Weapon"
            cont(instanceWpn)
         }else if(ran>5){
            text.textContent = "The Traveler turned out to be a Bandit"
            cont(() => {instanceFight(31)})
         }else if(ran<=5){
            text.textContent = "The Traveler asks for your help to reach an Inn"
            use(but1,'Help')
            use(but2,'Decline')
            but3.style.visibility = 'hidden'

            but1.onclick = () => {
               text.textContent = "You reach the Inn safely\nFeeling grateful the Traveler gives you a Weapon"
               cont(instanceWpn)  
            }
            but2.onclick = () => {
               text.textContent = "You continue on your Journey"
               cont()
            }
         }
      }
   }
   if(Number(pts.textContent)<=0){
      but1.disabled = true
   }
   but2.onclick = () => {
      text.textContent = "You killed the Traveler and gained a Weapon"
      cont(() => {wpnChange('Scythe')})
   }
   but3.onclick = () => {
      text.textContent = "You left the helpless Traveler \non the side of the road\n\nHumanity at it's peak"
      cont()
   }
}
       
function raven(){
   text.textContent = "You come across a Majestic Raven"
   use(but1,'Try talking to the Raven')
   use(but2,'Kill the Raven')
   use(but3,'Adopt the Raven')
   
   but1.onclick = () => {
      text.textContent = "The Raven keeps reapeating the same sentence"
      cont(advice)
   }
   but2.onclick = () => {
      text.textContent = "You kill the Raven and go on your way"
      cont()
   }
   but3.onclick = () => {
      text.textContent = "As you try to pet the Raven it flies away\nYou follow and come across a Weapon"
      cont(instanceWpn)
   }
}
function child(){
   text.textContent = "You come across a starving Child"
   use(but1,'Help the Child')
   use(but2,'Kill the Child')
   use(but3,'Ignore the Child')

   if(Number(pts.textContent)<=0){
      but1.disabled = true
   }else{
      but1.onclick = () =>{
         setPOT(-1)
         text.textContent = "You try your best to heal the child\nThe Child passes away after a few days"
         cont()
      }
   }
   but2.onclick = () => {
      text.textContent = "You give the Child a peaceful death\nThe Child's expression exudes tranquility"
      cont()
   }
   but3.onclick = () => {
      text.textContent = "The Child starts wheezing as you continue on your way"
      cont()
   }
}
function kindLady(){
   text.textContent= 'You come across an old lady tending to her flowers'
   use(but1,'Talk to her')
   use(but2,'Go away')

   but1.onclick = () => {
      text.textContent = 'The Lady starts talking about her life\nYou listen to her talk for hours\nFeeling better and happy for some unknown\nreason you continue on your way'
      hpPercent(20)
      cont()
   }
   but2.onclick = () => {
      text.textContent = 'You continue on your Journey'
      cont()
   }    
}
function oldMonk(){
   text.textContent = 'You come across a peaceful monk meditating'
   use(but1,'Talk to him')
   use(but2,'Go away')
   
   but1.onclick = () => {
      text.textContent = 'The Monk starts telling you a story\n   \"Once upon a time there was a fox......\"\nFeeling better and happy for some unknown \nreason you continue on your way'
      hpPercent(20)
      cont()
   }
   but2.onclick = () => {
      text.textContent = 'You continue on your Journey'
      cont()
   }
         
}
function instanceWpn(){
   let weapon = Math.floor(Math.random()*100)
   if(weapon==0){      
      wpnChange("Holy Shield")
   }else if(weapon==1){    
      wpnChange("Cursed Wand")
   }else if(weapon<=4){    
      wpnChange("Chef Knife")
   }else if(weapon<=9){   
      wpnChange("Sword")
   }else if(weapon<=19){   
      wpnChange("Scythe")
   }else if(weapon<=29){  
      wpnChange("Hammer")
   }else if(weapon<=39){  
      wpnChange("Spear")
   }else if(weapon<=49){ 
      wpnChange("Trident")
   }else if(weapon<=59){ 
      wpnChange("Axe")
   }else if(weapon<=69){ 
      wpnChange("Stick")
   }else if(weapon<=79){
      wpnChange("Stone")
   }else if(weapon<=89){   
      wpnChange("Dagger")
   }else if(weapon<=99){ 
      wpnChange("Mace")
   }
}
function wpnChange(key){
   text.textContent = 'Would you like to equip a '+key+'?'
   use(but1,'Equip in slot 1')
   use(but2,'Equip in slot 2')
   use(but3,'Discard')

   but1.onclick = () => {
      let temp = atk1
      atk1 = Math.floor(Math.random()*14) - 7 + inv[key] + lvl
      if(atk1>0 && lvl>11 && key=="Chef Knife"){
         atk1=lvl-10
      }else if(key=="Holy Shield"){
         atk1=Number(lvl/2)
      }
      if(atk1<=0){
         atk1=temp
         text.textContent = key + " crumbled in your hands"
      }else{
         text.textContent = 'You discarded '+ wpn1.textContent + '\nYou equipped ' + key
         wpn1.textContent = key
      }
      cont()
   }
   but2.onclick = () => {
      let temp = atk2
      atk2 = Math.floor(Math.random()*14) - 5 + inv[key] + lvl
      if(atk2>0 && lvl>11 && key=="Chef Knife"){
         atk2=lvl-10
      }else if(key=="Holy Shield"){
         atk2=Number(lvl/2)
      }
      if(atk2<=0){
         atk2=temp
         text.textContent = key + " crumbled in your hands"
      }else{
         text.textContent = 'You discarded '+ wpn2.textContent + '\nYou equipped ' + key
         wpn2.textContent = key
      }
      cont()
   }
   but3.onclick = () => {
      text.textContent = 'You threw ' + key + ' away'
      cont()
   }
}
function mysteriousWoman(){
   text.textContent = 'A Mysterious Woman approaches you\n\n  \"Young Child I have the world on a leash around my finger\n   You show promise, ask and you shall recieve\"'
   use(but1,'Ask for weapons')
   use(but2,'Ask for healing potions')
   use(but3,'Ask for Advice')
   use(but4,'Tell her to go away')

   but1.onclick = ()=> {
      text.textContent = 'The Mysterious Woman gave you a Weapon'
      cont(instanceWpn)
      setHP(10)
   }
   but2.onclick = ()=> {
      text.textContent = 'The Mysterious Woman gave you some Health Potions\n\nWeirded by the encounter, you leave in the morning'
      setPOT(Math.floor(Math.random()*3) + 1)
      cont()
      setHP(10)
   }
   but3.onclick = ()=> {
      advice(Math.floor(Math.random()*100))
      setHP(15)
   }
   but4.onclick = ()=> {
      text.textContent = 'She says:\n\n  \"You certainly are a brave soul\n  I hope fate brings us together again\"\n\nWeirded by the encounter, you leave in the morning'
      cont()
      setHP(13)
   }
}
function Inn(){
   text.textContent = "You enter an Inn"
   use(but1,'Rest in a comfy bed')
   use(but2,'Eat food')
   use(but3,'Leave the Inn')

   but1.onclick = () => {
      text.textContent = 'You get a good night\'s sleep and return to your Journey'
      setHP(20)
      cont()
   }
   but2.onclick = () => {
      ran = Math.floor(Math.random()*100)
      if(ran <= 50){
         mysteriousWoman()
      }else if(ran<=55){
         setHP(-5)
         text.textContent = 'You get diarrhea due to bad food\n\nYou leave troubled in the morning'
         cont()
      }else{
         setHP(30)
         text.textContent = 'You eat peacefully and go to sleep\n\nYou set out in the morning'
         cont()
      }
   }
   but3.onclick = () => { 
      text.textContent = 'You return to your Journey'
      cont()
   }
}

function advice(){
   let num = Math.floor(Math.random()*103) 
   if(num === 1){
      text.textContent= "Sometimes I meet people and feel bad for their future kids"
   }else if(num === 2){
      text.textContent= "Shut your mouth when you are talking\nthe moods of the people around you will improve"
   }else if(num === 3){
      text.textContent= "I'll try being nicer, if you try being smarter" 
   }else if(num === 4){
      text.textContent= "If you find me offensive,\nthen I suggest you quit finding me"
   }else if(num === 5){
      text.textContent= "Sarcasm is the body\'s natural defense against stupidity"
   }else if(num === 6){
      text.textContent= "My imaginary friend says that you need a therapist"
   }else if(num === 7){
      text.textContent= "I don't have the energy to pretend to like you today"
   }else if(num === 8){
      text.textContent= "The stuff you heard about me is a lie!! I am way worse"
   }else if(num === 9){
      text.textContent= "At least your mom thinks you are pretty"
   }else if(num === 10){
      text.textContent= "I love sarcasm, it'\s like punching pepole with words"
   }else if(num === 11){
      text.textContent= "Life\'s good, you should get one"
   }else if(num === 12){
      text.textContent= "Talent is a crutch often over estimated"
   }else if(num === 13){
      text.textContent= "Marriage is the chief cause of divorce"
   }else if(num === 14){
      text.textContent= "Zombies eat brains, you are safe!" 
   }else if(num === 15){
      text.textContent= "This too will pass\nI just need to be dramatic first"
   }else if(num === 16){
      text.textContent= "I won't lead you to temptation\nYou already know the way"
   }else if(num === 17){
      text.textContent= "You'd be in good shape if you ran as much as your mouth" 
   }else if(num === 18){
      text.textContent= "Love: Because your bad day doesn't need to end at work"
   }else if(num === 19){
      text.textContent= "You are everything I want in someone\nthat i don't want anymore" 
   }else if(num === 20){
      text.textContent= "Do not have a nice day, have the day you deserve"
   }else if(num === 21){
      text.textContent= "If you can't fall asleep, overthink yourself into a coma works for me" 
   }else if(num === 22){
      text.textContent= "If someone tells you they are intimidated by you,\nstare at them until they apologize" 
   }else if(num === 23){
      text.textContent= "Friendships must be built on a solid foundation of \nsarcasm, inappropriateness and shenanigans" 
   }else if(num === 24){
      text.textContent= "Apparently, when asked what you look for in a relationship\na way out isn't the right answer" 
   }else if(num === 25){
      text.textContent= "Faulty principles inccur faulty results"
   }else if(num === 26){
      text.textContent= "Gratitude is the fools weapon"
   }else if(num === 27){
      text.textContent= "Time flows the faster you enjoy it"
   }else if(num === 28){
      text.textContent= "Existence is involuntary, action is not"
   }else if(num === 29){
      text.textContent= "Self worth is often an unjust perception"
   }else if(num === 30){
      text.textContent= "If you feel like someone is insulting you, they're just describing you!" 
   }else if(num === 31){
      text.textContent= "An empty can makes the loudest noise"
   }else if(num === 32){
      text.textContent= "Food is the way to the heart"
   }else if(num === 33){
      text.textContent= "A house is not a home"
   }else if(num === 34){
      text.textContent= "I am human and I regret it"
   }else if(num === 35){
      text.textContent= "A bird shows it\'s true majesty out of the cage"
   }else if(num === 36){
      text.textContent= "The world needs geniuses with humility but there are so few of us left"
   }else if(num === 37){
      text.textContent= "Insanity is contagious, you get it from the people around you"
   }else if(num === 38){
      text.textContent= "Expecting fair treatment because you are good,\nis like expecting to not be attacked \nby a lion just because you are a vegetarian"
   }else if(num === 39){
      text.textContent= "Originality is the fine art of remembering\n what you hear but forgetting where you heard it" 
   }else if(num === 40){
      text.textContent= "People who think they know everything\nare an annoyance to those of us who do" 
   }else if(num === 41){
      text.textContent= "Today is the tomorrow you worried about yesterday"
   }else if(num === 42){
      text.textContent= "I don't believe in astrology, \nI'm a Sagittarius and we're skeptical" 
   }else if(num === 43){
      text.textContent= "It's okay to disagree with people,\nno one can force you to be right"
   }else if(num === 44){
      text.textContent= "When life gives you lemons, squeeze them into people's eyes" 
   }else if(num === 45){
      text.textContent= "Hating people for doing something\nyou are too lazy to do is a different kind of fun" 
   }else if(num === 46){
      text.textContent= "Trying is the first step towards failure"
   }else if(num === 47){
      text.textContent= "Silence is Golden, Murder is Illegal" 
   }else if(num === 48){
      text.textContent=  "Stop thinking before you speak and watch as your life get\'s interesting" 
   }else if(num === 49){
      text.textContent=  "If you are an assasin, call me!"
   }else if(num === 50){
      text.textContent= "To call you stupid would be an insult to stupid people"
   }else if(num === 51){
      text.textContent= "A day without sunshine is the night"
   }else if(num === 52){
      text.textContent= "I never forget a face but in your case I\'ll be glad to make an exception" 
   }else if(num === 53){
      text.textContent= "The most common reason for someone being crazy\nis because the other person is stupid" 
   }else if(num === 54){
      text.textContent= "I\'m not good at the advice. \nCan I interst you in a sarcastic comment?" 
   }else if(num === 55){
      text.textContent= "The only difference between you and animals is that you think you are superior" 
   }else if(num === 56){
      text.textContent=  "A little patience will engage you for a long while"
   }else if(num === 57){
      text.textContent= "Common sense is common, but it's definition is not"
   }else if(num === 58){
      text.textContent= "Moments are meant to be experienced, not captured"
   }else if(num === 59){
      text.textContent= "Your purpose in life is to serve as a cautionary tale to others" 
   }else if(num === 60){
      text.textContent= "Time is the best teacher, unfortunately it kills all it's students" 
   }else if(num === 61){
      text.textContent= "Don't be lazy, Be on energy saving mode"
   }else if(num === 62){
      text.textContent= "Be happy, it drives people crazy"
   }else if(num === 63){
      text.textContent= "Patience is cultivated when you have many witnesses"
   }else if(num === 64){
      text.textContent= "Tuesday is Monday's ugly sibling"
   }else if(num === 65){
      text.textContent= "Life is short, smile while you still have teeth"
   }else if(num === 66){
      text.textContent= "Stop marinating yourself in perfume"
   }else if(num === 67){
      text.textContent= "Sorry...to have met you"
   }else if(num === 68){
      text.textContent= "You are annoying, fix that"
   }else if(num === 69){
      text.textContent= "Rock bottom has a basement"
   }else if(num === 70){
      text.textContent= "If you understand your parents, then you have grown up"
   }else if(num === 71){
      text.textContent= "The truth hurts"
   }else if(num === 72){
      text.textContent= "You get better as you age, unless you are a banana"
   }else if(num === 73){
      text.textContent= "One and one doesn't always make eleven"
   }else if(num === 74){
      text.textContent= "If life gives you lemonade, grow lemons"
   }else if(num === 75){
      text.textContent= "When you can't decide always go right"
   }else if(num === 76){
      text.textContent= "Eat healthy and drink a lot of water!"
   }else if(num === 77){
      text.textContent= "It's easy to drink Health Potion's while evading a Monster Attack"
   }else if(num === 78){
      text.textContent= "Romance is the offspring of fiction and love"
   }else if(num === 79){
      text.textContent= "All the good ones are taken"
   }else if(num === 80){
      text.textContent= "If you want to kill yourself\nclimb your ego, and jump to your IQ" 
   }else if(num === 81){
      text.textContent= "Left alone, things tend to go from bad to worse"
   }else if(num === 82){
      text.textContent= "Everyone seems normal until you get to know them"
   }else if(num === 83){
      text.textContent= "I don't believe in plastic surgery\nbut in your case, go ahead" 
   }else if(num === 84){
      text.textContent= "Life is full of disappointment's\ntry not to be one of them" 
   }else if(num === 85){
      text.textContent= "Stop being a hot mess\nInstead be a spicy disaster"
   }else if(num === 86){
      text.textContent= "What doesn't kill you will make you wish it did"
   }else if(num === 87){
      text.textContent= "You never get more than you can handle"
   }else if(num === 88){
      text.textContent= "Don't run uncertified applications on your computer"
   }else if(num === 89){
      text.textContent= "Do enough evil and you  might just get cursed"
   }else if(num === 90){
      text.textContent= "The Best Holy Shield's only provide 50 percent defence"
   }else if(num === 91){
      text.textContent= "It is important to master the epic items with special attributes"
   }else if(num === 92){
      text.textContent= "High health doesn't always mean high defence"
   }else if(num === 93){
      text.textContent= "It is considered bad luck to kill a Harmless Slime"
   }else if(num === 94){
      text.textContent= "Always remember you are unique\njust like everyone else"
   }else if(num === 95){
      text.textContent= "A half truth is a whole lie"
   }else if(num === 96){
      text.textContent= "Nobody cares if you are miserable\nyou might as well be happy"
   }else if(num === 97){
      text.textContent= "There is a rumour about a Vicious Dragon roaming these lands"
   }else if(num === 98){
      text.textContent= "Be good and good will be done unto you"
   }else if(num === 99){
      text.textContent= "Cursed objects always drain life" 
   }else if(num === 0){
      text.textContent= "Never kill with cutlery"
   }else if(num=== 100){
      text.textContent= 'Chef Knife\'s don\'t deal damage they only heal'
   }else if(num=== 101){
      text.textContent= 'Cursed Wand\'s drain health from living creatures'
   }else if(num=== 102){
      text.textContent= 'If you ever see a Dragon,\nrun in the other direction'
   }
   cont()
}