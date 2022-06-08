let password = 'forglot';
let input = document.getElementById('input');
let inputVal = input.value;
let translateButton = document.getElementById('translate-btn');
let output = document.getElementById('txt');
let div = document.getElementById('output');
let english = document.getElementById('eng')
let bro = document.getElementById('bro')
let selectLan = document.getElementById('select-lan')
let languages = document.getElementById('languages')






let man = '+ nmd c`x he t sq`mrk`sd sghr sg`s ld`mr h ehmhrgdc sgd oqnidbs nq tq sqxhmf sn ad rl`qs'


function toBro(str){

    const translate = (str1) =>
        str1
            .split('')
            .map(title1 =>
                title1.charCodeAt(0) == 32 || title1.charCodeAt(0) == 43 ?
                    title1 = ' ' : String.fromCharCode(title1.charCodeAt(0) - 1))
            .join('')

    output.innerText = translate(str)
    div.appendChild(output)
    console.log(output.innerText)
    
    console.log(translate(str))
}

function toEnglish(str){
    let translate = (str2) => 
        str2 
            .split('')
            .map(title =>
                title.charCodeAt(0) == 32 || title.charCodeAt(0) == 43 ?
                    title = ' ' : String.fromCharCode(title.charCodeAt(0) + 1))
            .join('')
            
            output.innerText = translate(str)
            div.appendChild(output)
            console.log(output.innerText)
    // translateIt()
    // let spl = str.split('')
    // let mp = spl.map(title => 
    //     title.charCodeAt(0) == 32 || title.charCodeAt(0) == 43 ? 
    //     title = ' ' : String.fromCharCode(title.charCodeAt(0)+ 1))
    // let joi = mp.join('')
    // console.log(joi)
}

function translateIt(){
    if (languages.value === english.value){
        
        toEnglish(input.value)
    } else if (languages.value === bro.value){
        toBro(input.value)
    } else{
        alert('enter value')
    }

    console.log(languages.value)
}



// toBro(man)





// create two functions that convert english to bro and vice versa
// accept text values from user on input place 
// check if the language is english or bro
// display the correct translation on output 