/*
*/
const questMainWrap = document.querySelector(".TMMNicknameGenerator")
const questAction = questMainWrap.querySelectorAll('[role="questTheAction"]')
const questTheQuestion = Array.from(questMainWrap.querySelectorAll('[role="questMobQuestion"]'))
const questTheQuestionAmount = questTheQuestion.length
const questBackBtn = document.querySelector('[role="questBackButton"]')
const questDots = document.querySelector('[role="questDotsWrap"]')
const questGenNickname = document.querySelector('[role="generateNickname"]')

// Pad Leading Zero
function padLeadingZeros(num, size) {
    var s = num + ""
    while (s.length < size) s = "0" + s
    return s
}
// 
// Try to count what question has the active class so we can remove the need to numbers in the html
function whatQuestionIsActive() {
    const questTheQuestion = Array.from(questMainWrap.querySelectorAll('[role="questMobQuestion"]'))

    var classes = Array.prototype.map.call(questTheQuestion, function(element) {
        return element.value;
    });

    console.log(classes)

}
whatQuestionIsActive()


// Add Dots +++
function buildTheDotsNG() {
    questDots.innerHTML = "";
    var questTheQuestionActive = document.querySelector(".NicknameGeneratorItemActive")
    questTheQuestionActiveGST = questTheQuestionActive.dataset.question



    for (let i = 0; i < questTheQuestionAmount; i++) {
        const makeTMMNGdot = document.createElement('b')
        hightLightDots =  padLeadingZeros(i + 1, 2)
        if(questTheQuestionActiveGST > hightLightDots){
            makeTMMNGdot.className = "TMMNGdot TMMNGdotDone"
        }else if(questTheQuestionActiveGST == hightLightDots){
            makeTMMNGdot.className = "TMMNGdot TMMNGdotActive"
        }else{
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
    //Hide All Tabpane
    questTheQuestion.forEach((questPanel) => {
        questPanel.hidden = true
        questPanel.classList.remove("NicknameGeneratorItemActive")
    });
    //Show New Tab
    const buttonGTS = e.target.dataset.gts
    const currentTab = questTheQuestion.find(
        (questPanel) => questPanel.getAttribute("data-question") === buttonGTS
    );
    currentTab.classList.add("NicknameGeneratorItemActive")
    currentTab.hidden = false
    // previous  step 
    questPreviousQuestionRaw = buttonGTS - 01
    questPreviousQuestion = padLeadingZeros(buttonGTS, 2)
    // Button 
    questBackBtn.setAttribute("data-gts", questPreviousQuestion)
    backButtonShowHide()
    buildTheDotsNG()
    SHButtonsAndGenerateNickname()
}
// 
function previousQuestionHandler(e) {
    // Hide all questions 
    questTheQuestion.forEach((questPanel) => {
        questPanel.hidden = true
        questPanel.classList.remove("NicknameGeneratorItemActive")
    });

    // Show New Tab
    const questPrevBackBtnGST = padLeadingZeros(questBackBtn.dataset.gts - 01, 2)
    const currentTab = questTheQuestion.find(
        (questPanel) => questPanel.getAttribute("data-question") === questPrevBackBtnGST
    );

    currentTab.classList.add("NicknameGeneratorItemActive")
    currentTab.hidden = false
    // Set button when going back 
    questPreviousQuestionRaw = questPrevBackBtnGST - 01
    questPreviousQuestion = padLeadingZeros(questPrevBackBtnGST, 2)
    // Button 
    questBackBtn.setAttribute("data-gts", questPreviousQuestion)
    backButtonShowHide()
    buildTheDotsNG()
    SHButtonsAndGenerateNickname()
}
/*
 
*/
questAction.forEach((button) => {
    button.addEventListener("click", nextQuestionHandler)
});