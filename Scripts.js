
let Mass_Color = ["rgb(255, 68, 68)","rgb(170, 102, 204)","rgb(153, 204, 0)","rgb(255, 187, 51)","rgb(51, 181, 229)"];
let ColorRec = "";
let StartId = "";
let LVL = 1;
let CountLVL = 0;
let Mass_UP_NEXT = [];
let Score = 0;
let Combo = 0;

let Mass_Rec = [
    ["Rec1","Rec2","Rec3","Rec4","Rec5","Rec6","Rec7"],
    ["Rec8","Rec9","Rec10","Rec11","Rec12","Rec13","Rec14"],
    ["Rec15","Rec16","Rec17","Rec18","Rec19","Rec20","Rec21"],
    ["Rec22","Rec23","Rec24","Rec25","Rec26","Rec27","Rec28"],
    ["Rec29","Rec30","Rec31","Rec32","Rec33","Rec34","Rec35"],
    ["Rec36","Rec37","Rec38","Rec39","Rec40","Rec41","Rec42"],
    ["Rec43","Rec44","Rec45","Rec46","Rec47","Rec48","Rec49"],
]

$(".Rec").mouseenter(function(){
    if($(this).css("background-color") != "rgb(224, 224, 224)"){
        $(this).css(
            'box-shadow', `0px 0px 0px 2px ${$(this).css('background-color')}`,
        );
    }
});

$(".Rec").mouseleave(function(){
    if($(this).css("background-color") != "rgb(224, 224, 224)"){
        $(this).css(
            'box-shadow', `0px 0px 0px 2px rgb(255, 255, 255)`
        );
    }
});
   
$(".Rec").click(function() {
    if($(this).css("background-color") != "rgb(224, 224, 224)"){
        ColorRec = $(this).css("background-color");
        StartId = $(this).attr('id');
    }if($(this).css("background-color") == "rgb(224, 224, 224)" && StartId != ''){
        $(this).css("background-color", ColorRec);
        $(`#${StartId}`).css("background-color", "rgb(224, 224, 224)");
        StartId = '';
        FindSeries($(this).attr('id'), ColorRec)
    }   
})

function FindSeries(id, color){

    let axis1 = [];
    let axis2 = [];
    let diagonal1 = [];
    let diagonal2 = []; 
    let kill = [];

    let CenterColor = color; 

    let center = id.split('').slice(3).join('');

    //--------------------------------------------axis1---------------------------------------------
    let start;
    let end; 
    if(center % 7 == 0){
        start = center - 6;
        end = center;
    }else{
        start = center - (center % 7 - 1);
        end = center - (center % 7 - 1) + 6;
    }
    
    //Поиск элементов
    for(let i = start; i <= end; i++){ 
        if($(`#Rec${i}`).css("background-color") == CenterColor || i == center)
        axis1.push(`#Rec${i}`)
    }
    if(axis1.length >= 4){

        if(axis1[1].split('').slice(4).join('') - axis1[0].split('').slice(4).join('') > 1){
            axis1.shift();
        }
        if(axis1[axis1.length - 1].split('').slice(4).join('') - axis1[axis1.length - 2].split('').slice(4).join('') > 1){
            axis1.pop();
        }

        axis1.map(item => kill.push(item));
    }
    
    console.log(kill); 
    
    //if(axis1.length >= 4 && )
    
    //--------------------------------------------axis2----------------------------------------------

    if(center % 7 == 0){
        start = 7;
        end = 49;
    }else{
        start = Math.ceil(center % 7);
        end = Math.ceil(center % 7) + 42;
    }
    console.log(start);
    console.log(end)

    //--------------------------------------------result---------------------------------------------

    if(kill.length >= 4){
        Score += kill.length * 20 * (Combo + 1);
        $('#Score_Text').html(Score);
        Combo++;
        $('#Combo_Text').html(`${Combo}x`);
        kill.map(item => $(item).css('background-color','rgb(224, 224, 224)'));
    }else{
        Combo = 0;
        $('#Combo_Text').html(`${Combo}x`);
        GenerationLVL();
    }
        
}

function GenerationLVL(){
    let RandomColor;
    let RandomRec;
    let i = 0;

    while(i < 2 + LVL){

        RandomRec = Math.floor(Math.random() * (48 - 0 + 1)) + 0;
        RandomColor = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        
        if($(`#Rec${RandomRec}`).css("background-color") == "rgb(224, 224, 224)" ){
            if(CountLVL > 0){
                $(`#Rec${RandomRec}`).css("background-color", Mass_UP_NEXT[i]);
            }
            else{
                $(`#Rec${RandomRec}`).css("background-color", Mass_Color[RandomColor]);
            }
            
            i++;
        }
    }

    i = 1;
    CountLVL++;

    while(i < 2 + LVL){
        RandomColor = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
        Mass_UP_NEXT[i] = Mass_Color[RandomColor];
        $(`#UP_NEXT_Rec${i}`).css("background-color", Mass_UP_NEXT[i]);
        i++;
    }

    $("#NEXT_LEVEL").html(`${40 - CountLVL} LINES TO NEXT LEVEL`);
    $('#Line').css('width', 11.275 + parseInt($('#Line').css('width')));

    if(CountLVL == 40){
        CountLVL = 0;
        LVL++;
        $('#Line').css('width',0);
        $("#LVL_Text").html(`LEVEL ${LVL}`);
    }
}

GenerationLVL()
