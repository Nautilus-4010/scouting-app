class ScoutingForm {

    errorFooter;
    form;
    formType;
    sections;
    submitBtn;
    typeData;

    constructor(formQuerySelector, formType, sectionDetails){
        this.form = document.querySelector(formQuerySelector);
        this.formType = formType;
        this.setErrorFooter();
        this.setSubmitBtn();
        this.setSectionsAndQuestions(sectionDetails);
        this.addFormHandler(); 
    }

    renderSections(){
        for (const sectionName in this.sections){
            const section = this.sections[sectionName];
            section.renderQuestions();
            this.form.appendChild(section.container);
        }
        this.sections.comments.container.appendChild(this.errorFooter);
        this.sections.comments.container.appendChild(this.submitBtn);
    }

    addFormSpecificSections(senctionDetails){
        senctionDetails.forEach( (detail) => {
            this.sections[detail['sectionName']] = new ScoutingFormSection(detail['sectionClass'], detail['sectionTitle']);
        })  
    }

    setErrorFooter(){
        this.errorFooter = document.createElement('p');
        this.errorFooter.classList.add('ocultar', 'error');
        this.errorFooter.innerText = "Hay errores en algunas preguntas";
    }

    setSubmitBtn(){
        this.submitBtn = document.createElement('button');
        this.submitBtn.type = 'submit';
        this.submitBtn.classList.add('submit-btn');
        this.submitBtn.innerText = 'Enviar';
    }

    setSectionsAndQuestions(sectionDetails){
        this.sections = {};
        this.sections.generalInfo = new ScoutingFormSection('info-match');
        this.addFormSpecificSections(sectionDetails);
        this.sections.generalInfo.addQuestion(new RegionalSelector(`regional-${this.formType}`));
        this.sections.generalInfo.addQuestion(new NumericText('Equipo', `team-number-${this.formType}`, '4010', 1000, 30000, 'El número de equipo no es válido'));
        this.sections.comments = new ScoutingFormSection('comments-submit');
        this.sections.comments.addQuestion(new BigTextArea('Comentarios', `comments-${this.formType}`), 0);
        
    }

    addFormHandler(){
        const pointerToThis = this;
        this.form.addEventListener('submit', function(e) {
            e.preventDefault();
            let areAllQuestionsValid = true;
            pointerToThis.errorFooter.classList.add('ocultar');
            for (const sectionName in pointerToThis.sections){
                const section = pointerToThis.sections[sectionName];
                for(const sectionQuestion of section.questions){
                    const isQuestionValid = sectionQuestion.validate();
                    areAllQuestionsValid = areAllQuestionsValid && isQuestionValid;
                }
            }
            if(!areAllQuestionsValid){
                pointerToThis.errorFooter.classList.remove('ocultar');
                return;
            }
            router.openLoadingWheel();
            const submittedForm = new FormData(e.target);
            const scoutingData = {};
            for (const input of submittedForm.entries()){
                const key = input[0];
                const keyLastChar = key.charAt(key.length-1);
                if(keyLastChar === ']') {
                    if(!scoutingData.hasOwnProperty(key))
                        scoutingData[key] = new Array();
                    scoutingData[key].push(input[1]);
                } else 
                    scoutingData[key] = input[1];
            }
            scoutingData['createdAt'] = Date.now();
            const docId = pointerToThis.getCompositeKey(scoutingData);
            const firebaseDoc = db.collection(`${Season.SEASON_NAME}-${pointerToThis.typeData}`).doc(docId);
            firebaseDoc.set(scoutingData).then(() => {
                pointerToThis.errorFooter.classList.add('ocultar');
                e.target.reset();
                checkoutPage.loadSuccessPage();
            }).catch(error => {
                console.log(error);
                checkoutPage.loadFailPage();
            });
        });
    }

    getCompositeKey(scoutingData){
        return '';
    }
}

class MatchScoutingForm extends ScoutingForm {

    constructor(form){
        super(form,
             'match',
              [{sectionName:'autonomous', sectionTitle:'Autonomous', sectionClass: 'autonomous-info' },
               {sectionName:'teleop', sectionTitle:'Driver-Controlled', sectionClass: 'teleop-info' } 
            ]);
        this.sections.generalInfo.addQuestion(new NumericText('Match', 'match-number', '1', 1, 99, 'El número de match no es válido'));
        const allianceSelection = new RadioWithText('Allianza', 'alliance-color');
        allianceSelection.addInput({id: "blue-alliance", value: "Azul"});
        allianceSelection.addInput({id: "red-alliance", value: "Roja"});
        this.sections.generalInfo.addQuestion(new ScoutName());
        this.sections.generalInfo.addQuestion(allianceSelection);
        this.typeData = 'matches';
    }

    getCompositeKey(scoutingData){
        const teamNumber = scoutingData[`team-number-${this.formType}`];
        const matchNum = scoutingData['match-number'];
        return `${teamNumber}-${matchNum}`;
    }
}

class PitScoutingForm extends ScoutingForm {
    constructor(form){
        super(form,
             'pit',
             [{sectionName:'engineering', sectionTitle:'Ingeniería', sectionClass: 'autonomous-info' },
               {sectionName:'team', sectionTitle:'Finanzas y comunicación', sectionClass: 'teleop-info' } 
            ]);
        this.typeData = 'teams';
    }

    getCompositeKey(scoutingData){
        const teamNumber = scoutingData[`team-number-${this.formType}`];
        return `${teamNumber}`;
    }
}

class ScoutingFormSection {

    container;
    questions;

    constructor(className, title=''){
        this.questions = new Array();
        this.container = document.createElement('div');
        this.container.classList.add(className, 'form-centre');
        if(title !== '') {
            const sectionTitle = document.createElement('h1');
            sectionTitle.innerText = title;
            this.container.appendChild(sectionTitle);
        }
    }

    addQuestion(question){
        this.questions.push(question);
        question.addToContainer(this.container);
    }

    renderQuestions(){
        for (const question of this.questions)
            question.addToContainer(this.container);
    }
}
