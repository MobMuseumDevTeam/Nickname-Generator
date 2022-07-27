/*
    1: Back button 
    2: swip on phones 
    3: count steps and get what step is active so we can remove the need for numbering things 
*/
const questMainWrap = document.querySelector(".TMMNicknameGenerator")
const questAction = questMainWrap.querySelectorAll('[role="questTheAction"]')
const questTheQuestion = Array.from(questMainWrap.querySelectorAll('[role="questMobQuestion"]'))
const questTheQuestionAmount = questTheQuestion.length
const questBackBtn = document.querySelector('[role="questBackButton"]')
const questDots = document.querySelector('[role="questDotsWrap"]')
const questGenNickname = document.querySelector('[role="generateNickname"]')
const questGenNicknameButton = document.querySelector('[role="generateNicknameButton"]')
const questTheMobResults = document.querySelector('[role="questMobResults"]')
const questTakeQuizAgain = document.querySelector('[role="takeQuizAgain"]')
const questResultsSubInfo = document.querySelector('[role="ResultsSubInfo"]')
const questTMMNGFormWrap = document.querySelector('[role="TMMNGFormWrap"]')
const fillfirstName = document.querySelector('[data-fill="firstName"]')
const filllastName = document.querySelector('[data-fill="lastName"]')


// if (window.location.href.indexOf("?r=load") != -1){}else{}
// Pad Leading Zero
function padLeadingZeros(num, size) {
    var s = num + ""
    while (s.length < size) s = "0" + s
    return s
}
// 

theNicknamesResults = []

// Get random name 
function getRandomNickname(randomNicknameObj) {
    const keys = Object.keys(randomNicknameObj)
    return keys[Math.floor(Math.random() * keys.length)]
}
//   Fill name 
function generateTheName() {
    const theFinalNickname = getRandomNickname(theNicknamesResults)
    document.getElementById("mobName").innerHTML = theNicknamesResults[theFinalNickname][0]
    NGLoadMobName = theNicknamesResults[theFinalNickname][0]
    // console.log(NGLoadMobName)
}

// Add Dots +++
function buildTheDotsNG() {
    questDots.innerHTML = ""
    var questTheQuestionActive = document.querySelector(".NicknameGeneratorItemActive")
    questTheQuestionActiveGST = questTheQuestionActive.dataset.question

    for (let i = 0; i < questTheQuestionAmount; i++) {
        const makeTMMNGdot = document.createElement('b')
        hightLightDots = padLeadingZeros(i + 1, 2)
        if (questTheQuestionActiveGST > hightLightDots) {
            makeTMMNGdot.className = "TMMNGdot TMMNGdotDone"
        } else if (questTheQuestionActiveGST == hightLightDots) {
            makeTMMNGdot.className = "TMMNGdot TMMNGdotActive"
        } else {
            makeTMMNGdot.className = "TMMNGdot"
        }
        questDots.append(makeTMMNGdot)
    }
}
buildTheDotsNG()
// When to show/hide the dots & generate button 
function SHButtonsAndGenerateNickname() {
    const questTheQuestionActive = document.querySelector(".NicknameGeneratorItemActive")
    questTheQuestionActiveGST = questTheQuestionActive.dataset.question

    if (questTheQuestionActiveGST < questTheQuestionAmount) {
        questDots.hidden = false
        questGenNickname.hidden = true
    } else {
        questDots.hidden = true
        questGenNickname.hidden = false
    }
}
SHButtonsAndGenerateNickname()

function genNicknameGenerateVariables() {

    genNicknameAnswers('input[name="question1"]','question1') 
    genNicknameAnswers('input[name="question3"]','question3')
    genNicknameAnswers('input[name="question5"]','question5') 
 
    allTheNicknames.forEach((allTheNickname) => {
    if (
        (allTheNickname[2] == question3selectedValue) &
        (allTheNickname[1] == question1selectedValue || allTheNickname[1] == "all")
    ) {
        theNicknamesResults.push(allTheNickname);
    }
    });
    /*
        Fill all data 
    */ 
 
    const allData = nicknameGeneratorData.filter(
        (role) => role.gender === question1selectedValue && role.role === question5selectedValue
    );
   
   let theFinalData = allData[0]

   document.getElementById("fillOccupation").innerHTML = theFinalData.occupation
   document.getElementById("fillCrime").innerHTML = theFinalData.racket
   document.getElementById("fillIdol").innerHTML = theFinalData.idol
   document.getElementById("fillDescription").innerHTML = theFinalData.description
   document.getElementById("NNGRImage").src = theFinalData.img
   document.getElementById("NNGRImageWrap").src = theFinalData.img
}
// 
function genNicknameAnswers(ngRadioInputAnswer, p2) {
     const radioButtons = document.querySelectorAll(ngRadioInputAnswer)

    let selectedTheID;
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedValue = radioButton.value
            selectedID = radioButton.id
            window [p2+'selectedTheID'] = selectedID
            window [p2+'selectedValue'] = selectedValue
            break;
        }
    }
}

 
// 
function genNicknameOnSubmit() {
    genNicknameGenerateVariables() 
    const inputfirstName = document.querySelector('input[name="firstName"]').value
    const inputlastName = document.querySelector('input[name="lastName"]').value
    fillfirstName.innerHTML = inputfirstName
    filllastName.innerHTML = inputlastName
    
    if (window.location.href.indexOf("?r=load") != -1){}else{
        generateTheName();
        genNicknameAfterSubmit()   
    }
   
}

function genNicknameAfterSubmit() {
    const inputfirstName = document.querySelector('input[name="firstName"]').value
    const inputlastName = document.querySelector('input[name="lastName"]').value
    // @james @here ---- Confirm vars working 

    // Questions that matter 
    console.log("- - - - - - - - - - - - - -  - - - - ")
    console.log("Question: " + question1selectedTheID)
    console.log("Question: " + question3selectedTheID)
    console.log("Question: " + question5selectedTheID)
    console.log("- - - - - - - - - - - - - -  - - - - ")
    console.log("Mob Name: " + NGLoadMobName)
    console.log("First Name: " + inputfirstName)
    console.log("Last Name: " + inputlastName)
    console.log("- - - - - - - - - - - - - -  - - - - ")
    // script.js:141 Mob Name: Eagle Eye
    // script.js:143 Question: q01a01
    // script.js:144 Question: q03a01
    // script.js:145 Question: q05a02
    // script.js:147 First Name: James
    // script.js:148 Last Name: Riter
    // Add data to url
    // window.history.replaceState(null, null, "?r=load&a1=" + question1selectedTheID + "&a3=" + question3selectedTheID + "&a5=" + question5selectedTheID + "&fn=James \"The Knight\" Riter");
    window.history.replaceState(null, null, "?r=load&a1="+question1selectedTheID+"&a3="+question3selectedTheID+"&a5="+question5selectedTheID+"&fn="+inputfirstName+"&mn="+NGLoadMobName+"&ln="+inputlastName)
}

// Generate Nickname Button
function genNicknameButton() {

    const genNicknameButtonFirstName = document.querySelector('input[name="firstName"]')
    const genNicknameButtonLastName = document.querySelector('input[name="lastName"]')

    if (genNicknameButtonFirstName.value === "" || genNicknameButtonLastName.value === ""){
        genNicknameButtonFirstName.classList.add("errorFilloutInputNG")
        genNicknameButtonFirstName.placeholder='Enter your first name'
        genNicknameButtonLastName.classList.add("errorFilloutInputNG")
        genNicknameButtonLastName.placeholder='Enter your last name'
    }else{        
        questTheQuestion.forEach((questPanel) => {
            questPanel.hidden = true
            questPanel.classList.remove("NicknameGeneratorItemActive")
        });

        
        questTheMobResults.hidden = false
        questBackBtn.hidden = true
        questGenNickname.hidden = true
        questDots.hidden = true
        questResultsSubInfo.hidden = false
        questTheMobResults.classList.add("NicknameGeneratorItemActive")
        TMMNGFooterWrapHide = document.querySelector('[role="TMMNGFooterWrap"]')
        TMMNGFooterWrapHide.hidden = true
        TMMNGFooterWrapHide.classList.add("dn")

        questMainWrap.classList.add("TMMNicknameGeneratorDone")
        genNicknameButtonFirstName.classList.remove("errorFilloutInputNG");
        genNicknameButtonLastName.classList.remove("errorFilloutInputNG");
        genNicknameButtonFirstName.placeholder='First Name';
        genNicknameButtonLastName.placeholder='Last Name';
        genNicknameOnSubmit()
    }
}

// When to show and hide the back button
function backButtonShowHide() {
    const questTheQuestionActive = document.querySelector(".NicknameGeneratorItemActive")
    questTheQuestionActiveGST = questTheQuestionActive.dataset.question
    if (questTheQuestionActiveGST === "01") {
        questBackBtn.hidden = true
    } else {
        questBackBtn.hidden = false
    }
}
// 
function nextQuestionHandler(e) {
    questTheQuestion.forEach((questPanel) => {
        questPanel.hidden = true
        questPanel.classList.remove("NicknameGeneratorItemActive")
    });
    const buttonGTS = e.target.dataset.gts
    const currentTab = questTheQuestion.find(
        (questPanel) => questPanel.getAttribute("data-question") === buttonGTS
    );
    currentTab.classList.add("NicknameGeneratorItemActive")
    currentTab.hidden = false
    questPreviousQuestionRaw = buttonGTS - 01
    questPreviousQuestion = padLeadingZeros(buttonGTS, 2)
    questBackBtn.setAttribute("data-gts", questPreviousQuestion)
    backButtonShowHide()
    buildTheDotsNG()
    SHButtonsAndGenerateNickname()
}
// 
function previousQuestionHandler(e) {
    questTheQuestion.forEach((questPanel) => {
        questPanel.hidden = true
        questPanel.classList.remove("NicknameGeneratorItemActive")
    });
    const questPrevBackBtnGST = padLeadingZeros(questBackBtn.dataset.gts - 01, 2)
    const currentTab = questTheQuestion.find(
        (questPanel) => questPanel.getAttribute("data-question") === questPrevBackBtnGST
    );
    currentTab.classList.add("NicknameGeneratorItemActive")
    currentTab.hidden = false
    questPreviousQuestionRaw = questPrevBackBtnGST - 01
    questPreviousQuestion = padLeadingZeros(questPrevBackBtnGST, 2)
    questBackBtn.setAttribute("data-gts", questPreviousQuestion)
    backButtonShowHide()
    buildTheDotsNG()
    SHButtonsAndGenerateNickname()
}
// Take quiz again button 
function genTakeQuizAgain() {
    window.history.pushState({}, document.title, "/" + "?=new");
    location.reload()
}

// 
questAction.forEach((button) => {
    button.addEventListener("click", nextQuestionHandler)
});
// Start on last step - TEMP 
// genNicknameButton() 







if (window.location.href.indexOf("?r=load") != -1){
    console.log("?r=load")
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const a1 = urlParams.get('a1')
    console.log(a1)
    document.getElementById(a1).checked = true

    const a3 = urlParams.get('a3')
    console.log(a3)
    document.getElementById(a3).checked = true

    const a5 = urlParams.get('a5')
    console.log(a5)
    document.getElementById(a5).checked = true


    // genNicknameButton() 


    const fn = urlParams.get('fn')
    console.log(fn)

    const mn = urlParams.get('mn')
    console.log(mn)

    const ln = urlParams.get('ln')
    console.log(ln)


    document.querySelector('input[name="firstName"]').value = fn
    document.querySelector('input[name="lastName"]').value = ln

    genNicknameButton()

    document.getElementById("mobName").innerHTML = mn

}